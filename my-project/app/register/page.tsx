"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, User, 
  Check, Rocket, Loader2, Phone, Calendar, AtSign, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // مدیریت استیت فرم
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    birthDate: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // محاسبه قدرت رمز عبور
  const calculateStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const strength = calculateStrength(formData.password);
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // شبیه‌سازی ارسال به سرور
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gray-50">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-soft-light"></div>
      </div>

      <Link href="/" className="absolute top-8 right-8 z-20 flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition font-bold text-sm">
        <ArrowRight className="w-4 h-4" /> صفحه اصلی
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-[2.5rem] w-full max-w-6xl overflow-hidden grid lg:grid-cols-2 relative z-10"
      >
        
        {/* Right Side: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1">
            <div className="mb-8 text-center lg:text-right">
                <h1 className="text-2xl font-black text-gray-900 mb-2">ثبت نام در یوتوپیا اکسچنج</h1>
                <p className="text-gray-500 text-sm">اطلاعات خود را جهت ساخت حساب کاربری وارد کنید.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
                
                {/* Row 1: Full Name & Username */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 mr-1">نام و نام خانوادگی</label>
                        <div className="relative">
                            <input 
                                name="fullName"
                                type="text" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-gray-400"
                                placeholder="علی رضایی"
                                onChange={handleChange}
                            />
                            <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 mr-1">نام کاربری</label>
                        <div className="relative">
                            <input 
                                name="username"
                                type="text" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono dir-ltr text-right placeholder:text-right"
                                placeholder="ali_rezaei"
                                onChange={handleChange}
                            />
                            <AtSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 mr-1">ایمیل</label>
                        <div className="relative">
                            <input 
                                name="email"
                                type="email" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono dir-ltr text-right placeholder:text-right"
                                placeholder="name@example.com"
                                onChange={handleChange}
                            />
                            <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 mr-1">شماره موبایل</label>
                        <div className="relative">
                            <input 
                                name="phone"
                                type="tel" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono dir-ltr text-right placeholder:text-right"
                                placeholder="0912..."
                                onChange={handleChange}
                            />
                            <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>
                </div>

                {/* Row 3: Date of Birth */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 mr-1">تاریخ تولد</label>
                    <div className="relative">
                        <input 
                            name="birthDate"
                            type="date" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono text-gray-600 appearance-none"
                            onChange={handleChange}
                        />
                        <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>

                {/* Row 4: Passwords */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 mr-1">رمز عبور</label>
                        <div className="relative">
                            <input 
                                name="password"
                                type={showPass ? "text" : "password"}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono dir-ltr text-right placeholder:text-right"
                                placeholder="••••••••"
                                onChange={handleChange}
                            />
                            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 mr-1">تکرار رمز عبور</label>
                        <div className="relative">
                            <input 
                                name="confirmPassword"
                                type={showConfirmPass ? "text" : "password"}
                                className={cn(
                                    "w-full bg-gray-50 border rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 transition-all font-mono dir-ltr text-right placeholder:text-right",
                                    formData.confirmPassword && !passwordsMatch 
                                        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
                                        : "border-gray-200 focus:ring-indigo-500/50 focus:border-indigo-500"
                                )}
                                placeholder="••••••••"
                                onChange={handleChange}
                            />
                            <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Password Strength Meter */}
                {formData.password && (
                    <div className="flex items-center gap-1 mt-1">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className={cn("h-1 flex-1 rounded-full transition-all duration-300", i < strength ? (strength <= 2 ? "bg-rose-500" : strength === 3 ? "bg-yellow-500" : "bg-emerald-500") : "bg-gray-200")} />
                        ))}
                        <span className="text-[10px] text-gray-400 mr-2 min-w-[50px]">{strength <= 2 ? "ضعیف" : strength === 3 ? "متوسط" : "قوی"}</span>
                    </div>
                )}

                {/* Terms Checkbox */}
                <div className="flex items-start gap-2 mt-4">
                    <div className="relative flex items-center mt-0.5">
                        <input type="checkbox" id="terms" className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:border-indigo-500 checked:bg-indigo-500 hover:border-indigo-500" />
                        <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 w-3 h-3" />
                    </div>
                    <label htmlFor="terms" className="text-xs text-gray-500 cursor-pointer select-none leading-relaxed">
                        با <a href="#" className="text-indigo-600 hover:underline">قوانین و مقررات</a> یوتوپیا اکسچنج موافقم.
                    </label>
                </div>

                <Button className="w-full py-4 text-base shadow-lg shadow-indigo-500/20 mt-4" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "ثبت نام رایگان"}
                </Button>
            </form>

            <p className="mt-6 text-center text-xs text-gray-500">
                قبلاً ثبت نام کرده‌اید؟ <Link href="/login" className="font-bold text-indigo-600 hover:underline">وارد شوید</Link>
            </p>
        </div>

        {/* Left Side: Visuals (Desktop Only) */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-bl from-slate-900 to-indigo-900 text-white p-12 relative overflow-hidden order-1 lg:order-2">
            
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]"></div>

            <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                    <Rocket className="w-7 h-7 text-emerald-400" />
                </div>
                <h2 className="text-4xl font-black mb-6 leading-tight">
                    شروع مسیر <br/>
                    <span className="text-emerald-400">میلیاردی شدن</span>
                </h2>
                <ul className="space-y-4 text-indigo-100 text-sm">
                    <li className="flex items-center gap-3">
                        <div className="bg-emerald-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-emerald-400" /></div>
                        کیف پول اختصاصی رایگان
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="bg-emerald-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-emerald-400" /></div>
                        احراز هویت آنی و هوشمند
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="bg-emerald-500/20 p-1 rounded-full"><Check className="w-3 h-3 text-emerald-400" /></div>
                        بدون محدودیت برداشت
                    </li>
                </ul>
            </div>

            <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 mt-auto flex items-center gap-4">
                <div className="bg-emerald-500 p-2 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div className="text-xs">
                    <p className="font-bold text-white">امنیت تضمینی</p>
                    <p className="text-indigo-300">اطلاعات شما با رمزنگاری ۲۵۶ بیتی محافظت می‌شود.</p>
                </div>
            </div>
        </div>

      </motion.div>
    </div>
  );
}