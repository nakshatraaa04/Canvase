"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, Palette, Search, Upload, LayoutDashboard, User, LogOut } from "lucide-react";
const navLinks = [
    { href: "/explore", label: "Explore", icon: Search },
    { href: "/upload", label: "Upload", icon: Upload, artistOnly: true },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];
export function Navbar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const filteredLinks = navLinks.filter((link) => !link.artistOnly || (user === null || user === void 0 ? void 0 : user.role) === "artist");
    return (<motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="fixed top-0 right-0 left-0 z-50">
      <nav className="mx-4 mt-4">
        <div className="glass-card rounded-2xl px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-2">
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }} className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl">
                <Palette className="h-6 w-6 text-white"/>
              </motion.div>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-xl font-bold text-transparent">Canvase</span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {filteredLinks.map((link) => {
            const isActive = pathname === link.href;
            return (<Link key={link.href} href={link.href}>
                    <motion.div className="relative rounded-xl px-4 py-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <span className={`relative z-10 font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>{link.label}</span>
                      {isActive && <motion.div layoutId="navbar-indicator" className="absolute inset-0 rounded-xl bg-primary/10" transition={{ type: "spring", stiffness: 500, damping: 30 }}/>}
                      <motion.div className="absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-primary" initial={{ width: 0 }} whileHover={{ width: "60%" }} transition={{ duration: 0.2 }}/>
                    </motion.div>
                  </Link>);
        })}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              {user ? (<DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 rounded-full bg-secondary/50 p-1 pr-3 transition-colors hover:bg-secondary">
                      <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                        <AvatarImage src={user.avatar} alt={user.name}/>
                        <AvatarFallback className="gradient-primary text-sm text-white">{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user.name}</span>
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-card w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex cursor-pointer items-center gap-2">
                        <User className="h-4 w-4"/>
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex cursor-pointer items-center gap-2">
                        <LayoutDashboard className="h-4 w-4"/>
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="flex cursor-pointer items-center gap-2 text-destructive">
                      <LogOut className="h-4 w-4"/>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>) : (<Link href="/auth">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="gradient-primary rounded-xl border-0 px-6 text-white">Get Started</Button>
                  </motion.div>
                </Link>)}
            </div>

            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-xl p-2 transition-colors hover:bg-secondary md:hidden">
              {mobileMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
            </motion.button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden md:hidden">
                <div className="flex flex-col gap-2 pt-4 pb-2">
                  {filteredLinks.map((link, index) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (<motion.div key={link.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.1 }}>
                        <Link href={link.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"}`}>
                          <Icon className="h-5 w-5"/>
                          {link.label}
                        </Link>
                      </motion.div>);
            })}
                  {user ? (<motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: filteredLinks.length * 0.1 }}>
                      <button onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                }} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-destructive transition-colors hover:bg-destructive/10">
                        <LogOut className="h-5 w-5"/>
                        Logout
                      </button>
                    </motion.div>) : (<motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: filteredLinks.length * 0.1 }}>
                      <Link href="/auth" onClick={() => setMobileMenuOpen(false)} className="block">
                        <Button className="gradient-primary w-full rounded-xl border-0 text-white">Get Started</Button>
                      </Link>
                    </motion.div>)}
                </div>
              </motion.div>)}
          </AnimatePresence>
        </div>
      </nav>
    </motion.header>);
}
