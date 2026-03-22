"use client";
import { useEffect, useState, use } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/page-transition";
import { ArtworkCard, ArtworkCardSkeleton } from "@/components/artwork-card";
import { AnimatedButton } from "@/components/animated-button";
import { artworkService } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Heart, Share2, ExternalLink, Grid, Image as ImageIcon, Users } from "lucide-react";
const MOCK_ARTISTS = {
    "1": {
        id: "1",
        name: "Alex Rivera",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
        cover: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=1200&h=400&fit=crop",
        bio: "Digital artist exploring the boundaries of imagination. Creating art that speaks to the soul and challenges perception. Based in Los Angeles, passionate about blending traditional techniques with digital innovation.",
        location: "Los Angeles, CA",
        joinedDate: "January 2023",
        followers: 12400,
        following: 342,
        totalLikes: 45600,
        website: "alexrivera.art",
        social: {
            twitter: "@alexrivera",
            instagram: "@alex.rivera.art"
        }
    },
    "2": {
        id: "2",
        name: "Maya Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
        cover: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200&h=400&fit=crop",
        bio: "Nature-inspired digital artist. Finding beauty in the details of the natural world and translating it into vibrant digital compositions.",
        location: "Seattle, WA",
        joinedDate: "March 2023",
        followers: 8900,
        following: 256,
        totalLikes: 32100,
        website: "mayachen.com"
    },
    "3": {
        id: "3",
        name: "Jordan Lee",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
        cover: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=400&fit=crop",
        bio: "Urban photographer and digital artist. Capturing the energy and rhythm of city life through bold compositions and striking colors.",
        location: "New York, NY",
        joinedDate: "June 2023",
        followers: 15200,
        following: 189,
        totalLikes: 58900
    }
};
export default function ArtistProfilePage({ params }) {
    var _a, _b;
    const { id } = use(params);
    const [artworks, setArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("artworks");
    const [isFollowing, setIsFollowing] = useState(false);
    const artist = MOCK_ARTISTS[id] || MOCK_ARTISTS["1"];
    useEffect(() => {
        const fetchArtworks = async () => {
            const data = await artworkService.getByArtist(id);
            // If no artworks found for this artist, show some random ones
            if (data.length === 0) {
                const allArtworks = await artworkService.getAll();
                setArtworks(allArtworks.slice(0, 6));
            }
            else {
                setArtworks(data);
            }
            setIsLoading(false);
        };
        fetchArtworks();
    }, [id]);
    const tabs = [
        { id: "artworks", label: "Artworks", icon: Grid, count: artworks.length },
        { id: "collections", label: "Collections", icon: ImageIcon, count: 3 },
        { id: "liked", label: "Liked", icon: Heart, count: 24 }
    ];
    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    };
    return (<PageTransition>
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 -mt-24">
        <Image src={artist.cover} alt={`${artist.name}'s cover`} fill className="object-cover" priority/>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"/>
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
            {/* Avatar */}
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-background shadow-xl">
                <AvatarImage src={artist.avatar} alt={artist.name}/>
                <AvatarFallback className="text-4xl gradient-primary text-white">
                  {artist.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">{artist.name}</h1>
                <div className="flex items-center gap-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <AnimatedButton variant={isFollowing ? "outline" : "primary"} onClick={() => setIsFollowing(!isFollowing)}>
                      {isFollowing ? "Following" : "Follow"}
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
                  <p className="text-xl font-bold">{formatNumber(artist.followers)}</p>
                  <p className="text-muted-foreground">Followers</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
                  <p className="text-xl font-bold">{formatNumber(artist.following)}</p>
                  <p className="text-muted-foreground">Following</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center">
                  <p className="text-xl font-bold">{formatNumber(artist.totalLikes)}</p>
                  <p className="text-muted-foreground">Likes</p>
                </motion.div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Bio & Details */}
        <FadeIn delay={0.2}>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <p className="text-muted-foreground leading-relaxed mb-4">
                {artist.bio}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {artist.location && (<span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4"/>
                    {artist.location}
                  </span>)}
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4"/>
                  Joined {artist.joinedDate}
                </span>
                {artist.website && (<a href={`https://${artist.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                    <ExternalLink className="w-4 h-4"/>
                    {artist.website}
                  </a>)}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5"/>
                Connect
              </h3>
              <div className="space-y-3">
                {((_a = artist.social) === null || _a === void 0 ? void 0 : _a.twitter) && (<motion.a href="#" whileHover={{ x: 5 }} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                      <span className="font-bold">X</span>
                    </div>
                    <span>{artist.social.twitter}</span>
                  </motion.a>)}
                {((_b = artist.social) === null || _b === void 0 ? void 0 : _b.instagram) && (<motion.a href="#" whileHover={{ x: 5 }} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                      <span className="font-bold text-sm">IG</span>
                    </div>
                    <span>{artist.social.instagram}</span>
                  </motion.a>)}
              </div>
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
                  {activeTab === tab.id && (<motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" transition={{ type: "spring", stiffness: 500, damping: 30 }}/>)}
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
