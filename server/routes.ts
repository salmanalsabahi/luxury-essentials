import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.products.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const products = await storage.getProducts(category);
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  // Seed data function
  async function seedDatabase() {
    const existingProducts = await storage.getProducts();
    if (existingProducts.length === 0) {
      console.log("Seeding database...");
      const luxuryProducts = [
        {
          name: "رولكس ديت جست - ذهبي",
          description: "ساعة فاخرة تجمع بين الأناقة والدقة، مطلية بالذهب عيار 18.",
          price: "45000",
          category: "ساعات رجالية",
          image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=2400",
          featured: true
        },
        {
          name: "شانيل نوه 5",
          description: "العطر الأيقوني للمرأة العصرية، رائحة تدوم طويلاً.",
          price: "650",
          category: "العطور",
          image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000",
          featured: true
        },
        {
          name: "أوميغا سي ماستر",
          description: "ساعة الغواصين المحترفين، مقاومة للماء وتصميم رياضي فاخر.",
          price: "22000",
          category: "ساعات رجالية",
          image: "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?auto=format&fit=crop&q=80&w=1000",
          featured: false
        },
        {
          name: "كارتييه تانك",
          description: "تصميم كلاسيكي ناعم يناسب المرأة الأنيقة.",
          price: "18500",
          category: "ساعات نسائية",
          image: "https://images.unsplash.com/photo-1509941943102-10c232535736?auto=format&fit=crop&q=80&w=1000",
          featured: true
        },
        {
          name: "ديور سوفاج",
          description: "عطر رجالي قوي وجذاب، يمنحك الثقة طوال اليوم.",
          price: "550",
          category: "العطور",
          image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1000",
          featured: true
        },
        {
          name: "مجموعة العناية بالبشرة الفاخرة",
          description: "مجموعة متكاملة للعناية بالبشرة والحفاظ على نضارتها.",
          price: "1200",
          category: "مستحضرات تجميل",
          image: "https://images.unsplash.com/photo-1571781926291-280553afa435?auto=format&fit=crop&q=80&w=1000",
          featured: false
        },
        {
          name: "عود ملكي",
          description: "دهن عود فاخر برائحة شرقية أصيلة.",
          price: "950",
          category: "العطور",
          image: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?auto=format&fit=crop&q=80&w=1000",
          featured: true
        }
      ];

      for (const p of luxuryProducts) {
        await storage.createProduct(p);
      }
      console.log("Database seeded successfully.");
    }
  }

  seedDatabase();

  return httpServer;
}
