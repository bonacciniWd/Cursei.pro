import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Clock, Save } from "lucide-react";

const LiveSessionForm = ({ session, onSave, courses }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(
    session || {
      title: "",
      description: "",
      date: "",
      time: "",
      duration: 60,
      courseId: "",
      meetingUrl: "",
      instructorName: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseChange = (value) => {
    setFormData({ ...formData, courseId: value });
  };

  const handleDurationChange = (value) => {
    setFormData({ ...formData, duration: parseInt(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.title.trim()) {
      toast({
        title: "Erro de validação",
        description: "O título da sessão é obrigatório",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.date) {
      toast({
        title: "Erro de validação",
        description: "A data da sessão é obrigatória",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.time) {
      toast({
        title: "Erro de validação",
        description: "O horário da sessão é obrigatório",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.courseId) {
      toast({
        title: "Erro de validação",
        description: "Selecione um curso para a sessão",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.instructorName.trim()) {
      toast({
        title: "Erro de validação",
        description: "O nome do instrutor é obrigatório",
        variant: "destructive",
      });
      return;
    }
    
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Título da Sessão</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ex: Introdução ao React Hooks"
        />
      </div>
      
      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descreva o conteúdo da sessão ao vivo..."
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Data
          </Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <Label htmlFor="time" className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> Horário
          </Label>
          <Input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration">Duração (minutos)</Label>
          <Select
            value={formData.duration.toString()}
            onValueChange={handleDurationChange}
          >
            <SelectTrigger id="duration">
              <SelectValue placeholder="Selecione a duração" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 minutos</SelectItem>
              <SelectItem value="45">45 minutos</SelectItem>
              <SelectItem value="60">1 hora</SelectItem>
              <SelectItem value="90">1 hora e 30 minutos</SelectItem>
              <SelectItem value="120">2 horas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="course">Curso Relacionado</Label>
          <Select
            value={formData.courseId}
            onValueChange={handleCourseChange}
          >
            <SelectTrigger id="course">
              <SelectValue placeholder="Selecione um curso" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="meetingUrl">URL da Reunião</Label>
        <Input
          id="meetingUrl"
          name="meetingUrl"
          value={formData.meetingUrl}
          onChange={handleChange}
          placeholder="https://meet.exemplo.com/sala"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Link para a sala de videoconferência (Zoom, Google Meet, etc.)
        </p>
      </div>
      
      <div>
        <Label htmlFor="instructorName">Nome do Instrutor</Label>
        <Input
          id="instructorName"
          name="instructorName"
          value={formData.instructorName}
          onChange={handleChange}
          placeholder="Ex: Prof. João Silva"
        />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Salvar Sessão
        </Button>
      </div>
    </form>
  );
};

export default LiveSessionForm;