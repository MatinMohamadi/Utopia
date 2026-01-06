"use client";
import { Wifi, CheckCircle } from "lucide-react";

export const NetworkStatus = () => {
  return (
    <div className="flex items-center gap-6 text-xs text-gray-500 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
        <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span>شبکه یوتوپیا: <span className="font-bold text-emerald-600">پایدار</span></span>
        </div>
        <div className="w-px h-3 bg-gray-300"></div>
        <div className="flex items-center gap-1">
            <Wifi className="w-3 h-3" />
            <span>پینگ: <span className="font-mono font-bold text-gray-800">45ms</span></span>
        </div>
    </div>
  );
};