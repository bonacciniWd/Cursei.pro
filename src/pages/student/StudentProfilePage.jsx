import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Save, Shield, Bell, CreditCard, Trash2, Loader2 } from "lucide-react";

const StudentProfilePage = () => {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateProfile({ name, email, avatar: avatarUrl });
    setIsUpdating(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("As novas senhas não coincidem."); 
      return;
    }
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Senha alterada com sucesso!"); 
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setIsUpdating(false);
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-10"
    >
      <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="profile">Informações Pessoais</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="billing">Assinatura</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="bg-card p-6 rounded-lg border">
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarUrl || `https://avatar.vercel.sh/${email}.png`} alt={name} />
                  <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Input 
                  type="text" 
                  placeholder="URL da imagem do avatar"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="security">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Alterar Senha</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmNewPassword">Confirmar Nova Senha</Label>
                <Input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Shield className="mr-2 h-4 w-4" />}
                  Alterar Senha
                </Button>
              </div>
            </form>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Autenticação de Dois Fatores (2FA)</h2>
              <p className="text-muted-foreground mb-3">Proteja sua conta com uma camada extra de segurança.</p>
              <Button variant="outline">Configurar 2FA</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-6">Preferências de Notificação</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newCourses" className="font-medium">Novos cursos e atualizações</Label>
                  <p className="text-sm text-muted-foreground">Receba emails sobre lançamentos e novidades.</p>
                </div>
                <Checkbox id="newCourses" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="liveSessions" className="font-medium">Lembretes de aulas ao vivo</Label>
                  <p className="text-sm text-muted-foreground">Seja notificado sobre as próximas sessões.</p>
                </div>
                <Checkbox id="liveSessions" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="promotions" className="font-medium">Promoções e ofertas</Label>
                  <p className="text-sm text-muted-foreground">Descontos exclusivos e ofertas especiais.</p>
                </div>
                <Checkbox id="promotions" defaultChecked />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button disabled={isUpdating}>
                {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Salvar Preferências
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-6">Gerenciamento de Assinatura</h2>
            {user?.subscription?.active ? (
              <div>
                <p className="mb-1">Plano Atual: <span className="font-medium">{user.subscription.planName}</span></p>
                <p className="mb-1">Status: <span className="text-green-600 font-medium">Ativo</span></p>
                <p className="mb-1">Próxima Cobrança: {user.subscription.nextBillingDate}</p>
                <p className="mb-4">Valor: R$ {user.subscription.price}/mês</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline">Alterar Plano</Button>
                  <Button variant="destructive">Cancelar Assinatura</Button>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Método de Pagamento</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CreditCard className="h-5 w-5"/>
                    <span>**** **** **** {user.paymentMethod?.last4 || '1234'}</span>
                  </div>
                  <Button variant="link" className="p-0 h-auto mt-1">Atualizar Pagamento</Button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground mb-3">Você não possui uma assinatura ativa.</p>
                <Button>Ver Planos</Button>
              </div>
            )}
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Histórico de Cobranças</h3>
              <p className="text-sm text-muted-foreground">Nenhuma cobrança encontrada.</p>
            </div>

            <div className="mt-10 border-t pt-6">
              <h2 className="text-xl font-semibold mb-4 text-destructive">Zona de Perigo</h2>
              <div className="flex items-center justify-between p-4 border border-destructive/50 rounded-lg bg-destructive/10">
                <div>
                  <p className="font-medium">Excluir Conta</p>
                  <p className="text-sm text-destructive/80">Esta ação é irreversível e todos os seus dados serão perdidos.</p>
                </div>
                <Button variant="destructive" onClick={() => alert("Funcionalidade de exclusão de conta não implementada.")}>
                  <Trash2 className="mr-2 h-4 w-4"/>
                  Excluir Minha Conta
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
export default StudentProfilePage;