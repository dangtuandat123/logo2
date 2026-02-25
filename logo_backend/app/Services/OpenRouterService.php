<?php
declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenRouterService
{
    protected $apiKey;
    protected $baseUrl = 'https://openrouter.ai/api/v1/chat/completions';

    public function __construct()
    {
        $this->apiKey = env('OPENROUTER_API_KEY');
    }

    /**
     * Call OpenRouter API with Gemini 3.1 Pro Preview
     */
    public function generateLogo(string $brandName, ?string $industry, ?string $style, array $palette)
    {
        $colors = implode(', ', $palette);
        $industryText = $industry ? "Ngành nghề: $industry." : "";
        $styleText = $style ? "Phong cách: $style." : "Hiện đại, tối giản.";

        $systemPrompt = "Bạn là một họa sĩ thiết kế logo SVG chuyên nghiệp. 
Nhiệm vụ của bạn là CHỈ trả về đúng chuẩn mã <svg> hoàn chỉnh với viewBox='0 0 500 500'. 
KHÔNG bao gồm markdown \`\`\`svg, KHÔNG có văn bản giải thích. 
Tên Thương Hiệu: $brandName.
$industryText
$styleText
Bảng màu (HEX): $colors.
Yêu cầu:
1. Nền của SVG phải là trong suốt (transparent).
2. Hình khối (iconography) phẳng, hiện đại hoặc phù hợp phong cách.
3. Chữ (Tên thương hiệu) phải rõ ràng, chọn font-family thích hợp (sans-serif hoặc serif).
4. Phải thả gradient hoặc màu solid dựa trên Bảng màu cung cấp.";

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
        ])->post($this->baseUrl, [
                    'model' => 'google/gemini-3.1-pro-preview',
                    'messages' => [
                        [
                            'role' => 'user',
                            'content' => $systemPrompt
                        ]
                    ],
                    'reasoning' => [
                        'enabled' => true
                    ]
                ]);

        if ($response->successful()) {
            $content = $response->json('choices.0.message.content');
            return $this->extractSvg($content);
        }

        Log::error('OpenRouter API Error: ' . $response->body());
        throw new \Exception('Không thể kết nối đến AI Server.');
    }

    /**
     * Edit an existing logo SVG code using natural language commands
     */
    public function editLogo(string $currentSvg, string $command)
    {
        $systemPrompt = "Bạn là một AI chỉnh sửa mã SVG. 
Đây là mã SVG hiện tại:
$currentSvg

Yêu cầu sửa đổi từ người dùng: '$command'.

Nhiệm vụ: CHỈ trả về mã <svg> ĐÃ ĐƯỢC CHỈNH SỬA. 
Giữ nguyên viewBox và các thành phần không bị ảnh hưởng. KHÔNG trả lời bằng văn bản, KHÔNG dùng markdown box.";

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
        ])->post($this->baseUrl, [
                    'model' => 'google/gemini-3.1-pro-preview',
                    'messages' => [
                        [
                            'role' => 'user',
                            'content' => $systemPrompt
                        ]
                    ],
                    'reasoning' => [
                        'enabled' => true
                    ]
                ]);

        if ($response->successful()) {
            $content = $response->json('choices.0.message.content');
            return $this->extractSvg($content);
        }

        Log::error('OpenRouter API Error: ' . $response->body());
        throw new \Exception('Lỗi khi chỉnh sửa Logo bằng AI.');
    }

    /**
     * Clean up response from LLM to strictly return SVG only
     */
    private function extractSvg($text)
    {
        // Find the first occurrence of <svg and the last occurrence of </svg>
        preg_match('/<svg.*?>.*?<\/svg>/is', $text, $matches);

        if (isset($matches[0])) {
            return $matches[0];
        }

        // Fallback in case the LLM returned raw text that broke parsing
        return $text;
    }
}
