import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-center px-4"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 100 }}
        className="mb-8"
      >
        <img  alt="Ilustração de página não encontrada" className="w-64 h-auto md:w-80" src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b" />
      </motion.div>
      
      <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-3">Página Não Encontrada</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Oops! Parece que a página que você está procurando não existe ou foi movida.
      </p>
      
      <Button size="lg" asChild>
        <Link to="/">Voltar para a Página Inicial</Link>
      </Button>
    </motion.div>
  );
};

export default NotFoundPage;