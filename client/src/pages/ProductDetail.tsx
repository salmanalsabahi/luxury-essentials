import { useProduct } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, Star, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(Number(id));
  const addItem = useCart((state) => state.addItem);
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">المنتج غير موجود</h1>
        <Link href="/">
          <Button variant="outline">العودة للرئيسية</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "تمت الإضافة بنجاح",
      description: `تم إضافة ${product.name} إلى سلتك`,
      className: "bg-primary text-primary-foreground border-none",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <Link href="/">
        <Button variant="ghost" className="mb-8 hover:bg-white/5">
          <ArrowRight className="ml-2 h-4 w-4" />
          العودة للتسوق
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Product Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-card">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <span className="text-primary font-medium tracking-wider text-sm uppercase">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mt-2 mb-4">{product.name}</h1>
            <div className="flex items-center space-x-1 space-x-reverse text-yellow-500">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <span className="text-muted-foreground mr-2 text-sm">(5.0)</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-white">
            {Number(product.price).toLocaleString()} ر.س
          </div>

          <Separator className="bg-white/10" />

          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div className="flex gap-4 pt-4">
            <Button 
              size="lg" 
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg rounded-xl shadow-lg shadow-primary/20"
            >
              <ShoppingCart className="ml-2 h-5 w-5" />
              أضف إلى السلة
            </Button>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/5 space-y-3 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>الشحن:</span>
              <span className="text-white">شحن مجاني للطلبات فوق 500 ر.س</span>
            </div>
            <Separator className="bg-white/5" />
            <div className="flex justify-between">
              <span>الضمان:</span>
              <span className="text-white">ضمان ذهبي لمدة سنتين</span>
            </div>
            <Separator className="bg-white/5" />
            <div className="flex justify-between">
              <span>الاسترجاع:</span>
              <span className="text-white">متاح خلال 14 يوم</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
