"use client";
import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
export const AnimatedInput = forwardRef(({ label, error, type, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    return (<div className="relative">
      <div className="relative">
        <motion.div animate={{ scale: isFocused ? 1.02 : 1 }} transition={{ duration: 0.2 }} className="relative">
          <input ref={ref} type={inputType} onFocus={() => setIsFocused(true)} onBlur={(event) => {
            setIsFocused(false);
            setHasValue(event.target.value.length > 0);
        }} onChange={(event) => {
            var _a;
            setHasValue(event.target.value.length > 0);
            (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, event);
        }} className={cn("peer w-full rounded-xl border-2 bg-secondary/50 px-4 py-4 pt-6 text-foreground outline-none transition-all duration-300", isFocused ? "border-primary shadow-lg shadow-primary/10" : error ? "border-destructive" : "border-transparent hover:border-primary/30", isPassword && "pr-12", className)} {...props}/>
          <motion.label initial={false} animate={{
            y: isFocused || hasValue ? -8 : 0,
            scale: isFocused || hasValue ? 0.85 : 1,
            color: isFocused ? "var(--primary)" : error ? "var(--destructive)" : "var(--muted-foreground)",
        }} transition={{ duration: 0.2 }} className="pointer-events-none absolute top-1/2 left-4 origin-left -translate-y-1/2">
            {label}
          </motion.label>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: isFocused ? 1 : 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 -z-10 rounded-xl bg-primary/5 blur-xl"/>
          {isPassword && (<motion.button type="button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground">
              {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
            </motion.button>)}
        </motion.div>
      </div>
      <AnimatePresence>
        {error && (<motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="mt-2 text-sm text-destructive">
            {error}
          </motion.p>)}
      </AnimatePresence>
    </div>);
});
AnimatedInput.displayName = "AnimatedInput";
