import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const dummyPosts = [
  {
    id: 1,
    title: "5 Dicas Essenciais para Aprender Programação Mais Rápido",
    slug: "5-dicas-programacao",
    excerpt: "Descubra técnicas comprovadas para acelerar seu aprendizado em programação e alcançar seus objetivos mais rapidamente...",
    date: "20 Maio, 2025",
    category: "Desenvolvimento Web",
    imageDescription: "Pessoa programando em um laptop com foco e concentração",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
  },
  {
    id: 2,
    title: "O Futuro do Marketing Digital: Tendências para 2025",
    slug: "futuro-marketing-digital-2025",
    excerpt: "Explore as principais tendências que moldarão o marketing digital no próximo ano e prepare sua estratégia...",
    date: "15 Maio, 2025",
    category: "Marketing Digital",
    imageDescription: "Gráficos e dados de marketing digital em uma tela futurista",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
  },
  {
    id: 3,
    title: "Como Criar um Portfólio de UX/UI Design de Destaque",
    slug: "portfolio-ux-ui-design",
    excerpt: "Aprenda passo a passo como construir um portfólio de UX/UI que impressione recrutadores e clientes...",
    date: "10 Maio, 2025",
    category: "UX/UI Design",
    imageDescription: "Interface de portfólio de design em um tablet com sketches ao fundo",
    imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e"
  },
  {
    id: 4,
    title: "Inteligência Artificial para Iniciantes: Por Onde Começar?",
    slug: "ia-para-iniciantes",
    excerpt: "Desmistifique a Inteligência Artificial e descubra os melhores caminhos para iniciar seus estudos nesta área promissora...",
    date: "05 Maio, 2025",
    category: "Inteligência Artificial",
    imageDescription: "Representação visual de um cérebro com conexões neurais digitais",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
  },
];

const categories = ["Todos", "Desenvolvimento Web", "Marketing Digital", "UX/UI Design", "Inteligência Artificial", "Carreira"];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredPosts = dummyPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-10"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Nosso Blog</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Artigos, dicas e novidades sobre tecnologia, carreira e aprendizado.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar artigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group bg-card rounded-xl border shadow-sm overflow-hidden hover-scale"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="aspect-video w-full overflow-hidden">
                  <img  
                    alt={post.imageDescription}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={post.imageUrl}
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm text-primary font-medium mb-1">{post.category}</p>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="flex items-center group-hover:text-primary transition-colors">
                      Ler mais <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <img  alt="Nenhum artigo encontrado" className="mx-auto mb-4 w-40 h-40 opacity-50" src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81" />
          <h3 className="text-xl font-semibold mb-2">Nenhum artigo encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar sua busca ou explore outras categorias.
          </p>
        </div>
      )}

      {filteredPosts.length > 0 && (
        <div className="mt-12 text-center">
          <Button variant="outline">Carregar Mais Artigos</Button>
        </div>
      )}
    </motion.div>
  );
};
export default BlogPage;