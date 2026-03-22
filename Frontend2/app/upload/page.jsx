"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition, FadeIn } from "@/components/page-transition";
import { AnimatedButton } from "@/components/animated-button";
import { AnimatedInput } from "@/components/animated-input";
import { useAuth } from "@/lib/auth-context";
import { Upload, ImagePlus, X, Check, Sparkles, DollarSign, Tag, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";
const categories = [
    "Abstract",
    "Nature",
    "Urban",
    "Digital",
    "Landscape",
    "Space",
    "Minimalist",
    "Portrait",
    "Fantasy"
];
export default function UploadPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);
    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            processFile(file);
        }
    }, []);
    const handleFileSelect = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            processFile(file);
        }
    };
    const processFile = (file) => {
        setIsUploading(true);
        setUploadProgress(0);
        // Simulate upload progress
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 100);
        const reader = new FileReader();
        reader.onload = (e) => {
            setTimeout(() => {
                var _a;
                setUploadedImage((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
                setIsUploading(false);
            }, 1000);
        };
        reader.readAsDataURL(file);
    };
    const removeImage = () => {
        setUploadedImage(null);
        setUploadProgress(0);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setShowSuccess(true);
        setTimeout(() => {
            router.push("/dashboard");
        }, 2000);
    };
    // Check if user is artist
    if (!user) {
        return (<PageTransition>
        <div className="min-h-[80vh] flex items-center justify-center">
          <FadeIn>
            <div className="text-center max-w-md mx-auto p-8">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-primary"/>
              </div>
              <h2 className="text-2xl font-bold mb-4">Sign in Required</h2>
              <p className="text-muted-foreground mb-6">
                Please sign in to upload your artwork to the marketplace.
              </p>
              <Link href="/auth">
                <AnimatedButton size="lg">Sign In</AnimatedButton>
              </Link>
            </div>
          </FadeIn>
        </div>
      </PageTransition>);
    }
    if (user.role !== "artist") {
        return (<PageTransition>
        <div className="min-h-[80vh] flex items-center justify-center">
          <FadeIn>
            <div className="text-center max-w-md mx-auto p-8">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-accent"/>
              </div>
              <h2 className="text-2xl font-bold mb-4">Become an Artist</h2>
              <p className="text-muted-foreground mb-6">
                Only artists can upload artwork. Create an artist account to start selling your creations.
              </p>
              <Link href="/auth">
                <AnimatedButton size="lg">Create Artist Account</AnimatedButton>
              </Link>
            </div>
          </FadeIn>
        </div>
      </PageTransition>);
    }
    return (<PageTransition>
      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }} className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
                <Check className="w-12 h-12 text-white"/>
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">Artwork Uploaded!</h2>
              <p className="text-muted-foreground">Redirecting to dashboard...</p>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <motion.div initial={{ rotate: 0 }} animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-white"/>
              </motion.div>
              <h1 className="text-4xl font-bold mb-4">Upload Your Artwork</h1>
              <p className="text-muted-foreground text-lg">
                Share your creation with the world and start earning
              </p>
            </div>
          </FadeIn>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Image Upload */}
              <FadeIn delay={0.1}>
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <ImagePlus className="w-5 h-5 text-primary"/>
                    Artwork Image
                  </h2>

                  {/* Drop Zone */}
                  <motion.div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} animate={{
            scale: isDragging ? 1.02 : 1,
            borderColor: isDragging ? "var(--primary)" : "var(--border)"
        }} className={`relative min-h-[400px] rounded-2xl border-2 border-dashed transition-colors ${isDragging
            ? "bg-primary/5 border-primary"
            : "bg-card hover:border-primary/50"}`}>
                    {uploadedImage ? (<div className="relative h-full min-h-[400px]">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative h-full">
                          <Image src={uploadedImage} alt="Uploaded artwork" fill className="object-contain rounded-2xl p-4"/>
                        </motion.div>
                        <motion.button type="button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={removeImage} className="absolute top-4 right-4 p-2 rounded-full bg-destructive text-white shadow-lg">
                          <X className="w-5 h-5"/>
                        </motion.button>
                      </div>) : isUploading ? (<div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-20 h-20 relative mb-4">
                          <svg className="w-full h-full -rotate-90">
                            <circle cx="40" cy="40" r="36" fill="none" stroke="var(--secondary)" strokeWidth="8"/>
                            <motion.circle cx="40" cy="40" r="36" fill="none" stroke="var(--primary)" strokeWidth="8" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: uploadProgress / 100 }} transition={{ duration: 0.1 }} style={{
                strokeDasharray: "226",
                strokeDashoffset: 0
            }}/>
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center font-bold">
                            {uploadProgress}%
                          </span>
                        </div>
                        <p className="text-muted-foreground">Uploading...</p>
                      </div>) : (<label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                          <ImagePlus className="w-10 h-10 text-primary"/>
                        </motion.div>
                        <p className="text-lg font-medium mb-2">
                          Drop your artwork here
                        </p>
                        <p className="text-muted-foreground text-sm mb-4">
                          or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF up to 50MB
                        </p>
                        <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden"/>
                      </label>)}
                  </motion.div>
                </div>
              </FadeIn>

              {/* Right Column - Form Fields */}
              <FadeIn delay={0.2}>
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary"/>
                    Artwork Details
                  </h2>

                  <AnimatedInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required/>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Description
                    </label>
                    <motion.textarea whileFocus={{ scale: 1.01 }} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tell the story behind your artwork..." rows={4} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary/50 transition-all outline-none resize-none" required/>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <DollarSign className="w-4 h-4"/>
                      Price (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <motion.input whileFocus={{ scale: 1.01 }} type="number" min="1" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" className="w-full pl-8 pr-4 py-4 rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary/50 transition-all outline-none" required/>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Tag className="w-4 h-4"/>
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (<motion.button key={category} type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === category
                ? "gradient-primary text-white shadow-lg shadow-primary/25"
                : "bg-secondary hover:bg-secondary/80"}`}>
                          {category}
                        </motion.button>))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <AnimatedButton type="submit" size="lg" className="w-full" loading={isSubmitting} disabled={!uploadedImage || !title || !description || !price || !selectedCategory}>
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5"/>
                        Publish Artwork
                      </span>
                    </AnimatedButton>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      By uploading, you agree to our terms of service
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>);
}
