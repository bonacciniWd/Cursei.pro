import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[center_top_-1px] dark:bg-grid-slate-400/[0.05] dark:bg-[center_top_-1px] pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute top-60 -right-40 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Transforme seu <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">futuro</span> com conhecimento
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0"
            >
              Acesse cursos de alta qualidade, aulas ao vivo e conteúdos exclusivos para impulsionar sua carreira e desenvolver novas habilidades.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" asChild>
                <Link to="/cursos">Explorar Cursos</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/cadastro">Criar Conta</Link>
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-8"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-bold">1000+</span>
                <span className="text-sm text-muted-foreground">Cursos</span>
              </div>
              <div className="h-10 w-px bg-border"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-bold">50k+</span>
                <span className="text-sm text-muted-foreground">Alunos</span>
              </div>
              <div className="h-10 w-px bg-border"></div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-bold">200+</span>
                <span className="text-sm text-muted-foreground">Professores</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-[500px]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-600 blur-xl opacity-20 transform -rotate-6"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border">
                <img  alt="Estudante assistindo aula online em um laptop" className="w-full h-auto" src="https://images.unsplash.com/photo-1624388611710-bdf95023d1c2" />
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Certificados</p>
                    <p className="text-xs text-muted-foreground">Reconhecidos pelo mercado</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Aulas ao Vivo</p>
                    <p className="text-xs text-muted-foreground">Interaja em tempo real</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;