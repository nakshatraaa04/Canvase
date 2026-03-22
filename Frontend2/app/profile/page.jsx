"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/page-transition";
import { ArtworkCard, ArtworkCardSkeleton } from "@/components/artwork-card";
import { AnimatedButton } from "@/components/animated-button";
import { useAuth } from "@/lib/auth-context";
import { artworkService } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Heart, Share2, Grid, Image as ImageIcon, Settings, Sparkles } from "lucide-react";
import Link from "next/link";
export default function ProfilePage() {
    const router = useRouter();
    const { user } = useAuth();
    const [artworks, setArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("artworks");
    useEffect(() => {
        const fetchArtworks = async () => {
            const data = await artworkService.getAll();
            setArtworks(data.slice(0, 6));
            setIsLoading(false);
        };
        fetchArtworks();
    }, []);
    if (!user) {
        return (<PageTransition>
        <div className="min-h-[80vh] flex items-center justify-center">
          <FadeIn>
            <div className="text-center max-w-md mx-auto p-8">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-primary"/>
              </div>
              <h2 className="text-2xl font-bold mb-4">Sign in Required</h2>
              <p className="text-muted-foreground mb-6">
                Please sign in to view your profile.
              </p>
              <Link href="/auth">
                <AnimatedButton size="lg">Sign In</AnimatedButton>
              </Link>
            </div>
          </FadeIn>
        </div>
      </PageTransition>);
    }
    const tabs = [
        { id: "artworks", label: user.role === "artist" ? "My Artworks" : "Collection", icon: Grid, count: artworks.length },
        { id: "collections", label: "Collections", icon: ImageIcon, count: 3 },
        { id: "liked", label: "Liked", icon: Heart, count: 24 }
    ];
    return (<PageTransition>
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 -mt-24">
        <Image src="https://images.unsplash.com/photo-1549887534-1541e9326642?w=1200&h=400&fit=crop" alt="Cover" fill className="object-cover" priority/>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"/>
        
        {/* Edit Cover Button */}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md text-white text-sm font-medium hover:bg-white/30 transition-colors">
          Edit Cover
        </motion.button>
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
            {/* Avatar */}
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-background shadow-xl">
                <AvatarImage src={user.avatar} alt={user.name}/>
                <AvatarFallback className="text-4xl gradient-primary text-white">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="absolute bottom-2 right-2 p-2 rounded-full bg-primary text-white shadow-lg">
                <Settings className="w-4 h-4"/>
              </motion.button>
            </motion.div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{user.name}</h1>
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mt-2">
                    {user.role === "artist" ? "Artist" : "Collector"}
                  </span>
                </div>
                <div className="flex items-center gap-2 md:ml-auto">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <AnimatedButton variant="outline">
                      <Settings className="w-4 h-4 mr-2"/>
                      Edit Profile
                    </AnimatedButton>
                  </motion.div>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
                    <Share2 className="w-5 h-5"/>
                  </motion.button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
                  <p className="text-xl font-bold">12.4K</p>
                  <p className="text-muted-foreground">Followers</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
                  <p className="text-xl font-bold">342</p>
                  <p className="text-muted-foreground">Following</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center">
                  <p className="text-xl font-bold">45.6K</p>
                  <p className="text-muted-foreground">Likes</p>
                </motion.div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Bio & Details */}
        <FadeIn delay={0.2}>
          <div className="mb-12">
            <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">
              {user.bio || "Digital art enthusiast exploring the boundaries of creativity. Always looking for the next masterpiece to add to my collection."}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4"/>
                Los Angeles, CA
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4"/>
                Joined January 2024
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Tabs */}
        <FadeIn delay={0.3}>
          <div className="border-b border-border mb-8">
            <div className="flex gap-1">
              {tabs.map((tab) => (<motion.button key={tab.id} whileHover={{ backgroundColor: "var(--secondary)" }} whileTap={{ scale: 0.98 }} onClick={() => setActiveTab(tab.id)} className={`relative flex items-center gap-2 px-6 py-4 rounded-t-xl transition-colors ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`}>
                  <tab.icon className="w-5 h-5"/>
                  <span className="font-medium">{tab.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id ? "bg-primary/10" : "bg-secondary"}`}>
                    {tab.count}
                  </span>
                  {activeTab === tab.id && (<motion.div layoutId="profile-tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" transition={{ type: "spring", stiffness: 500, damping: 30 }}/>)}
                </motion.button>))}
            </div>
          </div>
        </FadeIn>

        {/* Artwork Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (<StaggerItem key={i}>
                  <ArtworkCardSkeleton />
                </StaggerItem>))
            : artworks.map((artwork, index) => (<StaggerItem key={artwork.id}>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <ArtworkCard artwork={artwork} index={index}/>
                  </motion.div>
                </StaggerItem>))}
        </StaggerContainer>
      </div>
    </PageTransition>);
}
