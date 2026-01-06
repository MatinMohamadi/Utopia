"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  Zap, Globe, Wallet, ExternalLink, Send, Instagram, Phone, 
  BarChart3, LayoutGrid, CheckCircle2 
} from "lucide-react";

// --- کامپوننت‌های UI ---
import { Button } from "@/components/ui/Button";

// --- ویجت‌های اصلی ---
import { TickerWidget } from "@/components/TickerWidget";
import { CryptoConverter } from "@/components/CryptoConverter";
import { RecentTransactions } from "@/components/RecentTransactions";
import { PurchaseModal } from "@/components/PurchaseModal";
import { OverviewChart } from "@/components/OverviewChart";
import { Steps } from "@/components/Steps";
import { Testimonials } from "@/components/Testimonials";

// --- ویجت‌های حرفه‌ای (جدید) ---
import { OrderBook } from "@/components/OrderBook";
import { MarketSentiment } from "@/components/MarketSentiment";
import { NetworkStatus } from "@/components/NetworkStatus";
import { NewsTicker } from "@/components/NewsTicker";
import { ArbitrageMonitor } from "@/components/ArbitrageMonitor";
import { PriceAlert } from "@/components/PriceAlert";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* 1. نوار اخبار فوری (بالاترین سطح - Fixed Top) */}
      <NewsTicker />

      {/* افکت‌های پس‌زمینه (Background Noise & Blobs) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-soft-light"></div>
      </div>

      {/* 2. نویگیشن بار */}
      {/* top-8 بخاطر ارتفاع news ticker */}
      <nav className="fixed w-full z-40 top-8 border-b border-white/50 bg-white/70 backdrop-blur-xl transition-all">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* لوگو */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">Utopia<span className="text-indigo-600">Ex</span></span>
          </div>

          {/* لینک‌ها */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <Link href="#dashboard" className="hover:text-indigo-600 transition">داشبورد بازار</Link>
            <Link href="#features" className="hover:text-indigo-600 transition">خدمات</Link>
            <Link href="#calculator" className="hover:text-indigo-600 transition">محاسبه‌گر</Link>
            <Link href="#how-it-works" className="hover:text-indigo-600 transition">راهنما</Link>
          </div>

          {/* دکمه اکشن */}
          <Button onClick={() => setIsModalOpen(true)} className="hidden sm:flex rounded-full">شروع معامله</Button>
        </div>
      </nav>

      <main className="relative z-10 pt-28">
        
        {/* 3. نوار تراکنش‌های زنده */}
        <RecentTransactions />

        {/* 4. Hero Section (بخش اصلی معرفی) */}
        <section className="pt-12 pb-20 lg:pt-24 lg:pb-32">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">
              
              {/* ستون راست (متن‌ها) */}
              <div className="text-center lg:text-right space-y-8 animate-fade-up sticky top-32">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-indigo-100 rounded-full shadow-sm text-indigo-700 text-xs font-bold uppercase mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  پرداخت آنی و ۲۴ ساعته
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] text-gray-900">
                  تبادل <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">امن و سریع</span> <br/>
                  بدون واسطه
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  خرید و فروش دلار یوتوپیا (UUSD) و ووچر با بهترین نرخ بازار. 
                  تجربه‌ای متفاوت از سرعت و امنیت در بستری کاملاً ناشناس و بدون نیاز به احراز هویت پیچیده.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button onClick={() => setIsModalOpen(true)} className="h-14 px-8 text-base shadow-xl shadow-indigo-500/20">
                      <Wallet className="w-5 h-5 ml-2" /> خرید آنی ووچر
                  </Button>
                  <Button variant="secondary" className="h-14 px-8 text-base">
                      پشتیبانی آنلاین
                  </Button>
                </div>
                
                {/* وضعیت شبکه */}
                <div className="flex justify-center lg:justify-start pt-4">
                    <NetworkStatus />
                </div>
              </div>

              {/* ستون چپ (ویجت‌ها) */}
              <div className="perspective-1000 space-y-6">
                  <TickerWidget />
                  <div id="calculator">
                      <CryptoConverter />
                  </div>
              </div>
          </div>
        </section>

        {/* 5. داشبورد معاملاتی حرفه‌ای (Pro Dashboard) */}
        {/* این بخش اصلاح شده است تا مشکل تداخل حل شود */}
        <section id="dashboard" className="py-16 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <LayoutGrid className="w-6 h-6 text-indigo-600" />
                        داشبورد معاملاتی حرفه‌ای
                    </h2>
                    <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        دیتای زنده
                    </span>
                </div>
                
                <div className="grid lg:grid-cols-4 gap-6">
                    
                    {/* ستون اول و دوم: چارت + ابزارها */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <div className="w-full h-[400px] md:h-[500px] relative z-0">
                           <OverviewChart />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                            <ArbitrageMonitor />
                            <PriceAlert />
                        </div>
                    </div>

                    {/* ستون سوم: اردر بوک */}
                    <div className="lg:col-span-1 h-full min-h-[500px] lg:min-h-auto">
                        <OrderBook />
                    </div>

                    {/* ستون چهارم: ویجت‌های جانبی (اصلاح شده) */}
                    <div className="lg:col-span-1 flex flex-col gap-6 h-full">
                        
                        {/* 1. شاخص ترس و طمع */}
                        <div className="h-[260px] w-full relative shrink-0">
                            <MarketSentiment />
                        </div>
                        
                        {/* 2. بنر تبلیغاتی داخلی */}
                        <div className="flex-1 min-h-[280px] w-full relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-[2rem] p-6 text-center overflow-hidden flex flex-col justify-center shadow-lg h-full">
                                 <div className="relative z-10">
                                     <h3 className="font-bold text-lg mb-2">نقد کردن درآمد ارزی</h3>
                                     <p className="text-indigo-200 text-xs mb-6 leading-relaxed">
                                         درآمدهای فریلنسری خود را بدون کارمزد و با نرخ لحظه‌ای به ریال تبدیل کنید. تسویه آنی به تمام بانک‌ها.
                                     </p>
                                     <Button onClick={() => setIsModalOpen(true)} className="w-full bg-white text-indigo-900 hover:bg-gray-100 py-3 text-sm font-bold shadow-lg border-0 transition-transform active:scale-95">
                                        فروش به ما
                                     </Button>
                                 </div>
                                 {/* دایره دکوراتیو */}
                                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-[60px] opacity-40 pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
        </section>

        {/* 6. مراحل انجام کار (How it works) */}
        <section id="how-it-works" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">شروع آسان در ۳ مرحله</h2>
                    <p className="text-gray-500">بدون پیچیدگی‌های صرافی‌های سنتی و احراز هویت‌های زمان‌بر، در سریع‌ترین زمان ممکن معامله کنید.</p>
                </div>
                <Steps />
            </div>
        </section>

        {/* 7. ویژگی‌ها (Features Grid) */}
        <section id="features" className="py-24 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">
              
              {/* کارت بزرگ ۱ */}
              <div className="md:col-span-2 bg-white rounded-[2rem] p-8 border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6"><Zap className="w-6 h-6" /></div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">تحویل آنی (Instant)</h3>
                    <p className="text-gray-500 max-w-sm">کد ووچر شما بلافاصله پس از تایید تراکنش به صورت خودکار برایتان ارسال می‌شود. بدون حتی یک دقیقه معطلی.</p>
                </div>
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-indigo-50 rounded-tl-[100px] opacity-50 group-hover:scale-110 transition-transform"></div>
              </div>

              {/* کارت تیره ۲ */}
              <div className="bg-gray-900 text-white rounded-[2rem] p-8 flex flex-col justify-between group overflow-hidden relative">
                <div>
                    <Globe className="w-10 h-10 text-indigo-400 mb-6" />
                    <h3 className="text-xl font-bold mb-2">بدون مرز</h3>
                    <p className="text-gray-400 text-sm">قابل استفاده در تمام پلتفرم‌های جهانی و سایت‌های پذیرنده ووچر.</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* کارت عریض ۳ */}
              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-8 rounded-[2rem] md:col-span-3 flex flex-col md:flex-row items-center justify-between gap-8">
                 <div>
                     <h3 className="text-2xl font-bold mb-2">تضمین بهترین نرخ</h3>
                     <p className="text-indigo-100">ما با حذف واسطه‌ها، کمترین کارمزد و پایین‌ترین اسپرد (اختلاف خرید و فروش) را در بازار ایران ارائه می‌دهیم.</p>
                 </div>
                 <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20 whitespace-nowrap">
                     مشاهده جدول کامل
                 </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 8. نظرات کاربران (Testimonials) */}
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">تجربه کاربران ما</h2>
                <Testimonials />
            </div>
        </section>

      </main>

      {/* 9. فوتر سایت */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8 relative z-10">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <span className="text-2xl font-black text-gray-900 mb-4 block">UtopiaEx</span>
                    <p className="text-gray-500 leading-relaxed max-w-sm text-sm">
                        ما با بهره‌گیری از تکنولوژی‌های نوین بلاکچین، بستری امن، سریع و خصوصی را برای تبادل دارایی‌های دیجیتال در اکوسیستم یوتوپیا فراهم کرده‌ایم.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">لینک‌های مفید</h4>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><Link href="#" className="hover:text-indigo-600 transition">خانه</Link></li>
                        <li><Link href="#" className="hover:text-indigo-600 transition">خرید ووچر</Link></li>
                        <li><Link href="#" className="hover:text-indigo-600 transition">فروش دلار</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">شبکه‌های اجتماعی</h4>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition">
                            <Send className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-600 transition">
                            <Phone className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                <p>&copy; {new Date().getFullYear()} Utopia Exchange. All rights reserved.</p>
                <div className="flex items-center gap-2">
                    <span>Secure Payment by</span>
                    <span className="font-bold text-gray-600">Shaparak</span>
                </div>
            </div>
        </div>
      </footer>

      {/* مودال پاپ‌آپ خرید */}
      <PurchaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}