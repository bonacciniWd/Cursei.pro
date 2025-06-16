import React, { useState, useEffect } from "react";
import CourseCard from "@/components/courses/CourseCard";
import CourseFilters from "@/components/courses/CourseFilters";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/contexts/CoursesContext";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const CoursesPage = () => {
  const { courses, categories, loading } = useCourses();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    categories: [],
    sort: "popular",
    price: "all",
  });

  useEffect(() => {
    if (!loading) {
      let tempCourses = [...courses];

      // Search filter
      if (filters.search) {
        tempCourses = tempCourses.filter(course =>
          course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          course.description.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      // Category filter
      if (filters.categories.length > 0) {
        tempCourses = tempCourses.filter(course =>
          filters.categories.includes(course.categoryId)
        );
      }
      
      // Price filter
      if (filters.price === "free") {
        tempCourses = tempCourses.filter(course => !course.price || course.price === 0);
      } else if (filters.price === "paid") {
        tempCourses = tempCourses.filter(course => course.price && course.price > 0);
      }

      // Sort
      switch (filters.sort) {
        case "recent":
          tempCourses.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          break;
        case "price-asc":
          tempCourses.sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
        case "price-desc":
          tempCourses.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
        case "popular":
        default:
          // Add logic for popularity if available, e.g., by studentsCount or rating
          tempCourses.sort((a, b) => (b.studentsCount || 0) - (a.studentsCount || 0));
          break;
      }
      setFilteredCourses(tempCourses);
    }
  }, [filters, courses, loading]);
  
  const resetFilters = () => {
    setFilters({
      search: "",
      categories: [],
      sort: "popular",
      price: "all",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-10"
    >
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Explore Nossos Cursos</h1>
        <p className="text-lg text-muted-foreground">Encontre o curso perfeito para impulsionar sua carreira.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Column (Desktop) & Mobile Filter Toggle */}
        <div className="lg:col-span-1">
          <CourseFilters 
            filters={filters} 
            setFilters={setFilters} 
            categories={categories}
            resetFilters={resetFilters}
            isMobileFiltersOpen={isMobileFiltersOpen}
            setIsMobileFiltersOpen={setIsMobileFiltersOpen}
          />
        </div>
        
        {/* Courses Grid */}
        <div className="lg:col-span-3">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <img  alt="Nenhum curso encontrado" className="mx-auto mb-4 w-40 h-40 opacity-50" src="https://images.unsplash.com/photo-1533134486753-c833f0ed4866" />
              <h3 className="text-xl font-semibold mb-2">Nenhum curso encontrado</h3>
              <p className="text-muted-foreground mb-4">
                Tente ajustar seus filtros ou confira nossos cursos mais populares.
              </p>
              <Button onClick={resetFilters}>Limpar filtros</Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
export default CoursesPage;