<?php
declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenRouterService
{
    protected $apiKey;
    protected $baseUrl = 'https://openrouter.ai/api/v1/chat/completions';
    protected $model;

    public function __construct()
    {
        $this->apiKey = env('OPENROUTER_API_KEY');
        $this->model = env('OPENROUTER_MODEL', 'google/gemini-3.1-pro-preview');
    }

    /**
     * Call OpenRouter API with Gemini 3.1 Pro Preview
     */
    public function generateLogo(string $brandName, ?string $industry, ?string $style, array $palette, ?string $description = null)
    {
        $colors = implode(', ', $palette);
        $industryText = $industry ? "Ngành nghề: $industry." : "";
        $styleText = $style ? "Phong cách: $style." : "Hiện đại, tối giản.";
        $descriptionText = $description ? "Ghi chú thêm: $description." : "";

        // --- PHASE 1: ART DIRECTOR (Creative Ideation) ---
        $artDirectorPrompt = "Bạn là một Giám đốc Nghệ thuật (Art Director) chuyên nghiệp.
Nhiệm vụ của bạn là suy nghĩ và phác thảo ra một 'Bản thiết kế logo (Blueprint)' cực kỳ chi tiết dựa trên yêu cầu của khách hàng.
Bạn KHÔNG viết mã SVG. Bạn chỉ miêu tả chi tiết bằng văn bản cách hình khối, màu sắc, bố cục, tỷ lệ vàng, khoảng trắng hoạt động cùng nhau để tạo nên một logo ĐẲNG CẤP, CÓ THỂ SỬ DỤNG NGAY CHO DOANH NGHIỆP. Hãy định hướng rõ cách tạo các vector path và hình tượng ẩn dụ.
THÔNG TIN THƯƠNG HIỆU:
- Tên Thương Hiệu: $brandName
$industryText
$styleText
$descriptionText
- Bảng màu ưu tiên (HEX): $colors";

        set_time_limit(180);
        $agent1Response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
        ])->withoutVerifying()->timeout(180)->post($this->baseUrl, [
                    'model' => $this->model,
                    'messages' => [['role' => 'user', 'content' => $artDirectorPrompt]],
                    'reasoning' => ['enabled' => true]
                ]);

        if (!$agent1Response->successful()) {
            Log::error('Agent 1 (Art Director) API Error: ' . $agent1Response->body());
            throw new \Exception('Không thể kết nối đến AI Server ở quá trình Sáng tạo (Phase 1).');
        }

        $blueprint = $agent1Response->json('choices.0.message.content');

        // --- PHASE 2: SVG ARCHITECT (Execution) ---
        $svgArchitectPrompt = "Bạn là một Kỹ sư SVG Cao cấp (Senior SVG Architect).
Nhiệm vụ của bạn là nhận 'Bản thiết kế logo' từ Art Director và DỊCH NÓ SANG mã <svg> hoàn chỉnh và tối ưu hóa. BẠN KHÔNG ĐƯỢC PHÉP THÊM HAY BỚT CHI TIẾT NÀO SO VỚI BẢN THIẾT KẾ.

--- BẢN THIẾT KẾ TỪ ART DIRECTOR ---
{$blueprint}

--- YÊU CẦU KỸ THUẬT QUAN TRỌNG ---
1. CHỈ TRẢ VỀ mã <svg> ... </svg> (Không markdown, không bọc trong ```svg, không giải thích dài dòng).
2. Canvas: Bắt buộc dùng viewBox='0 0 500 500' (Tỷ lệ 1:1 hình vuông).
3. Background: HOÀN TOÀN TRONG SUỐT (Transparent). Không vẽ thẻ <rect> làm nền che mất sự trong suốt.
4. Scalability: Logo bắt buộc phải nằm gọn ở giữa canvas (center-aligned), không bị tràn ra ngoài kích thước 500x500. Đảm bảo lề (padding) an toàn.
5. Sạch sẽ: Loại bỏ các thẻ không cần thiết (<defs> rác, id lộn xộn). Mã phải gọn gàng, sử dụng <path>, <circle>, <rect>, <text>... chuẩn xác. Phải thả gradient hoặc màu solid dựa trên Bảng màu cung cấp ($colors).
6. Kiểu chữ (Typography): Tên thương hiệu ('$brandName') phải CỰC KỲ dễ đọc. Chuyển đổi tên thương hiệu thành các đường path SVG nét mượt, HOẶC sử dụng thẻ <text> với bộ font phổ biến (Helvetica, Montserrat, Roboto, Inter, Playfair Display) có fallback rõ ràng.";

        set_time_limit(180);
        $agent2Response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
        ])->withoutVerifying()->timeout(180)->post($this->baseUrl, [
                    'model' => $this->model,
                    'messages' => [['role' => 'user', 'content' => $svgArchitectPrompt]],
                    'reasoning' => ['enabled' => true]
                ]);

        if ($agent2Response->successful()) {
            $content = $agent2Response->json('choices.0.message.content');
            return $this->extractSvg($content);
        }

        Log::error('Agent 2 (SVG Architect) API Error: ' . $agent2Response->body());
        throw new \Exception('Không thể kết nối đến AI Server ở quá trình Vẽ Logo (Phase 2).');
    }

    /**
     * Edit an existing logo SVG code using natural language commands
     */
    public function editLogo(string $currentSvg, string $command)
    {
        $systemPrompt = "Bạn là một CHUYÊN GIA THIẾT KẾ LOGO KIÊM LẬP TRÌNH VIÊN ĐỒ HỌA SVG (Expert SVG Architect).
Người dùng đã có một Logo SVG hiện tại và họ muốn bạn nâng cấp, tinh chỉnh hoặc thay đổi một số chi tiết để logo trở nên hoàn hảo hơn.

--- MÃ SVG HIỆN TẠI ---
$currentSvg

--- YÊU CẦU TỪ KHÁCH HÀNG ---
'$command'

--- YÊU CẦU KỸ THUẬT KHẮT KHE ---
1. TƯ DUY NHƯ CHUYÊN GIA: Hãy phân tích yêu cầu của khách hàng, suy luận ra giải pháp thẩm mỹ tốt nhất để áp dụng vào file SVG. Nếu khách yêu cầu đổi màu, hãy phối màu sao cho hợp lý và sang trọng. Nếu khách yêu cầu nét thanh mảnh, hãy sửa stroke-width tinh tế.
2. CHỈ TRẢ VỀ mã <svg> ĐÃ ĐƯỢC CHỈNH SỬA Hoàn thiện (Không dùng thẻ markdown ```svg, tuyệt đối không chèn văn bản giải thích).
3. Không làm hỏng tỷ lệ: Bắt buộc giữ nguyên `viewBox='0 0 500 500'`.
4. Không làm mất tính trong suốt của nền (Ngoại trừ khách hàng kịch liệt yêu cầu thêm màu nền rực rỡ).
5. Tối ưu mã hóa: Sau khi chỉnh sửa theo mệnh lệnh, hãy đảm bảo SVG vẫn sạch sẽ, các thẻ đóng mở khớp nhau hoàn hảo.";

        set_time_limit(180);
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
        ])->withoutVerifying()->timeout(180)->post($this->baseUrl, [
                    'model' => $this->model,
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
