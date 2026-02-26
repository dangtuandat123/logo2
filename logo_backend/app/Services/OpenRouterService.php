<?php
declare(strict_types=1);

namespace App\Services;

class OpenRouterService
{
    protected MultiAgentLogoOrchestrator $orchestrator;

    public function __construct(MultiAgentLogoOrchestrator $orchestrator)
    {
        $this->orchestrator = $orchestrator;
    }

    /**
     * Call OpenRouter API with Gemini 3.1 Pro Preview
     */
    public function generateLogo(string $brandName, ?string $industry, ?string $style, array $palette, ?string $description = null): string
    {
        return $this->orchestrator->generateLogoPipeline($brandName, $industry, $style, $palette, $description);
    }

    /**
     * Edit an existing logo SVG code using natural language commands
     */
    public function editLogo(string $currentSvg, string $command): string
    {
        return $this->orchestrator->editLogoPipeline($currentSvg, $command);
    }
}
