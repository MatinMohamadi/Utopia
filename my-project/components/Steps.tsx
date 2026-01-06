import { UserPlus, Wallet, BadgeCheck, ArrowLeft } from "lucide-react";

export const Steps = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "۱. ارتباط با پشتیبانی",
      desc: "از طریق دکمه‌های تلگرام یا واتساپ به کارشناسان ما پیام دهید.",
      color: "text-blue-500 bg-blue-50",
    },
    {
      icon: Wallet,
      title: "۲. استعلام و واریز",
      desc: "مبلغ مورد نظر را ریالی واریز کرده و فیش را ارسال کنید.",
      color: "text-purple-500 bg-purple-50",
    },
    {
      icon: BadgeCheck,
      title: "۳. دریافت آنی",
      desc: "کد ووچر یا دلار یوتوپیا در کمتر از ۵ دقیقه به شما تحویل داده می‌شود.",
      color: "text-emerald-500 bg-emerald-50",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 relative">
      {/* Connecting Line (Desktop) */}
      <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-gray-100 -z-10" />

      {steps.map((step, i) => (
        <div key={i} className="relative bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-xl shadow-inner ${step.color}`}>
            <step.icon className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
          
          {/* Arrow for mobile */}
          {i !== steps.length - 1 && (
             <div className="md:hidden flex justify-center mt-6">
                 <ArrowLeft className="w-5 h-5 text-gray-300 -rotate-90" />
             </div>
          )}
        </div>
      ))}
    </div>
  );
};