import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCourses } from "@/contexts/CoursesContext";
import { useAuth } from "@/contexts/AuthContext";
import CourseHeader from "@/components/course/CourseHeader";
import CourseContent from "@/components/course/CourseContent";
import CourseDetails from "@/components/course/CourseDetails";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Loader2, ShoppingCart, Check, Play } from "lucide-react";

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getCourseById, enrollCourse, isEnrolled, loading: coursesLoading } = useCourses();
  const { user, loading: authLoading } = useAuth();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!coursesLoading) {
      const fetchedCourse = getCourseById(id);
      if (fetchedCourse) {
        setCourse(fetchedCourse);
      } else {
        navigate("/404");
      }
    }
  }, [id, getCourseById, coursesLoading, navigate]);

  const handleEnrollOrPurchase = () => {
    if (!user) {
      toast({
        title: "Login Necessário",
        description: "Você precisa estar logado para se inscrever ou comprar um curso.",
        variant: "destructive",
      });
      navigate(`/login?redirect=/curso/${id}`);
      return;
    }

    if (course) {
      const firstLessonId = course.modules?.[0]?.lessons?.[0]?.id || 'intro';

      if (user.subscription?.active) {
        if (!isEnrolled(course.id)) {
          enrollCourse(course.id, user.id); 
          toast({
            title: "Inscrição Realizada!",
            description: `Você se inscreveu no curso: ${course.title} (via assinatura).`,
          });
        } else {
           toast({
            title: "Já Inscrito",
            description: `Você já tem acesso a este curso através da sua assinatura.`,
          });
        }
        navigate(`/curso/${course.id}/aula/${firstLessonId}`);
        return;
      }

      if (!course.price || course.price === 0) {
        if (!isEnrolled(course.id)) {
          enrollCourse(course.id, user.id);
           toast({
            title: "Inscrição Realizada!",
            description: `Você se inscreveu no curso gratuito: ${course.title}`,
          });
        }
        navigate(`/curso/${course.id}/aula/${firstLessonId}`);
        return;
      }
      
      console.log(`Iniciando compra do curso ${course.title} por R$ ${course.price.toFixed(2)}`);
      toast({
        title: "Compra Individual",
        description: `Redirecionando para pagamento do curso: ${course.title}. (Simulação)`,
      });

      setTimeout(() => {
        enrollCourse(course.id, user.id);
        toast({
          title: "Compra Realizada!",
          description: `Você comprou e se inscreveu no curso: ${course.title}.`,
        });
        navigate(`/curso/${course.id}/aula/${firstLessonId}`);
      }, 1500);
    }
  };
  
  const userIsEffectivelyEnrolled = course && user ? (isEnrolled(course.id) || (user.subscription?.active)) : false;


  if (coursesLoading || authLoading || !course) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const canAccessCourse = userIsEffectivelyEnrolled;
  const isCourseFree = !course.price || course.price === 0;
  const firstLessonId = course.modules?.[0]?.lessons?.[0]?.id || 'intro';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CourseHeader course={course} onEnroll={handleEnrollOrPurchase} isEnrolled={canAccessCourse} />
      
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CourseContent modules={course.modules || []} isEnrolled={canAccessCourse} courseId={course.id} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-card border rounded-lg shadow-lg">
              <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
                <img  
                  alt={course.imageDescription || "Imagem do curso"} 
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1574738102321-f8b42792a5f0" />
              </div>
              
              <h2 className="text-2xl font-bold mb-1">
                {isCourseFree ? "Gratuito" : `R$ ${course.price.toFixed(2)}`}
              </h2>
              {!isCourseFree && user && !user.subscription?.active && (
                <p className="text-sm text-muted-foreground mb-3">Ou <Link to="/planos" className="text-primary hover:underline">assine um plano</Link> para acesso total.</p>
              )}
              
              {canAccessCourse ? (
                <Button size="lg" className="w-full mb-4" onClick={() => navigate(`/curso/${course.id}/aula/${firstLessonId}`)}>
                  <Play className="mr-2 h-4 w-4" />
                  Acessar Curso
                </Button>
              ) : (
                <Button size="lg" className="w-full mb-4" onClick={handleEnrollOrPurchase}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {isCourseFree ? "Inscrever-se Gratuitamente" : `Comprar Curso`}
                </Button>
              )}
              
              <p className="text-sm text-muted-foreground text-center mb-4">
                Acesso vitalício e certificado de conclusão.
              </p>
              
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Instrutor:</span>
                  <span className="font-medium">{course.instructor?.name || 'N/A'}</span>
                </li>
                <li className="flex justify-between">
                  <span>Duração:</span>
                  <span className="font-medium">{course.duration}</span>
                </li>
                <li className="flex justify-between">
                  <span>Aulas:</span>
                  <span className="font-medium">{course.lessonsCount}</span>
                </li>
                <li className="flex justify-between">
                  <span>Nível:</span>
                  <span className="font-medium">Todos os níveis</span>
                </li>
                <li className="flex justify-between">
                  <span>Idioma:</span>
                  <span className="font-medium">Português</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <CourseDetails course={course} />
    </motion.div>
  );
};
export default CourseDetailPage;