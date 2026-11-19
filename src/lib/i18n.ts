export const LANGS = ["pt", "en", "es"] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);
export const langPath = (l: Lang) => (l === "pt" ? "/" : `/${l}`);
export const htmlLang: Record<Lang, string> = { pt: "pt-BR", en: "en", es: "es" };
export const langLabel: Record<Lang, string> = { pt: "Português", en: "English", es: "Español" };

const pt = {
  meta: {
    title: "vhcodestudio — produto digital, do rascunho ao deploy",
    description: "Estúdio independente de produto digital. Sites, apps e ferramentas web feitos do zero, do primeiro rascunho ao deploy.",
  },
  skip: "Pular para o conteúdo",
  nav: { label: "Principal", work: "Trabalho", services: "Serviços", process: "Processo", contact: "Contato", language: "Idioma" },
  hero: {
    eyebrow: "Estúdio independente · Brasil",
    lead: "Eu desenho e programo produtos para a web. Sites que carregam rápido, apps que funcionam offline e ferramentas que alguém realmente usa.",
    cta: "Ver trabalhos",
  },
  marquee: { label: "Serviços", words: ["Sites", "Apps PWA", "Lojas", "Dashboards", "Ferramentas de IA", "Auditorias", "3D na web", "Design systems"] },
  work: {
    title: "Trabalho",
    intro: (n: number, live: number) => `${n} projetos, ${live} deles no ar agora. Abra um para ver o problema, o que foi feito e o link.`,
    problem: "O problema", built: "O que eu fiz", detail: "Detalhe",
    open: "Abrir o site ↗", code: "Código no GitHub ↗", shot: (name: string) => `Tela do ${name}`,
  },
  services: {
    title: "Serviços",
    items: [
      ["Sites e landing pages", "Páginas rápidas, com SEO e acessibilidade resolvidos desde o começo. Bom para lançar um produto ou trocar um site que ninguém consegue editar."],
      ["Apps web e PWAs", "Ferramentas internas, painéis e apps que instalam no celular e funcionam sem internet."],
      ["Lojas", "Catálogo, carrinho e checkout com Stripe, com os preços conferidos no servidor."],
      ["Auditoria e ajustes", "Reviso acessibilidade, performance e segurança de um site que já existe e entrego a lista do que corrigir, em ordem."],
    ],
  },
  process: {
    title: "Processo",
    items: [
      ["Conversa", "Uma chamada para entender quem vai usar, o que precisa funcionar no primeiro dia e o que pode esperar."],
      ["Direção", "Antes do código, uma página com tipografia, cores e as telas principais. Você aprova ou muda o rumo aqui, quando ainda é barato."],
      ["Construção", "Entregas curtas com link ao vivo desde a primeira semana. Testes automatizados nas partes que não podem quebrar."],
      ["Entrega", "Deploy, domínio, README em português e inglês, e uma auditoria final de acessibilidade, performance e SEO."],
    ],
  },
  contact: {
    eyebrow: "Orçamento · resposta por e-mail",
    title: ["Vamos", "conversar"],
    intro: "Escolha o tipo de projeto, conte a ideia e eu mando o orçamento no seu e-mail, com prazo e o que eu faria primeiro.",
    others: "Outros contatos", email: "E-mail", works: "Trabalhos", worksValue: "Ver os projetos de novo",
    copy: "Copiar", copied: "Copiado", subject: "Projeto com a vhcodestudio",
  },
  form: {
    label: "Pedido de orçamento",
    service: "O que você precisa? *",
    services: ["Site ou landing page", "Loja online", "Sistema ou SaaS", "App Android ou iPhone", "Redesign ou manutenção", "Outro projeto"],
    budget: "Quanto pretende investir? (opcional)",
    budgets: ["Até R$ 2 mil", "R$ 2 a 5 mil", "R$ 5 a 15 mil", "Acima de R$ 15 mil", "Ainda não sei"],
    deadline: "Para quando? (opcional)",
    deadlines: ["Sem pressa", "Em até 1 mês", "Em até 2 semanas", "Urgente"],
    name: "Seu nome *", email: "Seu e-mail *", phone: "WhatsApp (opcional)", message: "Conte sua ideia *",
    placeholder: "Ex.: Tenho uma hamburgueria e quero um site com cardápio e pedidos pelo WhatsApp.",
    consent: "Autorizo usar esses dados só para responder a este pedido.",
    submit: "Pedir orçamento", sending: "Enviando…",
    fail: (mail: string) => `Não consegui enviar agora. Tente de novo em instantes ou escreva direto para ${mail}.`,
    done: (name: string) => `Pedido recebido, ${name}.`,
    doneText: (mail: string) => `Vou ler com calma e mandar o orçamento para ${mail}.`,
    doneWhats: " Se for mais rápido, chamo pelo WhatsApp.",
    again: "Enviar outro pedido",
    errors: {
      service: "Escolha o tipo de projeto.",
      name: "Escreva seu nome.",
      email: "Confira o e-mail, ele parece incompleto.",
      message: "Conte um pouco mais sobre a ideia (pelo menos 20 caracteres).",
      consent: "Preciso da sua autorização para responder.",
    },
    notGiven: "Não informado",
  },
  footer: { made: "Feito com Next.js, Tailwind e Motion. Código aberto no" },
};

