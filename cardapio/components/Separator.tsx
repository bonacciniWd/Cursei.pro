"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Separator() {
  const separatorRef = useRef<HTMLDivElement>(null);
  const boiaRef = useRef<HTMLDivElement>(null);
  const cordaEsquerdaRef = useRef<HTMLDivElement>(null);
  const cordaDireitaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Registrar o ScrollTrigger no GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Referências para uso no cleanup
    const separator = separatorRef.current;
    const boia = boiaRef.current;
    const cordaEsquerda = cordaEsquerdaRef.current;
    const cordaDireita = cordaDireitaRef.current;
    
    // Animação de entrada do separador (sem efeito de opacidade)
    gsap.fromTo(
      separator,
      { 
        y: 20,
        opacity: 0
      },
      { 
        y: 0, 
        opacity: 1,
        duration: 0.8, 
        ease: "power2.out",
        delay: 0.3
      }
    );
    
    // Animação da boia rolando com base no scroll - apenas rotação, sem movimento lateral
    const boiaAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3 // Reduzido para uma resposta mais imediata ao scroll
      }
    });
      boiaAnimation.to(boia, {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      rotation: (_index: number) => {
        // Rotacionar baseado na direção do scroll
        const scrollDirection = ScrollTrigger.getAll()[0]?.direction || 1;
        
        // Calcula rotação baseada na direção
        const baseRotation = scrollDirection * -180;
        
        // Amplifica o efeito para torná-lo mais visível
        return baseRotation * 1.5;
      },
      svgOrigin: "60 60", // Coordenadas centrais do SVG da boia (baseado no viewBox)
      transformOrigin: "center center",
      ease: "power1.out" // Alterado para power1 para resposta mais imediata
    });
    
    // Animação das cordas "saindo" dos cantos em direção à boia
    const cordaEsquerdaAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: separator,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      }
    });
    
    cordaEsquerdaAnimation.fromTo(
      cordaEsquerda,
      {
        scaleX: 0.7,
        transformOrigin: "left center",
      },
      {
        scaleX: 1,
        ease: "power1.out",
      }
    );
    
    const cordaDireitaAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: separator,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      }
    });
    
    cordaDireitaAnimation.fromTo(
      cordaDireita,
      {
        scaleX: 0.7,
        transformOrigin: "right center",
      },
      {
        scaleX: 1,
        ease: "power1.out",
      }
    );
    
    // Limpar quando o componente for desmontado
    return () => {
      if (boiaAnimation.scrollTrigger) boiaAnimation.scrollTrigger.kill();
      if (cordaEsquerdaAnimation.scrollTrigger) cordaEsquerdaAnimation.scrollTrigger.kill();
      if (cordaDireitaAnimation.scrollTrigger) cordaDireitaAnimation.scrollTrigger.kill();
      gsap.killTweensOf([separator, boia, cordaEsquerda, cordaDireita]);
    };
  }, []);

  return (
    <div 
      ref={separatorRef}
      className="relative w-full overflow-visible h-0 -mt-10 mb-28 z-20"
    >
      <div className="flex items-center justify-center relative max-w-6xl mx-auto">
        <div ref={cordaEsquerdaRef} className="flex-1 relative">
          <Image 
            src="/corda-esquerda.svg" 
            alt="Corda esquerda" 
            width={400} 
            height={88}
            className="w-full h-auto"
            priority
          />
        </div>
        
        <div 
          ref={boiaRef} 
          className="relative z-20 mx-4 transform flex items-center justify-center w-[80px] h-[80px]"
          role="buoy-container"
        >
          <Image 
            src="/boia.svg" 
            alt="Boia salva-vidas" 
            width={50} 
            height={50}
            className="drop-shadow-xl origin-center w-full h-full"
            priority
            style={{ transformOrigin: 'center center' }}
          />
        </div>
        
        <div ref={cordaDireitaRef} className="flex-1 relative">
          <Image 
            src="/corda-direita.svg" 
            alt="Corda direita" 
            width={400} 
            height={132}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}
