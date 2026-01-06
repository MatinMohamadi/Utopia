"use client";
import React, { useEffect, useRef, memo } from "react";

const OverviewChartComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const widgetDiv = document.createElement("div");
    widgetDiv.id = "bitycle-overview-widget";
    widgetDiv.style.width = "100%";
    widgetDiv.style.height = "100%";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://widget.bitycle.com/static/script/v1/script.js";
    script.async = true;
    script.id = "bitycle-script";

    script.innerHTML = JSON.stringify({
      id: "bitycle-overview-widget",
      type: "overview",
      symbol: "USDTIRT",
      theme: "light",
      locale: "fa"
    });

    containerRef.current.appendChild(widgetDiv);
    containerRef.current.appendChild(script);
  }, []);

  return (
    // ارتفاع 100% یعنی هرچقدر پدرش جا داشت پر کند
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden w-full h-full relative z-0">
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
};

export const OverviewChart = memo(OverviewChartComponent);