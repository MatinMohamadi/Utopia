"use client";
import { useState } from "react";
import { BellRing, Check } from "lucide-react";
import { Button } from "./ui/Button";

export const PriceAlert = () => {
  const [targetPrice, setTargetPrice] = useState("");
  const [isSet, setIsSet] = useState(false);

  const handleSetAlert = () => {
    if (!targetPrice) return;
    setIsSet(true);
    setTimeout(() => {
        setIsSet(false);
        setTargetPrice("");
    }, 3000);
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-xl h-full flex flex-col justify-between">
      <div>
        <h3 className="text-gray-900 font-bold mb-1 flex items-center gap-2 text-sm">
          <BellRing className="w-4 h-4 text-orange-500" />
          هشدار قیمت (Price Alert)
        </h3>
        <p className="text-xs text-gray-500 mb-4">
            وقتی قیمت به عدد دلخواه شما رسید، خبرتان می‌کنیم.
        </p>

        <div className="relative mb-4">
            <input 
                type="number" 
                placeholder="مثلاً 65000"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                disabled={isSet}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors font-mono disabled:opacity-50"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-bold">تومان</span>
        </div>
      </div>

      <Button 
        onClick={handleSetAlert}
        disabled={isSet || !targetPrice}
        className={`w-full py-3 text-sm ${isSet ? "bg-green-500 hover:bg-green-600" : "bg-gray-900 hover:bg-gray-800"} shadow-none`}
      >
        {isSet ? (
            <>
                <Check className="w-4 h-4 ml-2" />
                ثبت شد
            </>
        ) : "تنظیم هشدار"}
      </Button>
    </div>
  );
};