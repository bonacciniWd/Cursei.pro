import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Play, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CourseContent = ({ modules, isEnrolled }) => {
  const [expandedModules, setExpandedModules] = useState([]);
  
  const toggleModule = (moduleId) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };
  
  const isModuleExpanded = (moduleId) => {
    return expandedModules.includes(moduleId);
  };

  return (
    <section className="py-12 bg-background">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Conteúdo do Curso</h2>
        
        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module.id} className="border rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between p-4 bg-muted/50 cursor-pointer"
                onClick={() => toggleModule(module.id)}
              >
                <div>
                  <h3 className="font-medium">
                    Módulo {module.order}: {module.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {module.lessons.length} aulas • {module.duration}
                  </p>
                </div>
                
                <Button variant="ghost" size="icon">
                  {isModuleExpanded(module.id) ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </div>
              
              <AnimatePresence>
                {isModuleExpanded(module.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="divide-y">
                      {module.lessons.map((lesson) => (
                        <li key={lesson.id} className="p-4 hover:bg-muted/30">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                {isEnrolled || lesson.isFree ? (
                                  <Play className="h-4 w-4 text-blue-600" />
                                ) : (
                                  <Lock className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                              
                              <div>
                                <h4 className="font-medium">{lesson.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {lesson.duration}
                                </p>
                              </div>
                            </div>
                            
                            {(isEnrolled || lesson.isFree) && (
                              <Button variant="ghost" size="sm">
                                Assistir
                              </Button>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseContent;