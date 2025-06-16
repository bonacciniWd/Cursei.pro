import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, BookOpen, Users, BarChart3, LogOut, UserCircle, Settings, CreditCard, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/cursos", label: "Cursos" },
    { href: "/planos", label: "Planos" },
    { href: "/blog", label: "Blog" },
    { href: "/contato", label: "Contato" },
  ];

  const adminNavLinks = [
    { href: "/admin", label: "Dashboard", icon: <BarChart3 className="h-4 w-4" /> },
    { href: "/admin/cursos", label: "Cursos", icon: <BookOpen className="h-4 w-4" /> },
    { href: "/admin/alunos", label: "Alunos", icon: <Users className="h-4 w-4" /> },
    { href: "/admin/aulas-ao-vivo", label: "Aulas ao Vivo", icon: <Settings className="h-4 w-4" /> },
  ];

  const studentNavLinks = [
    { href: "/minha-area", label: "Meu Painel", icon: <BarChart3 className="h-4 w-4" /> },
    { href: "/meus-cursos", label: "Meus Cursos", icon: <BookOpen className="h-4 w-4" /> },
    { href: "/perfil", label: "Meu Perfil", icon: <UserCircle className="h-4 w-4" /> },
    { href: "/planos", label: "Assinatura", icon: <CreditCard className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl text-primary">Cursei</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavLink to={link.href}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.label}
                  </NavigationMenuLink>
                </NavLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar || `https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === "admin" && adminNavLinks.map(link => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link to={link.href} className="flex items-center">
                      {link.icon && React.cloneElement(link.icon, { className: "mr-2 h-4 w-4"})}
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                {user.role === "student" && studentNavLinks.map(link => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link to={link.href} className="flex items-center">
                      {link.icon && React.cloneElement(link.icon, { className: "mr-2 h-4 w-4"})}
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link to="/cadastro">Cadastre-se</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t bg-background"
          >
            <nav className="grid gap-2 p-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-muted-foreground hover:text-foreground py-2 px-3 rounded-md text-sm font-medium ${
                      isActive ? "bg-muted text-foreground" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {!user && (
                <>
                  <Button variant="outline" asChild className="w-full mt-2">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Entrar</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/cadastro" onClick={() => setMobileMenuOpen(false)}>Cadastre-se</Link>
                  </Button>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;