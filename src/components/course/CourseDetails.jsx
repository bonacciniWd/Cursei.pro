import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, User, Calendar, Award, BookOpen } from "lucide-react";

const CourseDetails = ({ course }) => {
  return (
    <section className="py-12 bg-background">
      <div className="container">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="about">Sobre o Curso</TabsTrigger>
            <TabsTrigger value="instructor">Instrutor</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Descrição</h3>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">O que você vai aprender</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>{objective}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Pré-requisitos</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {course.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Certificado</h3>
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <Award className="h-10 w-10 text-blue-600 shrink-0" />
                <div>
                  <p className="font-medium">Certificado de Conclusão</p>
                  <p className="text-muted-foreground">
                    Ao concluir 100% do curso, você receberá um certificado de conclusão que pode ser compartilhado em seu perfil profissional.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="instructor">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 rounded-full overflow-hidden shrink-0 mx-auto md:mx-0">
                <img  
                  alt={`Foto do instrutor ${course.instructor.name}`} 
                  className="w-full h-full object-cover"
                 src="https://images.unsplash.com/photo-1679500502523-b40fb6f0563d" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">{course.instructor.name}</h3>
                <p className="text-muted-foreground mb-4">{course.instructor.title}</p>
                
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span>{course.instructor.studentsCount} alunos</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <span>{course.instructor.coursesCount} cursos</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>Na plataforma desde {course.instructor.joinedAt}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground">{course.instructor.bio}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="text-center">
                  <div className="text-5xl font-bold">{course.rating}</div>
                  <div className="flex items-center justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={i < Math.floor(course.rating) ? "text-yellow-400" : "text-gray-300"}
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.reviewsCount} avaliações
                  </p>
                </div>
                
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const percentage = Math.round(
                      (course.ratingDistribution[star] / course.reviewsCount) * 100
                    );
                    
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <div className="flex items-center w-12">
                          <span>{star}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="none"
                            className="text-yellow-400 ml-1"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        </div>
                        
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div
                            className="bg-yellow-400 h-2.5 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        
                        <div className="w-12 text-right text-sm text-muted-foreground">
                          {percentage}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Comentários dos Alunos</h3>
                
                {course.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img  
                          alt={`Avatar de ${review.userName}`} 
                          className="w-full h-full object-cover"
                         src="https://images.unsplash.com/photo-1666778345747-49c711155ab9" />
                      </div>
                      
                      <div>
                        <p className="font-medium">{review.userName}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill={i < review.rating ? "currentColor" : "none"}
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                          ))}
                          <span className="text-xs text-muted-foreground ml-2">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="faq">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Perguntas Frequentes</h3>
              
              <div className="space-y-4">
                {course.faq.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{item.question}</h4>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CourseDetails;