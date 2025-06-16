import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Play, Clock, BookOpen, Award } from "lucide-react";

const CourseHeader = ({ course, onEnroll, isEnrolled }) => {
  return (
    <section className="relative py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="absolute inset-0 bg-grid-slate-900/[0.1] bg-[center_top_-1px] pointer-events-none"></div>
      
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {course.title}
            </h1>
            
            <p className="text-blue-100 mb-6">
              {course.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-200" />
                <span>{course.duration}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-200" />
                <span>{course.lessonsCount} aulas</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-200" />
                <span>Certificado incluso</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {isEnrolled ? (
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Play className="mr-2 h-4 w-4" />
                  Continuar Curso
                </Button>
              ) : (
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" onClick={onEnroll}>
                  Matricular-se {course.price ? `- R$ ${course.price.toFixed(2)}` : "Grátis"}
                </Button>
              )}
              
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                Assistir Prévia
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto max-w-[500px]"
          >
            <div className="absolute inset-0 rounded-3xl bg-white blur-xl opacity-20 transform -rotate-6"></div>
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border">
              <img  
                alt={course.imageDescription || "Imagem do curso"} 
                className="w-full h-auto" 
               src="https://images.unsplash.com/photo-1507131679781-70be42a343e7" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                  <Play className="h-6 w-6 text-blue-600 ml-1" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CourseHeader;