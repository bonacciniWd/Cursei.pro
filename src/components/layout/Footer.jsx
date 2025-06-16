import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Cursei
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Transformando conhecimento em oportunidades. Nossa plataforma oferece cursos de alta qualidade para impulsionar sua carreira.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          <div>
            <p className="font-medium mb-4">Plataforma</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/cursos" className="text-muted-foreground hover:text-primary">
                  Todos os Cursos
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/aulas-ao-vivo" className="text-muted-foreground hover:text-primary">
                  Aulas ao Vivo
                </Link>
              </li>
              <li>
                <Link to="/professores" className="text-muted-foreground hover:text-primary">
                  Professores
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium mb-4">Suporte</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contato" className="text-muted-foreground hover:text-primary">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/suporte" className="text-muted-foreground hover:text-primary">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-muted-foreground hover:text-primary">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium mb-4">Contato</p>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                contato@cursei.com.br
              </li>
              <li className="text-muted-foreground">
                +55 (11) 99999-9999
              </li>
              <li className="text-muted-foreground">
                Av. Paulista, 1000 - São Paulo, SP
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Cursei. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacidade" className="text-sm text-muted-foreground hover:text-primary">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="text-sm text-muted-foreground hover:text-primary">
              Termos de Uso
            </Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;