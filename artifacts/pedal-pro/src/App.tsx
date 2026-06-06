import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, Search, Menu, X, Star, 
  Truck, PenTool, ShieldCheck, RefreshCw,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { SiInstagram, SiFacebook, SiX, SiYoutube } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";

import heroImg from "./assets/images/hero.png";
import prodTrailblazer from "./assets/images/product-trailblazer.png";
import prodAerosprint from "./assets/images/product-aerosprint.png";
import prodCityglide from "./assets/images/product-cityglide.png";
import prodSummitjunior from "./assets/images/product-summitjunior.png";
import prodEnduroelite from "./assets/images/product-enduroelite.png";
import prodVelocityr5 from "./assets/images/product-velocityr5.png";
import catMountain from "./assets/images/category-mountain.png";
import catRoad from "./assets/images/category-road.png";
import catHybrid from "./assets/images/category-hybrid.png";
import catKids from "./assets/images/category-kids.png";

const queryClient = new QueryClient();

const PRODUCTS = [
  { id: 1, name: "TrailBlazer X9", category: "Mountain", price: 1299, rating: 4.8, image: prodTrailblazer },
  { id: 2, name: "Aero Sprint Pro", category: "Road", price: 2199, rating: 4.9, image: prodAerosprint },
  { id: 3, name: "CityGlide Hybrid", category: "Hybrid", price: 799, rating: 4.7, image: prodCityglide },
  { id: 4, name: "Summit Junior 24", category: "Kids", price: 349, rating: 4.6, image: prodSummitjunior },
  { id: 5, name: "Enduro Elite", category: "Mountain", price: 1899, rating: 4.9, image: prodEnduroelite },
  { id: 6, name: "Velocity R5", category: "Road", price: 1599, rating: 4.8, image: prodVelocityr5 }
];

