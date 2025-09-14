import { motion } from "framer-motion";

interface AnimatedGradientBackgroundProps {
  variant?: 'primary' | 'accent' | 'muted';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export function AnimatedGradientBackground({ 
  variant = 'primary', 
  intensity = 'medium',
  className = '' 
}: AnimatedGradientBackgroundProps) {
  const getGradientClass = () => {
    const baseClass = 'absolute inset-0 opacity-';
    const opacityMap = {
      low: '20',
      medium: '30', 
      high: '40'
    };
    
    const gradientMap = {
      primary: 'bg-gradient-to-br from-primary/20 via-transparent to-accent/10',
      accent: 'bg-gradient-to-tl from-accent/20 via-transparent to-primary/10',
      muted: 'bg-gradient-to-r from-muted/30 via-background to-muted/20'
    };
    
    return `${baseClass}${opacityMap[intensity]} ${gradientMap[variant]}`;
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Main animated gradient */}
      <motion.div
        className={getGradientClass()}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      
      {/* Overlay gradient that moves */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Radial gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}