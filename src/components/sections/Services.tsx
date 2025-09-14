import { motion } from "framer-motion";
import { Code, Palette, Smartphone, Search, Zap, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedGradientBackground } from "@/components/background/AnimatedGradientBackground";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies and best practices.",
    features: ["React & Next.js", "Full-Stack Solutions", "API Integration", "Performance Optimization"]
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that enhance user experience and drive engagement.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android devices.",
    features: ["React Native", "Flutter", "App Store Optimization", "Mobile-First Design"]
  },
  {
    icon: Search,
    title: "SEO & Marketing",
    description: "Comprehensive digital marketing strategies to boost your online presence.",
    features: ["Technical SEO", "Content Strategy", "Social Media", "Analytics & Reporting"]
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast websites that provide exceptional user experiences.",
    features: ["Core Web Vitals", "Image Optimization", "Caching Strategies", "CDN Implementation"]
  },
  {
    icon: Globe,
    title: "Digital Strategy",
    description: "Strategic planning and consulting to align technology with business goals.",
    features: ["Technology Consulting", "Digital Transformation", "Process Automation", "Growth Strategy"]
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedGradientBackground variant="muted" intensity="low" />
      
      {/* Additional Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 0.8, 1.2],
            opacity: [0.1, 0.3, 0.1],
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-8 h-8 border border-primary/10 rotate-45"
          animate={{
            y: [0, -200, 0],
            rotate: [45, 225, 45],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-6 h-6 bg-accent/10 rounded-full"
          animate={{
            y: [0, -150, 0],
            x: [0, 50, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 2,
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We offer comprehensive digital solutions to help your business thrive in the modern world. 
            From concept to deployment, we've got you covered.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="card-elevated h-full group">
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-8">
            Ready to transform your digital presence?
          </p>
          <button className="btn-hero">
            Discuss Your Project
          </button>
        </motion.div>
      </div>
    </section>
  );
}