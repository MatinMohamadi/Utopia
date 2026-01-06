import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = ({ className, variant = "primary", ...props }: ButtonProps) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/30",
    secondary: "bg-white text-gray-900 hover:bg-gray-50 border border-gray-200",
  };
  return <button className={cn("inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold transition-all active:scale-95", variants[variant], className)} {...props} />;
};