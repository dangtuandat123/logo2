"use client"

import { useState, useEffect } from "react"
import { Check, Copy, CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface VietQRModalProps {
    isOpen: boolean
    onClose: () => void
    packageInfo: {
        name: string
        diamonds: number
        price: string
        numericPrice: number // e.g., 49000
    } | null
}

export function VietQRModal({ isOpen, onClose, packageInfo }: VietQRModalProps) {
    const [copied, setCopied] = useState(false)
    const [status, setStatus] = useState<"waiting" | "success" | "failed">("waiting")

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setStatus("waiting")
            setCopied(false)

            // Simulate webhook payment success after 10-15 seconds
            const timer = setTimeout(() => {
                setStatus("success")
            }, Math.floor(Math.random() * 5000) + 10000)

            return () => clearTimeout(timer)
        }
    }, [isOpen, packageInfo])

    if (!packageInfo) return null

    // Hardcoded banking info for demo (You would replace this with real VietQR API generation)
    const bankAccount = {
        bankName: "Techcombank",
        accountNumber: "1903658291001",
        accountName: "NGUYEN VAN A",
        content: `SLOX ${Math.floor(10000 + Math.random() * 90000)}`, // Random order ID
    }

    // Generate VietQR URL (Using VietQR.io Quick Link API)
    const qrUrl = `https://img.vietqr.io/image/${bankAccount.bankName}-${bankAccount.accountNumber}-compact2.png?amount=${packageInfo.numericPrice}&addInfo=${encodeURIComponent(bankAccount.content)}&accountName=${encodeURIComponent(bankAccount.accountName)}`

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md bg-card/60 backdrop-blur-3xl border-border/50 shadow-2xl max-h-[90dvh] overflow-y-auto overflow-x-hidden p-4 sm:p-6">

                {status === "success" ? (
                    // Success State
                    <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-500/5">
                            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                        </div>
                        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2">Thanh toán thành công!</h2>
                        <p className="text-muted-foreground mb-8">
                            Bạn đã nạp thành công <strong>{packageInfo.diamonds} kim cương</strong> (Gói {packageInfo.name}).
                        </p>
                        <Button onClick={onClose} className="w-full sm:w-auto min-w-[200px] font-bold">
                            Quay lại hệ thống
                        </Button>
                    </div>
                ) : (
                    // Payment State
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-center">Thanh toán VietQR</DialogTitle>
                            <DialogDescription className="text-center">
                                Quét mã QR qua ứng dụng ngân hàng hoặc Momo để thanh toán tự động.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col items-center mt-4">
                            {/* QR Code Container */}
                            <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-lg border border-border/50 mb-4 sm:mb-6 relative group inline-block">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={qrUrl}
                                    alt="VietQR Code"
                                    className="w-48 sm:w-56 h-auto rounded-xl"
                                />
                            </div>

                            {/* Order Amount */}
                            <div className="text-center mb-4 sm:mb-6 w-full">
                                <p className="text-sm text-muted-foreground mb-0.5">Số tiền thanh toán</p>
                                <p className="text-3xl sm:text-4xl font-extrabold text-primary font-[family-name:var(--font-heading)]">
                                    {packageInfo.price}
                                </p>
                            </div>

                            {/* Bank Details Table */}
                            <div className="w-full bg-background/50 rounded-xl border border-border/50 overflow-hidden divide-y divide-border/50 mb-4 sm:mb-6 text-xs sm:text-sm">
                                <div className="flex items-center justify-between p-3.5">
                                    <span className="text-muted-foreground">Ngân hàng</span>
                                    <span className="font-semibold">{bankAccount.bankName}</span>
                                </div>
                                <div className="flex items-center justify-between p-3.5">
                                    <span className="text-muted-foreground">Chủ tài khoản</span>
                                    <span className="font-semibold">{bankAccount.accountName}</span>
                                </div>
                                <div className="flex items-center justify-between p-3.5">
                                    <span className="text-muted-foreground">Số tài khoản</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold">{bankAccount.accountNumber}</span>
                                        <button
                                            onClick={() => handleCopy(bankAccount.accountNumber)}
                                            className="text-muted-foreground hover:text-primary transition-colors p-1"
                                        >
                                            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-3.5 bg-primary/5">
                                    <span className="text-primary font-medium">Nội dung chuyển khoản (Bắt buộc)</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-primary">{bankAccount.content}</span>
                                        <button
                                            onClick={() => handleCopy(bankAccount.content)}
                                            className="text-primary hover:text-primary/70 transition-colors p-1"
                                        >
                                            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Status Indicator */}
                            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground bg-accent/50 px-4 py-3 rounded-full w-full">
                                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                Đang chờ thanh toán...
                            </div>

                            <div className="flex items-start gap-2 mt-4 text-xs text-muted-foreground bg-orange-500/10 text-orange-600 dark:text-orange-400 p-3 rounded-lg">
                                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                                <p>Hệ thống tự động duyệt trong 1-3 phút. Vui lòng giữ nguyên trang này và nhập chính xác số tiền cùng nội dung chuyển khoản.</p>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
