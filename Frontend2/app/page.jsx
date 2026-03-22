"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/page-transition";
import { AnimatedButton } from "@/components/animated-button";
import { ArtworkCard, ArtworkCardSkeleton } from "@/components/artwork-card";
import { artworkService } from "@/lib/api";
import { ArrowRight, Sparkles, Users, Shield, Zap } from "lucide-react";
const features = [
    { icon: Sparkles, title: "Curated Collections", description: "Discover hand-picked artworks from the world's most talented artists" },
    { icon: Users, title: "Artist Community", description: "Connect with creators and build meaningful relationships" },
    { icon: Shield, title: "Secure Transactions", description: "Buy and sell with confidence through our protected platform" },
    { icon: Zap, title: "Instant Delivery", description: "Get instant access to your purchased digital artworks" },
];
export default function HomePage() {
    const [featuredArtworks, setFeaturedArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchArtworks = async () => {
            const artworks = await artworkService.getAll();
            setFeaturedArtworks(artworks.slice(0, 4));
            setIsLoading(false);
        };
        fetchArtworks();
    }, []);
    return (<PageTransition>
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"/>
          <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, -5, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-accent/20 to-primary/20 blur-3xl"/>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <FadeIn delay={0.1}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
                  <Sparkles className="h-4 w-4"/>
                  <span className="text-sm font-medium">The Future of Art Collection</span>
                </motion.div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                  <span className="text-foreground">Discover</span>{" "}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Extraordinary</span>
                  <br />
                  <span className="text-foreground">Digital Art</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground lg:mx-0">
                  Explore a curated collection of stunning artworks from talented artists around the world. Buy, sell, and collect unique digital pieces.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                  <Link href="/explore">
                    <AnimatedButton size="lg" className="w-full sm:w-auto">
                      <span className="flex items-center gap-2">
                        Explore Gallery
                        <ArrowRight className="h-5 w-5"/>
                      </span>
                    </AnimatedButton>
                  </Link>
                  <Link href="/auth">
                    <AnimatedButton variant="outline" size="lg" className="w-full sm:w-auto">
                      Join as Artist
                    </AnimatedButton>
                  </Link>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.3} direction="left">
              <div className="relative hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="space-y-4">
                    <div className="overflow-hidden rounded-2xl shadow-2xl">
                      <Image src="https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=500&fit=crop" alt="Featured artwork" width={400} height={500} className="h-auto w-full object-cover"/>
                    </div>
                    <div className="overflow-hidden rounded-2xl shadow-2xl">
                      <Image src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop" alt="Featured artwork" width={400} height={300} className="h-auto w-full object-cover"/>
                    </div>
                  </motion.div>
                  <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="space-y-4 pt-8">
                    <div className="overflow-hidden rounded-2xl shadow-2xl">
                      <Image src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=350&fit=crop" alt="Featured artwork" width={400} height={350} className="h-auto w-full object-cover"/>
                    </div>
                    <div className="overflow-hidden rounded-2xl shadow-2xl">
                      <Image src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop" alt="Featured artwork" width={400} height={400} className="h-auto w-full object-cover"/>
                    </div>
                  </motion.div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (<StaggerItem key={index}>
                <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.3 }} className="glass-card h-full rounded-2xl p-6">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="gradient-primary mb-4 flex h-14 w-14 items-center justify-center rounded-xl">
                    <feature.icon className="h-7 w-7 text-white"/>
                  </motion.div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              </StaggerItem>))}
          </StaggerContainer>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading ? Array.from({ length: 4 }).map((_, i) => <ArtworkCardSkeleton key={i}/>) : featuredArtworks.map((artwork, index) => <ArtworkCard key={artwork.id} artwork={artwork} index={index}/>)}
          </div>
        </div>
      </section>
    </PageTransition>);
}
