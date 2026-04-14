import { Product } from "@shared/schema";
import { Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({
      title: "تمت الإضافة للسلة",
      description: `${product.name} أضيف إلى سلة المشتريات`,
      className: "bg-primary text-primary-foreground border-none",
    });
  };

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <motion.div 
        className="h-full bg-card rounded-xl overflow-hidden border border-white/5 shadow-lg hover:shadow-primary/10 transition-all duration-300"
        whileHover={{ y: -5 }}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button 
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl"
            >
              <ShoppingCart className="ml-2 h-5 w-5" />
              أضف إلى السلة
            </Button>
          </div>
        </div>
        
        <div className="p-5 text-center">
          <p className="text-sm text-primary mb-2 font-medium">{product.category}</p>
          <h3 className="text-lg font-display font-bold text-foreground mb-3 line-clamp-1">{product.name}</h3>
          <p className="text-xl font-bold text-white/90">
            {Number(product.price).toLocaleString()} ر.س
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
