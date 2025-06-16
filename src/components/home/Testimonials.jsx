import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Mariana Santos",
      role: "Desenvolvedora Front-end",
      content: "Os cursos da plataforma transformaram minha carreira. Em apenas 6 meses, consegui uma promoção e aumento salarial significativo graças aos conhecimentos adquiridos.",
      avatar: "avatar-mariana",
      rating: 5
    },
    {
      id: 2,
      name: "Pedro Oliveira",
      role: "Estudante de Engenharia",
      content: "As aulas ao vivo são incríveis! A interação com os professores faz toda a diferença no aprendizado. Recomendo para todos que querem aprender de verdade.",
      avatar: "avatar-pedro",
      rating: 5
    },
    {
      id: 3,
      name: "Camila Ferreira",
      role: "Designer UX/UI",
      content: "O curso de Design UX/UI me deu todas as ferramentas necessárias para iniciar minha carreira na área. O material é completo e os professores são excelentes.",
      avatar: "avatar-camila",
      rating: 4
    },
    {
      id: 4,
      name: "Lucas Mendes",
      role: "Analista de Marketing",
      content: "Já fiz diversos cursos online, mas a qualidade do conteúdo e a didática dos professores desta plataforma são incomparáveis. Vale cada centavo investido!",
      avatar: "avatar-lucas",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight"
          >
            O que nossos alunos dizem
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Histórias reais de pessoas que transformaram suas carreiras com nossos cursos.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm border relative"
            >
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img  
                    alt={`Avatar de ${testimonial.name}`} 
                    className="w-full h-full object-cover"
                   src="https://images.unsplash.com/photo-1666778345747-49c711155ab9" />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <p className="text-muted-foreground">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;