export type Dict = typeof pt;

const en: Dict = {
  meta: {
    title: "vhcodestudio — digital products, from sketch to deploy",
    description: "Independent digital product studio. Websites, apps and web tools built from scratch, from the first sketch to deploy.",
  },
  skip: "Skip to content",
  nav: { label: "Main", work: "Work", services: "Services", process: "Process", contact: "Contact", language: "Language" },
  hero: {
    eyebrow: "Independent studio · Brazil",
    lead: "I design and build products for the web. Sites that load fast, apps that work offline and tools people actually use.",
    cta: "See the work",
  },
  marquee: { label: "Services", words: ["Websites", "PWA apps", "Online stores", "Dashboards", "AI tools", "Audits", "3D on the web", "Design systems"] },
  work: {
    title: "Work",
    intro: (n, live) => `${n} projects, ${live} of them live right now. Open one to see the problem, what was built and the link.`,
    problem: "The problem", built: "What I built", detail: "Detail",
    open: "Open the site ↗", code: "Code on GitHub ↗", shot: (name) => `${name} screen`,
  },
  services: {
    title: "Services",
    items: [
      ["Websites and landing pages", "Fast pages with SEO and accessibility handled from day one. Good for launching a product or replacing a site nobody can edit."],
      ["Web apps and PWAs", "Internal tools, dashboards and apps that install on a phone and work without internet."],
      ["Online stores", "Catalog, cart and Stripe checkout, with prices checked on the server."],
      ["Audits and fixes", "I review the accessibility, performance and security of an existing site and hand over a prioritized list of what to fix."],
    ],
  },
  process: {
    title: "Process",
    items: [
      ["Call", "One call to understand who will use it, what has to work on day one and what can wait."],
      ["Direction", "Before any code, one page with type, colors and the key screens. You approve or change course here, while it is still cheap."],
      ["Build", "Short iterations with a live link from the first week. Automated tests on the parts that cannot break."],
      ["Launch", "Deploy, domain, a README in Portuguese and English, and a final accessibility, performance and SEO audit."],
    ],
  },
  contact: {
    eyebrow: "Quote · reply by email",
    title: ["Let's", "talk"],
    intro: "Pick the type of project, describe the idea and I will email you a quote, with a timeline and what I would do first.",
    others: "Other contacts", email: "Email", works: "Work", worksValue: "See the projects again",
    copy: "Copy", copied: "Copied", subject: "Project with vhcodestudio",
  },
  form: {
    label: "Quote request",
    service: "What do you need? *",
    services: ["Website or landing page", "Online store", "System or SaaS", "Android or iPhone app", "Redesign or maintenance", "Something else"],
    budget: "What is your budget? (optional)",
    budgets: ["Up to US$ 500", "US$ 500 to 1,000", "US$ 1,000 to 3,000", "Over US$ 3,000", "Not sure yet"],
    deadline: "When do you need it? (optional)",
    deadlines: ["No rush", "Within a month", "Within 2 weeks", "Urgent"],
    name: "Your name *", email: "Your email *", phone: "WhatsApp (optional)", message: "Tell me your idea *",
    placeholder: "E.g. I run a burger place and want a site with the menu and orders over WhatsApp.",
    consent: "I agree that this data is used only to reply to this request.",
    submit: "Request a quote", sending: "Sending…",
    fail: (mail) => `Could not send right now. Try again in a moment or write directly to ${mail}.`,
    done: (name) => `Request received, ${name}.`,
    doneText: (mail) => `I will read it carefully and send the quote to ${mail}.`,
    doneWhats: " If it is quicker, I will message you on WhatsApp.",
    again: "Send another request",
    errors: {
      service: "Pick the type of project.",
      name: "Write your name.",
      email: "Check the email, it looks incomplete.",
      message: "Tell me a bit more about the idea (at least 20 characters).",
      consent: "I need your permission to reply.",
    },
    notGiven: "Not given",
  },
  footer: { made: "Built with Next.js, Tailwind and Motion. Open source on" },
};

