"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export function AnimatedButton({ children, onClick, type = "button", variant = "primary", size = "md", disabled = false, loading = false, className = "", }) {
    const variants = {
        primary: "gradient-primary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "text-foreground hover:bg-secondary",
    };
    const sizes = {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-3 text-base rounded-xl",
        lg: "px-8 py-4 text-lg rounded-2xl",
    };
    return (<motion.button type={type} onClick={onClick} disabled={disabled || loading} whileHover={{ scale: disabled ? 1 : 1.05 }} whileTap={{ scale: disabled ? 1 : 0.95 }} transition={{ duration: 0.2 }} className={cn("relative font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50", variants[variant], sizes[size], className)}>
      {loading ? (<span className="flex items-center justify-center gap-2">
          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="h-5 w-5 rounded-full border-2 border-current border-t-transparent"/>
          Loading...
        </span>) : (children)}
    </motion.button>);
}
