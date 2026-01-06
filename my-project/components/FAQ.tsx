"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/constants';

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {FAQ_ITEMS.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            className="w-full flex justify-between items-center p-5 text-right hover:bg-gray-50 transition-colors"
          >
            <span className="font-bold text-gray-800">{item.question}</span>
            <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} 
            />
          </button>
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};