const es: Dict = {
  meta: {
    title: "vhcodestudio — producto digital, del boceto al deploy",
    description: "Estudio independiente de producto digital. Sitios, apps y herramientas web hechos desde cero, del primer boceto al deploy.",
  },
  skip: "Saltar al contenido",
  nav: { label: "Principal", work: "Trabajo", services: "Servicios", process: "Proceso", contact: "Contacto", language: "Idioma" },
  hero: {
    eyebrow: "Estudio independiente · Brasil",
    lead: "Diseño y programo productos para la web. Sitios que cargan rápido, apps que funcionan sin conexión y herramientas que alguien de verdad usa.",
    cta: "Ver trabajos",
  },
  marquee: { label: "Servicios", words: ["Sitios web", "Apps PWA", "Tiendas", "Dashboards", "Herramientas de IA", "Auditorías", "3D en la web", "Design systems"] },
  work: {
    title: "Trabajo",
    intro: (n, live) => `${n} proyectos, ${live} de ellos en línea ahora. Abre uno para ver el problema, lo que se hizo y el enlace.`,
    problem: "El problema", built: "Lo que hice", detail: "Detalle",
    open: "Abrir el sitio ↗", code: "Código en GitHub ↗", shot: (name) => `Pantalla de ${name}`,
  },
  services: {
    title: "Servicios",
    items: [
      ["Sitios y landing pages", "Páginas rápidas, con SEO y accesibilidad resueltos desde el principio. Ideal para lanzar un producto o reemplazar un sitio que nadie puede editar."],
      ["Apps web y PWAs", "Herramientas internas, paneles y apps que se instalan en el celular y funcionan sin internet."],
      ["Tiendas", "Catálogo, carrito y checkout con Stripe, con los precios verificados en el servidor."],
      ["Auditoría y ajustes", "Reviso la accesibilidad, el rendimiento y la seguridad de un sitio existente y entrego la lista de qué corregir, en orden."],
    ],
  },
  process: {
    title: "Proceso",
    items: [
      ["Conversación", "Una llamada para entender quién lo va a usar, qué tiene que funcionar el primer día y qué puede esperar."],
      ["Dirección", "Antes del código, una página con tipografía, colores y las pantallas principales. Apruebas o cambias el rumbo aquí, cuando todavía es barato."],
      ["Construcción", "Entregas cortas con enlace en vivo desde la primera semana. Pruebas automatizadas en las partes que no pueden fallar."],
      ["Entrega", "Deploy, dominio, README en portugués e inglés, y una auditoría final de accesibilidad, rendimiento y SEO."],
    ],
  },
  contact: {
    eyebrow: "Presupuesto · respuesta por correo",
    title: ["Hablemos", "ahora"],
    intro: "Elige el tipo de proyecto, cuenta la idea y te envío el presupuesto por correo, con plazo y lo que haría primero.",
    others: "Otros contactos", email: "Correo", works: "Trabajos", worksValue: "Ver los proyectos otra vez",
    copy: "Copiar", copied: "Copiado", subject: "Proyecto con vhcodestudio",
  },
  form: {
    label: "Solicitud de presupuesto",
    service: "¿Qué necesitas? *",
    services: ["Sitio o landing page", "Tienda online", "Sistema o SaaS", "App Android o iPhone", "Rediseño o mantenimiento", "Otro proyecto"],
    budget: "¿Cuánto piensas invertir? (opcional)",
    budgets: ["Hasta US$ 500", "US$ 500 a 1.000", "US$ 1.000 a 3.000", "Más de US$ 3.000", "Aún no sé"],
    deadline: "¿Para cuándo? (opcional)",
    deadlines: ["Sin prisa", "En hasta 1 mes", "En hasta 2 semanas", "Urgente"],
    name: "Tu nombre *", email: "Tu correo *", phone: "WhatsApp (opcional)", message: "Cuenta tu idea *",
    placeholder: "Ej.: Tengo una hamburguesería y quiero un sitio con el menú y pedidos por WhatsApp.",
    consent: "Autorizo usar estos datos solo para responder a esta solicitud.",
    submit: "Pedir presupuesto", sending: "Enviando…",
    fail: (mail) => `No pude enviarlo ahora. Inténtalo de nuevo en un momento o escribe directo a ${mail}.`,
    done: (name) => `Solicitud recibida, ${name}.`,
    doneText: (mail) => `La leeré con calma y enviaré el presupuesto a ${mail}.`,
    doneWhats: " Si es más rápido, te escribo por WhatsApp.",
    again: "Enviar otra solicitud",
    errors: {
      service: "Elige el tipo de proyecto.",
      name: "Escribe tu nombre.",
      email: "Revisa el correo, parece incompleto.",
      message: "Cuenta un poco más sobre la idea (al menos 20 caracteres).",
      consent: "Necesito tu autorización para responder.",
    },
    notGiven: "No indicado",
  },
  footer: { made: "Hecho con Next.js, Tailwind y Motion. Código abierto en" },
};

export const dicts: Record<Lang, Dict> = { pt, en, es };
