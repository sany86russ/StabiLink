import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Zap, Shield, Globe, Heart, Check, User, Download, Play, ChevronRight } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useTheme } from "@/components/theme-provider";
import { TypewriterText } from "@/components/typewriter-text";
import { AnimatedCounter } from "@/components/animated-counter";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const subscriptionSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
});

type SubscriptionForm = z.infer<typeof subscriptionSchema>;

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [pricingMode, setPricingMode] = useState<"basic" | "pro">("basic");

  // Fetch user count
  const { data: userCountData } = useQuery({
    queryKey: ["/api/users-count"],
  });

  // Subscription form
  const form = useForm<SubscriptionForm>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const subscriptionMutation = useMutation({
    mutationFn: async (data: SubscriptionForm) => {
      const response = await apiRequest("POST", "/api/subscribe", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Заявка принята!",
        description: "Мы свяжемся с вами в ближайшее время.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/users-count"] });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при отправке заявки. Попробуйте еще раз.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SubscriptionForm) => {
    subscriptionMutation.mutate(data);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Dark Blue with Stars */}
      <section className="relative bg-gradient-to-br from-slate-700 via-blue-800 to-blue-900 text-white overflow-hidden">
        {/* Animated Stars */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-16 left-32 w-1 h-1 bg-white rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-24 right-24 w-1 h-1 bg-white rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div 
            className="absolute top-40 left-1/4 w-1 h-1 bg-white rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
          />
          <motion.div 
            className="absolute bottom-32 right-1/3 w-1 h-1 bg-white rounded-full"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 1.5 }}
          />
          <motion.div 
            className="absolute top-32 right-1/2 w-1 h-1 bg-white rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 2 }}
          />
          <motion.div 
            className="absolute bottom-40 left-1/3 w-1 h-1 bg-white rounded-full"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.1, repeat: Infinity, delay: 0.8 }}
          />
        </div>

        {/* Navigation with User Counter */}
        <motion.nav 
          className="relative z-10 flex flex-col sm:flex-row justify-between items-center p-4 sm:p-8 gap-4 sm:gap-0"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="w-8 h-8 bg-white rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div 
                className="w-4 h-4 bg-blue-600 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-white text-xl font-medium">StabiLink</span>
          </motion.div>
          
          <div className="flex items-center space-x-4 sm:space-x-6">
            <motion.div 
              className="text-white text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-xl sm:text-2xl font-bold">
                <AnimatedCounter 
                  target={(userCountData as any)?.count || 12000} 
                  duration={2000}
                />
              </div>
              <div className="text-xs sm:text-sm text-white/80">пользователей</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-white hover:bg-white/10 rounded-full"
              >
                <motion.div
                  animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon className="h-5 h-5 sm:h-6 sm:w-6" />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </motion.nav>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[500px]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-8"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  animate={{ 
                    textShadow: [
                      "0 0 0px rgba(59, 130, 246, 0)",
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 0px rgba(59, 130, 246, 0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <TypewriterText
                    text="Стабильный доступ к заблокированным сервисам"
                    delay={500}
                  />
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-base sm:text-lg text-white/80 mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
                whileHover={{ x: 5 }}
              >
                Обходите ограничения легко и безопасно из любой точки России.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 sm:px-8 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => scrollToSection("pricing")}
                  >
                    <motion.span
                      animate={{ opacity: [1, 0.8, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Попробовать бесплатно
                    </motion.span>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => scrollToSection("about")}
                  >
                    Подробнее о сервисе
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Illustration - Person with Laptop (matching your image) */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative">
                <svg viewBox="0 0 400 300" className="w-96 h-72">
                  {/* Person - matching your provided image style */}
                  <g>
                    {/* Body/Shirt - Blue */}
                    <path d="M140 180 Q140 160 160 160 L240 160 Q260 160 260 180 L260 240 Q260 260 240 260 L160 260 Q140 260 140 240 Z" fill="#1E40AF" />
                    
                    {/* Head - Skin tone */}
                    <circle cx="200" cy="120" r="35" fill="#FBBF24" />
                    
                    {/* Hair - Dark blue */}
                    <path d="M165 100 Q200 75 235 100 Q240 85 200 80 Q160 85 165 100" fill="#1E3A8A" />
                    
                    {/* Face features */}
                    <ellipse cx="190" cy="115" rx="2" ry="3" fill="#1E3A8A" />
                    <ellipse cx="210" cy="115" rx="2" ry="3" fill="#1E3A8A" />
                    <path d="M195 125 Q200 130 205 125" fill="none" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
                    
                    {/* Arms */}
                    <ellipse cx="120" cy="200" rx="18" ry="45" fill="#1E40AF" />
                    <ellipse cx="280" cy="200" rx="18" ry="45" fill="#1E40AF" />
                    
                    {/* Laptop - matching blue color scheme */}
                    <rect x="160" y="220" width="80" height="50" rx="8" fill="#3B82F6" />
                    <rect x="170" y="230" width="60" height="35" rx="4" fill="#1E293B" />
                    <circle cx="200" cy="247" r="2" fill="#10B981" />
                    
                    {/* Screen glow effect */}
                    <rect x="170" y="230" width="60" height="35" rx="4" fill="url(#screenGlow)" opacity="0.4" />
                  </g>
                  
                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient id="screenGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Section - Left Column and Right Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left Column - About, How it Works, Features */}
            <div className="lg:col-span-2 space-y-20">
              
              {/* About Section */}
              <div id="about">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <ScrollReveal>
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">О проекте</h2>
                    <div className="text-lg text-gray-600 space-y-4">
                      <p>StabiLink обеспечивает стабильный доступ к заблокированным сервисам и сайтам.</p>
                      <p>Мы гарантируем надежность соединения и защиту ваших данных.</p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.3}>
                    <div className="flex justify-center">
                      <div className="relative w-80 h-48">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full w-72 h-48 mx-auto"></div>
                        
                        <div className="absolute right-4 top-4 w-16 h-16">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <path d="M50 10 Q70 15 80 35 L80 55 Q80 75 50 85 Q20 75 20 55 L20 35 Q30 15 50 10" fill="#3B82F6" />
                            <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeWidth="2" />
                            <line x1="35" y1="50" x2="65" y2="50" stroke="white" strokeWidth="1.5" />
                            <line x1="50" y1="35" x2="50" y2="65" stroke="white" strokeWidth="1.5" />
                          </svg>
                        </div>

                        <div className="absolute left-8 top-8 w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-lg flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg viewBox="0 0 150 100" className="w-36 h-24">
                            <rect x="60" y="50" width="30" height="35" rx="15" fill="#3B82F6" />
                            <circle cx="75" cy="35" r="15" fill="#FBBF24" />
                            <path d="M60 25 Q75 15 90 25 Q90 20 75 18 Q60 20 60 25" fill="#1E3A8A" />
                            <rect x="65" y="75" width="20" height="15" rx="2" fill="#3B82F6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>

              {/* How it Works Section */}
              <div id="how">
                <ScrollReveal>
                  <h2 className="text-4xl font-bold text-gray-900 mb-12">Как это работает</h2>
                </ScrollReveal>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      icon: Download,
                      title: "Скачайте приложение",
                      description: "Быстрая установка на любое устройство",
                      color: "bg-gradient-to-br from-teal-400 to-teal-600"
                    },
                    {
                      icon: User,
                      title: "Регистрация аккаунта",
                      description: "Простая настройка за минуту",
                      color: "bg-gradient-to-br from-blue-400 to-blue-600"
                    },
                    {
                      icon: Shield,
                      title: "Подключение к серверам",
                      description: "Безопасное соединение автоматически",
                      color: "bg-gradient-to-br from-orange-400 to-orange-600"
                    },
                    {
                      icon: Play,
                      title: "Пользуйтесь без ограничений",
                      description: "Полный доступ ко всем сервисам",
                      color: "bg-gradient-to-br from-purple-500 to-purple-700"
                    }
                  ].map((item, index) => (
                    <ScrollReveal key={item.title} delay={index * 0.1}>
                      <motion.div 
                        className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm"
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* Features Section */}
              <div>
                <ScrollReveal>
                  <h2 className="text-4xl font-bold text-gray-900 mb-12">Преимущества</h2>
                </ScrollReveal>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Zap,
                      title: "Высокая скорость",
                      description: "Быстрое подключение без потери качества",
                      color: "bg-gradient-to-br from-orange-400 to-orange-600"
                    },
                    {
                      icon: Shield,
                      title: "Полная безопасность",
                      description: "Шифрование данных и анонимность",
                      color: "bg-gradient-to-br from-blue-400 to-blue-600"
                    },
                    {
                      icon: Globe,
                      title: "Доступ везде",
                      description: "Работает в любой точке мира",
                      color: "bg-gradient-to-br from-teal-400 to-teal-600"
                    }
                  ].map((item, index) => (
                    <ScrollReveal key={item.title} delay={index * 0.2}>
                      <motion.div 
                        className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <item.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Pricing with Toggle */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <ScrollReveal>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Тарифные планы</h2>
                  
                  {/* Plan Toggle */}
                  <div className="flex items-center justify-center bg-gray-100 rounded-2xl p-1 mb-8">
                    <Button
                      onClick={() => setPricingMode("basic")}
                      className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                        pricingMode === "basic"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "bg-transparent text-gray-600 hover:text-gray-900"
                      }`}
                      variant="ghost"
                    >
                      Базовый
                    </Button>
                    <Button
                      onClick={() => setPricingMode("pro")}
                      className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                        pricingMode === "pro"
                          ? "bg-white text-gray-900 shadow-sm"
                          : "bg-transparent text-gray-600 hover:text-gray-900"
                      }`}
                      variant="ghost"
                    >
                      Профессиональный
                    </Button>
                  </div>

                  {/* Plan Details */}
                  <motion.div
                    key={pricingMode}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-2xl p-8 shadow-lg ${
                      pricingMode === "basic"
                        ? "bg-white border border-gray-200"
                        : "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                    }`}
                  >
                    {pricingMode === "basic" ? (
                      // Basic Plan
                      <>
                        <div className="text-center mb-8">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Базовый план</h3>
                          <div className="text-5xl font-bold text-gray-900 mb-2">0₽</div>
                          <p className="text-gray-600">в месяц</p>
                        </div>
                        
                        <ul className="space-y-4 mb-8">
                          <li className="flex items-center text-gray-600">
                            <Check className="w-5 h-5 text-green-500 mr-3" />
                            Доступ к основным сервисам
                          </li>
                          <li className="flex items-center text-gray-600">
                            <Check className="w-5 h-5 text-green-500 mr-3" />
                            Стандартная скорость
                          </li>
                          <li className="flex items-center text-gray-600">
                            <Check className="w-5 h-5 text-green-500 mr-3" />
                            Техподдержка
                          </li>
                          <li className="flex items-center text-gray-600">
                            <Check className="w-5 h-5 text-green-500 mr-3" />
                            1 устройство
                          </li>
                        </ul>
                        
                        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl text-lg">
                          Выбрать Базовый
                        </Button>
                      </>
                    ) : (
                      // Pro Plan
                      <>
                        <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-sm">
                          Популярный
                        </div>
                        
                        <div className="text-center mb-8">
                          <h3 className="text-2xl font-bold mb-2">Профессиональный</h3>
                          <div className="text-5xl font-bold mb-2">299₽</div>
                          <p className="text-blue-100">в месяц</p>
                        </div>
                        
                        <ul className="space-y-4 mb-8">
                          <li className="flex items-center">
                            <Check className="w-5 h-5 text-white mr-3" />
                            Безлимитный доступ ко всем сервисам
                          </li>
                          <li className="flex items-center">
                            <Check className="w-5 h-5 text-white mr-3" />
                            Максимальная скорость
                          </li>
                          <li className="flex items-center">
                            <Check className="w-5 h-5 text-white mr-3" />
                            Приоритетная поддержка 24/7
                          </li>
                          <li className="flex items-center">
                            <Check className="w-5 h-5 text-white mr-3" />
                            До 5 устройств
                          </li>
                          <li className="flex items-center">
                            <Check className="w-5 h-5 text-white mr-3" />
                            Премиум серверы
                          </li>
                        </ul>
                        
                        <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 py-4 rounded-xl text-lg font-semibold">
                          Выбрать Профессиональный
                        </Button>
                      </>
                    )}
                  </motion.div>

                  {/* Team Illustration */}
                  <div className="mt-8 flex justify-center">
                    <div className="relative">
                      <svg viewBox="0 0 300 200" className="w-72 h-48">
                        <rect width="300" height="200" fill="#F8FAFC" rx="15" />
                        
                        {/* Man */}
                        <g>
                          <path d="M90 120 Q90 105 105 105 L135 105 Q150 105 150 120 L150 160 Q150 170 135 170 L105 170 Q90 170 90 160 Z" fill="#1E3A8A" />
                          <circle cx="120" cy="85" r="18" fill="#FBBF24" />
                          <path d="M102 75 Q120 65 138 75 Q138 70 120 68 Q102 70 102 75" fill="#1E3A8A" />
                        </g>
                        
                        {/* Woman */}
                        <g>
                          <path d="M150 120 Q150 105 165 105 L195 105 Q210 105 210 120 L210 160 Q210 170 195 170 L165 170 Q150 170 150 160 Z" fill="#3B82F6" />
                          <circle cx="180" cy="85" r="18" fill="#FBBF24" />
                          <path d="M162 75 Q180 60 198 75 L200 95 Q200 110 198 115 Q180 118 162 115 Q160 110 160 95 Z" fill="#1E3A8A" />
                          <ellipse cx="218" cy="120" rx="8" ry="15" fill="#FBBF24" transform="rotate(15 218 120)" />
                        </g>
                        
                        {/* Laptop */}
                        <rect x="135" y="150" width="60" height="30" rx="4" fill="#3B82F6" />
                        <rect x="142" y="157" width="46" height="23" rx="2" fill="#1E293B" />
                      </svg>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
              StabiLink в цифрах
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                number: "99.9%",
                label: "Время работы",
                icon: "⚡",
                color: "from-orange-400 to-orange-600"
              },
              {
                number: "150+",
                label: "Серверов",
                icon: "🌐",
                color: "from-blue-400 to-blue-600"
              },
              {
                number: "24/7",
                label: "Поддержка",
                icon: "🛡️",
                color: "from-green-400 to-green-600"
              },
              {
                number: "0",
                label: "Логов",
                icon: "🔒",
                color: "from-purple-400 to-purple-600"
              }
            ].map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.1}>
                <motion.div 
                  className="text-center p-4 md:p-6 bg-gray-50 rounded-2xl"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10
                  }}
                  style={{ 
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 text-lg md:text-2xl`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div 
                    className="text-2xl md:text-4xl font-bold text-gray-900 mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Почему выбирают StabiLink?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Мы предоставляем стабильный доступ к заблокированным сервисам в России, 
                обеспечивая безопасность и анонимность ваших данных
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Обход блокировок",
                description: "Доступ к YouTube, Instagram, Facebook, Twitter и другим заблокированным сервисам без ограничений",
                icon: Shield,
                color: "from-red-400 to-red-600",
                features: ["YouTube", "Instagram", "Facebook", "Twitter"]
              },
              {
                title: "Скрытие IP-адреса", 
                description: "Полная анонимность в сети. Ваш реальный IP-адрес скрыт от посторонних глаз",
                icon: Globe,
                color: "from-purple-400 to-purple-600",
                features: ["Анонимность", "Шифрование", "Безопасность"]
              },
              {
                title: "Высокая скорость",
                description: "Премиум серверы обеспечивают максимальную скорость соединения без потерь качества",
                icon: Zap,
                color: "from-orange-400 to-orange-600", 
                features: ["До 1 Гбит/с", "Низкий пинг", "Стабильность"]
              },
              {
                title: "Простота использования",
                description: "Установка за 2 минуты. Никаких сложных настроек - просто подключитесь и пользуйтесь",
                icon: User,
                color: "from-green-400 to-green-600",
                features: ["Быстрая установка", "Автонастройка", "Простой интерфейс"]
              },
              {
                title: "Поддержка устройств",
                description: "Работает на всех популярных устройствах: Windows, Mac, iOS, Android, роутеры",
                icon: Download,
                color: "from-blue-400 to-blue-600",
                features: ["Windows", "macOS", "iOS", "Android"]
              },
              {
                title: "Круглосуточная поддержка",
                description: "Техническая поддержка 24/7 на русском языке. Решим любую проблему быстро и эффективно",
                icon: Heart,
                color: "from-pink-400 to-pink-600",
                features: ["24/7", "Русский язык", "Быстрый ответ"]
              }
            ].map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <motion.div 
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                  whileHover={{ 
                    y: -8,
                    scale: 1.02
                  }}
                  style={{ 
                    boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 80
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6`}
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feature, i) => (
                      <motion.span 
                        key={feature}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs md:text-sm rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1, backgroundColor: "#e5e7eb" }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <ScrollReveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  Максимальная безопасность и приватность
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Шифрование AES-256",
                      description: "Военный уровень шифрования защищает ваши данные"
                    },
                    {
                      title: "Политика No-Logs",
                      description: "Мы не ведем логи вашей активности в сети"
                    },
                    {
                      title: "Kill Switch",
                      description: "Автоматическое отключение интернета при разрыве VPN"
                    },
                    {
                      title: "DNS защита",
                      description: "Защита от утечек DNS и блокировка рекламы"
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={item.title}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 10 }}
                    >
                      <motion.div 
                        className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"
                        whileHover={{ scale: 1.5 }}
                        transition={{ duration: 0.2 }}
                      />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-300 text-sm md:text-base">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 md:p-8 border border-gray-700"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg md:text-xl font-semibold">Защищенное соединение</h3>
                    <motion.div 
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Статус:</span>
                      <span className="text-green-400 font-semibold">Защищено</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Протокол:</span>
                      <span className="text-blue-400 font-semibold">WireGuard</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Шифрование:</span>
                      <span className="text-purple-400 font-semibold">AES-256</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">IP адрес:</span>
                      <span className="text-orange-400 font-semibold">Скрыт</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="flex items-center justify-center space-x-2 text-green-400">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Shield className="w-5 h-5" />
                      </motion.div>
                      <span className="font-semibold text-sm md:text-base">Ваша активность защищена</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Следите за новостями StabiLink
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Подписывайтесь на наш Telegram канал для получения последних обновлений
            </p>
            
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold inline-flex items-center space-x-3"
              onClick={() => window.open('https://t.me/stabilink_official', '_blank')}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span>Подписаться на Telegram</span>
            </Button>
            
            <p className="text-sm text-gray-500 mt-8">
              © 2025 StabiLink. Все права защищены.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}