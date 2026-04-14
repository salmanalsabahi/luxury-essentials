import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 container mx-auto px-4">
        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-3xl font-display font-bold">سلة المشتريات فارغة</h2>
        <p className="text-muted-foreground text-center max-w-md">
          يبدو أنك لم تقم بإضافة أي منتجات للسلة بعد. تصفح مجموعتنا الفاخرة وابدأ التسوق.
        </p>
        <Link href="/">
          <Button size="lg" className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
            تصفح المنتجات
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-display font-bold mb-8">سلة المشتريات ({items.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="group bg-card border border-white/5 rounded-2xl p-4 flex gap-6 hover:border-primary/30 transition-colors">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1">{item.name}</h3>
                    <p className="text-sm text-primary">{item.category}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mt-2 -ml-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center space-x-3 space-x-reverse bg-background rounded-lg border border-white/10 p-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 hover:bg-white/10"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 hover:bg-white/10"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="font-bold text-xl text-white">
                    {(Number(item.price) * item.quantity).toLocaleString()} ر.س
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button 
            variant="ghost" 
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={clearCart}
          >
            إفراغ السلة
          </Button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-white/10 rounded-2xl p-6 sticky top-24 shadow-2xl">
            <h3 className="text-xl font-bold mb-6">ملخص الطلب</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-muted-foreground">
                <span>المجموع الفرعي</span>
                <span className="text-white">{total().toLocaleString()} ر.س</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>الشحن</span>
                <span className="text-green-400">مجاني</span>
              </div>
              
              <Separator className="bg-white/10 my-4" />
              
              <div className="flex justify-between text-xl font-bold">
                <span>الإجمالي</span>
                <span className="text-primary">{total().toLocaleString()} ر.س</span>
              </div>

              <Button className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl mt-6 font-bold shadow-lg shadow-primary/20">
                إتمام الشراء
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
                <span>🔒</span>
                <span>تسوق آمن ومشفر 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
