import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCourses } from "@/contexts/CoursesContext";
import VideoPlayer from "@/components/course/VideoPlayer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronLeft, ChevronRight, Lock, BookOpen, MessageSquare, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Corrected import path
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const CoursePlayerPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { 
    getCourseById, 
    getLessonById, 
    markLessonComplete, 
    getCourseProgress,
    getNextLesson,
    getPreviousLesson,
    loading 
  } = useCourses();
  
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!loading) {
      const fetchedCourse = getCourseById(courseId);
      if (fetchedCourse) {
        setCourse(fetchedCourse);
        const fetchedLesson = getLessonById(courseId, lessonId);
        if (fetchedLesson) {
          setCurrentLesson(fetchedLesson);
          setProgress(getCourseProgress(courseId));
        } else {
          // If lessonId is invalid, navigate to the first lesson of the first module, if available
          const firstModule = fetchedCourse.modules?.[0];
          const firstLesson = firstModule?.lessons?.[0];
          if (firstLesson) {
            navigate(`/curso/${courseId}/aula/${firstLesson.id}`, { replace: true });
          } else {
            // If no lessons, navigate to course detail page
            navigate(`/curso/${courseId}`, { replace: true });
          }
        }
      } else {
        navigate("/404", { replace: true });
      }
    }
  }, [courseId, lessonId, getCourseById, getLessonById, getCourseProgress, navigate, loading]);

  const handleLessonComplete = () => {
    if (courseId && lessonId) {
        markLessonComplete(courseId, lessonId);
        setProgress(getCourseProgress(courseId));
        
        const next = getNextLesson(courseId, lessonId);
        if (next) {
          navigate(`/curso/${courseId}/aula/${next.id}`);
        }
    }
  };
  
  const navigateToLesson = (newLessonId) => {
    if (courseId && newLessonId) {
        navigate(`/curso/${courseId}/aula/${newLessonId}`);
    }
  };

  const handleNextLesson = () => {
    const next = getNextLesson(courseId, lessonId);
    if (next) navigateToLesson(next.id);
  };

  const handlePreviousLesson = () => {
    const prev = getPreviousLesson(courseId, lessonId);
    if (prev) navigateToLesson(prev.id);
  };

  if (loading || !course || !currentLesson) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  const currentModuleId = course.modules.find(m => m.lessons.some(l => l.id === lessonId))?.id;

  return (
    <div className="flex h-screen bg-muted/20">
      <motion.aside 
        initial={{ width: isSidebarOpen ? 320 : 70 }}
        animate={{ width: isSidebarOpen ? 320 : 70 }}
        transition={{ duration: 0.3 }}
        className="bg-background border-r flex flex-col h-full"
      >
        <div className="p-4 border-b flex items-center justify-between">
          {isSidebarOpen && (
            <Link to={`/curso/${courseId}`} className="font-semibold text-lg truncate hover:text-primary">
              {course.title}
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>
        
        {isSidebarOpen && (
          <div className="p-4">
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground text-center">{progress}% concluído</p>
          </div>
        )}

        <div className={`flex-1 overflow-y-auto ${isSidebarOpen ? 'p-2' : 'p-1'}`}>
          <Accordion type="single" collapsible defaultValue={currentModuleId || course.modules[0]?.id}>
            {course.modules.map((module) => (
              <AccordionItem value={module.id} key={module.id}>
                <AccordionTrigger className={`py-3 px-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
                  {isSidebarOpen ? (
                    <span className="font-medium text-sm truncate">{module.order}. {module.title}</span>
                  ) : (
                    <BookOpen className="h-5 w-5" />
                  )}
                </AccordionTrigger>
                <AccordionContent className={isSidebarOpen ? 'pl-2' : ''}>
                  <ul className="space-y-1">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <Button
                          variant={lesson.id === lessonId ? "secondary" : "ghost"}
                          className={`w-full justify-start text-left h-auto py-2 px-2 ${!isSidebarOpen ? 'justify-center' : ''}`}
                          onClick={() => navigateToLesson(lesson.id)}
                          disabled={!lesson.isFree && !course.isEnrolled && course.price > 0} 
                        >
                          {lesson.isCompleted ? (
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                          ) : (
                            (!lesson.isFree && !course.isEnrolled && course.price > 0) ? 
                            <Lock className="h-4 w-4 mr-2 text-muted-foreground shrink-0" /> : 
                            <div className="w-4 h-4 border rounded-full mr-2 shrink-0 bg-background border-muted-foreground"></div>
                          )}
                          {isSidebarOpen && <span className="text-sm truncate">{lesson.title}</span>}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="aspect-video bg-black">
          <VideoPlayer 
            videoUrl={currentLesson.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
            title={currentLesson.title}
            onComplete={handleLessonComplete}
          />
        </div>

        <div className="p-6 border-b bg-background">
          <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <Button variant="outline" onClick={handlePreviousLesson} disabled={!getPreviousLesson(courseId, lessonId)}>
                <ChevronLeft className="mr-1 h-4 w-4" /> Anterior
              </Button>
              <Button onClick={handleNextLesson} disabled={!getNextLesson(courseId, lessonId)}>
                Próxima <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            {!currentLesson.isCompleted && (
              <Button onClick={handleLessonComplete}>
                <CheckCircle className="mr-2 h-4 w-4" /> Marcar como Concluída
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 bg-background">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="qna">Perguntas e Respostas</TabsTrigger>
              <TabsTrigger value="resources">Recursos</TabsTrigger>
              <TabsTrigger value="certificate">Certificado</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <h3 className="text-lg font-semibold mb-2">Sobre esta aula</h3>
              <p className="text-muted-foreground">
                {currentLesson.description || "Descrição da aula não disponível."}
              </p>
            </TabsContent>
            <TabsContent value="qna">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Perguntas e Respostas</h3>
                <div className="border p-4 rounded-lg">
                  <p className="font-medium">Como configuro o ambiente?</p>
                  <p className="text-sm text-muted-foreground mt-1">Siga os passos no Módulo 1, Aula 3.</p>
                </div>
                <Button><MessageSquare className="mr-2 h-4 w-4" /> Fazer uma Pergunta</Button>
              </div>
            </TabsContent>
            <TabsContent value="resources">
              <h3 className="text-lg font-semibold mb-2">Recursos da Aula</h3>
              <p className="text-muted-foreground">Nenhum recurso adicional para esta aula.</p>
            </TabsContent>
             <TabsContent value="certificate">
              <h3 className="text-lg font-semibold mb-2">Seu Certificado</h3>
              {progress === 100 ? (
                <div className="text-center p-8 border rounded-lg bg-green-50">
                  <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-green-700 mb-2">Parabéns por concluir o curso!</h4>
                  <p className="text-muted-foreground mb-6">Você está pronto para baixar seu certificado.</p>
                  <Button size="lg">
                    Baixar Certificado
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Conclua todas as aulas para liberar seu certificado. Você completou {progress}% do curso.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default CoursePlayerPage;