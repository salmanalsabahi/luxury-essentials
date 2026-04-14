import { Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold text-primary">فخامة</h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto md:mx-0">
              وجهتكم الأولى للساعات الفاخرة والعطور العالمية. نحن نؤمن بأن الأناقة هي لغة لا تحتاج إلى كلمات.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">روابط سريعة</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">من نحن</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">الشروط والأحكام</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">تواصل معنا</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">تابعنا</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} متجر فخامة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
