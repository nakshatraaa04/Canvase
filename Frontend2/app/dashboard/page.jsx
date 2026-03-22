"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/page-transition";
import { ArtworkCard, ArtworkCardSkeleton } from "@/components/artwork-card";
import { AnimatedButton } from "@/components/animated-button";
import { useAuth } from "@/lib/auth-context";
import { artworkService } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, Eye, Heart, DollarSign, Plus, Settings, Bell, Image as ImageIcon, ShoppingBag, Clock, ArrowUpRight, Sparkles } from "lucide-react";
const recentActivity = [
    { id: 1, type: "sale", message: "Ethereal Dreams was purchased", time: "2 hours ago", amount: "$450" },
    { id: 2, type: "like", message: "Jordan liked Ocean Whispers", time: "5 hours ago" },
    { id: 3, type: "follow", message: "Maya Chen started following you", time: "1 day ago" },
    { id: 4, type: "sale", message: "Urban Symphony was purchased", time: "2 days ago", amount: "$580" },
];
export default function DashboardPage() {
    const { user } = useAuth();
    const [artworks, setArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchArtworks = async () => {
            const data = await artworkService.getAll();
            setArtworks(data.slice(0, 4));
            setIsLoading(false);
        };
        fetchArtworks();
    }, []);
    const isArtist = (user === null || user === void 0 ? void 0 : user.role) === "artist";
    // Stats for artist dashboard
    const artistStats = [
        { label: "Total Views", value: "24.5K", change: "+12%", icon: Eye, color: "from-blue-500 to-cyan-500" },
        { label: "Total Likes", value: "8.2K", change: "+8%", icon: Heart, color: "from-pink-500 to-rose-500" },
        { label: "Artworks", value: "12", change: "+2", icon: ImageIcon, color: "from-purple-500 to-violet-500" },
        { label: "Earnings", value: "$3,450", change: "+23%", icon: DollarSign, color: "from-green-500 to-emerald-500" },
    ];
    // Stats for collector dashboard
    const collectorStats = [
        { label: "Collection", value: "8", change: "+2", icon: ImageIcon, color: "from-purple-500 to-violet-500" },
        { label: "Total Spent", value: "$2,340", icon: ShoppingBag, color: "from-green-500 to-emerald-500" },
        { label: "Wishlist", value: "15", icon: Heart, color: "from-pink-500 to-rose-500" },
        { label: "Following", value: "24", icon: Eye, color: "from-blue-500 to-cyan-500" },
    ];
    const stats = isArtist ? artistStats : collectorStats;
    if (!user) {
        return (<PageTransition>
        <div className="min-h-[80vh] flex items-center justify-center">
          <FadeIn>
            <div className="text-center max-w-md mx-auto p-8">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-primary"/>
              </div>
              <h2 className="text-2xl font-bold mb-4">Welcome to Canvase</h2>
              <p className="text-muted-foreground mb-6">
                Sign in to access your personalized dashboard and start your art journey.
              </p>
              <Link href="/auth">
                <AnimatedButton size="lg">Sign In</AnimatedButton>
              </Link>
            </div>
          </FadeIn>
        </div>
      </PageTransition>);
    }
    return (<PageTransition>
      <div className="min-h-screen pb-20">
        {/* Header */}
        <section className="relative py-8 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"/>
          </div>

          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Welcome */}
                <div className="flex items-center gap-4">
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Avatar className="w-16 h-16 ring-4 ring-primary/20">
                      <AvatarImage src={user.avatar} alt={user.name}/>
                      <AvatarFallback className="text-xl gradient-primary text-white">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                      Welcome back, {user.name.split(" ")[0]}!
                    </h1>
                    <p className="text-muted-foreground">
                      {isArtist ? "Here's how your art is performing" : "Here's your collection overview"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors relative">
                    <Bell className="w-5 h-5"/>
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary"/>
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
                    <Settings className="w-5 h-5"/>
                  </motion.button>
                  {isArtist && (<Link href="/upload">
                      <AnimatedButton>
                        <Plus className="w-5 h-5 mr-2"/>
                        Upload Art
                      </AnimatedButton>
                    </Link>)}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="container mx-auto px-4 mb-12">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (<StaggerItem key={index}>
                <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }} className="glass-card rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white"/>
                    </div>
                    {stat.change && (<span className="flex items-center gap-1 text-sm text-green-500 font-medium">
                        <TrendingUp className="w-4 h-4"/>
                        {stat.change}
                      </span>)}
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </motion.div>
              </StaggerItem>))}
          </StaggerContainer>
        </section>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Artworks */}
              <FadeIn delay={0.2}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">
                    {isArtist ? "Your Recent Artworks" : "Your Collection"}
                  </h2>
                  <Link href="/explore">
                    <motion.button whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-1 text-primary text-sm font-medium">
                      View All
                      <ArrowUpRight className="w-4 h-4"/>
                    </motion.button>
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (<ArtworkCardSkeleton key={i}/>))
            : artworks.map((artwork, index) => (<ArtworkCard key={artwork.id} artwork={artwork} index={index}/>))}
                </div>
              </FadeIn>

              {/* Quick Actions for Artists */}
              {isArtist && (<FadeIn delay={0.3}>
                  <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                { label: "Upload New Art", icon: Plus, href: "/upload", gradient: "from-primary to-accent" },
                { label: "View Analytics", icon: TrendingUp, href: "#", gradient: "from-blue-500 to-cyan-500" },
                { label: "Edit Profile", icon: Settings, href: "#", gradient: "from-gray-500 to-gray-600" },
            ].map((action, index) => (<motion.div key={index} whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link href={action.href} className={`block p-6 rounded-2xl bg-gradient-to-br ${action.gradient} text-white text-center`}>
                          <action.icon className="w-8 h-8 mx-auto mb-3"/>
                          <p className="font-medium">{action.label}</p>
                        </Link>
                      </motion.div>))}
                  </div>
                </FadeIn>)}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Recent Activity */}
              <FadeIn delay={0.4}>
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary"/>
                    Recent Activity
                  </h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (<motion.div key={activity.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === "sale"
                ? "bg-green-500/10 text-green-500"
                : activity.type === "like"
                    ? "bg-pink-500/10 text-pink-500"
                    : "bg-blue-500/10 text-blue-500"}`}>
                          {activity.type === "sale" && <DollarSign className="w-5 h-5"/>}
                          {activity.type === "like" && <Heart className="w-5 h-5"/>}
                          {activity.type === "follow" && <Eye className="w-5 h-5"/>}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.message}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                            {activity.amount && (<span className="text-sm font-bold text-green-500">{activity.amount}</span>)}
                          </div>
                        </div>
                      </motion.div>))}
                  </div>
                </div>
              </FadeIn>

              {/* Suggested Artists (for Collectors) */}
              {!isArtist && (<FadeIn delay={0.5}>
                  <div className="glass-card rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-6">Suggested Artists</h2>
                    <div className="space-y-4">
                      {[
                { name: "Alex Rivera", followers: "12.4K", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
                { name: "Maya Chen", followers: "8.9K", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
                { name: "Jordan Lee", followers: "15.2K", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
            ].map((artist, index) => (<motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={artist.avatar} alt={artist.name}/>
                              <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{artist.name}</p>
                              <p className="text-xs text-muted-foreground">{artist.followers} followers</p>
                            </div>
                          </div>
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                            Follow
                          </motion.button>
                        </motion.div>))}
                    </div>
                  </div>
                </FadeIn>)}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>);
}
