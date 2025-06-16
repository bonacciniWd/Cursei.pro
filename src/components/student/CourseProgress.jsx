import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, BookOpen, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const CourseProgress = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border shadow-sm overflow-hidden"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img  
          alt={`Imagem do curso ${course.title}`} 
          className="w-full h-full object-cover"
         src="https://images.unsplash.com/photo-1507131679781-70be42a343e7" />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progresso</span>
          <span className="text-sm font-medium">{course.progress}%</span>
        </div>
        
        <Progress value={course.progress} className="h-2 mb-4" />
        
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Último acesso: {course.lastAccess}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.completedLessons} de {course.totalLessons} aulas</span>
          </div>
        </div>
        
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
          
          <Button asChild>
            <Link to={`/curso/${course.id}/aula/${course.currentLessonId}`}>
              {course.progress === 100 ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Concluído
                </>
              ) : (
                <>Continuar</>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseProgress;