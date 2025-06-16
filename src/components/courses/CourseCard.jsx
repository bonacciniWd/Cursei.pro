import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";

const CourseCard = ({ course, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-background rounded-xl border shadow-sm overflow-hidden hover-scale"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img   
          alt={`Imagem do curso ${course.title}`} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794" />
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
        
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.lessonsCount || 0} aulas</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.studentsCount || 0} alunos</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img   
                alt={`Avatar do instrutor ${course.instructor?.name}`} 
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1679500502523-b40fb6f0563d" />
            </div>
            <span className="text-sm font-medium">{course.instructor?.name || 'Instrutor não definido'}</span>
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

export default CourseCard;