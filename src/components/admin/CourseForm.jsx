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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash, Plus, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CourseForm = ({ course, onSave, categories }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(
    course || {
      title: "",
      description: "",
      price: "",
      categoryId: "",
      imageUrl: "",
      imageDescription: "",
      modules: [{ title: "", lessons: [{ title: "", description: "", videoUrl: "" }] }],
      objectives: [""],
      requirements: [""],
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setFormData({ ...formData, price: value });
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, categoryId: value });
  };

  const handleObjectiveChange = (index, value) => {
    const updatedObjectives = [...formData.objectives];
    updatedObjectives[index] = value;
    setFormData({ ...formData, objectives: updatedObjectives });
  };

  const addObjective = () => {
    setFormData({ ...formData, objectives: [...formData.objectives, ""] });
  };

  const removeObjective = (index) => {
    const updatedObjectives = formData.objectives.filter((_, i) => i !== index);
    setFormData({ ...formData, objectives: updatedObjectives });
  };

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements[index] = value;
    setFormData({ ...formData, requirements: updatedRequirements });
  };

  const addRequirement = () => {
    setFormData({ ...formData, requirements: [...formData.requirements, ""] });
  };

  const removeRequirement = (index) => {
    const updatedRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, requirements: updatedRequirements });
  };

  const handleModuleTitleChange = (moduleIndex, value) => {
    const updatedModules = [...formData.modules];
    updatedModules[moduleIndex].title = value;
    setFormData({ ...formData, modules: updatedModules });
  };

  const addModule = () => {
    setFormData({
      ...formData,
      modules: [
        ...formData.modules,
        { title: "", lessons: [{ title: "", description: "", videoUrl: "" }] },
      ],
    });
  };

  const removeModule = (moduleIndex) => {
    const updatedModules = formData.modules.filter((_, i) => i !== moduleIndex);
    setFormData({ ...formData, modules: updatedModules });
  };

  const handleLessonChange = (moduleIndex, lessonIndex, field, value) => {
    const updatedModules = [...formData.modules];
    updatedModules[moduleIndex].lessons[lessonIndex][field] = value;
    setFormData({ ...formData, modules: updatedModules });
  };

  const addLesson = (moduleIndex) => {
    const updatedModules = [...formData.modules];
    updatedModules[moduleIndex].lessons.push({
      title: "",
      description: "",
      videoUrl: "",
    });
    setFormData({ ...formData, modules: updatedModules });
  };

  const removeLesson = (moduleIndex, lessonIndex) => {
    const updatedModules = [...formData.modules];
    updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons.filter(
      (_, i) => i !== lessonIndex
    );
    setFormData({ ...formData, modules: updatedModules });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.title.trim()) {
      toast({
        title: "Erro de validação",
        description: "O título do curso é obrigatório",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.description.trim()) {
      toast({
        title: "Erro de validação",
        description: "A descrição do curso é obrigatória",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.categoryId) {
      toast({
        title: "Erro de validação",
        description: "Selecione uma categoria para o curso",
        variant: "destructive",
      });
      return;
    }
    
    // Validar se todos os módulos têm título
    const invalidModule = formData.modules.findIndex(module => !module.title.trim());
    if (invalidModule !== -1) {
      toast({
        title: "Erro de validação",
        description: `O módulo ${invalidModule + 1} precisa de um título`,
        variant: "destructive",
      });
      return;
    }
    
    // Validar se todas as aulas têm título
    let hasInvalidLesson = false;
    formData.modules.forEach((module, moduleIndex) => {
      module.lessons.forEach((lesson, lessonIndex) => {
        if (!lesson.title.trim()) {
          toast({
            title: "Erro de validação",
            description: `A aula ${lessonIndex + 1} do módulo ${moduleIndex + 1} precisa de um título`,
            variant: "destructive",
          });
          hasInvalidLesson = true;
        }
      });
    });
    
    if (hasInvalidLesson) return;
    
    // Processar o preço
    const processedData = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : 0,
    };
    
    onSave(processedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="preview">Visualização</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-6 pt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título do Curso</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Desenvolvimento Web Completo"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva o curso em detalhes..."
                rows={5}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handlePriceChange}
                  placeholder="0.00"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Deixe em branco ou 0 para cursos gratuitos
                </p>
              </div>
              
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="imageUrl">URL da Imagem</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
            
            <div>
              <Label htmlFor="imageDescription">Descrição da Imagem</Label>
              <Input
                id="imageDescription"
                name="imageDescription"
                value={formData.imageDescription}
                onChange={handleChange}
                placeholder="Descreva a imagem do curso"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="space-y-6 pt-4">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Objetivos do Curso</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addObjective}
                >
                  <Plus className="h-4 w-4 mr-1" /> Adicionar
                </Button>
              </div>
              
              {formData.objectives.map((objective, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={objective}
                    onChange={(e) => handleObjectiveChange(index, e.target.value)}
                    placeholder={`Objetivo ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeObjective(index)}
                    disabled={formData.objectives.length <= 1}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Pré-requisitos</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addRequirement}
                >
                  <Plus className="h-4 w-4 mr-1" /> Adicionar
                </Button>
              </div>
              
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={requirement}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder={`Pré-requisito ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRequirement(index)}
                    disabled={formData.requirements.length <= 1}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-6 pt-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <Label>Módulos e Aulas</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addModule}
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar Módulo
              </Button>
            </div>
            
            {formData.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    value={module.title}
                    onChange={(e) => handleModuleTitleChange(moduleIndex, e.target.value)}
                    placeholder={`Título do Módulo ${moduleIndex + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeModule(moduleIndex)}
                    disabled={formData.modules.length <= 1}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="pl-4 border-l-2 border-muted space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Aulas</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addLesson(moduleIndex)}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Adicionar Aula
                    </Button>
                  </div>
                  
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Input
                          value={lesson.title}
                          onChange={(e) =>
                            handleLessonChange(
                              moduleIndex,
                              lessonIndex,
                              "title",
                              e.target.value
                            )
                          }
                          placeholder={`Título da Aula ${lessonIndex + 1}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLesson(moduleIndex, lessonIndex)}
                          disabled={module.lessons.length <= 1}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div>
                        <Label>Descrição da Aula</Label>
                        <Textarea
                          value={lesson.description}
                          onChange={(e) =>
                            handleLessonChange(
                              moduleIndex,
                              lessonIndex,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Descreva o conteúdo desta aula..."
                          rows={2}
                        />
                      </div>
                      
                      <div>
                        <Label>URL do Vídeo</Label>
                        <Input
                          value={lesson.videoUrl}
                          onChange={(e) =>
                            handleLessonChange(
                              moduleIndex,
                              lessonIndex,
                              "videoUrl",
                              e.target.value
                            )
                          }
                          placeholder="https://exemplo.com/video.mp4"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="pt-4">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">{formData.title || "Título do Curso"}</h2>
            <p className="text-muted-foreground mb-6">{formData.description || "Descrição do curso..."}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Informações Gerais</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Preço:</p>
                  <p>{formData.price ? `R$ ${formData.price}` : "Gratuito"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Categoria:</p>
                  <p>
                    {categories.find(c => c.id === formData.categoryId)?.name || "Não selecionada"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">O que você vai aprender</h3>
              <ul className="list-disc pl-5 space-y-1">
                {formData.objectives.map((objective, index) => (
                  <li key={index}>{objective || `Objetivo ${index + 1}`}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Pré-requisitos</h3>
              <ul className="list-disc pl-5 space-y-1">
                {formData.requirements.map((requirement, index) => (
                  <li key={index}>{requirement || `Pré-requisito ${index + 1}`}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Conteúdo do Curso</h3>
              <div className="space-y-4">
                {formData.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border rounded-lg p-4">
                    <h4 className="font-medium">
                      Módulo {moduleIndex + 1}: {module.title || `Título do Módulo ${moduleIndex + 1}`}
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="pl-4">
                          {lessonIndex + 1}. {lesson.title || `Aula ${lessonIndex + 1}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Salvar Curso
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;