// Dados dos projetos. Para adicionar um projeto novo, basta incluir um objeto aqui:
// o main.js monta os cards, os filtros e a janela de detalhes a partir desta lista.
// categorias: "mobile", "tv", "backend" (usadas pelos botões de filtro).
// visual: "celular" (mostra `imagem` dentro de um celular), "tv" (ícone numa TV) ou "concha".

const PROJETOS = [
  {
    id: "bioscanner",
    nome: "BioScanner",
    resumo: "App de registro e consulta das serpentes do Brasil, para Android e iPhone.",
    status: "Em desenvolvimento · APK de teste v1.2",
    categorias: ["mobile"],
    visual: "celular",
    imagem: "img/bioscanner-splash.webp",
    imagemAlt: "Tela de abertura do app Serpentes, com uma cobra-coral sobre pedras molhadas",
    descricao:
      "O usuário fotografa uma serpente e o app salva o registro com data, hora e localização. O glossário traz mais de 380 espécies brasileiras com foto, nomes populares, comportamento e primeiros socorros, além de um mapa que mostra quais serpentes ocorrem em cada estado.",
    destaques: [
      "Um só código para Android e iOS com Kotlin Multiplatform e Compose Multiplatform",
      "Dados científicos reais: espécies do GBIF e fotos de licença aberta do iNaturalist, processadas por um pipeline em Python",
      "Mapa do Brasil desenhado no próprio app, com as espécies de cada estado",
      "Funciona offline: banco local com Room",
      "Login opcional (e-mail e Google) com Supabase e exclusão de conta conforme a LGPD",
      "Build do iOS automatizado no GitHub Actions, e o app avisa quando sai versão nova",
    ],
    tecnologias: ["Kotlin Multiplatform", "Compose Multiplatform", "Room", "Koin", "Supabase", "CameraX", "Python", "GitHub Actions"],
    galeria: [
      { src: "img/bothrops_jararaca.webp", legenda: "Jararaca", credito: "Foto: Daniel Arantes, CC BY-NC (iNaturalist)" },
      { src: "img/crotalus_durissus.webp", legenda: "Cascavel", credito: "Foto: Lucas Botelho, CC BY-NC (iNaturalist)" },
      { src: "img/micrurus_corallinus.webp", legenda: "Coral-verdadeira", credito: "Foto: Marcio C Motta, CC BY-NC (iNaturalist)" },
      { src: "img/eunectes_murinus.webp", legenda: "Sucuri", credito: "Foto: wei_ber, CC BY-NC (iNaturalist)" },
    ],
    links: [
      { texto: "Código no GitHub", url: "https://github.com/VitorMorilho/Bio-Scanner" },
      { texto: "Baixar APK de teste", url: "https://github.com/VitorMorilho/Bio-Scanner/releases/latest/download/BioScanner.apk" },
    ],
  },
  {
    id: "megaplayer",
    nome: "Mega Player",
    resumo: "Player de vídeos de pastas do Mega para Android e Smart TV.",
    status: "Versão 1.1",
    categorias: ["mobile", "tv"],
    visual: "tv",
    imagem: "img/megaplayer-icon.png",
    imagemAlt: "Ícone do Mega Player: botão de play branco sobre fundo vermelho",
    descricao:
      "Basta colar o link público de uma pasta do Mega para assistir aos vídeos com streaming. A descriptografia acontece no próprio aparelho, sem baixar o arquivo inteiro antes. Tem versão para celular Android e para Smart TVs LG (webOS) e Samsung (Tizen).",
    destaques: [
      "Streaming com descriptografia no aparelho",
      "App Android com Jetpack Compose e Media3",
      "Versão para Smart TV em HTML, CSS e JavaScript, navegável pelo controle remoto",
      "Empacotamento e instalação na TV automatizados por scripts",
    ],
    tecnologias: ["Kotlin", "Jetpack Compose", "Media3", "JavaScript", "webOS", "Tizen"],
    links: [],
  },
  {
    id: "conchas",
    nome: "Conchas do MT",
    resumo: "Moluscos terrestres e de água doce do Mato Grosso, em Android e iPhone.",
    status: "Próximo projeto",
    categorias: ["mobile"],
    visual: "concha",
    descricao:
      "Um app irmão do BioScanner, voltado aos moluscos do Mato Grosso: espécies nativas, invasoras como o caramujo-africano e o mexilhão-dourado, e as de importância para a saúde, como a Biomphalaria. O mapa mostra as espécies por bioma: Amazônia, Cerrado e Pantanal.",
    destaques: [
      "Reaproveita a base do BioScanner: registro de campo, glossário e mapa",
      "Mapa do Mato Grosso por bioma",
      "Conteúdo validado por especialista",
    ],
    tecnologias: ["Kotlin Multiplatform", "Compose Multiplatform", "Room", "Supabase"],
    links: [],
  },
  {
    id: "ecommerce-kafka",
    nome: "E-commerce com Kafka",
    resumo: "Microsserviços de pedidos, e-mail, antifraude e log conversando por mensagens.",
    categorias: ["backend"],
    estudo: true,
    tecnologias: ["Java", "Apache Kafka", "Maven"],
    links: [{ texto: "GitHub", url: "https://github.com/VitorMorilho/ecommerce-kafka" }],
  },
  {
    id: "spring-security",
    nome: "API de Fórum com JWT",
    resumo: "API REST de tópicos com autenticação por token JWT.",
    categorias: ["backend"],
    estudo: true,
    tecnologias: ["Kotlin", "Spring Boot", "Spring Security", "JWT"],
    links: [{ texto: "GitHub", url: "https://github.com/VitorMorilho/SpringSecurity" }],
  },
  {
    id: "forum",
    nome: "Fórum em Spring",
    resumo: "Primeira versão da API de fórum: controllers, DTOs e tratamento de erros.",
    categorias: ["backend"],
    estudo: true,
    tecnologias: ["Kotlin", "Spring Boot"],
    links: [{ texto: "GitHub", url: "https://github.com/VitorMorilho/Forum" }],
  },
  {
    id: "alugames",
    nome: "AluGames",
    resumo: "Busca de jogos que consome a API pública da CheapShark.",
    categorias: ["backend"],
    estudo: true,
    tecnologias: ["Kotlin", "API REST"],
    links: [{ texto: "GitHub", url: "https://github.com/VitorMorilho/AluGames" }],
  },
];

const STACK = [
  { grupo: "Mobile", itens: ["Kotlin", "Kotlin Multiplatform", "Jetpack Compose", "Compose Multiplatform", "Room", "Koin", "CameraX", "Media3"] },
  { grupo: "Backend e dados", itens: ["Spring Boot", "Spring Security", "Supabase", "PostgreSQL", "Apache Kafka", "Java", "Python"] },
  { grupo: "Web e TV", itens: ["HTML", "CSS", "JavaScript", "webOS", "Tizen"] },
  { grupo: "Ferramentas", itens: ["Git e GitHub", "GitHub Actions", "Gradle", "Android Studio", "Xcode (via CI)"] },
];
