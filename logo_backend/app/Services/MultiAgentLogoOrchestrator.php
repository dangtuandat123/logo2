<?php
declare(strict_types=1);

namespace App\Services;

use App\Services\Agents\ConceptAgent;
use App\Services\Agents\VectorArchitectAgent;
use App\Services\Agents\ColorLightingAgent;
use App\Services\Agents\AestheticValidatorAgent;
use Illuminate\Support\Facades\Log;

class MultiAgentLogoOrchestrator
{
    protected ConceptAgent $conceptAgent;
    protected VectorArchitectAgent $vectorAgent;
    protected ColorLightingAgent $colorAgent;
    protected AestheticValidatorAgent $validatorAgent;

    public function __construct(
        ConceptAgent $conceptAgent,
        VectorArchitectAgent $vectorAgent,
        ColorLightingAgent $colorAgent,
        AestheticValidatorAgent $validatorAgent
    ) {
        $this->conceptAgent = $conceptAgent;
        $this->vectorAgent = $vectorAgent;
        $this->colorAgent = $colorAgent;
        $this->validatorAgent = $validatorAgent;
    }

    /**
     * Generate Logo using the Multi-Agent Pipeline
     */
    public function generateLogoPipeline(string $brandName, ?string $industry, ?string $style, array $palette, ?string $description = null): string
    {
        Log::info("Multi-Agent Logo Generation Started for brand: $brandName");

        // Stage 1: The Creative Concept
        Log::info("Stage 1: Concept Agent Thinking...");
        $conceptJson = $this->conceptAgent->generateConcept($brandName, $industry, $style, $palette, $description);

        // Stage 2: The Vector Layout Construction
        Log::info("Stage 2: Vector Architect Drawing...");
        $rawSvgObj = $this->vectorAgent->drawSvgGeometry($brandName, $conceptJson);

        // Stage 3: Inject Linear Gradients and Luxury Colors
        Log::info("Stage 3: Color and Lighting Injecting...");
        $coloredSvg = $this->colorAgent->injectLuxuriousColors($rawSvgObj, $palette);

        // Stage 4: Aesthetic Logic Validation & Final Clean
        Log::info("Stage 4: Aesthetic Validator Reviewing...");
        $finalReadySvg = $this->validatorAgent->validateAndFixAesthetics($coloredSvg);

        Log::info("Multi-Agent Logo Generation Succeeded.");

        return $finalReadySvg;
    }

    /**
     * Edit Logo Pipeline - uses Sanitizer and Color agents depending on command
     */
    public function editLogoPipeline(string $currentSvg, string $command): string
    {
        // For editing, we reuse the architecture but with an editor prompt logic.
        // We can use the Color Agent or create a specific Editor Agent.
        // In this design, to keep it simple, we use a single direct call for editing 
        // but via an Orchestrated workflow.
        // (Implementation logic continues...)

        // Assuming we fallback to the OpenRouterService editLogo method logic
        // but rewritten here for centralized control.

        $agent = new class extends \App\Services\Agents\AbstractAgent {
            protected function getSystemPrompt(): string
            {
                return "BẠN LÀ MỘT PHÙ THỦY TÁI TẠO LOGO AI SỞ HỮU CON MẮT THẨM MỸ KIỆT XUẤT.
CHỈ TRẢ VỀ TOÀN BỘ MÃ SVG ĐÃ ĐƯỢC CHỈNH SỬA TOÀN DIỆN. KHÔNG CÓ BẤT KỲ VĂN BẢN (Markdown) NÀO KHÁC.";
            }

            public function edit(string $svg, string $cmd): string
            {
                $prompt = "ĐÂY LÀ MÃ SVG GỐC: `$svg`. 
YÊU CẦU SỬA: '$cmd'.
HÃY TRẢ LẠI TRỰC TIẾP MÃ SVG.";
                $edited = $this->callLlm($prompt, 600);
                preg_match('/<svg.*?>.*?<\/svg>/is', $edited, $matches);
                return $matches[0] ?? $edited;
            }
        };

        $editedSvg = $agent->edit($currentSvg, $command);

        // Pass via Validator to ensure layout symmetry
        return $this->validatorAgent->validateAndFixAesthetics($editedSvg);
    }
}
