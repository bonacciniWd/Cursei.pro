import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Loader2 } from "lucide-react";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: "Mensagem Enviada!",
      description: "Obrigado por entrar em contato. Responderemos em breve.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-12 md:py-20"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Entre em Contato</h1>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Tem alguma dúvida, sugestão ou precisa de suporte? Nossa equipe está pronta para ajudar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card p-8 rounded-xl shadow-lg border space-y-6"
        >
          <h2 className="text-2xl font-semibold mb-6">Envie uma Mensagem</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Seu nome completo" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Assunto</Label>
              <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Sobre o que você gostaria de falar?" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Escreva sua mensagem aqui..." rows={5} required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Enviar Mensagem
            </Button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-card p-6 rounded-xl shadow-lg border">
            <h3 className="text-xl font-semibold mb-4">Informações de Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:contato@edupro.com.br" className="text-muted-foreground hover:text-primary">
                  contato@edupro.com.br
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+5511999999999" className="text-muted-foreground hover:text-primary">
                  +55 (11) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Av. Paulista, 1000 - São Paulo, SP</span>
              </li>
            </ul>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-lg border">
            <h3 className="text-xl font-semibold mb-4">Horário de Atendimento</h3>
            <p className="text-muted-foreground">Segunda a Sexta: 9h às 18h</p>
            <p className="text-muted-foreground">Sábado: 9h às 13h (suporte limitado)</p>
          </div>
          
          <div className="bg-card p-6 rounded-xl shadow-lg border">
            <h3 className="text-xl font-semibold mb-4">Perguntas Frequentes (FAQ)</h3>
            <p className="text-muted-foreground mb-3">
              Muitas dúvidas comuns já foram respondidas em nossa seção de FAQ.
            </p>
            <Button variant="outline" asChild>
              <Link to="/faq">Acessar FAQ</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
export default ContactPage;