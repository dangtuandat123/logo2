<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BillingController extends Controller
{
    /**
     * Get transaction history for current user
     */
    public function history(Request $request)
    {
        $transactions = Transaction::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($transactions);
    }

    /**
     * Create a pending order for VietQR transfer
     */
    public function createOrder(Request $request)
    {
        $request->validate([
            'diamonds' => 'required|integer|min:20',
            'amount' => 'required|integer|min:20000', // e.g. 20 * 1000 = 20000 VND
        ]);

        $user = $request->user();

        // Generate a unique 5-digit order code (SLOX 12345)
        do {
            $code = 'SLOX ' . rand(10000, 99999);
        } while (Transaction::where('order_id', $code)->exists());

        $transaction = Transaction::create([
            'user_id' => $user->id,
            'type' => 'topup',
            'amount' => $request->diamonds,
            'description' => "Nạp {$request->diamonds} Kim Cương",
            'order_id' => $code,
            'status' => 'pending',
        ]);

        return response()->json([
            'order_id' => $code,
            'amount_vnd' => $request->amount,
            'transaction' => $transaction
        ]);
    }

    /**
     * Webhook Endpoint for VietQR / SePay / Third-party services
     * This route should be unprotected (no Sanctum middleware)
     */
    public function webhook(Request $request)
    {
        // Example logic for generic VietQR webhook
        // Note: Production environments must verify Webhook Signature based on provider (e.g. SePay/Casso)
        $content = $request->input('content'); // e.g., "NGUYEN VAN A CHUYEN KHOAN SLOX 12345"

        Log::info('VietQR Webhook Received', $request->all());

        // Extract SLOX \d{5} from content string
        if (preg_match('/(SLOX\s\d{5})/', $content, $matches)) {
            $orderCode = $matches[1];

            $transaction = Transaction::where('order_id', $orderCode)
                ->where('status', 'pending')
                ->first();

            if ($transaction) {
                try {
                    DB::beginTransaction();

                    $transaction->update(['status' => 'completed']);

                    $user = User::find($transaction->user_id);
                    $user->increment('diamonds', $transaction->amount);

                    DB::commit();

                    Log::info("Webhook Success: Credited {$transaction->amount} diamonds to User #{$user->id}");
                    return response()->json(['success' => true]);

                } catch (\Exception $e) {
                    DB::rollBack();
                    Log::error("Webhook DB Transaction Failed: " . $e->getMessage());
                    return response()->json(['success' => false, 'error' => 'Database error'], 500);
                }
            }
        }

        return response()->json(['success' => false, 'error' => 'Order not found or already completed'], 404);
    }
}
