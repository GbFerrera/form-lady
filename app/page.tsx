"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleStart = contextSafe(() => {
    try {
      const tl = gsap.timeline({
        onComplete: () => {
          router.push('/avaliacao');
        }
      });

      // 1. A logo gira e encolhe como se fosse um botão interativo
      tl.to(logoRef.current, { scale: 0, rotation: 180, duration: 0.5, ease: "back.in(1.7)" }, 0);
      
      // 2. O conteúdo inferior esmaece
      tl.to(".intro-content", { opacity: 0, y: 20, duration: 0.4 }, 0);
      
      // 3. Efeito de cartão se abrindo (metade superior sobe, inferior desce)
      tl.to(topHalfRef.current, { yPercent: -100, duration: 0.8, ease: "power3.inOut" }, 0.4);
      tl.to(bottomHalfRef.current, { yPercent: 100, duration: 0.8, ease: "power3.inOut" }, 0.4);
      
    } catch (error) {
      router.push('/avaliacao');
    }
  });

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gray-50 font-sans overflow-hidden">
      {/* --- TELA INICIAL --- */}
      <div 
        className="fixed inset-0 z-50 flex flex-col bg-transparent cursor-pointer"
        onClick={handleStart}
      >
        {/* Top Half - Background Image */}
        <div ref={topHalfRef} className="relative w-full h-[55vh] bg-gray-100 origin-top z-10">
          <Image
            src="/image.png"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        {/* Bottom Half - White Background with subtle pattern */}
        <div ref={bottomHalfRef} className="relative w-full h-[45vh] bg-white flex flex-col items-center pt-28 pb-8 px-4 origin-bottom overflow-visible z-20">
          {/* Background Image da Clínica na Intro */}
          <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
            <Image
              src="/bg-lady.svg"
              alt="Fundo decorativo"
              fill
              className="object-cover object-center"
              quality={100}
            />
          </div>

          {/* Logo Circle (Overlapping) */}
          <div 
            ref={logoRef} 
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center p-6 z-30 group"
          >
            {/* Fundo da logo estampado cortado para caber no círculo */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-[0.08] pointer-events-none">
              <Image
                src="/bg-lady.svg"
                alt="Fundo decorativo logo"
                fill
                className="object-cover object-center"
              />
            </div>
            {/* Ripple Effects (Ondas) */}
            <div className="absolute inset-0 rounded-full border-[3px] border-[#E27E82] animate-ping opacity-20 pointer-events-none" style={{ animationDuration: '2.5s' }}></div>
            <div className="absolute inset-0 rounded-full border-[3px] border-[#E27E82] animate-ping opacity-20 pointer-events-none" style={{ animationDuration: '2.5s', animationDelay: '1.2s' }}></div>
            
            <div className="relative w-full h-full z-10 pointer-events-none">
              <Image
                src="/logo-lady-vetorizada.svg"
                alt="Logo Clínica Lady"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          <div className="intro-content text-center space-y-8 max-w-md w-full relative z-40">
            <h1 className="text-[#E27E82] text-5xl sm:text-6xl font-clicker drop-shadow-sm">
              Clínica lady
            </h1>
            <button
              type="button"
              className="group w-full sm:w-auto px-12 py-4 bg-[#E27E82] text-white text-3xl font-bold  font-clicker rounded-full shadow-[0_10px_25px_rgba(226,126,130,0.4)] hover:bg-[#d66d71] active:scale-95 active:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer touch-manipulation z-50 pointer-events-none"
            >
              {/* Efeito de brilho no botão para chamar atenção */}
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
              Toque aqui para iniciar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
