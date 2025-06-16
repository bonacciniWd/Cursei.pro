import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Plano Básico",
    priceMonthly: 29.90,
    priceYearly: 299.00,
    features: [
      "Acesso a 10 cursos selecionados",
      "Suporte via comunidade",
      "Certificados de conclusão",
      "Conteúdo novo mensalmente (limitado)",
    ],
    highlight: false,
    stripePriceIdMonthly: "price_XYZ_BASIC_MONTHLY", // Substitua pelo seu Price ID real
    stripePriceIdYearly: "price_XYZ_BASIC_YEARLY", // Substitua pelo seu Price ID real
  },
  {
    name: "Plano Pro",
    priceMonthly: 49.90,
    priceYearly: 499.00,
    features: [
      "Acesso ilimitado a todos os cursos",
      "Suporte prioritário via email",
      "Certificados de conclusão premium",
      "Acesso a todas as aulas ao vivo",
      "Download de materiais complementares",
      "Descontos em workshops exclusivos",
    ],
    highlight: true,
    stripePriceIdMonthly: "price_XYZ_PRO_MONTHLY", // Substitua pelo seu Price ID real
    stripePriceIdYearly: "price_XYZ_PRO_YEARLY", // Substitua pelo seu Price ID real
  },
  {
    name: "Plano Premium",
    priceMonthly: 79.90,
    priceYearly: 799.00,
    features: [
      "Todos os benefícios do Plano Pro",
      "Sessões de mentoria individuais (1 por mês)",
      "Acesso antecipado a novos cursos",
      "Comunidade VIP exclusiva",
      "Projetos práticos com feedback",
    ],
    highlight: false,
    stripePriceIdMonthly: "price_XYZ_PREMIUM_MONTHLY", // Substitua pelo seu Price ID real
    stripePriceIdYearly: "price_XYZ_PREMIUM_YEARLY", // Substitua pelo seu Price ID real
  },
];

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = React.useState("monthly");
  const { user, subscribeToPlan } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChoosePlan = (plan) => {
    if (!user) {
      toast({
        title: "Login Necessário",
        description: "Você precisa estar logado para assinar um plano.",
        variant: "destructive",
      });
      navigate("/login?redirect=/planos");
      return;
    }

    // Aqui você integraria com o Stripe Checkout
    // Por enquanto, vamos simular a assinatura e atualizar o contexto do usuário
    const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly;
    const planDetails = {
      name: `${plan.name} (${billingCycle === "monthly" ? "Mensal" : "Anual"})`,
      price: price,
      stripePriceId: billingCycle === "monthly" ? plan.stripePriceIdMonthly : plan.stripePriceIdYearly,
    };
    
    // Simulação de chamada ao Stripe e sucesso
    console.log("Redirecionando para o Stripe com o Price ID:", planDetails.stripePriceId);
    toast({
      title: "Processando Assinatura...",
      description: `Você escolheu o ${planDetails.name}.`,
    });

    // Simular sucesso e atualizar o usuário (REMOVER ISSO QUANDO O STRIPE ESTIVER INTEGRADO)
    // A atualização real do usuário deve ocorrer após o webhook do Stripe ou callback de sucesso.
    subscribeToPlan(planDetails); 
    navigate("/minha-area"); // Redireciona para o dashboard do aluno após "sucesso"

    // TODO: Implementar Stripe Checkout aqui.
    // Exemplo:
    // const stripe = await loadStripe('SUA_CHAVE_PUBLICAVEL_STRIPE');
    // stripe.redirectToCheckout({
    //   lineItems: [{ price: planDetails.stripePriceId, quantity: 1 }],
    //   mode: 'subscription',
    //   successUrl: `${window.location.origin}/sucesso-assinatura?session_id={CHECKOUT_SESSION_ID}`,
    //   cancelUrl: `${window.location.origin}/planos`,
    //   customerEmail: user.email, // Opcional, mas recomendado
    // });
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container py-16"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Escolha o Plano Perfeito para Você
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Invista no seu futuro com acesso a cursos de alta qualidade e uma comunidade engajada.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-muted p-1 rounded-lg">
          <Button
            variant={billingCycle === "monthly" ? "default" : "ghost"}
            onClick={() => setBillingCycle("monthly")}
            className="px-6"
          >
            Mensal
          </Button>
          <Button
            variant={billingCycle === "yearly" ? "default" : "ghost"}
            onClick={() => setBillingCycle("yearly")}
            className="px-6 relative"
          >
            Anual
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              Economize 20%
            </span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`relative flex flex-col p-8 rounded-2xl border ${
              plan.highlight ? "border-primary shadow-2xl scale-105 bg-primary/5" : "bg-card"
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Star className="h-4 w-4" /> Mais Popular
              </div>
            )}
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-muted-foreground mb-6 min-h-[40px]">
                {billingCycle === "monthly"
                  ? `R$ ${plan.priceMonthly.toFixed(2)} / mês`
                  : `R$ ${(plan.priceYearly / 12).toFixed(2)} / mês (cobrado anualmente R$ ${plan.priceYearly.toFixed(2)})`}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              size="lg"
              className="w-full"
              variant={plan.highlight ? "default" : "outline"}
              onClick={() => handleChoosePlan(plan)}
            >
              {plan.highlight && <Zap className="mr-2 h-4 w-4" />}
              Escolher Plano
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Prefere comprar cursos individualmente?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Além dos nossos planos, você também pode adquirir acesso vitalício a cursos específicos.
        </p>
        <Button size="lg" variant="outline" asChild>
          <a href="/cursos">Explorar Cursos Individuais</a>
        </Button>
      </div>
    </motion.div>
  );
};

export default PricingPage;