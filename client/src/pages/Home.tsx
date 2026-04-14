import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: products, isLoading } = useProducts();
  const featuredProducts = products?.filter(p => p.featured) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        {/* Luxury Watch Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80" 
            alt="Luxury Watch Hero" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center space-y-8 px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              الفخامة التي <span className="text-primary">تميزك</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light mb-10">
              اكتشف تشكيلتنا الحصرية من الساعات والعطور العالمية
            </p>
            <Link href="/category/mens-watches">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-6 rounded-full shadow-2xl shadow-primary/20 hover:scale-105 transition-transform duration-300">
                تسوق الآن
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "ساعات رجالية", img: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80", href: "/category/mens-watches" },
              { title: "ساعات نسائية", img: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80", href: "/category/womens-watches" },
              { title: "عطور فاخرة", img: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?auto=format&fit=crop&q=80", href: "/category/perfumes" },
              { title: "مستحضرات تجميل", img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80", href: "/category/cosmetics" },
            ].map((cat, idx) => (
              <Link key={idx} href={cat.href} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors z-10" />
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white border-b-2 border-primary pb-2">{cat.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-2">منتجات مميزة</h2>
              <div className="h-1 w-20 bg-primary rounded-full" />
            </div>
            <Link href="/category/all">
              <span className="text-primary hover:text-primary/80 cursor-pointer font-medium">عرض الكل &larr;</span>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brand Statement */}
      <section className="py-24 bg-card text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-display font-bold text-primary mb-6">جودة لا تضاهى</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            ننتقي لك أرقى المنتجات العالمية بعناية فائقة لنضمن لك تجربة تسوق استثنائية تليق بذوقك الرفيع.
          </p>
        </div>
      </section>
    </div>
  );
}
