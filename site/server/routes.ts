import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const data = insertSubscriptionSchema.parse(req.body);
      const subscription = await storage.createSubscription(data);
      res.json({ success: true, id: subscription.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Неверные данные формы",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Внутренняя ошибка сервера" 
        });
      }
    }
  });

  // Get user count from users.txt file
  app.get("/api/users-count", async (req, res) => {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const usersFilePath = path.join(process.cwd(), 'users.txt');
      
      try {
        const usersData = await fs.readFile(usersFilePath, 'utf-8');
        const count = parseInt(usersData.trim(), 10);
        
        if (isNaN(count)) {
          throw new Error('Invalid number format in users.txt');
        }
        
        res.json({ count });
      } catch (fileError) {
        // Fallback to storage if file doesn't exist or can't be read
        console.warn("Could not read users.txt, falling back to storage:", fileError);
        const count = await storage.getSubscriptionCount();
        res.json({ count });
      }
    } catch (error) {
      console.error("Error getting users count:", error);
      res.status(500).json({ 
        success: false, 
        message: "Ошибка получения данных" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
