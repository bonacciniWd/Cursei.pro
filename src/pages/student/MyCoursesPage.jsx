import React, { useState } from "react";
import { useCourses } from "@/contexts/CoursesContext";
import CourseProgress from "@/components/student/CourseProgress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const MyCoursesPage = () => {
  const { enrolledCourses } = useCourses(); // Assuming this returns detailed course objects with progress
  const [searchTerm, setSearchTerm] = useState("");

  const activeCourses = enrolledCourses.filter(course => (course.progress || 0) < 100);
  const completedCourses = enrolledCourses.filter(course => (course.progress || 0) === 100);

  const filterCourses = (courses) => {
    if (!searchTerm) return courses;
    return courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Meus Cursos</h1>
        <div className="relative mt-4 md:mt-0 w-full md:w-auto max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar em meus cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex mb-6">
          <TabsTrigger value="active">Em Andamento ({filterCourses(activeCourses).length})</TabsTrigger>
          <TabsTrigger value="completed">Concluídos ({filterCourses(completedCourses).length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {filterCourses(activeCourses).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterCourses(activeCourses).map(course => (
                <CourseProgress key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/30">
              <img  alt="Nenhum curso em andamento" className="mx-auto mb-4 w-32 h-32 opacity-60" src="https://images.unsplash.com/photo-1522071820081-009f0129c7da" />
              <h3 className="text-xl font-semibold">Nenhum curso em andamento</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Nenhum curso corresponde à sua busca." : "Comece um novo curso para vê-lo aqui!"}
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {filterCourses(completedCourses).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterCourses(completedCourses).map(course => (
                <CourseProgress key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/30">
              <img  alt="Nenhum curso concluído" className="mx-auto mb-4 w-32 h-32 opacity-60" src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7" />
              <h3 className="text-xl font-semibold">Nenhum curso concluído</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Nenhum curso concluído corresponde à sua busca." : "Conclua seus cursos para vê-los aqui!"}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
export default MyCoursesPage;