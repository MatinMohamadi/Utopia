"use client";
import React, { useEffect, useRef, memo } from "react";

const MarketSentimentComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // پاکسازی برای جلوگیری از تکرار در رندرهای مجدد
    containerRef.current.innerHTML = "";

    // 1. ساخت Div نگهدارنده ویجت
    const widgetDiv = document.createElement("div");
    widgetDiv.id = "bitycle-fg-widget"; // شناسه مخصوص ویجت ترس و طمع
    
    // تنظیم استایل‌ها به صورت داینامیک برای پر کردن کانتینر والد
    widgetDiv.style.width = "100%";
    widgetDiv.style.height = "100%";
    
    // 2. ساخت اسکریپت
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://widget.bitycle.com/static/script/v1/script.js";
    script.async = true;
    
    // 3. تزریق تنظیمات JSON
    script.innerHTML = JSON.stringify({
      id: "bitycle-fg-widget",
      type: "fg", // نوع ویجت: Fear & Greed
      theme: "light",
      locale: "fa" // زبان فارسی
    });

    // 4. اضافه کردن به DOM
    containerRef.current.appendChild(widgetDiv);
    containerRef.current.appendChild(script);

  }, []);

  return (
    // کانتینر اصلی با استایل‌های Tailwind برای هماهنگی با سایت
    <div 
      className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden h-full w-full relative z-0 flex flex-col items-center justify-center p-4"
    >
      <div ref={containerRef} className="w-full h-full min-h-[200px]"></div>
      
      {/* لینک کپی‌رایت کوچک و محو */}
      <div className="text-[9px] text-gray-400 mt-2 opacity-60">
        قدرت گرفته از <a href="https://bitycle.com/" target="_blank" className="hover:text-indigo-500 transition">Bitycle</a>
      </div>
    </div>
  );
};

export const MarketSentiment = memo(MarketSentimentComponent);