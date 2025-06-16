import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardStats from "@/components/admin/DashboardStats";
import { useCourses } from "@/contexts/CoursesContext"; 
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, BookOpen, Video } from "lucide-react";
import { Link } from "react-router-dom";

const recentActivity = [
  { id: 1, type: "new_student", description: "Novo aluno: Carlos Silva", time: "2 min atrás" },
  { id: 2, type: "course_update", description: "Curso 'React Avançado' atualizado", time: "1 hora atrás" },
  { id: 3, type: "live_session", description: "Sessão ao vivo 'Node.js Essencial' agendada", time: "3 horas atrás" },
  { id: 4, type: "new_enrollment", description: "Ana Souza se inscreveu em 'Design UX/UI'", time: "5 horas atrás" },
];

const AdminDashboardPage = () => {
  const { courses } = useCourses(); 
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const adminStats = {
    coursesCount: courses.length,
    studentsCount: 1250, 
    liveSessionsCount: 15, 
    completionRate: 65, 
  };

  return (
    <div className="flex min-h-screen bg-muted/40">
      <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={`flex-1 p-6 transition-all duration-300 ${sidebarCollapsed ? "lg:ml-[70px]" : "lg:ml-[250px]"}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <div className="flex gap-2">
              <Button asChild>
                <Link to="/admin/cursos/novo">
                  <PlusCircle className="mr-2 h-4 w-4" /> Novo Curso
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/admin/aulas-ao-vivo/nova">
                  <Video className="mr-2 h-4 w-4" /> Agendar Aula
                </Link>
              </Button>
            </div>
          </div>

          <DashboardStats stats={adminStats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-1 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="admin-card bg-white"
              >
                <div className="admin-icon bg-blue-100 text-blue-600">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Gerenciar Alunos</h3>
                <p className="text-muted-foreground text-sm mt-1 mb-3">
                  Visualize, edite e acompanhe o progresso dos alunos.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/alunos">Ver Alunos</Link>
                </Button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="admin-card bg-white"
              >
                <div className="admin-icon bg-green-100 text-green-600">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Gerenciar Cursos</h3>
                <p className="text-muted-foreground text-sm mt-1 mb-3">
                  Adicione, edite e organize o conteúdo dos cursos.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/cursos">Ver Cursos</Link>
                </Button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-2 admin-card bg-white"
            >
              <h3 className="text-xl font-semibold mb-4">Atividade Recente</h3>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
              <Button variant="link" size="sm" className="mt-4 px-0">Ver todas atividades</Button>
            </motion.div>
          </div>

        </motion.div>
      </main>
    </div>
  );
};
export default AdminDashboardPage;