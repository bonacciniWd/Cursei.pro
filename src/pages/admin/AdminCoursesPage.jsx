import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import CourseForm from "@/components/admin/CourseForm";
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
import { PlusCircle, Edit, Trash, MoreHorizontal, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

const AdminCoursesPage = () => {
  const { courses, categories, addCourse, updateCourse, deleteCourse } = useCourses();
  const { toast } = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddNew = () => {
    setCurrentCourse(null);
    setIsFormOpen(true);
  };

  const handleEdit = (course) => {
    setCurrentCourse(course);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = (course) => {
    setCourseToDelete(course);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (courseToDelete) {
      deleteCourse(courseToDelete.id);
      toast({
        title: "Curso Excluído!",
        description: `O curso "${courseToDelete.title}" foi excluído com sucesso.`,
      });
      setIsDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  const handleSaveCourse = (courseData) => {
    if (currentCourse) {
      updateCourse({ ...currentCourse, ...courseData });
      toast({
        title: "Curso Atualizado!",
        description: `O curso "${courseData.title}" foi atualizado com sucesso.`,
      });
    } else {
      addCourse({ ...courseData, id: Date.now().toString() }); // Simple ID generation
      toast({
        title: "Curso Criado!",
        description: `O curso "${courseData.title}" foi criado com sucesso.`,
      });
    }
    setIsFormOpen(false);
    setCurrentCourse(null);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-3xl font-bold">Gerenciar Cursos</h1>
            <Button onClick={handleAddNew}>
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Novo Curso
            </Button>
          </div>

          <div className="mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cursos..."
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
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Alunos</TableHead>
                  <TableHead className="w-[80px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>
                        {categories.find(cat => cat.id === course.categoryId)?.name || 'N/A'}
                      </TableCell>
                      <TableCell>
                        {course.price ? `R$ ${course.price.toFixed(2)}` : "Gratuito"}
                      </TableCell>
                      <TableCell>{course.studentsCount || 0}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEdit(course)}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteConfirm(course)}
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
                    <TableCell colSpan={5} className="text-center h-24">
                      Nenhum curso encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </main>

      {/* Course Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentCourse ? "Editar Curso" : "Adicionar Novo Curso"}
            </DialogTitle>
            <DialogDescription>
              Preencha os detalhes do curso abaixo.
            </DialogDescription>
          </DialogHeader>
          <CourseForm
            course={currentCourse}
            onSave={handleSaveCourse}
            categories={categories}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja excluir o curso "{courseToDelete?.title}"? Esta ação não pode ser desfeita.
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
export default AdminCoursesPage;