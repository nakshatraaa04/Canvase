"use client";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition, FadeIn } from "@/components/page-transition";
import { ArtworkCard, ArtworkCardSkeleton } from "@/components/artwork-card";
import { artworkService } from "@/lib/api";
import { Search, SlidersHorizontal, X, Grid, LayoutGrid } from "lucide-react";
const categories = ["All", "Abstract", "Nature", "Urban", "Digital", "Landscape", "Space", "Minimalist"];
export default function ExplorePage() {
    const [artworks, setArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showFilters, setShowFilters] = useState(false);
    const [layout, setLayout] = useState("masonry");
    useEffect(() => {
        const fetchArtworks = async () => {
            const data = await artworkService.getAll();
            setArtworks(data);
            setIsLoading(false);
        };
        fetchArtworks();
    }, []);
    const filteredArtworks = useMemo(() => {
        return artworks.filter(artwork => {
            const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                artwork.artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                artwork.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || artwork.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [artworks, searchQuery, selectedCategory]);
    return (<PageTransition>
      <div className="min-h-screen pb-20">
        {/* Header Section */}
        <section className="relative py-12 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 -z-10">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"/>
          </div>

          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Explore{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Gallery
                  </span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Discover amazing artworks from talented artists around the world
                </p>
              </div>
            </FadeIn>

            {/* Search Bar */}
            <FadeIn delay={0.1}>
              <div className="max-w-2xl mx-auto">
                <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="w-5 h-5"/>
                  </div>
                  <input type="text" placeholder="Search artworks, artists, or categories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-12 py-4 rounded-2xl bg-card border-2 border-transparent focus:border-primary/50 shadow-lg focus:shadow-xl transition-all outline-none"/>
                  {searchQuery && (<motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      <X className="w-5 h-5"/>
                    </motion.button>)}
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Filters & Controls */}
        <section className="sticky top-20 z-40 py-4 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex-1 overflow-x-auto scrollbar-hide">
                <div className="flex items-center gap-2">
                  {categories.map((category, index) => (<motion.button key={category} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${selectedCategory === category
                ? "gradient-primary text-white shadow-lg shadow-primary/25"
                : "bg-secondary hover:bg-secondary/80 text-foreground"}`}>
                      {category}
                    </motion.button>))}
                </div>
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-2">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setLayout("masonry")} className={`p-2 rounded-xl transition-colors ${layout === "masonry" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                  <LayoutGrid className="w-5 h-5"/>
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setLayout("grid")} className={`p-2 rounded-xl transition-colors ${layout === "grid" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                  <Grid className="w-5 h-5"/>
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowFilters(!showFilters)} className={`p-2 rounded-xl transition-colors ${showFilters ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                  <SlidersHorizontal className="w-5 h-5"/>
                </motion.button>
              </div>
            </div>

            {/* Extended Filters Panel */}
            <AnimatePresence>
              {showFilters && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-card">
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Price Range
                      </label>
                      <select className="w-full p-2 rounded-lg bg-secondary border-0 outline-none">
                        <option>All Prices</option>
                        <option>Under $100</option>
                        <option>$100 - $500</option>
                        <option>$500 - $1000</option>
                        <option>Over $1000</option>
                      </select>
                    </div>
                    <div className="p-4 rounded-xl bg-card">
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Sort By
                      </label>
                      <select className="w-full p-2 rounded-lg bg-secondary border-0 outline-none">
                        <option>Newest First</option>
                        <option>Most Popular</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                      </select>
                    </div>
                    <div className="p-4 rounded-xl bg-card">
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Artist
                      </label>
                      <select className="w-full p-2 rounded-lg bg-secondary border-0 outline-none">
                        <option>All Artists</option>
                        <option>Alex Rivera</option>
                        <option>Maya Chen</option>
                        <option>Jordan Lee</option>
                      </select>
                    </div>
                    <div className="p-4 rounded-xl bg-card">
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Date Added
                      </label>
                      <select className="w-full p-2 rounded-lg bg-secondary border-0 outline-none">
                        <option>Any Time</option>
                        <option>Last 24 Hours</option>
                        <option>Last Week</option>
                        <option>Last Month</option>
                      </select>
                    </div>
                  </div>
                </motion.div>)}
            </AnimatePresence>
          </div>
        </section>

        {/* Results Count */}
        <div className="container mx-auto px-4 py-6">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground">
            Showing{" "}
            <span className="text-foreground font-medium">
              {filteredArtworks.length}
            </span>{" "}
            {filteredArtworks.length === 1 ? "artwork" : "artworks"}
            {selectedCategory !== "All" && (<span> in <span className="text-primary">{selectedCategory}</span></span>)}
          </motion.p>
        </div>

        {/* Artwork Grid */}
        <section className="container mx-auto px-4">
          {isLoading ? (<div className={layout === "masonry"
                ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"}>
              {Array.from({ length: 12 }).map((_, i) => (<div key={i} className={layout === "masonry" ? "mb-6 break-inside-avoid" : ""}>
                  <ArtworkCardSkeleton />
                </div>))}
            </div>) : filteredArtworks.length === 0 ? (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted-foreground"/>
              </div>
              <h3 className="text-xl font-semibold mb-2">No artworks found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
            }} className="px-6 py-3 rounded-xl gradient-primary text-white font-medium">
                Clear Filters
              </motion.button>
            </motion.div>) : (<motion.div layout className={layout === "masonry"
                ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"}>
              <AnimatePresence mode="popLayout">
                {filteredArtworks.map((artwork, index) => (<motion.div key={artwork.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, delay: index * 0.03 }} className={layout === "masonry" ? "mb-6 break-inside-avoid" : ""}>
                    <ArtworkCard artwork={artwork} index={index}/>
                  </motion.div>))}
              </AnimatePresence>
            </motion.div>)}
        </section>
      </div>
    </PageTransition>);
}
