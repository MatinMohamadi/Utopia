"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  LayoutGrid, Wallet, History, Settings, LogOut, 
  Bell, Eye, EyeOff, Copy, ArrowUpRight, ArrowDownLeft, 
  CheckCircle2, AlertCircle, Shield, User, ChevronLeft 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency, cn } from "@/lib/utils";

// موک دیتا (دیتای فرضی کاربر)
const USER = {
  name: "علی رضایی",
  email: "ali.rezaei@example.com",
  level: 1,
  verified: false,
  u_wallet: "F56A...90B2",
};

const ASSETS = [
  { symbol: "UUSD", name: "دلار یوتوپیا", balance: 1250.5, price: 64200, color: "bg-indigo-100 text-indigo-600" },
  { symbol: "U-Voucher", name: "ووچر", balance: 450, price: 64500, color: "bg-purple-100 text-purple-600" },
  { symbol: "IRT", name: "تومان", balance: 15000000, price: 1, color: "bg-green-100 text-green-600" },
];

const TRANSACTIONS = [
  { id: "TX-9081", type: "deposit", asset: "UUSD", amount: 500, status: "completed", date: "۱۴۰۳/۰۲/۱۰" },
  { id: "TX-9082", type: "withdraw", asset: "IRT", amount: 25000000, status: "pending", date: "۱۴۰۳/۰۲/۰۹" },
  { id: "TX-9083", type: "buy", asset: "U-Voucher", amount: 100, status: "completed", date: "۱۴۰۳/۰۲/۰۸" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showBalance, setShowBalance] = useState(true);

  // محاسبه مجموع دارایی به تومان
  const totalBalanceIRT = ASSETS.reduce((acc, curr) => acc + (curr.balance * curr.price), 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Background (Shared) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-soft-light"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 grid lg:grid-cols-12 gap-8">
        
        {/* --- SIDEBAR --- */}
        <aside className="lg:col-span-3 space-y-6">
            {/* User Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-[2rem] shadow-lg flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full p-1 mb-4">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                        <User className="w-10 h-10 text-gray-400" />
                    </div>
                </div>
                <h2 className="font-bold text-gray-900 text-lg">{USER.name}</h2>
                <p className="text-gray-500 text-xs font-mono mb-4">{USER.email}</p>
                
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[40%] rounded-full"></div>
                </div>
                <div className="flex justify-between w-full text-[10px] text-gray-500">
                    <span>سطح ۱</span>
                    <span>احراز هویت: ۴۰٪</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-xl border border-white/60 p-4 rounded-[2rem] shadow-lg space-y-2">
                {[
                    { id: "dashboard", label: "داشبورد", icon: LayoutGrid },
                    { id: "wallet", label: "کیف پول‌ها", icon: Wallet },
                    { id: "history", label: "تاریخچه", icon: History },
                    { id: "settings", label: "تنظیمات امنیتی", icon: Shield },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                            activeTab === item.id 
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" 
                                : "text-gray-600 hover:bg-gray-100"
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                        {activeTab === item.id && <ChevronLeft className="w-4 h-4 mr-auto" />}
                    </button>
                ))}
                
                <div className="h-px bg-gray-100 my-2"></div>
                
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-all">
                    <LogOut className="w-5 h-5" />
                    خروج از حساب
                </button>
            </nav>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="lg:col-span-9 space-y-6">
            
            {/* Header Area */}
            <header className="flex justify-between items-center bg-white/60 backdrop-blur-md p-4 rounded-[2rem] border border-white/50">
                <div>
                    <h1 className="text-xl font-black text-gray-900">نمای کلی دارایی‌ها</h1>
                    <p className="text-xs text-gray-500 mt-1">به پنل کاربری خوش آمدید 👋</p>
                </div>
                <div className="flex gap-3">
                    <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-indigo-600 transition relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
                    </button>
                    <Link href="/" className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                        صفحه اصلی <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </header>

            {/* Total Balance Card */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-200 text-sm mb-2">
                            موجودی تخمینی کل
                            <button onClick={() => setShowBalance(!showBalance)} className="hover:text-white transition">
                                {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                        </div>
                        <div className="text-4xl md:text-5xl font-black font-mono tracking-tight flex items-baseline gap-2">
                            {showBalance ? formatCurrency(totalBalanceIRT) : "•••••••••••"}
                            <span className="text-base font-bold text-indigo-300">تومان</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 px-6">
                            <ArrowDownLeft className="w-4 h-4 ml-2" /> واریز
                        </Button>
                        <Button className="bg-white/10 hover:bg-white/20 text-white border-0 px-6">
                            <ArrowUpRight className="w-4 h-4 ml-2" /> برداشت
                        </Button>
                    </div>
                </div>
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/30 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/30 rounded-full blur-[60px]"></div>
            </div>

            {/* Quick Stats & Verification */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Verification Alert */}
                <div className="md:col-span-2 bg-amber-50 border border-amber-100 rounded-[2rem] p-6 flex items-start gap-4 relative overflow-hidden">
                    <div className="bg-amber-100 p-3 rounded-xl text-amber-600 z-10">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <div className="z-10">
                        <h3 className="font-bold text-amber-900 mb-1">احراز هویت تکمیل نشده</h3>
                        <p className="text-xs text-amber-700 leading-relaxed mb-3">
                            برای افزایش سقف برداشت روزانه تا ۵۰۰ میلیون تومان، لطفاً مدارک خود را تکمیل کنید.
                        </p>
                        <Link href="#" className="text-xs font-bold text-amber-800 underline hover:text-amber-950">تکمیل پروفایل &larr;</Link>
                    </div>
                    <div className="absolute -right-5 -bottom-5 w-24 h-24 bg-amber-200/50 rounded-full blur-2xl"></div>
                </div>

                {/* Utopia Wallet Address */}
                <div className="bg-white border border-gray-100 rounded-[2rem] p-6 flex flex-col justify-center">
                    <span className="text-xs text-gray-400 mb-2">آدرس کیف پول یوتوپیا</span>
                    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-xl">
                        <span className="font-mono text-sm font-bold text-gray-700">{USER.u_wallet}</span>
                        <button className="text-indigo-600 hover:text-indigo-800 transition">
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Assets List */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-indigo-500" /> کیف پول‌های من
                </h3>
                <div className="space-y-4">
                    {ASSETS.map((asset, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-indigo-50 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${asset.color}`}>
                                    {asset.symbol.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">{asset.name}</div>
                                    <div className="text-xs text-gray-500 font-mono">{asset.symbol}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-gray-900 font-mono">
                                    {showBalance ? formatCurrency(asset.balance) : "****"}
                                </div>
                                <div className="text-xs text-gray-400 font-mono">
                                    ≈ {showBalance ? formatCurrency(asset.balance * asset.price) : "****"} IRT
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <History className="w-5 h-5 text-indigo-500" /> تراکنش‌های اخیر
                    </h3>
                    <Link href="#" className="text-xs font-bold text-indigo-600 hover:underline">مشاهده همه</Link>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="text-xs text-gray-400 border-b border-gray-100">
                            <tr>
                                <th className="pb-3 pr-2">نوع</th>
                                <th className="pb-3">ارز</th>
                                <th className="pb-3">مقدر</th>
                                <th className="pb-3">تاریخ</th>
                                <th className="pb-3 pl-2 text-left">وضعیت</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {TRANSACTIONS.map((tx, i) => (
                                <tr key={i} className="group">
                                    <td className="py-4 pr-2">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("p-1.5 rounded-lg", 
                                                tx.type === 'deposit' ? "bg-green-100 text-green-600" : 
                                                tx.type === 'withdraw' ? "bg-rose-100 text-rose-600" : "bg-blue-100 text-blue-600"
                                            )}>
                                                {tx.type === 'deposit' ? <ArrowDownLeft className="w-3 h-3" /> : 
                                                 tx.type === 'withdraw' ? <ArrowUpRight className="w-3 h-3" /> : <Settings className="w-3 h-3" />}
                                            </div>
                                            <span className="font-medium text-gray-700">
                                                {tx.type === 'deposit' ? "واریز" : tx.type === 'withdraw' ? "برداشت" : "خرید"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 font-mono text-gray-500">{tx.asset}</td>
                                    <td className="py-4 font-bold text-gray-900 font-mono">{formatCurrency(tx.amount)}</td>
                                    <td className="py-4 text-gray-400 text-xs">{tx.date}</td>
                                    <td className="py-4 pl-2 text-left">
                                        <span className={cn("px-2 py-1 rounded-md text-[10px] font-bold", 
                                            tx.status === 'completed' ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                                        )}>
                                            {tx.status === 'completed' ? "موفق" : "در حال پردازش"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </main>
      </div>
    </div>
  );
}