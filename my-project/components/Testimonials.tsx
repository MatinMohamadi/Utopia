import { Star } from "lucide-react";

const REVIEWS = [
  { name: "علی محمدی", role: "فریلنسر", text: "سرعت عملتون فوق‌العاده بود. کمتر از ۲ دقیقه ووچر رو تحویل گرفتم.", stars: 5 },
  { name: "سارا کریمی", role: "تریدر", text: "نرخ خریدتون نسبت به بقیه صرافی‌ها خیلی منصفانه‌تره. ممنون از پشتیبانی خوبتون.", stars: 5 },
  { name: "رضا احمدی", role: "کاربر", text: "اولش شک داشتم ولی وقتی با پشتیبانی صحبت کردم خیالم راحت شد. خرید امن و سریعی بود.", stars: 4 },
];

export const Testimonials = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {REVIEWS.map((review, i) => (
        <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-md transition-all">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, j) => (
              <Star key={j} className={`w-4 h-4 ${j < review.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
            ))}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">"{review.text}"</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">
                {review.name.charAt(0)}
            </div>
            <div>
                <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                <span className="text-xs text-gray-500">{review.role}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};