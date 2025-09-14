import { useEffect, useRef } from 'react';

interface CodeRainProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function CodeRainBackground({ className = '', intensity = 'low' }: CodeRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix code characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|';
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array to store y position of each column
    const drops: number[] = [];
    
    // Initialize drops
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const intensityMap = {
      low: { speed: 100, opacity: 0.1 },
      medium: { speed: 80, opacity: 0.15 },
      high: { speed: 60, opacity: 0.2 }
    };

    const settings = intensityMap[intensity];

    const draw = () => {
      // Semi-transparent background to create fade effect
      ctx.fillStyle = `rgba(var(--background-rgb), 0.05)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = `hsla(var(--primary), ${settings.opacity})`;
      ctx.font = `${fontSize}px monospace`;

      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, settings.speed);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity: 0.6 }}
    />
  );
}