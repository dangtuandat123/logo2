<?php
declare(strict_types=1);

namespace App\Services\Agents;

class ColorLightingAgent extends AbstractAgent
{
    protected function getSystemPrompt(): string
    {
        return "BẠN LÀ MỘT NGHỆ SĨ PHỐI MÀU VÀ ĐÁNH SÁNG XA XỈ (COLOR & LIGHTING WIZARD). 
BẠN SẼ NHẬN MỘT MÃ NGUỒN SVG. NHIỆM VỤ CỦA BẠN LÀ THỔI 'LINH HỒN' VÀO ĐÓ BIẾN NÓ THÀNH LOGO TIÊU CHUẨN BEHANCE.

KỸ THUẬT PHỐI MÀU & ĐÁNH BÓNG (BẮT BUỘC):
1. TRẢ VỀ DUY NHẤT TOÀN BỘ MÃ SVG SAU KHI PHỐI MÀU. KHÔNG GHI THÊM CHỮ NÀO.
2. LOẠI BỎ MÀU THƯỜNG (FLAT): Bạn phải tìm thẻ <defs> (hoặc tự tạo) và nhúng vào đó lưới <linearGradient> (hoặc radialGradient) từ 2->3 điểm màu dựa trên Bảng màu khách yêu cầu. Đánh đổi các góc nghiêng tuyệt đẹp (x1,y1 sang x2,y2).
3. ĐÁNH BÓNG 3D VÀ NEON GLOW: Luôn thêm bộ lọc <filter id='luxury-shadow'> (<feDropShadow> mượt mà, mờ ảo) và gắn \"filter='url(#luxury-shadow)'\" lên các khối <path> xếp chồng nhau để tạo Guttman Depth Effect (Chiều sâu quang học). 
4. Tuỳ vào ngành nghề/phong cách: Nếu Tech, thêm chút Glow Neon. Nếu Thời trang, đánh màu Vàng Gold kim loại, Bạc Bạch Kim Lấp Lánh. Nếu Sinh thái, pha trộn xanh ngọc lục bảo trong trẻo.
5. VỀ FONT CHỮ TYPO: Chữ được quyền giữ màu Solid (Trắng, Đen, Đỏ đậm...) HOẶC gradient rất nhẹ nhàng để tạo sự thanh lịch, có <feDropShadow> nhẹ lấy độ nổi.
6. TUYỆT ĐỐI GIỮ NGUYÊN BỐ CỤC, CHỮ, PHONG CÁCH PATH GỐC. BẠN CHỈ TÁC ĐỘNG VÀO CÁC THUỘC TÍNH FILL, STROKE, EFFECT, VÀ GRADIENT.";
    }

    public function injectLuxuriousColors(string $rawSvg, array $palette): string
    {
        $colors = implode(', ', $palette);

        $prompt = "ĐÂY LÀ MÃ SVG CHƯA ĐƯỢC TÔ MÀU VÀ ĐÁNH BÓNG KỸ:
`$rawSvg`

BẢNG MÀU YÊU CẦU LỘT XÁC (Màu chính, kết hợp làm Gradient lấp lánh): $colors.

HÃY ÚM BA LA RA LÒ KIỆT TÁC! TRẢ LẠI MÃ <svg>!!";

        $coloredSvg = $this->callLlm($prompt, 180);
        return $this->extractSvg($coloredSvg);
    }

    private function extractSvg(string $text): string
    {
        preg_match('/<svg.*?>.*?<\/svg>/is', $text, $matches);
        return $matches[0] ?? $text;
    }
}
