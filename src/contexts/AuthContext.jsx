import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Create a default admin user if no user is found in localStorage
      // This is for initial setup and should be replaced by a proper admin creation flow
      const defaultAdmin = {
        id: "admin_default_id",
        name: "Administrador",
        email: "admin@edupro.com",
        role: "admin",
        avatar: "",
        // Add subscription details for admin if needed, or handle separately
        subscription: { 
          active: true, 
          planName: "Plano Admin Vitalício", 
          nextBillingDate: "N/A", 
          price: 0 
        },
        paymentMethod: { last4: 'N/A' }
      };
      // Check if we are in a browser environment before setting localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem("user", JSON.stringify(defaultAdmin));
        setUser(defaultAdmin); 
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    // Simulação de login - Em um app real, isso seria uma chamada de API
    // Por agora, vamos manter a lógica de admin e aluno, mas priorizar o admin padrão
    if (email === "admin@edupro.com" && password === "admin123") {
      const adminUser = {
        id: "admin_default_id",
        name: "Administrador",
        email: "admin@edupro.com",
        role: "admin",
        avatar: "",
        subscription: { active: true, planName: "Plano Admin Vitalício", nextBillingDate: "N/A", price: 0 },
        paymentMethod: { last4: 'N/A' }
      };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      setLoading(false);
      return { success: true };
    } else if (email === "aluno@edupro.com" && password === "aluno123") {
      const studentUser = {
        id: "student_default_id",
        name: "Aluno Padrão",
        email: "aluno@edupro.com",
        role: "student",
        avatar: "",
        subscription: null, // Aluno padrão sem assinatura inicialmente
        paymentMethod: null
      };
      setUser(studentUser);
      localStorage.setItem("user", JSON.stringify(studentUser));
      setLoading(false);
      return { success: true };
    } else {
      setLoading(false);
      return { 
        success: false, 
        error: "Email ou senha incorretos. Tente admin@edupro.com com senha admin123." 
      };
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    // Simulação de registro
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: "student", // Novos usuários são sempre alunos
      avatar: "",
      subscription: null, // Novos usuários não têm assinatura
      paymentMethod: null
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    setLoading(false);
    toast({
      title: "Cadastro Realizado!",
      description: "Sua conta foi criada com sucesso.",
    });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Não recriar admin no logout, apenas no carregamento inicial se não houver usuário
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  const updateProfile = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
    });
    
    return { success: true };
  };

  const subscribeToPlan = (planDetails) => {
    if (user) {
      const updatedUser = {
        ...user,
        subscription: {
          active: true,
          planName: planDetails.name,
          price: planDetails.price,
          nextBillingDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('pt-BR'), // Exemplo: próximo mês
        },
        // Idealmente, o método de pagamento seria atualizado após um pagamento bem-sucedido
        paymentMethod: user.paymentMethod || { last4: 'XXXX' } // Placeholder
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast({
        title: "Assinatura Ativada!",
        description: `Você assinou o ${planDetails.name}.`,
      });
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    subscribeToPlan,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};