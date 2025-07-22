// src/containers/dashboard/components/Smooth360View.tsx
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const images360 = Array.from({ length: 2 }, (_, i) => {
  const angle = i * 15;
  return import(`../../assets/images/turtle${angle}.png`);
});

interface Smooth360ViewProps {
  autoRotate?: boolean;
  rotationSpeed?: number;
  sensitivity?: number;
  className?: string;
}

const Smooth360View: React.FC<Smooth360ViewProps> = ({
  autoRotate = true,
  rotationSpeed = 15, // slower for 9 images
  sensitivity = 10, // less sensitive for 9 images
  className = "",
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const animationRef = useRef<number>();
  const lastRotationTime = useRef<number>(Date.now());
  const floatIndex = useRef<number>(0);

  useEffect(() => {
    Promise.all(images360).then((modules) => {
      const imagePaths = modules.map((module) => module.default);
      setLoadedImages(imagePaths);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (autoRotate && !isDragging && loadedImages.length > 0) {
      const animate = () => {
        const now = Date.now();
        const delta = now - lastRotationTime.current;
        lastRotationTime.current = now;

        const rotationIncrement =
          (delta / (rotationSpeed * 1000)) * loadedImages.length;
        floatIndex.current =
          (floatIndex.current + rotationIncrement) % loadedImages.length;

        setCurrentImageIndex(Math.floor(floatIndex.current));
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [autoRotate, isDragging, loadedImages.length, rotationSpeed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || loadedImages.length === 0) return;

    const deltaX = e.clientX - startX;
    const imageChange = deltaX / sensitivity;

    if (Math.abs(imageChange) >= 1) {
      floatIndex.current =
        (floatIndex.current - Math.floor(imageChange) + loadedImages.length) %
        loadedImages.length;
      setCurrentImageIndex(Math.floor(floatIndex.current));
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    lastRotationTime.current = Date.now();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || loadedImages.length === 0) return;

    const deltaX = e.touches[0].clientX - startX;
    const imageChange = deltaX / sensitivity;

    if (Math.abs(imageChange) >= 1) {
      floatIndex.current =
        (floatIndex.current - Math.floor(imageChange) + loadedImages.length) %
        loadedImages.length;
      setCurrentImageIndex(Math.floor(floatIndex.current));
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    lastRotationTime.current = Date.now();
  };

  return (
    <div
      className={`relative select-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 bg-gradient-radial from-luxury-gold-500/20 via-transparent to-transparent blur-3xl" />

      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-luxury-gold-500/20 border-t-luxury-gold-500 rounded-full animate-spin" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={loadedImages[currentImageIndex]}
            alt="Pink Diamond Turtle"
            className={`w-full h-full object-contain relative z-10 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
      )}
    </div>
  );
};

export default Smooth360View;
