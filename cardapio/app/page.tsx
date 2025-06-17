"use client";

import Header from "@/components/Header";
import DrinkCard from "@/components/DrinkCard";
import Footer from "@/components/Footer";
import Separator from "@/components/Separator";
import { drinks } from "@/data/drinks";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const drinksContainerRef = useRef<HTMLDivElement>(null);
  const drinksRef = useRef<HTMLDivElement[]>([]);
  
  // Set up a function to add elements to our refs array
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !drinksRef.current.includes(el)) {
      drinksRef.current.push(el);
    }
  };

  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Set initial position for the drinks
    gsap.set(drinksRef.current, { y: 100, opacity: 0 });
    
    // Create staggered animation for drinks that triggers on scroll
    gsap.to(drinksRef.current, {
      y: 0,
      opacity: 1,
      stagger: { 
        each: 0.15,
        grid: "auto", // Auto-detect the grid
        from: "start"
      },
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: drinksContainerRef.current,
        start: "top 90%",
        end: "bottom 50%",
        toggleActions: "play none none none",
        // markers: true, // For debugging
      }
    });
    
    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-white">
      <Header />
      <Separator />
      
      <main className="max-w-6xl mx-auto px-4 py-16 mt-6 section_2">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nossa Carta de Drinks</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Experimente nossas deliciosas criações, cocktails clássicos e drinks exclusivos preparados com os melhores ingredientes.</p>
        </div>
        
        <div id="drinks-container" ref={drinksContainerRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {drinks.map((drink) => (
            <div 
              key={drink.id} 
              ref={addToRefs}
              className="transform"
            >
              <DrinkCard drink={drink} />
            </div>
          ))}
        </div>
        
        <Footer />
      </main>
    </div>
  );
}