"use client"
import { ClockIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/vrz.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.log('Animation file not found:', error));
  }, []);
  return (    <footer className="mt-20 bg-black rounded-2xl shadow-lg p-8 mb-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-white mb-3">Informações</h3>
        <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mx-auto"></div>
      </div><div className="space-y-4">
        <div className="flex items-center justify-center space-x-3 text-white">
          <ClockIcon className="w-5 h-5 text-indigo-400" />
          <span className="text-sm">Ter-Sáb: 18h às 00h</span>
        </div>
        
        <div className="flex items-center justify-center space-x-3 text-white">
          <PhoneIcon className="w-5 h-5 text-indigo-400" />
          <span className="text-sm">(43) 99987-9931</span>
        </div>
        
        <div className="flex items-center justify-center space-x-3 text-white">
          <MapPinIcon className="w-5 h-5 text-indigo-400" />
          <span className="text-sm">Bandeirantes, PR</span>
        </div>
      </div>
        <div className="mt-6 pt-4 border-t border-gray-700 text-center">
        <p className="text-white text-sm">
          🍹 Todos os drinks são preparados na hora
        </p>
        <p className="text-gray-300 text-xs mt-1">
          Preços sujeitos a alteração sem aviso prévio
        </p>
      </div>      <div className="mt-4 text-center">
        <p className="text-xs text-gray-300">
          © 2025 Cardápio Digital 
        </p>        {animationData && (
          <div className="flex justify-center mt-2">
            <a 
              href="https://vrzstudio.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <Lottie 
                animationData={animationData} 
                className="w-20 h-20" 
                loop={true}
              />
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}
