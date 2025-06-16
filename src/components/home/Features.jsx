import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Video, Award, Users, Clock, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-blue-600" />,
      title: "Conteúdo de Qualidade",
      description: "Cursos desenvolvidos por especialistas com materiais atualizados e relevantes para o mercado."
    },
    {
      icon: <Video className="h-10 w-10 text-indigo-600" />,
      title: "Aulas ao Vivo",
      description: "Interaja com professores e outros alunos em tempo real para uma experiência de aprendizado completa."
    },
    {
      icon: <Award className="h-10 w-10 text-purple-600" />,
      title: "Certificados Reconhecidos",
      description: "Receba certificados valorizados pelo mercado ao concluir seus cursos."
    },
    {
      icon: <Users className="h-10 w-10 text-pink-600" />,
      title: "Comunidade Ativa",
      description: "Participe de uma comunidade de estudantes e profissionais para networking e troca de experiências."
    },
    {
      icon: <Clock className="h-10 w-10 text-orange-600" />,
      title: "Aprenda no Seu Ritmo",
      description: "Acesse o conteúdo quando e onde quiser, adaptando os estudos à sua rotina."
    },
    {
      icon: <Globe className="h-10 w-10 text-green-600" />,
      title: "Acesso Ilimitado",
      description: "Uma vez matriculado, tenha acesso vitalício ao conteúdo do curso e suas atualizações."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight"
          >
            Por que escolher nossa plataforma?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Oferecemos uma experiência de aprendizado completa com recursos exclusivos para impulsionar sua carreira.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;