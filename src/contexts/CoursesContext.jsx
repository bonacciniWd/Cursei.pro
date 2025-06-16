import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  initialCategoriesData, 
  initialCoursesData, 
  initialLiveSessionsData 
} from "@/contexts/initialCourseData";
import {
  getStoredCourses,
  getStoredEnrolledCourses,
  getStoredCategories,
  getStoredLiveSessions,
  addCourseToStorage,
  updateCourseInStorage,
  deleteCourseFromStorage,
  enrollUserInCourseInStorage,
  markLessonCompleteInStorage,
  addLiveSessionToStorage,
  updateLiveSessionInStorage,
  deleteLiveSessionFromStorage,
} from "@/contexts/courseStorage";

const CoursesContext = createContext();

export const useCourses = () => {
  return useContext(CoursesContext);
};

export const CoursesProvider = ({ children }) => {
  const { toast } = useToast();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveSessions, setLiveSessions] = useState([]);

  useEffect(() => {
    setCourses(getStoredCourses(initialCoursesData));
    setEnrolledCourses(getStoredEnrolledCourses());
    setCategories(getStoredCategories(initialCategoriesData));
    setLiveSessions(getStoredLiveSessions(initialLiveSessionsData));
    setLoading(false);
  }, []);

  const addCourse = (course) => {
    const newCourses = addCourseToStorage(courses, course);
    setCourses(newCourses);
    toast({ title: "Sucesso!", description: "Curso adicionado." });
  };

  const updateCourse = (updatedCourse) => {
    const { newCourses, newEnrolledCourses } = updateCourseInStorage(courses, enrolledCourses, updatedCourse);
    setCourses(newCourses);
    setEnrolledCourses(newEnrolledCourses);
    toast({ title: "Sucesso!", description: "Curso atualizado." });
  };

  const deleteCourse = (courseId) => {
    const { newCourses, newEnrolledCourses } = deleteCourseFromStorage(courses, enrolledCourses, courseId);
    setCourses(newCourses);
    setEnrolledCourses(newEnrolledCourses);
    toast({ title: "Sucesso!", description: "Curso deletado." });
  };

  const getCourseById = (courseId) => {
    return courses.find((course) => course.id === courseId);
  };

  const enrollCourse = (courseId, userId) => {
    const courseToEnroll = courses.find(c => c.id === courseId);
    if (courseToEnroll && !enrolledCourses.find(ec => ec.id === courseId)) {
      const { newEnrolled, updatedCourses } = enrollUserInCourseInStorage(courses, enrolledCourses, courseToEnroll, userId);
      setEnrolledCourses(newEnrolled);
      setCourses(updatedCourses);
      toast({ title: "Inscrição Realizada!", description: `Você se inscreveu em ${courseToEnroll.title}.` });
    } else if (enrolledCourses.find(ec => ec.id === courseId)) {
      toast({ title: "Já Inscrito", description: `Você já está inscrito em ${courseToEnroll.title}.`, variant: "default" });
    } else {
      toast({ title: "Erro", description: "Curso não encontrado para inscrição.", variant: "destructive" });
    }
  };
  
  const isEnrolled = (courseId) => {
    return enrolledCourses.some(course => course.id === courseId);
  };

  const getLessonById = (courseId, lessonId) => {
    const course = courses.find(c => c.id === courseId) || enrolledCourses.find(c => c.id === courseId);
    if (course && course.modules) {
      for (const module of course.modules) {
        const lesson = module.lessons.find(l => l.id === lessonId);
        if (lesson) return lesson;
      }
    }
    return null;
  };

  const markLessonComplete = (courseId, lessonId) => {
    const { updatedEnrolledCourses, lessonMarked } = markLessonCompleteInStorage(enrolledCourses, courseId, lessonId);
    if (lessonMarked) {
      setEnrolledCourses(updatedEnrolledCourses);
      const course = updatedEnrolledCourses.find(c => c.id === courseId);
      if (course) {
        toast({ title: "Progresso Salvo!", description: `Aula marcada como concluída. Progresso: ${course.progress}%` });
      }
    }
  };

  const getCourseProgress = (courseId) => {
    const course = enrolledCourses.find(c => c.id === courseId);
    return course ? course.progress : 0;
  };

  const getNextLesson = (courseId, currentLessonId) => {
    const course = courses.find(c => c.id === courseId) || enrolledCourses.find(c => c.id === courseId);
    if (!course || !course.modules) return null;

    let currentLessonFound = false;
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (currentLessonFound) return lesson;
        if (lesson.id === currentLessonId) currentLessonFound = true;
      }
    }
    return null;
  };

  const getPreviousLesson = (courseId, currentLessonId) => {
    const course = courses.find(c => c.id === courseId) || enrolledCourses.find(c => c.id === courseId);
    if (!course || !course.modules) return null;

    let previousLesson = null;
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (lesson.id === currentLessonId) return previousLesson;
        previousLesson = lesson;
      }
    }
    return null;
  };
  
  const getLiveSessionsForStudent = (studentId) => {
    return liveSessions.filter(session => 
      enrolledCourses.some(ec => ec.id === session.courseId && ec.userId === studentId)
    );
  };

  const addLiveSession = (sessionData) => {
    const updatedSessions = addLiveSessionToStorage(liveSessions, sessionData);
    setLiveSessions(updatedSessions);
    toast({ title: "Sucesso!", description: "Sessão ao vivo adicionada." });
  };

  const updateLiveSession = (updatedSession) => {
    const updatedSessions = updateLiveSessionInStorage(liveSessions, updatedSession);
    setLiveSessions(updatedSessions);
    toast({ title: "Sucesso!", description: "Sessão ao vivo atualizada." });
  };

  const deleteLiveSession = (sessionId) => {
    const updatedSessions = deleteLiveSessionFromStorage(liveSessions, sessionId);
    setLiveSessions(updatedSessions);
    toast({ title: "Sucesso!", description: "Sessão ao vivo deletada." });
  };

  const value = {
    courses,
    enrolledCourses,
    categories,
    loading,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
    enrollCourse,
    isEnrolled,
    getLessonById,
    markLessonComplete,
    getCourseProgress,
    getNextLesson,
    getPreviousLesson,
    liveSessions,
    getLiveSessionsForStudent,
    addLiveSession,
    updateLiveSession,
    deleteLiveSession,
  };

  return (
    <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
  );
};