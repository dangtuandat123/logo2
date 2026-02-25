"use client"
import Link from "next/link"

import { Gem, Zap, Download, FileType, Wand2, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const diamondPackages = [
    {
        name: "Starter",
        diamonds: 50,
        price: "49.000₫",
        bonus: null,
        desc: "Dùng thử, trải nghiệm",
        popular: false,
        cta: "Mua Ngay",
    },
    {
        name: "Popular",
        diamonds: 120,
        price: "99.000₫",
        bonus: "+20%",
        desc: "Phổ biến nhất, tiết kiệm hơn",
        popular: true,
        cta: "Mua Ngay",
    },
    {
        name: "Best Value",
        diamonds: 280,
        price: "199.000₫",
        bonus: "+40%",
        desc: "Giá trị tốt nhất, dùng lâu dài",
        popular: false,
        cta: "Mua Ngay",
    },
]

const diamondUsage = [
    { icon: Wand2, action: "Tạo 1 logo mới", cost: 10 },
    { icon: Download, action: "Xuất file PNG", cost: 0, free: true },
    { icon: FileType, action: "Xuất file SVG vector", cost: 5 },
    { icon: Zap, action: "Chỉnh sửa AI (mỗi lệnh)", cost: 2 },
]

const faqs = [
    {
        question: "Kim cương là gì?",
        answer: "Kim cương (💎) là đơn vị tiền tệ trong Slox. Bạn nạp kim cương để sử dụng các tính năng như tạo logo, xuất file vector, và chỉnh sửa bằng AI. Kim cương không hết hạn — mua bao nhiêu, dùng bấy nhiêu."
    },
    {
        question: "Tài khoản mới được tặng bao nhiêu?",
        answer: "Mỗi tài khoản mới được tặng miễn phí 💎 20 kim cương — đủ để tạo 2 logo và trải nghiệm toàn bộ hệ thống trước khi quyết định nạp thêm."
    },
    {
        question: "Tôi có thể sử dụng logo cho mục đích thương mại không?",
        answer: "Có, mọi logo bạn tạo ra đều thuộc quyền sở hữu của bạn và có thể sử dụng cho bất kỳ mục đích thương mại nào: in ấn, mạng xã hội, website, sản phẩm, v.v."
    },
    {
        question: "Tôi sẽ nhận được những định dạng tệp nào?",
        answer: "Xuất file PNG miễn phí (không tốn kim cương). File SVG vector chất lượng cao tốn 💎 5 kim cương mỗi lần xuất — phù hợp cho in ấn và thiết kế chuyên nghiệp."
    },
    {
        question: "Tôi có thể chỉnh sửa logo sau khi tạo không?",
        answer: "Chắc chắn! Trình chỉnh sửa AI cho phép bạn thay đổi màu sắc, hình dạng, kích thước chữ chỉ bằng câu lệnh tự nhiên. Mỗi lệnh chỉnh sửa tốn 💎 2 kim cương."
    }
]

export function Pricing() {
    return (
        <section id="pricing" className="min-h-[100dvh] w-full shrink-0 flex flex-col justify-center py-16 sm:py-24 border-t border-border/50 relative overflow-hidden bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* Header */}
                <div className="text-center mb-10 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-balance">
                        Nạp Kim Cương, Sáng Tạo Không Giới Hạn
                    </h2>
                    <p className="text-muted-foreground mt-4 text-base sm:text-lg mb-4">
                        Không gói cước hàng tháng. Nạp bao nhiêu, dùng bấy nhiêu.
                    </p>
                    <Badge variant="outline" className="gap-1.5 px-3 py-1 text-sm font-medium bg-primary/5 border-primary/20 text-primary">
                        <Gift className="h-3.5 w-3.5" />
                        Đăng ký mới tặng 💎 20 kim cương miễn phí
                    </Badge>
                </div>

                {/* Diamond usage table */}
                <div className="max-w-xl mx-auto mb-10 sm:mb-14">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {diamondUsage.map((item) => (
                            <div
                                key={item.action}
                                className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-card/40 backdrop-blur-sm border border-border/50"
                            >
                                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
                                    <item.icon className="h-4 w-4 text-primary" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium truncate">{item.action}</p>
                                    <p className={cn("text-xs font-bold", item.free ? "text-emerald-500" : "text-primary")}>
                                        {item.free ? "Miễn phí" : `💎 ${item.cost}`}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Diamond packages */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-20 sm:mb-32">
                    {diamondPackages.map((pkg) => (
                        <Card
                            key={pkg.name}
                            className={cn(
                                "relative overflow-hidden transition-all duration-500 bg-card/40 backdrop-blur-xl border-border/50",
                                pkg.popular
                                    ? "border-primary/60 shadow-[0_0_30px_-10px_var(--color-primary)] scale-100 md:scale-105 z-10 ring-1 ring-primary/20"
                                    : "scale-100 mt-0 md:mt-4 hover:border-primary/50"
                            )}
                        >
                            {pkg.popular && (
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
                            )}
                            {pkg.popular && (
                                <div className="absolute top-5 right-5 z-20">
                                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0 shadow-sm backdrop-blur-md">
                                        Phổ Biến Nhất
                                    </Badge>
                                </div>
                            )}
                            <CardContent className="p-8 relative z-10 text-center">
                                <h3 className="font-bold text-xl mb-1">{pkg.name}</h3>
                                <p className="text-muted-foreground text-sm mb-6">{pkg.desc}</p>

                                {/* Diamond count */}
                                <div className="mb-2 flex items-center justify-center gap-2">
                                    <Gem className="h-7 w-7 text-primary drop-shadow-md" />
                                    <span className="text-5xl font-extrabold font-[family-name:var(--font-heading)] tracking-tight">
                                        {pkg.diamonds}
                                    </span>
                                </div>

                                {/* Bonus badge */}
                                <div className="h-6 mb-5">
                                    {pkg.bonus && (
                                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs font-bold">
                                            Bonus {pkg.bonus}
                                        </Badge>
                                    )}
                                </div>

                                {/* Price */}
                                <div className="mb-8">
                                    <span className="text-3xl font-bold">{pkg.price}</span>
                                </div>

                                <Button
                                    variant={pkg.popular ? "default" : "outline"}
                                    size="lg"
                                    className={cn(
                                        "w-full h-12 text-base font-semibold transition-all",
                                        pkg.popular
                                            ? "shadow-[0_0_15px_-3px_var(--color-primary)] hover:shadow-[0_0_25px_-3px_var(--color-primary)]"
                                            : "bg-background/50 backdrop-blur-sm"
                                    )}
                                    asChild
                                >
                                    <Link href="/register">{pkg.cta}</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)]">
                            Câu Hỏi Thường Gặp
                        </h3>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left font-medium text-base sm:text-lg">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