const CATEGORIES = [
  { id: "mountain", name: "Mountain", count: 24, image: catMountain },
  { id: "road", name: "Road", count: 18, image: catRoad },
  { id: "hybrid", name: "Hybrid", count: 15, image: catHybrid },
  { id: "kids", name: "Kids", count: 12, image: catKids }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent selection:text-white">
      {/* Navigation Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-white py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-2xl md:text-3xl font-extrabold tracking-tighter text-primary">
              PEDAL<span className="text-accent">PRO</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
              <a href="#shop" className="hover:text-accent transition-colors">Shop</a>
              <a href="#categories" className="hover:text-accent transition-colors">Categories</a>
              <a href="#about" className="hover:text-accent transition-colors">About</a>
              <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
            </nav>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button className="hidden md:flex p-2 text-foreground hover:text-accent transition-colors" data-testid="btn-search">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-foreground hover:text-accent transition-colors group" data-testid="btn-cart">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center translate-x-1 -translate-y-1 shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
            <Button className="hidden md:flex bg-accent hover:bg-accent/90 text-white rounded-full px-6 font-semibold" data-testid="btn-nav-shop">
              Shop Now
            </Button>
            <button 
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="btn-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-border mt-4 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4 text-lg font-medium">
                <a href="#shop" className="py-2 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>Shop</a>
                <a href="#categories" className="py-2 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>Categories</a>
                <a href="#about" className="py-2 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                <a href="#contact" className="py-2 hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                <div className="pt-4 border-t border-border mt-2">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-white rounded-full h-12 text-lg">
                    Shop Now
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-0 md:h-[90vh] min-h-[600px] flex items-center bg-muted overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="Cyclist speeding down a mountain road" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 py-20 md:py-0">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl text-white"
          >
            <motion.div variants={fadeIn} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 text-accent font-semibold tracking-wide text-sm">
              NEW 2025 COLLECTION
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Find Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Perfect Ride</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-white/80 mb-10 max-w-lg leading-relaxed font-light">
              From aggressive mountain trails to sleek city commutes, we build quality bikes for people who take their rides seriously.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full h-14 px-8 text-lg font-semibold group" data-testid="btn-hero-shop">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white rounded-full h-14 px-8 text-lg font-medium backdrop-blur-sm" data-testid="btn-hero-categories">
                View Categories
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features / Trust Bar */}
      <section className="bg-primary text-primary-foreground py-8 border-y border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-x-0 md:divide-x divide-primary-foreground/20">
            <div className="flex flex-col items-center justify-center text-center px-4">
              <Truck className="w-6 h-6 mb-3 text-accent" />
              <h3 className="font-semibold text-sm">Free Shipping</h3>
              <p className="text-xs text-primary-foreground/70 mt-1">On orders over $500</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <PenTool className="w-6 h-6 mb-3 text-accent" />
              <h3 className="font-semibold text-sm">Expert Assembly</h3>
              <p className="text-xs text-primary-foreground/70 mt-1">Ready to ride</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <ShieldCheck className="w-6 h-6 mb-3 text-accent" />
              <h3 className="font-semibold text-sm">2-Year Warranty</h3>
              <p className="text-xs text-primary-foreground/70 mt-1">On all frames</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4">
              <RefreshCw className="w-6 h-6 mb-3 text-accent" />
              <h3 className="font-semibold text-sm">30-Day Returns</h3>
              <p className="text-xs text-primary-foreground/70 mt-1">No questions asked</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="shop" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary">Featured Rides</h2>
              <p className="text-muted-foreground max-w-2xl text-lg">Hand-picked by our experts. The perfect blend of performance, durability, and style.</p>
            </div>
            <Button variant="ghost" className="text-primary hover:text-accent font-semibold group">
              View All Bikes
              <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden border-border/50 bg-card hover:shadow-xl transition-all duration-300 rounded-2xl">
                  <div className="relative aspect-square bg-secondary/30 p-6 flex items-center justify-center overflow-hidden">
                    <Badge className="absolute top-4 left-4 z-10 bg-white text-primary hover:bg-white border-none shadow-sm font-semibold px-3 py-1">
                      {product.category}
                    </Badge>
                    <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center text-muted-foreground hover:text-accent transition-colors shadow-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl text-primary">{product.name}</h3>
                      <div className="flex items-center gap-1 text-sm font-medium bg-secondary px-2 py-1 rounded-md">
                        <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <span className="text-2xl font-bold text-foreground">${product.price.toLocaleString()}</span>
                      <Button 
                        onClick={addToCart}
                        className="bg-primary hover:bg-accent text-white rounded-full px-6 transition-colors"
                        data-testid={`btn-add-cart-${product.id}`}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-primary">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Find exactly what you need for your next adventure.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`#category-${category.id}`} className="group relative block h-[400px] rounded-2xl overflow-hidden shadow-md">
                  <img 
                    src={category.image} 
                    alt={`${category.name} Bikes`} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 font-medium">{category.count} Items</span>
                      <span className="flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform">
                        Browse <ArrowRight className="ml-1 w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground pt-20 pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <Link href="/" className="text-3xl font-extrabold tracking-tighter text-white block mb-6">
                PEDAL<span className="text-accent">PRO</span>
              </Link>
              <p className="text-primary-foreground/70 mb-6 leading-relaxed max-w-sm">
                Premium bicycles and gear for those who demand the best from their ride. Built for the journey ahead.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <SiInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <SiFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <SiX className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <SiYoutube className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Shop</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">Mountain Bikes</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">Road Bikes</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">Hybrid Bikes</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">Kids Bikes</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">Accessories</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">FAQ</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">Warranty</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">Bike Registration</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Newsletter</h4>
              <p className="text-primary-foreground/70 mb-4">Subscribe for the latest gear, exclusive offers, and riding tips.</p>
              <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 rounded-lg focus-visible:ring-accent"
                />
                <Button type="submit" className="bg-accent hover:bg-accent/90 text-white h-12 rounded-lg w-full font-semibold">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>&copy; {new Date().getFullYear()} Pedal Pro. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
