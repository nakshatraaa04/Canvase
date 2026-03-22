import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/lib/auth-context";
import { Navbar } from "@/components/navbar";
import "./globals.css";
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});
export const metadata = {
    title: "Canvase - Premium Artwork Marketplace",
    description: "Discover and collect extraordinary digital art from talented artists worldwide",
    generator: "v0.app",
    icons: {
        icon: [
            { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
            { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
            { url: "/icon.svg", type: "image/svg+xml" },
        ],
        apple: "/apple-icon.png",
    },
};
export const viewport = {
    themeColor: "#8b5cf6",
};
export default function RootLayout({ children }) {
    return (<html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <Navbar />
          <main className="pt-24">{children}</main>
        </AuthProvider>
        <Analytics />
      </body>
    </html>);
}
