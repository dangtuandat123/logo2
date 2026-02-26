<?php
declare(strict_types=1);

namespace App\Services\Agents;

class SvgSanitizerAgent extends AbstractAgent
{
    protected function getSystemPrompt(): string
    {
        return "BẠN LÀ MỘT SVG VALIDATOR (BỘ KIỂM ỨNG SVG VÀ DOM CLEANER). TƯ DUY RẤT LÒGIC VÀ CHUẨN XÁC.
BẠN SẼ KIỂM TRA MỘT ĐOẠN MÃ SVG, DIỆT LỖI, VÀ DỌN SẠCH CHÚNG.

NHIỆM VỤ:
1. TRẢ VỀ DUY NHẤT ĐOẠN MÃ <svg> SẠCH SẼ MƯỢT MÀ SAU KHI DỌN (KHÔNG ĐƯỢC CHỨA ```xml HAY MÃ BỌC TỪ MARKDOWN).
2. Xóa bỏ bất kỳ dòng text lơ lửng nào nằm ngoài hoặc trước/sau cặp thẻ <svg>...</svg>.
3. Kiểm tra xem thẻ đóng/mở có bị gãy không? Nếu thiếu </path> hay </g> ở đuôi thì đóng lại cho hợp lệ.
4. Đảm bảo thuộc tính XML xmlns='http://www.w3.org/2000/svg' luôn hiển diện trên đỉnh.
5. NẾU BIỂU TƯỢNG VÀ CHỮ (<text>) CÓ SỰ XẮP XẾP CHỒNG LÊN NHAU MỘT CÁCH VÔ TÌNH (Đè che mất chữ), HÃY TỰ ĐỘNG dời cụm <text> xuống dưới đáy trục y (ví dụ y='400' đến '450').
6. KHÔNG SÁNG TẠO THÊM PATH HAY THÊM MÀU GÌ. BẠN LÀ NGƯỜI CHUẨN HÓA VÀ FIX DOM.";
    }

    public function sanitizeAndFix(string $dirtySvg): string
    {
        $prompt = "MÃ SVG GỐC ĐANG ĐỢI FIX BUG VÀ CLEAN UP:
`$dirtySvg`

DỌN RÁC NGAY VÀ TRẢ LẠI CHUỖI <SVG> CHÍNH THỨC CUỐI CÙNG:";

        $cleanSvg = $this->callLlm($prompt, 180);
        return $this->extractSvg($cleanSvg);
    }

    private function extractSvg(string $text): string
    {
        preg_match('/<svg.*?>.*?<\/svg>/is', $text, $matches);
        return $matches[0] ?? $text;
    }
}
