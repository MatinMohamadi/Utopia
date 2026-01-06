"use client";
import { Bell, ArrowLeft } from "lucide-react";

const NEWS = [
  "🔥 کارمزد انتقال در شبکه یوتوپیا به صفر رسید.",
  "🚀 افزایش حجم معاملات UUSD در ۲۴ ساعت گذشته.",
  "💡 آموزش نحوه نقد کردن درآمد دلاری اضافه شد.",
  "⚠️ هشدار: مراقب سایت‌های فیشینگ باشید، آدرس ما UtopiaEx است.",
];

export const NewsTicker = () => {
  return (
    <div className="bg-indigo-900 text-white text-xs py-2 overflow-hidden relative z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-indigo-800 px-3 py-0.5 rounded-full z-10 shrink-0">
          <Bell className="w-3 h-3 animate-swing" />
          <span className="font-bold">اخبار فوری</span>
        </div>
        
        <div className="flex-1 overflow-hidden relative mx-4">
          <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
            {[...NEWS, ...NEWS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 text-indigo-100">
                {item}
                <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
              </span>
            ))}
          </div>
        </div>

        <a href="#" className="hidden sm:flex items-center gap-1 hover:text-indigo-200 transition shrink-0 z-10">
          آرشیو اخبار <ArrowLeft className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};