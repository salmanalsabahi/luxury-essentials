import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { useParams } from "wouter";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const categoryTitles: Record<string, string> = {
  "mens-watches": "ساعات رجالية",
  "womens-watches": "ساعات نسائية",
  "perfumes": "العطور",
  "cosmetics": "مستحضرات تجميل",
  "all": "جميع المنتجات"
};

const categoryImages: Record<string, string> = {
  "mens-watches": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80",
  "womens-watches": "https://images.unsplash.com/photo-1508057198894-247b6d788d71?auto=format&fit=crop&q=80",
  "perfumes": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80",
  "cosmetics": "https://images.unsplash.com/photo-1522335789203-abd6538d8ad1?auto=format&fit=crop&q=80",
  "all": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
};

export default function Category() {
  const params = useParams();
  const categorySlug = params.category || "all";
  
  // If 'all', pass undefined to fetch everything
  const { data: products, isLoading } = useProducts(categorySlug === "all" ? undefined : categorySlug);

  const title = categoryTitles[categorySlug] || "المنتجات";
  const heroImage = categoryImages[categorySlug] || categoryImages["all"];

  return (
    <div className="min-h-screen pb-20">
      {/* Category Header */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden mb-12">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src={heroImage} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white">{title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : products && products.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground">لا توجد منتجات في هذا القسم حالياً.</p>
          </div>
        )}
      </div>
    </div>
  );
}
