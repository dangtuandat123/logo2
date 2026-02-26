<?php
declare(strict_types=1);

namespace App\Services\Agents;

class AestheticValidatorAgent extends AbstractAgent
{
    protected function getSystemPrompt(): string
    {
        return "BẠN LÀ MỘT DESIGN CRITIC (NGƯỜI PHÊ BÌNH THIẾT KẾ VÀ KIỂM TRA LOGIC THẨM MỸ). SỰ CÂN BẰNG LÀ ÁM ẢNH CỦA BẠN.
BẠN SẼ NHẬN MỘT ĐOẠN MÃ SVG HOÀN THIỆN TỪ CÁC KỸ SƯ TRƯỚC. NHIỆM VỤ CỦA BẠN LÀ BÀO CHỮA NHỮNG LỖI CÚ PHÁP VÀ LỖI BỐ CỤC (LAYOUT).

NHIỆM VỤ BẮT BUỘC KHIẾN LOGO CÂN BẰNG TỶ LỆ VÀNG:
1. TRẢ VỀ DUY NHẤT ĐOẠN MÃ <svg> SẠCH SẼ. KHÔNG KÈM ```xml HAY VĂN BẢN (Text) BÌNH LUẬN NÀO SAU ĐÓ.
2. NGUY CƠ: Nếu <g id='logo-mark'> (Biểu tượng) và <g id='logo-text'> (Chữ Typography) bị sinh ra đè lên nhau (Toạ độ Y gần nhau quá), hãy NHẪN TÂM dịch chuyển toàn bộ nhóm chữ xuống một tọa độ an toàn: Y = 400 đến 430.
3. KHOẢNG CÁCH CHỮ (LETTER SPACING): Phải kiểm tra lại thẻ <text>. NẾU chữ bị dính vào nhau (thiếu letter-spacing) -> Lập tức chèn `letter-spacing='12'`. NẾU font quá lỗi thời (Times New Roman, Arial), đổi ngay sang `font-family=\"'Montserrat', 'Playfair Display', 'Cinzel'\"`.
4. ÉP BUỘC CĂN GIỮA: Tất cả thẻ text phải có `x='250' text-anchor='middle'` để chữ luôn nằm chính giữa canvas viewBox='0 0 500 500'.
5. KHÔNG VẼ THÊM HAY SÁNG TẠO THÊM PATH NÀO HẾT. Nếu SVG gốc đã quá xịn, hãy giữ nguyên và chỉ sửa đổi/chuẩn hóa mã XML, xóa mọi rác rưởi bên ngoài thẻ <svg>.";
    }

    public function validateAndFixAesthetics(string $draftSvg): string
    {
        $prompt = "MÃ SVG (BẢN DRAFT GẦN CUỐI QUY TRÌNH) CẦN ĐƯỢC GIÁM KHẢO KIỂM DUYỆT:
`$draftSvg`

NẾU CÓ BẤT CỨ LỖI BỐ CỤC (Text đâm vào Icon, Font xấu, Mất Căn Giữa, Rác DOM), HÃY KIÊN QUYẾT FIX VÀ TRẢ LẠI CHUỖI <SVG> TUYỆT HẢO CUỐI CÙNG:";

        $perfectSvg = $this->callLlm($prompt, 180);
        return $this->extractSvg($perfectSvg);
    }

    private function extractSvg(string $text): string
    {
        preg_match('/<svg.*?>.*?<\/svg>/is', $text, $matches);
        return $matches[0] ?? $text;
    }
}
