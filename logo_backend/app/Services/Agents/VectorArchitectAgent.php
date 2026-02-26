<?php
declare(strict_types=1);

namespace App\Services\Agents;

class VectorArchitectAgent extends AbstractAgent
{
    protected function getSystemPrompt(): string
    {
        return "BẠN LÀ KỸ SƯ VẼ VECTOR BẬC THẦY. SỞ TRƯỜNG CỦA BẠN LÀ NHỮNG ĐƯỜNG CONG NGHỆ THUẬT VÀ TOÁN HỌC KHÔNG GIAN.
BẠN NHẬN CHỈ ĐẠO Ý TƯỞNG TỪ GIÁM ĐỐC (JSON) VÀ PHẢI CHUYỂN HÓA THÀNH THẺ <svg>.

NGUYÊN TẮC THIẾT KẾ VECTOR TỐI THƯỢNG ĐỂ LOGO TRỞ NÊN XA XỈ:
1. TRẢ VỀ TRỰC TIẾP MÃ SVG (Bắt đầu bằng <svg>). KHÔNG CHỨA BẤT KỲ ĐOẠN TEXT HAY MARKDOWN NÀO KHÁC.
2. Ép buộc ViewBox là '0 0 500 500'. Mọi tọa độ phải tính toán chuẩn xác trong không gian này.
3. NGHIÊM CẤM VIỆC DÙNG CÁC ĐƯỜNG NÉT THÔ NHƯ: Hình tam giác thẳng đuột, mũi tên trẻ con, hay nét thẳng cứng nhắc vô hồn.
4. BẮT BUỘC PHẢI DÙNG CÁC TỌA ĐỘ BÉZIER: Vẽ các <path> phức tạp, uyển chuyển (M, C, S) bẻ cong mềm mại. Vận dụng <textPath> thay vì gõ text thẳng. Dùng <mask/> và <clipPath> để đục khoét khoảng âm (Negative Space).
5. Để mã sạch, không cần nhúng Gradient, ColorAgent sẽ lo. Ở đây tạm đổ màu RGB cơ bản hoặc màu bạn được giao. Tập trung 100% sinh lực vào TẠO HÌNH KHỐI (SHAPES).";
    }

    public function drawSvgGeometry(string $brandName, array $conceptJson): string
    {
        $prompt = "THIẾT KẾ LOGO CHO THƯƠNG HIỆU: $brandName

ĐÂY LÀ CHỈ ĐẠO TỪ ART DIRECTOR (JSON):
" . json_encode($conceptJson, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "

YÊU CẦU TRIỂN KHAI CODE SVG THEO CHUẨN MỰC BEHANCE:
- Tạo mảng <defs> (nếu bạn muốn dùng mask, clipPath).
- Viết <g id=\"logo-mark\"> để chứa Symbol, phải đảm bảo nó CÂN BẰNG TÂM (X=250).
- Viết <g id=\"logo-text\"> để chứa phần Text Typography. Áp dụng chuẩn xác phông chữ, độ dày, letter-spacing mà Giám đốc đã truyền vào.
- TỰ ĐỘNG CĂN CHỈNH KHOẢNG CÁCH Y: Đảm bảo khoảng cách từ điểm thấp nhất của phần Symbol đến chữ là 1 khoảng lề đẹp (thường là padding 40px - 60px). Tuyệt đối không để Text đâm vào Biểu tượng.
- BẮT TAY VÀO CODE VÀ CHỈ TRẢ VỀ <svg>!";

        $svgMarkup = $this->callLlm($prompt, 180);
        return $this->extractSvg($svgMarkup);
    }

    private function extractSvg(string $text): string
    {
        preg_match('/<svg.*?>.*?<\/svg>/is', $text, $matches);
        return $matches[0] ?? $text;
    }
}
