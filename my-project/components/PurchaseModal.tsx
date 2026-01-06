"use client";
import { X, Send, CreditCard, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PurchaseModal = ({ isOpen, onClose }: PurchaseModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">شروع معامله</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition"><X className="w-5 h-5 text-gray-500"/></button>
          </div>

          {/* Body */}
          <div className="space-y-4">
            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex items-start gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                    <h4 className="font-bold text-indigo-900 text-sm">نحوه خرید</h4>
                    <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
                        جهت امنیت بیشتر و احراز هویت سریع، تمامی معاملات از طریق پشتیبانی رسمی در تلگرام یا واتساپ انجام می‌شود.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <a 
                    href="https://t.me/yourid" 
                    target="_blank" 
                    className="flex flex-col items-center justify-center gap-2 bg-[#229ED9] hover:bg-[#1e8qb9] text-white p-4 rounded-2xl transition-all shadow-lg shadow-blue-200"
                >
                    <Send className="w-6 h-6" />
                    <span className="font-bold text-sm">تلگرام</span>
                </a>
                <a 
                    href="https://wa.me/989000000" 
                    target="_blank" 
                    className="flex flex-col items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-2xl transition-all shadow-lg shadow-green-200"
                >
                    <MessageCircle className="w-6 h-6" />
                    <span className="font-bold text-sm">واتساپ</span>
                </a>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
                میانگین زمان پاسخگویی: <span className="text-gray-800 font-bold">۳ دقیقه</span>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};