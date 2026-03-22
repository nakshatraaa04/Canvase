"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition, FadeIn } from "@/components/page-transition";
import { AnimatedButton } from "@/components/animated-button";
import { AnimatedInput } from "@/components/animated-input";
import { useAuth } from "@/lib/auth-context";
import { Palette, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
export default function AuthPage() {
    const router = useRouter();
    const { login, signup } = useAuth();
    const [mode, setMode] = useState("login");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    // Form states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            if (mode === "login") {
                await login(email, password);
            }
            else {
                await signup(name, email, password, role);
            }
            router.push("/dashboard");
        }
        catch {
            setError("Something went wrong. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    };
    const toggleMode = () => {
        setMode(mode === "login" ? "signup" : "login");
        setError("");
    };
    return (<PageTransition className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back Link */}
          <FadeIn>
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4"/>
              Back to Home
            </Link>
          </FadeIn>

          {/* Logo */}
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-8">
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }} className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Palette className="w-7 h-7 text-white"/>
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Canvase
              </span>
            </div>
          </FadeIn>

          {/* Title */}
          <FadeIn delay={0.2}>
            <AnimatePresence mode="wait">
              <motion.div key={mode} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                <h1 className="text-3xl font-bold mb-2">
                  {mode === "login" ? "Welcome back" : "Create account"}
                </h1>
                <p className="text-muted-foreground mb-8">
                  {mode === "login"
            ? "Enter your credentials to access your account"
            : "Join our community of artists and collectors"}
                </p>
              </motion.div>
            </AnimatePresence>
          </FadeIn>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {mode === "signup" && (<motion.div key="name-field" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                  <FadeIn delay={0.3}>
                    <AnimatedInput label="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                  </FadeIn>
                </motion.div>)}
            </AnimatePresence>

            <FadeIn delay={mode === "signup" ? 0.4 : 0.3}>
              <AnimatedInput label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </FadeIn>

            <FadeIn delay={mode === "signup" ? 0.5 : 0.4}>
              <AnimatedInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </FadeIn>

            {/* Role Selection for Signup */}
            <AnimatePresence mode="wait">
              {mode === "signup" && (<motion.div key="role-field" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                  <FadeIn delay={0.6}>
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-muted-foreground">
                        I want to join as
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setRole("user")} className={`p-4 rounded-xl border-2 transition-all ${role === "user"
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"}`}>
                          <div className="text-left">
                            <p className="font-semibold">Collector</p>
                            <p className="text-xs text-muted-foreground">
                              Browse and buy art
                            </p>
                          </div>
                        </motion.button>
                        <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setRole("artist")} className={`p-4 rounded-xl border-2 transition-all ${role === "artist"
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"}`}>
                          <div className="text-left">
                            <p className="font-semibold">Artist</p>
                            <p className="text-xs text-muted-foreground">
                              Sell your artworks
                            </p>
                          </div>
                        </motion.button>
                      </div>
                    </div>
                  </FadeIn>
                </motion.div>)}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {error && (<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm">
                  {error}
                </motion.div>)}
            </AnimatePresence>

            {/* Submit Button */}
            <FadeIn delay={mode === "signup" ? 0.7 : 0.5}>
              <AnimatedButton type="submit" loading={isLoading} className="w-full" size="lg">
                {mode === "login" ? "Sign In" : "Create Account"}
              </AnimatedButton>
            </FadeIn>

            {/* Demo Credentials */}
            {mode === "login" && (<FadeIn delay={0.6}>
                <div className="p-4 rounded-xl bg-secondary/50 text-sm">
                  <p className="font-medium mb-2">Demo Credentials:</p>
                  <p className="text-muted-foreground">
                    Artist: <span className="text-foreground">artist@demo.com</span>
                  </p>
                  <p className="text-muted-foreground">
                    User: <span className="text-foreground">user@demo.com</span>
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    (Any password works for demo)
                  </p>
                </div>
              </FadeIn>)}

            {/* Toggle Mode */}
            <FadeIn delay={mode === "signup" ? 0.8 : 0.7}>
              <p className="text-center text-muted-foreground">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                <motion.button type="button" onClick={toggleMode} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="text-primary font-medium hover:underline">
                  {mode === "login" ? "Sign up" : "Sign in"}
                </motion.button>
              </p>
            </FadeIn>
          </form>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary"/>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
        }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-white/10 blur-3xl"/>
          <motion.div animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
        }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-white/10 blur-3xl"/>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10"/>
            </motion.div>
            
            <h2 className="text-4xl font-bold mb-4 text-balance">
              Join the Art Revolution
            </h2>
            <p className="text-white/80 text-lg max-w-md mx-auto">
              Connect with thousands of artists and collectors. 
              Discover, create, and trade unique digital masterpieces.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-12">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center">
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-white/60 text-sm">Artworks</p>
              </motion.div>
              <div className="w-px h-12 bg-white/20"/>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-center">
                <p className="text-3xl font-bold">2.5K+</p>
                <p className="text-white/60 text-sm">Artists</p>
              </motion.div>
              <div className="w-px h-12 bg-white/20"/>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-center">
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-white/60 text-sm">Collectors</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Floating Art Cards */}
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 right-20 w-32 h-40 rounded-2xl overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1549887534-1541e9326642?w=200&h=250&fit=crop" alt="Art preview" className="w-full h-full object-cover"/>
        </motion.div>
        
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-32 left-16 w-28 h-36 rounded-2xl overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=250&fit=crop" alt="Art preview" className="w-full h-full object-cover"/>
        </motion.div>
      </div>
    </PageTransition>);
}
