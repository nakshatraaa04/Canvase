"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
export function ArtworkCard({ artwork, index = 0 }) {
    const [isLiked, setIsLiked] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    return (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }} className="group">
      <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="relative overflow-hidden rounded-2xl bg-card shadow-lg transition-shadow duration-300 hover:shadow-2xl">
        <div className="relative overflow-hidden">
          {!imageLoaded && <div className="absolute inset-0 shimmer" style={{ aspectRatio: "4/5" }}/>}
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }} className="relative">
            <Image src={artwork.imageUrl} alt={artwork.title} width={600} height={750} className={`h-auto w-full object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`} onLoad={() => setImageLoaded(true)}/>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent">
            <div className="absolute right-0 bottom-0 left-0 p-4">
              <motion.p initial={{ y: 10, opacity: 0 }} whileHover={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }} className="line-clamp-2 text-sm text-white/80">
                {artwork.description}
              </motion.p>
            </div>
          </motion.div>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={(event) => {
            event.preventDefault();
            setIsLiked(!isLiked);
        }} className={`absolute top-3 right-3 rounded-full p-2.5 backdrop-blur-md transition-colors ${isLiked ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"}`}>
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}/>
          </motion.button>
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">{artwork.category}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-3 flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary">{artwork.title}</h3>
            <span className="whitespace-nowrap font-bold text-primary">${artwork.price}</span>
          </div>
          <Link href={`/artist/${artwork.artist.id}`} className="group/artist flex items-center gap-2">
            <Avatar className="h-7 w-7 ring-2 ring-primary/10">
              <AvatarImage src={artwork.artist.avatar} alt={artwork.artist.name}/>
              <AvatarFallback className="gradient-primary text-xs text-white">{artwork.artist.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground transition-colors group-hover/artist:text-foreground">{artwork.artist.name}</span>
          </Link>
          <div className="mt-3 flex items-center gap-1 text-muted-foreground">
            <Heart className="h-4 w-4"/>
            <span className="text-sm">{isLiked ? artwork.likes + 1 : artwork.likes}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>);
}
export function ArtworkCardSkeleton() {
    return (<div className="overflow-hidden rounded-2xl bg-card shadow-lg">
      <div className="shimmer" style={{ aspectRatio: "4/5" }}/>
      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="shimmer h-5 w-32 rounded"/>
          <div className="shimmer h-5 w-16 rounded"/>
        </div>
        <div className="flex items-center gap-2">
          <div className="shimmer h-7 w-7 rounded-full"/>
          <div className="shimmer h-4 w-24 rounded"/>
        </div>
      </div>
    </div>);
}
