
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Users, BarChart3, Zap, Shield, Globe, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
