"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { drinks } from "@/data/drinks";

// Função para gerar cores de listras conforme especificado
const getStripeColor = (index: number): string => {
  // Palette de cores específicas: preta, branca, azul, vermelha e verde
  const colors = [
    
    '#ffffff', // branca
    '#e30613', // vermelha
  ];
  
  // Repetir padrões de cores
  return colors[index % colors.length];
};

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial animation on page load
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    timeline
      .fromTo(headerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })
      .fromTo(logoRef.current, 
        { scale: 0.9, opacity: 0, rotate: -90 }, 
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)", rotate: 0 }
      )      .fromTo(badgeRef.current, 
        { y: 10, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      // Animate the stripes one by one - listras verticais contínuas
    const stripeElements = document.querySelectorAll('.stripe-line');
    
    // Set up each stripe with its own delay - sem dependência de scroll
    stripeElements.forEach((stripe, index) => {
      // Create a GSAP animation for each stripe - crescimento vertical
      gsap.fromTo(stripe, 
        {
          scaleY: 0,
          opacity: 0
        },
        {
          scaleY: 1,
          opacity: 0.85,
          duration: 0.3 + Math.random() * 0.2, 
          ease: "power1.out",
          delay: 0.3 + index * 0.03, // Pequeno atraso após a animação inicial
          overwrite: 'auto'
        }
      );
    });    // Cleanup function
    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger && typeof trigger.kill === 'function') {
          trigger.kill();
        }
      });
    };
  }, []);
  
  return (    <header      ref={headerRef}
      className="text-white relative overflow-hidden min-h-[90vh] flex items-center justify-center w-full"
    >{/* Container para as listras animadas */}      <div className="absolute inset-0 overflow-visible w-full">        {/* Geramos listras verticais contínuas coloridas como na imagem */}
        {Array.from({ length: 17 }).map((_, index) => (
          <div 
            key={index}
            className="stripe-line"
            style={{
              left: `${index * 6.25}%`,
              width: '6.25%', // Largura ajustada para dividir 100% em 16 partes iguais
              backgroundColor: getStripeColor(index),
              transformOrigin: 'top',
              transform: 'scaleY(0)',
              top: 0,
              bottom: 0,
              height: '100%',
              zIndex: 1,
            }}
          />
        ))}
      </div>
      
      <div className="absolute inset-0 bg-black/5 z-[2]"></div>
      
      <div className="title_container relative max-w-md mx-auto py-12 px-4 text-center z-10">
        <div className="flex justify-center mb-6">
          <div className="relative flex justify-center items-center">            <Image
              ref={logoRef}
              src="/poko-loko.svg"
              alt="Poko Loko Logo"
              width={220}
              height={220}
              className="w-56 h-56 drop-shadow-xl"
              style={{ position: 'relative', zIndex: 10 }}
            />
          </div>
        </div>
        <div 
          ref={badgeRef}
          className="bg-gray-900/90 backdrop-blur-sm rounded-full px-6 py-3 inline-block shadow-lg mt-8"
        >
          <span className="text-sm font-medium text-white">✨ {drinks.length} bebidas exclusivas disponíveis</span>
        </div>      </div>
    </header>
  );
}