"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, 
  Wallet, ChevronLeft, Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // شبیه‌سازی لاگین
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* --- Background Effects (Shared with Home) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gray-50">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-soft-light"></div>
      </div>

      {/* --- Back Button --- */}
      <Link href="/" className="absolute top-8 right-8 z-20 flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition font-bold text-sm">
        <ArrowRight className="w-4 h-4" /> بازگشت به خانه
      </Link>

      {/* --- Main Card --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-[2.5rem] w-full max-w-5xl overflow-hidden grid lg:grid-cols-2 relative z-10 min-h-[600px]"
      >
        
        {/* Left Side: Branding (Desktop Only) */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-12 relative overflow-hidden">
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">امنیت دارایی شما،<br/>اولویت ماست.</h2>
                <p className="text-indigo-100 leading-relaxed text-sm opacity-90">
                    با ورود به حساب کاربری، به بازار جهانی یوتوپیا متصل شوید و بدون محدودیت معامله کنید.
                </p>
            </div>

            {/* Stats Card */}
            <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 mt-12">
                <div className="flex items-center gap-3 mb-3">
                    <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    <div>
                        <p className="font-bold text-sm">محافظت ۲۴ ساعته</p>
                        <p className="text-[10px] text-indigo-200">سیستم ضد فیشینگ فعال است</p>
                    </div>
                </div>
                <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-emerald-400 animate-pulse"></div>
                </div>
            </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8 text-center lg:text-right">
                <h1 className="text-2xl font-black text-gray-900 mb-2">ورود به حساب</h1>
                <p className="text-gray-500 text-sm">برای ادامه ایمیل و رمز عبور خود را وارد کنید.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                {/* Email Input */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 mr-1">ایمیل یا شماره موبایل</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono dir-ltr text-right placeholder:text-right"
                            placeholder="name@example.com"
                        />
                        <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-gray-700 mr-1">رمز عبور</label>
                        <a href="#" className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700">رمز را فراموش کردید؟</a>
                    </div>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono dir-ltr text-right placeholder:text-right"
                            placeholder="••••••••"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <Button className="w-full py-4 text-base shadow-lg shadow-indigo-500/20" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "ورود به پنل کاربری"}
                </Button>
            </form>

            <div className="my-8 flex items-center gap-4">
                <div className="h-px bg-gray-100 flex-1"></div>
                <span className="text-xs text-gray-400 font-medium">یا ورود با</span>
                <div className="h-px bg-gray-100 flex-1"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 py-3 rounded-xl transition-all group">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
                    <span className="text-sm font-bold text-gray-600">گوگل</span>
                </button>
                <button className="flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 py-3 rounded-xl transition-all group">
                    <Wallet className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold text-gray-600">کیف پول</span>
                </button>
            </div>

            <p className="mt-8 text-center text-xs text-gray-500">
                حساب کاربری ندارید؟ <Link href="#" className="font-bold text-indigo-600 hover:underline">ثبت نام کنید</Link>
            </p>
        </div>

      </motion.div>
    </div>
  );
}