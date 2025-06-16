import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import LiveSessionForm from "@/components/admin/LiveSessionForm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCourses } from "@/contexts/CoursesContext";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Edit, Trash, MoreHorizontal, Video, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const AdminLiveSessionsPage = () => {
  const { courses, liveSessions, addLiveSession, updateLiveSession, deleteLiveSession } = useCourses();
  const { toast } = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddNew = () => {
    setCurrentSession(null);
    setIsFormOpen(true);
  };

  const handleEdit = (session) => {
    setCurrentSession(session);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = (session) => {
    setSessionToDelete(session);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (sessionToDelete) {
      deleteLiveSession(sessionToDelete.id);
      // Toast is handled by context now
      setIsDeleteDialogOpen(false);
      setSessionToDelete(null);
    }
  };

  const handleSaveSession = (sessionData) => {
    if (currentSession) {
      updateLiveSession({ ...currentSession, ...sessionData });
    } else {
      addLiveSession(sessionData);
    }
    // Toast is handled by context now
    setIsFormOpen(false);
    setCurrentSession(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    // Ensure date is parsed correctly, assuming YYYY-MM-DD from input type="date"
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
      const date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
      return date.toLocaleDateString("pt-BR", options);
    }
    return dateString; // Fallback if format is unexpected
  };

  const filteredSessions = liveSessions.filter(session =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (courses.find(c => c.id === session.courseId)?.title.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );


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
            <h1 className="text-3xl font-bold">Gerenciar Aulas ao Vivo</h1>
            <Button onClick={handleAddNew}>
              <PlusCircle className="mr-2 h-4 w-4" /> Agendar Nova Sessão
            </Button>
          </div>

          <div className="mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar sessões..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead className="w-[80px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.title}</TableCell>
                      <TableCell>
                        {courses.find(c => c.id === session.courseId)?.title || 'N/A'}
                      </TableCell>
                      <TableCell>{formatDate(session.date)}</TableCell>
                      <TableCell>{session.time}</TableCell>
                      <TableCell>{session.duration} min</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEdit(session)}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            {session.meetingUrl && (
                               <DropdownMenuItem onClick={() => window.open(session.meetingUrl, '_blank')}>
                                <Video className="mr-2 h-4 w-4" />
                                <span>Entrar na Sala</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteConfirm(session)}
                              className="text-red-600"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Excluir</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      Nenhuma sessão ao vivo encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </main>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentSession ? "Editar Sessão ao Vivo" : "Agendar Nova Sessão ao Vivo"}
            </DialogTitle>
            <DialogDescription>
              Preencha os detalhes da sessão abaixo.
            </DialogDescription>
          </DialogHeader>
          <LiveSessionForm
            session={currentSession}
            onSave={handleSaveSession}
            courses={courses}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja excluir a sessão "{sessionToDelete?.title}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AdminLiveSessionsPage;