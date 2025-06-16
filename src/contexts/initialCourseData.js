export const initialCategoriesData = [
  { id: "cat1", name: "Desenvolvimento Web" },
  { id: "cat2", name: "Marketing Digital" },
  { id: "cat3", name: "UX/UI Design" },
  { id: "cat4", name: "Inteligência Artificial" },
  { id: "cat5", name: "Negócios e Empreendedorismo" },
];

export const initialCoursesData = [
  {
    id: "course1",
    title: "React Completo: Do Zero ao Avançado",
    description: "Aprenda React, Redux, Hooks, Next.js e construa aplicações web modernas e performáticas.",
    price: 129.90,
    categoryId: "cat1",
    createdAt: "2025-04-10T10:00:00Z",
    instructor: {
      id: "instr1", name: "Mariana Santos", title: "Engenheira de Software Sênior",
      bio: "Mariana é especialista em frontend com mais de 8 anos de experiência em React e ecossistema JavaScript. Apaixonada por compartilhar conhecimento.", studentsCount: 22500, coursesCount: 7, joinedAt: "2019"
    },
    imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
    imageDescription: "Logo do React em um fundo abstrato de código",
    duration: "55 horas", lessonsCount: 150, studentsCount: 7800, rating: 4.9, reviewsCount: 1850,
    ratingDistribution: { "5": 1700, "4": 100, "3": 40, "2": 8, "1": 2 },
    reviews: [
      { id: "rev1", userId: "user101", userName: "João P.", rating: 5, comment: "Curso incrível, muito completo!", date: "20/04/2025" },
      { id: "rev2", userId: "user102", userName: "Ana L.", rating: 5, comment: "Didática excelente!", date: "10/05/2025" }
    ],
    objectives: ["Dominar React e seus conceitos fundamentais", "Gerenciar estado com Redux e Context API", "Criar rotas com React Router", "Desenvolver projetos com Next.js", "Testar aplicações React"],
    requirements: ["Conhecimentos de HTML, CSS e JavaScript (ES6+)", "Lógica de programação"],
    modules: [
      { id: "mod1-c1", title: "Introdução ao React", order: 1, duration: "6h", lessons: [
        { id: "les1-m1-c1", title: "Configurando Ambiente", duration: "20m", isFree: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", description:"Passo a passo para configurar seu ambiente de desenvolvimento React.", isCompleted: false, moduleId: "mod1-c1" },
        { id: "les2-m1-c1", title: "Componentes e Props", duration: "45m", isFree: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", description:"Entendendo componentes e como passar dados com props.", isCompleted: false, moduleId: "mod1-c1" }
      ]},
      { id: "mod2-c1", title: "Hooks Essenciais", order: 2, duration: "10h", lessons: [
        { id: "les1-m2-c1", title: "useState e useEffect", duration: "1h", isFree: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", description:"Dominando os hooks useState e useEffect para gerenciar estado e efeitos colaterais.", isCompleted: false, moduleId: "mod2-c1" }
      ]}
    ],
    faq: [{ question: "O curso aborda testes?", answer: "Sim, temos um módulo dedicado a testes com Jest e React Testing Library." }],
    isEnrolled: false, progress: 0, completedLessons: 0, studyHours: 0, lastAccess: "Nunca"
  },
  {
    id: "course2",
    title: "Copywriting para Vendas Online",
    description: "Aprenda a escrever textos persuasivos que convertem visitantes em clientes e aumentam suas vendas.",
    price: 79.00,
    categoryId: "cat2",
    createdAt: "2025-05-01T10:00:00Z",
    instructor: {
      id: "instr2", name: "Ricardo Almeida", title: "Especialista em Copywriting e Marketing de Conteúdo",
      bio: "Ricardo ajudou centenas de empresas a alavancarem suas vendas através de técnicas de copywriting eficazes. Mais de 10 anos de experiência no mercado digital.", studentsCount: 15200, coursesCount: 4, joinedAt: "2020"
    },
    imageUrl: "https://images.unsplash.com/photo-1587614382346-4ec58e373698",
    imageDescription: "Pessoa escrevendo em um laptop com foco em texto persuasivo",
    duration: "20 horas", lessonsCount: 60, studentsCount: 4500, rating: 4.7, reviewsCount: 950,
    ratingDistribution: { "5": 800, "4": 100, "3": 40, "2": 8, "1": 2 },
    reviews: [
      { id: "rev3", userId: "user103", userName: "Fernanda C.", rating: 5, comment: "Transformou minha forma de escrever!", date: "10/05/2025" }
    ],
    objectives: ["Entender a psicologia por trás da persuasão", "Aplicar gatilhos mentais em textos", "Estruturar cartas de vendas eficazes", "Escrever e-mails que vendem", "Criar anúncios de alta conversão"],
    requirements: ["Interesse em escrita e marketing", "Desejo de aumentar resultados online"],
    modules: [
      { id: "mod1-c2", title: "Fundamentos do Copywriting", order: 1, duration: "4h", lessons: [
        { id: "les1-m1-c2", title: "O que é Copywriting?", duration: "30m", isFree: true, videoUrl: "", description:"Desc", isCompleted: false, moduleId: "mod1-c2" }
      ]}
    ],
    faq: [{ question: "Serve para quem não tem experiência?", answer: "Sim, o curso é ideal tanto para iniciantes quanto para quem já tem alguma noção." }],
    isEnrolled: false, progress: 0, completedLessons: 0, studyHours: 0, lastAccess: "Nunca"
  }
];

export const initialLiveSessionsData = [
  { 
    id: "ls1_prod", 
    title: "Q&A - React Hooks Avançado", 
    description: "Sessão de perguntas e respostas sobre React Hooks e padrões avançados.",
    date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0], // Next week
    time: "19:00", 
    duration: 60, 
    courseId: "course1", 
    meetingUrl: "https://meet.example.com/react-hooks-advanced",
    instructorName: "Mariana Santos"
  },
];