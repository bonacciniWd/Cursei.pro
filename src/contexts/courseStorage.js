const COURSES_KEY = "courses_prod";
const ENROLLED_COURSES_KEY = "enrolledCourses_prod";
const CATEGORIES_KEY = "categories_prod";
const LIVE_SESSIONS_KEY = "liveSessions_prod";

const getFromStorage = (key, defaultValue = []) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  }
  return defaultValue;
};

const updateStorage = (key, data) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getStoredCourses = (initialData) => getFromStorage(COURSES_KEY, initialData);
export const getStoredEnrolledCourses = () => getFromStorage(ENROLLED_COURSES_KEY);
export const getStoredCategories = (initialData) => getFromStorage(CATEGORIES_KEY, initialData);
export const getStoredLiveSessions = (initialData) => getFromStorage(LIVE_SESSIONS_KEY, initialData);

export const addCourseToStorage = (courses, course) => {
  const newCourse = {
    ...course,
    id: `course${Date.now()}`,
    createdAt: new Date().toISOString(),
    instructor: course.instructor || { id: "instr_default", name: "Admin", title: "Instrutor", bio: "", studentsCount: 0, coursesCount: 0, joinedAt: new Date().getFullYear().toString() },
    studentsCount: 0,
    rating: 0,
    reviewsCount: 0,
    ratingDistribution: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
    reviews: [],
    faq: course.faq || [],
    isEnrolled: false, progress: 0, completedLessons: 0, studyHours: 0, lastAccess: "Nunca"
  };
  const newCourses = [...courses, newCourse];
  updateStorage(COURSES_KEY, newCourses);
  return newCourses;
};

export const updateCourseInStorage = (courses, enrolledCourses, updatedCourse) => {
  const newCourses = courses.map((course) =>
    course.id === updatedCourse.id ? updatedCourse : course
  );
  updateStorage(COURSES_KEY, newCourses);

  const newEnrolledCourses = enrolledCourses.map((course) =>
    course.id === updatedCourse.id ? {...course, ...updatedCourse} : course
  );
  updateStorage(ENROLLED_COURSES_KEY, newEnrolledCourses);
  return { newCourses, newEnrolledCourses };
};

export const deleteCourseFromStorage = (courses, enrolledCourses, courseId) => {
  const newCourses = courses.filter((course) => course.id !== courseId);
  updateStorage(COURSES_KEY, newCourses);

  const newEnrolledCourses = enrolledCourses.filter((course) => course.id !== courseId);
  updateStorage(ENROLLED_COURSES_KEY, newEnrolledCourses);
  return { newCourses, newEnrolledCourses };
};

export const enrollUserInCourseInStorage = (courses, enrolledCourses, courseToEnroll, userId) => {
  const newEnrolledCourse = { 
    ...courseToEnroll, 
    isEnrolled: true, 
    progress: 0, 
    completedLessons: 0, 
    studyHours: 0, 
    lastAccess: new Date().toLocaleDateString("pt-BR"),
    userId: userId
  };
  const newEnrolled = [...enrolledCourses, newEnrolledCourse];
  updateStorage(ENROLLED_COURSES_KEY, newEnrolled);
  
  const updatedCourses = courses.map(c => c.id === courseToEnroll.id ? {...c, studentsCount: (c.studentsCount || 0) + 1} : c);
  updateStorage(COURSES_KEY, updatedCourses);
  return { newEnrolled, updatedCourses };
};

export const markLessonCompleteInStorage = (enrolledCourses, courseId, lessonId) => {
  let lessonMarked = false;
  const updatedEnrolledCourses = enrolledCourses.map(course => {
    if (course.id === courseId) {
      const updatedModules = course.modules.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson => {
          if (lesson.id === lessonId && !lesson.isCompleted) {
            lessonMarked = true;
            return { ...lesson, isCompleted: true };
          }
          return lesson;
        })
      }));
      
      if (lessonMarked) {
        const completedLessons = updatedModules.reduce((acc, mod) => acc + mod.lessons.filter(l => l.isCompleted).length, 0);
        const totalLessons = updatedModules.reduce((acc, mod) => acc + mod.lessons.length, 0);
        const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        return { ...course, modules: updatedModules, progress, completedLessons, lastAccess: new Date().toLocaleDateString("pt-BR") };
      }
    }
    return course;
  });
  if (lessonMarked) {
    updateStorage(ENROLLED_COURSES_KEY, updatedEnrolledCourses);
  }
  return { updatedEnrolledCourses, lessonMarked };
};

export const addLiveSessionToStorage = (liveSessions, sessionData) => {
  const newSession = { ...sessionData, id: `ls${Date.now()}` };
  const updatedSessions = [...liveSessions, newSession];
  updateStorage(LIVE_SESSIONS_KEY, updatedSessions);
  return updatedSessions;
};

export const updateLiveSessionInStorage = (liveSessions, updatedSession) => {
  const updatedSessions = liveSessions.map(s => s.id === updatedSession.id ? updatedSession : s);
  updateStorage(LIVE_SESSIONS_KEY, updatedSessions);
  return updatedSessions;
};

export const deleteLiveSessionFromStorage = (liveSessions, sessionId) => {
  const updatedSessions = liveSessions.filter(s => s.id !== sessionId);
  updateStorage(LIVE_SESSIONS_KEY, updatedSessions);
  return updatedSessions;
};