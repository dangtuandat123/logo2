<?php
declare(strict_types=1);

namespace App\Services\Agents;

class ConceptAgent extends AbstractAgent
{
    protected function getSystemPrompt(): string
    {
        return "BẠN LÀ MỘT GIÁM ĐỐC SÁNG TẠO ĐẲNG CẤP THẾ GIỚI (WORLD-CLASS ART DIRECTOR). CÁC TÁC PHẨM CỦA BẠN LUÔN ON TOP DRIBBBLE VÀ BEHANCE.
NHIỆM VỤ CỦA BẠN LÀ THIẾT KẾ CẤU TRÚC LOGO, BẠN KHÔNG TRỰC TIẾP CODE SVG MÀ CHỈ VIẾT 'BẢN THIẾT KẾ' TRUYỀN ĐẠT CẢM HỨNG CHO ĐỘI NGŨ KỸ SƯ.
TRẢ VỀ DUY NHẤT JSON. KHÔNG KÈM THEO BẤT KỲ VĂN BẢN (MARKDOWN) NÀO KHÁC BÊN NGOÀI JSON.";
    }

    /**
     * Generate a precise design concept for the vector architect.
     */
    public function generateConcept(string $brandName, ?string $industry, ?string $style, array $palette, ?string $description): array
    {
        $colors = implode(', ', $palette);

        $prompt = "THÔNG TIN KHÁCH HÀNG:
- Tên Brand: $brandName
- Ngành nghề: " . ($industry ?: 'Chung') . "
- Phong cách mong muốn: " . ($style ?: 'Sang trọng, Nghệ thuật') . "
- Yêu cầu thêm: $description
- Bảng màu gốc: $colors

HƯỚNG DẪN KỸ THUẬT QUAN TRỌNG:
1. Bạn phải từ bỏ kiểu vẽ icon tĩnh vật quê mùa (Ví dụ: Ngành bất động sản mà vẽ cái nhà 1 tầng, mái tam giác). HÃY TƯ DUY KHÔNG GIAN, TƯ DUY KHỐI CƠ HỌC, ÂM BẢN (Negative Space).
2. Tới 90% logo luxury trên thế giới đều áp dụng nghệ thuật chữ cái lồng ghép nhau, hay cắt xén hình ấn tượng.
3. Chữ Typography phải toát lên sự đắt tiền: Dùng các font hoàng gia hoặc high-end fashion, in HOA, khoảng cách chữ vô cùng rộng (letter-spacing: 12-25). 

HÃY SINH RA BẰNG CHÍNH XÁC ĐỊNH DẠNG JSON NÀY ĐỂ TRUYỀN CHỈ THỊ CHO DEVELOPER:
{
  \"symbol_idea\": \"Trình bày cực kỳ cụ thể về các khối lồng vào nhau, tọa độ tưởng tượng, các đường cong Bezier mềm mại...\",
  \"negative_space_idea\": \"Cách bạn đục lỗ hình A bằng hình B, tạo ảo giác quang học...\",
  \"typography\": {
    \"fontFamily\": \"Ví dụ: 'Montserrat', 'Playfair Display', 'Cinzel'\",
    \"fontWeight\": \"800\",
    \"letterSpacing\": \"18\",
    \"textTransform\": \"uppercase\"
  },
  \"layout_instruction\": \"Trục trung tâm X=250. Biểu tượng mọc lên từ Y=80 đến 320. Font chữ vương giả đặt ở tọa độ Y=420. Đối xứng hoàn hảo theo Tỉ Lệ Vàng.\",
  \"color_palette\": [\"$colors\"]
}";

        $jsonString = $this->callLlm($prompt, 120);

        // Clean markdown backticks if any
        $jsonString = preg_replace('/```json\s*/', '', $jsonString);
        $jsonString = preg_replace('/```\s*/', '', $jsonString);

        $data = json_decode(trim($jsonString), true);
        if (!$data) {
            // Fallback content if JSON fails
            return [
                'symbol_idea' => 'Thiết kế trừu tượng tối giản kết hợp chữ cái đầu mượt mà.',
                'typography' => ['fontFamily' => "'Montserrat', sans-serif", 'fontWeight' => '800', 'letterSpacing' => '10'],
                'layout_instruction' => 'Logo ở giữa tọa độ 500x500 (trục x=250), text ở dưới.',
                'color_palette' => $palette
            ];
        }

        return $data;
    }
}
