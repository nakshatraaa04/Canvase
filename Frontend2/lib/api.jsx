import axios from "axios";
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    timeout: 10000,
});
const MOCK_ARTWORKS = [
    {
        id: "1",
        title: "Ethereal Dreams",
        description: "A journey through abstract dimensions",
        imageUrl: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&h=800&fit=crop",
        artist: { id: "1", name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
        price: 450,
        likes: 234,
        category: "Abstract",
        createdAt: "2024-01-15",
    },
    {
        id: "2",
        title: "Ocean Whispers",
        description: "Capturing the serenity of coastal mornings",
        imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&h=400&fit=crop",
        artist: { id: "2", name: "Maya Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
        price: 320,
        likes: 189,
        category: "Nature",
        createdAt: "2024-01-20",
    },
    {
        id: "3",
        title: "Urban Symphony",
        description: "City lights dancing in the night",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=700&fit=crop",
        artist: { id: "3", name: "Jordan Lee", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
        price: 580,
        likes: 456,
        category: "Urban",
        createdAt: "2024-02-01",
    },
    {
        id: "4",
        title: "Golden Hour",
        description: "Warm hues of sunset over mountains",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=500&fit=crop",
        artist: { id: "1", name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
        price: 390,
        likes: 312,
        category: "Landscape",
        createdAt: "2024-02-05",
    },
    {
        id: "5",
        title: "Neon Dreams",
        description: "Cyberpunk visions of tomorrow",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=600&fit=crop",
        artist: { id: "4", name: "Sam Taylor", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
        price: 720,
        likes: 567,
        category: "Digital",
        createdAt: "2024-02-10",
    },
    {
        id: "6",
        title: "Serenity",
        description: "Finding peace in simplicity",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=450&fit=crop",
        artist: { id: "2", name: "Maya Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
        price: 280,
        likes: 145,
        category: "Minimalist",
        createdAt: "2024-02-15",
    },
    {
        id: "7",
        title: "Cosmic Dance",
        description: "Stars weaving through the cosmos",
        imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=800&fit=crop",
        artist: { id: "3", name: "Jordan Lee", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
        price: 650,
        likes: 423,
        category: "Space",
        createdAt: "2024-02-20",
    },
    {
        id: "8",
        title: "Floral Fantasy",
        description: "Blooming colors of spring",
        imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=550&fit=crop",
        artist: { id: "5", name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
        price: 340,
        likes: 278,
        category: "Nature",
        createdAt: "2024-02-25",
    },
    {
        id: "9",
        title: "Abstract Emotions",
        description: "Colors expressing the inexpressible",
        imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=700&fit=crop",
        artist: { id: "1", name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
        price: 520,
        likes: 389,
        category: "Abstract",
        createdAt: "2024-03-01",
    },
    {
        id: "10",
        title: "Mountain Majesty",
        description: "The grandeur of nature's peaks",
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
        artist: { id: "4", name: "Sam Taylor", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
        price: 480,
        likes: 356,
        category: "Landscape",
        createdAt: "2024-03-05",
    },
    {
        id: "11",
        title: "Digital Horizons",
        description: "Where technology meets art",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=650&fit=crop",
        artist: { id: "5", name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
        price: 890,
        likes: 612,
        category: "Digital",
        createdAt: "2024-03-10",
    },
    {
        id: "12",
        title: "Silent Forest",
        description: "Whispers among ancient trees",
        imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=500&fit=crop",
        artist: { id: "2", name: "Maya Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
        price: 410,
        likes: 267,
        category: "Nature",
        createdAt: "2024-03-15",
    },
];
export const artworkService = {
    getAll: async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return MOCK_ARTWORKS;
    },
    getByArtist: async (artistId) => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        return MOCK_ARTWORKS.filter((artwork) => artwork.artist.id === artistId);
    },
    getById: async (id) => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return MOCK_ARTWORKS.find((artwork) => artwork.id === id);
    },
    search: async (query) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const lowerQuery = query.toLowerCase();
        return MOCK_ARTWORKS.filter((artwork) => artwork.title.toLowerCase().includes(lowerQuery) ||
            artwork.category.toLowerCase().includes(lowerQuery) ||
            artwork.artist.name.toLowerCase().includes(lowerQuery));
    },
};
export default api;
