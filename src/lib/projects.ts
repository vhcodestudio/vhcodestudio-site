export type Project = {
  slug: string;
  name: string;
  year: number;
  kind: string;
  color: string; // the project's own accent, used when it takes the stage
  ink: string; // readable text color on top of `color`
  line: string;
  problem: string;
  built: string;
  detail: string;
  stack: string[];
  live?: string;
  repo: string;
  image?: string;
  shape: "phone" | "wide";
};

const gh = (r: string) => `https://github.com/vhcodestudio/${r}`;

export const projects: Project[] = [
  {
    slug: "echo", name: "echo", year: 2026, kind: "Ferramenta de conteúdo", color: "#d9480f", ink: "#fff7ef",
    line: "Um episódio entra, saem transcrição, capítulos, resumo e os posts da semana.",
    problem: "Quem grava podcast passa mais tempo reescrevendo o episódio para as redes do que gravando.",
    built: "Um estúdio em uma página: a forma de onda vira o navegador de capítulos, e a transcrição aparece sendo escrita enquanto processa.",
    detail: "Os posts respeitam o limite de cada rede e passam por uma revisão para não soar como texto de robô. A versão pública roda com episódios de exemplo; a transcrição real foi testada localmente com FunASR.",
    stack: ["Next.js 16", "React 19", "Motion", "Vitest"], live: "https://echo-vhcode.vercel.app", repo: gh("echo"), image: "/work/echo.jpg", shape: "phone",
  },
  {
    slug: "habitflow", name: "habitflow", year: 2026, kind: "App PWA", color: "#d4f04a", ink: "#141a14",
    line: "Hábitos com um toque, sequências que rolam como odômetro e um mapa de calor das últimas semanas.",
    problem: "Apps de hábito costumam virar planilha. Este precisava ser rápido de abrir no celular e funcionar sem internet.",
    built: "Um PWA instalável com service worker, dados no próprio aparelho e lembretes locais. Marcar um hábito preenche o card inteiro.",
    detail: "A lógica de sequência respeita os dias agendados de cada hábito e tem testes cobrindo virada de mês e semanas com folga. Testado num Pixel 10 com Android 16.",
    stack: ["Vite", "React 19", "Workbox", "Motion"], live: "https://habitflow-vhcode.vercel.app", repo: gh("habitflow"), image: "/work/habitflow.jpg", shape: "phone",
  },
  {
    slug: "outreach", name: "outreach", year: 2026, kind: "CRM", color: "#2f45ff", ink: "#ffffff",
    line: "Prospecção para freelancers, com um revisor que sublinha o que soa como template.",
    problem: "Cold e-mail escrito às pressas sai genérico, e genérico vai direto para o lixo.",
    built: "Um CRM com funil de arrastar, sequências que param quando a pessoa responde e um compositor que gera o rascunho a partir do que você notou no prospect.",
    detail: "O revisor marca no próprio texto aberturas prontas, travessões e jargão, e dá uma nota de 0 a 100. O CSV exportado neutraliza injeção de fórmula. Nada é enviado de verdade.",
    stack: ["Next.js 16", "TypeScript", "Motion", "Vitest"], live: "https://outreach-vhcode.vercel.app", repo: gh("outreach"), image: "/work/outreach.jpg", shape: "wide",
  },
  {
    slug: "lumen", name: "Lumen", year: 2026, kind: "E-commerce 3D", color: "#ffb46b", ink: "#0f0d0b",
    line: "Uma loja de luminárias onde cada peça aparece acesa, em 3D, na cor de luz que você escolher.",
    problem: "Foto de luminária apagada não diz nada sobre a luz que ela faz.",
    built: "Modelos 3D feitos em código, com interruptor e temperatura de cor de 2200K a 5000K que mudam a cena e o brilho da página ao mesmo tempo.",
    detail: "O checkout recalcula os preços no servidor e abre o Stripe em modo de teste. A marca é fictícia e nada é cobrado.",
    stack: ["Next.js 16", "React Three Fiber", "Stripe", "Motion"], live: "https://lumen-store-vhcode.vercel.app", repo: gh("lumen-store"), image: "/work/lumen.jpg", shape: "wide",
  },
  {
    slug: "docsmith", name: "docsmith", year: 2026, kind: "Ferramenta para devs", color: "#ffe14d", ink: "#161616",
    line: "Cole a URL de um repositório e receba um manual: visão geral, estrutura, comandos e API.",
    problem: "Muito projeto bom no GitHub tem só um README de três linhas.",
    built: "Lê o repositório pela API do GitHub, escolhe os arquivos que mais provavelmente definem a API e extrai exports, rotas e funções públicas.",
    detail: "Cada repo ganha uma URL própria, cacheada por uma hora com o use cache do Next 16. Também tem uma API JSON pública.",
    stack: ["Next.js 16", "Cache Components", "TypeScript", "Vitest"], live: "https://docsmith-vhcode.vercel.app", repo: gh("docsmith"), image: "/work/docsmith.jpg", shape: "phone",
  },
  {
    slug: "a11y-lens", name: "a11y-lens", year: 2026, kind: "Auditor", color: "#1d7a4c", ink: "#f7f6f2",
    line: "Um exame de vista para sites: acessibilidade, performance, SEO e segurança numa página só.",
    problem: "Relatórios de auditoria dizem o que está errado, mas raramente explicam por que importa.",
    built: "35 verificações com explicação e correção sugerida para cada uma. As notas aparecem como linhas de uma tabela de Snellen, mais borradas quanto pior.",
    detail: "O próprio auditor bloqueia IPs privados em cada redirecionamento, limita tempo e tamanho, e nunca renderiza o HTML que analisa.",
    stack: ["Next.js 16", "node-html-parser", "Motion", "Vitest"], live: "https://a11y-lens-vhcode.vercel.app", repo: gh("a11y-lens"), image: "/work/a11y.jpg", shape: "wide",
  },
  {
    slug: "astraea", name: "Astraea", year: 2026, kind: "Workspace de IA", color: "#8b7cf6", ink: "#ffffff",
    line: "Um workspace de IA independente de provedor, com chats, projetos, agentes e base de conhecimento.",
    problem: "Equipes usam vários modelos e perdem o contexto espalhado entre ferramentas.",
    built: "Chats, projetos, agentes, arquivos e prompts num lugar só, com arquitetura em Supabase e modo demo.",
    detail: "Inclui painel de uso e organização por projeto.", stack: ["Next.js", "Supabase", "TypeScript"], repo: gh("astraea-ai"), shape: "wide",
  },
  {
    slug: "nexus", name: "Nexus", year: 2026, kind: "Dashboard SaaS", color: "#22d3ee", ink: "#04232a",
    line: "Painel de operações para SaaS, pensado para produção.",
    problem: "Times pequenos de SaaS acompanham métricas em planilhas desatualizadas.",
    built: "Um dashboard com Next.js 16, React 19 e Supabase, com autenticação e dados reais.",
    detail: "Foco em tipagem ponta a ponta e estados de carregamento e erro.", stack: ["Next.js 16", "React 19", "Supabase"], repo: gh("nexus-saas-dashboard"), shape: "wide",
  },
  {
    slug: "orbit", name: "Orbit", year: 2026, kind: "Gestão de projetos", color: "#f97316", ink: "#1a0c02",
    line: "Kanban, roadmap e issues, tudo navegável pelo teclado.",
    problem: "Ferramentas de projeto ficam lentas justamente quando a lista cresce.",
    built: "Um workspace de operações com atalhos de teclado para quase toda ação.",
    detail: "Kanban, roadmap e issues compartilham o mesmo modelo de dados.", stack: ["React", "TypeScript"], repo: gh("Orbit"), shape: "wide",
  },
  {
    slug: "kurio", name: "Kurio", year: 2026, kind: "Marketplace", color: "#f472b6", ink: "#2a0716",
    line: "Marketplace de NFTs feito para o desafio de frontend da Jungle Gaming.",
    problem: "O desafio pedia carteira, transações e atualizações em tempo real sem backend.",
    built: "APIs, carteiras e transações simuladas com MSW e Socket.IO.",
    detail: "React e TypeScript, com dados em tempo real simulados.", stack: ["React", "MSW", "Socket.IO"], repo: gh("kurio-nft-marketplace"), shape: "wide",
  },
  {
    slug: "vitrine", name: "Vitrine", year: 2026, kind: "App Android", color: "#facc15", ink: "#231c00",
    line: "Catálogo e pedidos para pequenos negócios, no celular.",
    problem: "Lojas pequenas vendem pelo WhatsApp e perdem pedidos no meio das mensagens.",
    built: "Um app Android com catálogo e pedidos demonstrativos.", detail: "React Native com Expo.", stack: ["React Native", "Expo", "TypeScript"], repo: gh("vitrine"), shape: "phone",
  },
];
