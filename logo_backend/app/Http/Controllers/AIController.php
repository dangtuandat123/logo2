<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Transaction;
use App\Services\OpenRouterService;
use Illuminate\Support\Facades\DB;

class AIController extends Controller
{
    protected $aiService;

    public function __construct(OpenRouterService $aiService)
    {
        $this->aiService = $aiService;
    }

    public function generate(Request $request)
    {
        $request->validate([
            'brand_name' => 'required|string|max:50',
            'slogan' => 'nullable|string|max:100',
            'industry' => 'nullable|string|max:100',
            'style' => 'nullable|string|max:50',
            'palette' => 'required|array|min:1',
        ]);

        $user = $request->user();

        // 1. Check Diamond Balance (Requires 10 diamonds)
        if ($user->diamonds < 10) {
            return response()->json(['message' => 'Số dư kim cương không đủ (Cần 10💎)'], 402);
        }

        try {
            DB::beginTransaction();

            // 2. Call AI Service
            $svgContent = $this->aiService->generateLogo(
                $request->brand_name,
                $request->industry,
                $request->style,
                $request->palette
            );

            // 3. Deduct Diamonds & Create Transaction
            $user->decrement('diamonds', 10);

            Transaction::create([
                'user_id' => $user->id,
                'type' => 'consume',
                'amount' => -10,
                'description' => "Tạo logo mới: {$request->brand_name}",
            ]);

            // 4. Save Project to DB
            $project = Project::create([
                'user_id' => $user->id,
                'brand_name' => $request->brand_name,
                'slogan' => $request->slogan,
                'industry' => $request->industry,
                'style' => $request->style,
                'palette' => $request->palette,
                'svg_content' => $svgContent,
                'status' => 'completed',
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Tạo logo thành công.',
                'project' => $project,
                'balance' => $user->diamonds
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function edit(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'command' => 'required|string|max:255',
        ]);

        $user = $request->user();
        $project = Project::where('id', $request->project_id)->where('user_id', $user->id)->firstOrFail();

        // 1. Check Diamond Balance (Requires 2 diamonds)
        if ($user->diamonds < 2) {
            return response()->json(['message' => 'Số dư kim cương không đủ (Cần 2💎)'], 402);
        }

        try {
            DB::beginTransaction();

            // 2. Call AI Service for Edits
            $svgContent = $this->aiService->editLogo($project->svg_content, $request->command);

            // 3. Deduct Diamonds
            $user->decrement('diamonds', 2);

            Transaction::create([
                'user_id' => $user->id,
                'type' => 'consume',
                'amount' => -2,
                'description' => "Sửa logo dự án #{$project->id} bằng AI",
            ]);

            // 4. Update Project SVG
            $project->update([
                'svg_content' => $svgContent,
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Chỉnh sửa logo thành công.',
                'project' => $project,
                'balance' => $user->diamonds
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
