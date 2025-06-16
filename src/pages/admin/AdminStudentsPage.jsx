import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import StudentsList from "@/components/admin/StudentsList";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

// Dummy student data - replace with actual data fetching
const dummyStudents = [
  { id: "s1", name: "Carlos Silva", email: "carlos@example.com", createdAt: "2025-01-15", coursesCount: 3, status: "active", avatar: "" },
  { id: "s2", name: "Ana Souza", email: "ana@example.com", createdAt: "2025-02-10", coursesCount: 1, status: "active", avatar: "" },
  { id: "s3", name: "Pedro Martins", email: "pedro@example.com", createdAt: "2024-12-05", coursesCount: 5, status: "inactive", avatar: "" },
  { id: "s4", name: "Juliana Lima", email: "juliana@example.com", createdAt: "2025-03-01", coursesCount: 2, status: "active", avatar: "" },
  { id: "s5", name: "Marcos Andrade", email: "marcos@example.com", createdAt: "2025-02-20", coursesCount: 0, status: "active", avatar: "" },
];

const AdminStudentsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [students, setStudents] = useState(dummyStudents);
  const { toast } = useToast();

  const handleViewStudent = (studentId) => {
    toast({ title: "Visualizar Aluno", description: `Detalhes do aluno ID: ${studentId}` });
    // Navigate to student detail page or open modal
  };

  const handleSendEmail = (studentId) => {
    toast({ title: "Enviar Email", description: `Abrindo compositor de email para aluno ID: ${studentId}` });
    // Open email client or modal
  };

  const handleDeactivateStudent = (studentId) => {
    // Confirm deactivation
    const student = students.find(s => s.id === studentId);
    if (window.confirm(`Tem certeza que deseja desativar ${student?.name}?`)) {
      setStudents(prevStudents => 
        prevStudents.map(s => 
          s.id === studentId ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s
        )
      );
      toast({ title: "Status do Aluno Alterado", description: `Aluno ${student?.name} foi ${student?.status === 'active' ? 'desativado' : 'ativado'}.` });
    }
  };
  
  const handleAddStudent = () => {
    toast({ title: "Adicionar Aluno", description: "Funcionalidade para adicionar novo aluno."});
    // Open form to add a new student
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
            <h1 className="text-3xl font-bold">Gerenciar Alunos</h1>
            <Button onClick={handleAddStudent}>
              <UserPlus className="mr-2 h-4 w-4" /> Adicionar Novo Aluno
            </Button>
          </div>
          
          <StudentsList 
            students={students} 
            onViewStudent={handleViewStudent}
            onSendEmail={handleSendEmail}
            onDeactivate={handleDeactivateStudent}
          />
          
        </motion.div>
      </main>
    </div>
  );
};
export default AdminStudentsPage;