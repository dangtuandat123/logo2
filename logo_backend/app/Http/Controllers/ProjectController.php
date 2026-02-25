<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    /**
     * Display a listing of the user's projects.
     */
    public function index(Request $request)
    {
        $projects = Project::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($projects);
    }

    /**
     * Display the specified project.
     */
    public function show(Request $request, string $id)
    {
        $project = Project::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        return response()->json($project);
    }

    /**
     * Remove the specified project.
     */
    public function destroy(Request $request, string $id)
    {
        $project = Project::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $project->delete();

        return response()->json(['message' => 'Đã xóa dự án thành công.']);
    }

    /**
     * Premium feature: Export SVG to file
     * Deducts 5 diamonds if user requests high-res export
     */
    public function export(Request $request, string $id)
    {
        $user = $request->user();
        $project = Project::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        // 1. Check Diamond Balance (Requires 5 diamonds for SVG export)
        if ($user->diamonds < 5) {
            return response()->json(['message' => 'Số dư kim cương không đủ để xuất file Vector (Cần 5💎)'], 402);
        }

        try {
            DB::beginTransaction();

            // 2. Deduct Diamonds & Create Transaction
            $user->decrement('diamonds', 5);

            Transaction::create([
                'user_id' => $user->id,
                'type' => 'consume',
                'amount' => -5,
                'description' => "Xuất file Vector SVG cho logo #{$project->id}",
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Trừ kim cương thành công. Bắt đầu tải SVG.',
                'svg_content' => $project->svg_content,
                'balance' => $user->diamonds
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
