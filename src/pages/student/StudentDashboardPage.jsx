import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCourses } from "@/contexts/CoursesContext";
import StudentStats from "@/components/student/StudentStats";
import CourseProgress from "@/components/student/CourseProgress";
import LiveSessionCard from "@/components/student/LiveSessionCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, BookOpen } from "lucide-react";

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const { enrolledCourses, getLiveSessionsForStudent } = useCourses(); // Assume getLiveSessionsForStudent exists
  
  // Dummy stats for now
  const studentStats = {
    coursesCount: enrolledCourses.length,
    completedLessons: enrolledCourses.reduce((sum, course) => sum + (course.completedLessons || 0), 0),
    studyHours: enrolledCourses.reduce((sum, course) => sum + (course.studyHours || 0), 0),
    averageProgress: enrolledCourses.length > 0 
      ? enrolledCourses.reduce((sum, course) => sum + (course.progress || 0), 0) / enrolledCourses.length
      : 0,
  };
  
  // Dummy live sessions
  const liveSessions = getLiveSessionsForStudent ? getLiveSessionsForStudent(user.id) : [
    {
      id: "ls1",
      title: "Sessão de Q&A - Desenvolvimento Web",
      description: "Tire suas dúvidas sobre o Módulo 3 do curso de Desenvolvimento Web Completo.",
      date: "2025-06-10",
      time: "19:00",
      duration: 60,
      courseName: "Desenvolvimento Web Completo",
      instructorName: "Ana Silva",
    },
    {
      id: "ls2",
      title: "Workshop: Estratégias Avançadas de SEO",
      description: "Aprenda técnicas avançadas para otimizar seu site e alcançar o topo das buscas.",
      date: "2025-06-15",
      time: "14:00",
      duration: 90,
      courseName: "Marketing Digital Estratégico",
      instructorName: "Carlos Mendes",
    }
  ];
  
  const handleJoinSession = (sessionId) => {
    // Logic to join live session (e.g., navigate to meeting URL)
    console.log(`Joining session ${sessionId}`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-10"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Bem-vindo(a) de volta, {user?.name}!</h1>
        <p className="text-muted-foreground">Continue sua jornada de aprendizado.</p>
      </div>
      
      <StudentStats stats={studentStats} />
      
      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Meus Cursos em Progresso</h2>
          <Button variant="outline" asChild>
            <Link to="/meus-cursos">
              <BookOpen className="mr-2 h-4 w-4" />
              Ver Todos os Cursos
            </Link>
          </Button>
        </div>
        
        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.slice(0, 3).map((course) => ( // Show first 3
              <CourseProgress key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border rounded-lg bg-muted/30">
            <img  alt="Nenhum curso em progresso" className="mx-auto mb-4 w-32 h-32 opacity-60" src="https://images.unsplash.com/photo-1522071820081-009f0129c7da" />
            <h3 className="text-xl font-semibold mb-2">Nenhum curso em progresso</h3>
            <p className="text-muted-foreground mb-4">
              Explore nossa catálogo e comece a aprender hoje mesmo!
            </p>
            <Button asChild>
              <Link to="/cursos">
                <PlusCircle className="mr-2 h-4 w-4" />
                Explorar Cursos
              </Link>
            </Button>
          </div>
        )}
      </section>
      
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Próximas Aulas ao Vivo</h2>
        {liveSessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveSessions.map((session) => (
              <LiveSessionCard key={session.id} session={session} onJoin={handleJoinSession} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border rounded-lg bg-muted/30">
            <img  alt="Nenhuma aula ao vivo agendada" className="mx-auto mb-4 w-32 h-32 opacity-60" src="https://images.unsplash.com/photo-1517048676732-d65bc937f952" />
            <h3 className="text-xl font-semibold mb-2">Nenhuma aula ao vivo agendada</h3>
            <p className="text-muted-foreground">
              Fique de olho nas atualizações e nos seus cursos para novas sessões.
            </p>
          </div>
        )}
      </section>
    </motion.div>
  );
};
export default StudentDashboardPage;