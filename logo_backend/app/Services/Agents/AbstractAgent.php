<?php
declare(strict_types=1);

namespace App\Services\Agents;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

abstract class AbstractAgent
{
    protected string $apiKey;
    protected string $model;
    protected string $baseUrl = 'https://openrouter.ai/api/v1/chat/completions';

    // Configurable LLM Parameters
    protected string $effort;
    protected float $temperature;
    protected int $maxTokens;
    protected float $topP;

    public function __construct()
    {
        $this->apiKey = env('OPENROUTER_API_KEY');
        $this->model = env('OPENROUTER_MODEL', 'google/gemini-3.1-pro-preview');
        $this->effort = env('OPENROUTER_REASONING_EFFORT', 'high');
        $this->temperature = (float) env('OPENROUTER_TEMPERATURE', '0.1');
        $this->maxTokens = (int) env('OPENROUTER_MAX_TOKENS', '6000');
        $this->topP = (float) env('OPENROUTER_TOP_P', '0.8');
    }

    /**
     * Define the specific system prompt for this agent.
     */
    abstract protected function getSystemPrompt(): string;

    /**
     * Call the LLM API.
     */
    protected function callLlm(string $userPrompt, int $timeout = 600): string
    {
        // Force minimum timeout for heavy reasoning models
        $timeout = max($timeout, 600);
        set_time_limit($timeout);

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
        ])->withoutVerifying()->timeout($timeout)->post($this->baseUrl, [
                    'model' => $this->model,
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => $this->getSystemPrompt()
                        ],
                        [
                            'role' => 'user',
                            'content' => $userPrompt
                        ]
                    ], // Đóng khối messages
                    'reasoning' => [
                        'effort' => $this->effort
                    ],
                    'max_tokens' => $this->maxTokens,
                    'temperature' => $this->temperature,
                    'top_p' => $this->topP
                ]);

        if ($response->successful()) {
            $content = $response->json('choices.0.message.content') ?? '';
            $this->logAgentCommunication($userPrompt, $content);
            return $content;
        }

        Log::error('OpenRouter Agent Error (' . static::class . '): ' . $response->body());
        throw new \Exception('Failed to generate response from Agent: ' . class_basename(static::class));
    }

    /**
     * Log communication for Admin trace
     */
    protected function logAgentCommunication(string $promptSent, string $responseReceived): void
    {
        $agentName = class_basename(static::class);
        $timestamp = now()->toDateTimeString();

        $logFile = storage_path('logs/ai-communication.log');

        $logContent = "========================================================================\n";
        $logContent .= "[$timestamp] AGENT EXECUTED: $agentName\n";
        $logContent .= "------------------------------------------------------------------------\n";
        $logContent .= "[INPUT PROMPT SENT]:\n$promptSent\n";
        $logContent .= "------------------------------------------------------------------------\n";
        $logContent .= "[OUTPUT RECEIVED]:\n$responseReceived\n";
        $logContent .= "========================================================================\n\n\n";

        // Append to specific file rather than laravel.log to keep it clean
        file_put_contents($logFile, $logContent, FILE_APPEND);
    }
}
