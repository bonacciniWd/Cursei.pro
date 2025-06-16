import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { CoursesProvider } from "@/contexts/CoursesContext";
import { Toaster } from "@/components/ui/toaster";
import { motion, AnimatePresence } from "framer-motion";

// Page Components (Lazy Loaded)
const HomePage = lazy(() => import("@/pages/HomePage"));
const CoursesPage = lazy(() => import("@/pages/CoursesPage"));
const CourseDetailPage = lazy(() => import("@/pages/CourseDetailPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const StudentDashboardPage = lazy(() => import("@/pages/student/StudentDashboardPage"));
const MyCoursesPage = lazy(() => import("@/pages/student/MyCoursesPage"));
const StudentProfilePage = lazy(() => import("@/pages/student/StudentProfilePage"));
const AdminDashboardPage = lazy(() => import("@/pages/admin/AdminDashboardPage"));
const AdminCoursesPage = lazy(() => import("@/pages/admin/AdminCoursesPage"));
const AdminStudentsPage = lazy(() => import("@/pages/admin/AdminStudentsPage"));
const AdminLiveSessionsPage = lazy(() => import("@/pages/admin/AdminLiveSessionsPage"));
const CoursePlayerPage = lazy(() => import("@/pages/CoursePlayerPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage")); // Nova página de planos

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen w-screen bg-background">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
  </div>
);

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Se o usuário não tiver o papel necessário, redireciona para a home ou dashboard apropriado
    const redirectTo = user.role === 'admin' ? '/admin' : '/minha-area';
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CoursesProvider>
          <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow">
              <Suspense fallback={<LoadingSpinner />}>
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cursos" element={<CoursesPage />} />
                    <Route path="/curso/:id" element={<CourseDetailPage />} />
                    <Route path="/curso/:courseId/aula/:lessonId" 
                      element={
                        <ProtectedRoute roles={["student", "admin"]}>
                          <CoursePlayerPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/contato" element={<ContactPage />} />
                    <Route path="/planos" element={<PricingPage />} /> {/* Nova rota de planos */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/cadastro" element={<RegisterPage />} />
                    
                    {/* Student Routes */}
                    <Route path="/minha-area" 
                      element={
                        <ProtectedRoute roles={["student"]}>
                          <StudentDashboardPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="/meus-cursos" 
                      element={
                        <ProtectedRoute roles={["student"]}>
                          <MyCoursesPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="/perfil" 
                      element={
                        <ProtectedRoute roles={["student", "admin"]}>
                          <StudentProfilePage />
                        </ProtectedRoute>
                      } 
                    />

                    {/* Admin Routes */}
                    <Route path="/admin" 
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <AdminDashboardPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="/admin/cursos" 
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <AdminCoursesPage />
                        </ProtectedRoute>
                      } 
                    />
                     <Route path="/admin/cursos/novo" // Rota para criar novo curso
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <AdminCoursesPage /> {/* Renderiza a mesma página, o form é um dialog */}
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="/admin/alunos" 
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <AdminStudentsPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="/admin/aulas-ao-vivo" 
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <AdminLiveSessionsPage />
                        </ProtectedRoute>
                      } 
                    />
                     <Route path="/admin/aulas-ao-vivo/nova" // Rota para criar nova aula
                      element={
                        <ProtectedRoute roles={["admin"]}>
                          <AdminLiveSessionsPage /> {/* Renderiza a mesma página, o form é um dialog */}
                        </ProtectedRoute>
                      } 
                    />
                    
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </AnimatePresence>
              </Suspense>
            </main>
            <Footer />
            <Toaster />
          </div>
        </CoursesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;