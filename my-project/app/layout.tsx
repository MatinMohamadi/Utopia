import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google"; // 👈 ایمپورت فونت
import "./globals.css";

// تنظیمات فونت (زیرمجموعه عربی برای پشتیبانی فارسی)
const vazirmatn = Vazirmatn({ 
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "یوتوپیا اکسچنج | خرید و فروش آنی",
  description: "مرجع تخصصی خرید UUSD و ووچر یوتوپیا",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      {/* 
         اعمال کلاس فونت به بادی 
         bg-gray-50 برای رنگ پس‌زمینه کل سایت
      */}
      <body className={`${vazirmatn.className} bg-gray-50 text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}