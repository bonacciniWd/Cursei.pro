import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CourseCard = ({ course, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-background rounded-xl border shadow-sm overflow-hidden hover-scale"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img  
          alt={`Imagem do curso ${course.title}`} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
         src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
      </div>
      
      {course.price ? (
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm font-medium py-1 px-3 rounded-full">
          R$ {course.price.toFixed(2)}
        </div>
      ) : (
        <div className="absolute top-4 right-4 bg-green-500 text-white text-sm font-medium py-1 px-3 rounded-full">
          Gratuito
        </div>
      )}
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{course.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img  
                alt={`Avatar do instrutor ${course.instructor}`} 
                className="w-full h-full object-cover"
               src="https://images.unsplash.com/photo-1679500502523-b40fb6f0563d" />
            </div>
            <span className="text-sm font-medium">{course.instructor}</span>
          </div>
          
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/curso/${course.id}`}>
              Ver curso
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedCourses = () => {
  const featuredCourses = [
    {
      id: 1,
      title: "Desenvolvimento Web Completo",
      description: "Aprenda HTML, CSS, JavaScript, React, Node.js e mais para se tornar um desenvolvedor web full-stack.",
      instructor: "Ana Silva",
      price: 89.90,
      imageDescription: "Tela de computador mostrando código HTML, CSS e JavaScript com um layout de site moderno"
    },
    {
      id: 2,
      title: "Marketing Digital Estratégico",
      description: "Domine as principais estratégias de marketing digital para aumentar a visibilidade da sua marca.",
      instructor: "Carlos Mendes",
      price: 79.90,
      imageDescription: "Pessoa analisando gráficos de marketing digital em um computador com planilhas e dashboards"
    },
    {
      id: 3,
      title: "Design UX/UI Avançado",
      description: "Crie interfaces incríveis e experiências de usuário memoráveis com as melhores práticas de UX/UI.",
      instructor: "Juliana Costa",
      price: 99.90,
      imageDescription: "Mesa de designer com tablet gráfico, sketches de wireframes e protótipos de interface"
    },
    {
      id: 4,
      title: "Introdução à Inteligência Artificial",
      description: "Entenda os fundamentos da IA e como ela está transformando diversos setores da economia.",
      instructor: "Roberto Alves",
      price: null, // Gratuito
      imageDescription: "Representação visual de redes neurais e algoritmos de inteligência artificial com conexões brilhantes"
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Cursos em Destaque</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Explore nossos cursos mais populares e comece sua jornada de aprendizado hoje mesmo.
            </p>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0" asChild>
            <Link to="/cursos" className="flex items-center">
              Ver todos os cursos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;