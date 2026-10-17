// Monta os cards a partir de PROJETOS/STACK (js/projetos.js) e cuida de filtros,
// janela de detalhes, tema e animações. Sem bibliotecas.

const $ = (seletor, raiz = document) => raiz.querySelector(seletor);

// Escapa texto vindo dos dados antes de entrar no innerHTML
function esc(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function tags(lista) {
  return `<ul class="tags">${lista.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
}

// Concha desenhada em SVG para o projeto que ainda não tem telas
const SVG_CONCHA = `
  <svg class="concha" viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" aria-hidden="true">
    <path d="M100 24c-42 0-72 34-72 76 0 30 18 54 42 66h60c24-12 42-36 42-66 0-42-30-76-72-76z"/>
    <path d="M100 24v142M64 36l18 130M136 36l-18 130M38 70l40 96M162 70l-40 96"/>
    <path d="M78 166h44v14H78z"/>
  </svg>`;

function visual(p) {
  if (p.visual === "celular") {
    return `<div class="card__visual visual--celular"><div class="celular"><img src="${esc(p.imagem)}" alt="${esc(p.imagemAlt)}" loading="lazy"></div></div>`;
  }
  if (p.visual === "tv") {
    return `<div class="card__visual visual--tv"><div class="tv"><div class="tv__tela"><img src="${esc(p.imagem)}" alt="${esc(p.imagemAlt)}" loading="lazy"></div><div class="tv__pe"></div></div></div>`;
  }
  return `<div class="card__visual visual--concha">${SVG_CONCHA}</div>`;
}

function renderDestaques() {
  $("#destaques").innerHTML = PROJETOS.filter((p) => !p.estudo)
    .map(
      (p) => `
      <article class="card revelar" data-id="${esc(p.id)}" data-categorias="${esc(p.categorias.join(" "))}">
        <div class="card__corpo">
          ${p.status ? `<span class="card__status">${esc(p.status)}</span>` : ""}
          <h3>${esc(p.nome)}</h3>
          <p class="card__resumo">${esc(p.resumo)}</p>
          ${tags(p.tecnologias.slice(0, 4))}
          <button type="button" class="card__mais">Ver detalhes</button>
        </div>
        ${visual(p)}
      </article>`
    )
    .join("");
}

function renderEstudos() {
  $("#estudos").innerHTML = PROJETOS.filter((p) => p.estudo)
    .map(
      (p) => `
      <article class="estudo revelar" data-categorias="${esc(p.categorias.join(" "))}">
        <h4>${esc(p.nome)}</h4>
        <p>${esc(p.resumo)}</p>
        ${tags(p.tecnologias)}
        ${p.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.texto)} ↗</a>`).join("")}
      </article>`
    )
    .join("");
}

function renderStack() {
  $("#stack-lista").innerHTML = STACK.map(
    (g) => `<div class="revelar"><h3>${esc(g.grupo)}</h3>${tags(g.itens)}</div>`
  ).join("");
}

// ---------- Filtros ----------
function configurarFiltros() {
  const botoes = document.querySelectorAll(".filtro");
  botoes.forEach((botao) =>
    botao.addEventListener("click", () => {
      const filtro = botao.dataset.filtro;
      botoes.forEach((b) => {
        const ativo = b === botao;
        b.classList.toggle("ativo", ativo);
        b.setAttribute("aria-pressed", ativo);
      });
      document.querySelectorAll("[data-categorias]").forEach((el) => {
        el.hidden = filtro !== "todos" && !el.dataset.categorias.split(" ").includes(filtro);
      });
      // Esconde o título "Estudos" quando o filtro não deixa nenhum estudo visível
      const algumEstudo = [...document.querySelectorAll(".estudo")].some((el) => !el.hidden);
      $(".subtitulo").hidden = !algumEstudo;
    })
  );
}

// ---------- Janela de detalhes ----------
function abrirDetalhe(id) {
  const p = PROJETOS.find((x) => x.id === id);
  if (!p) return;

  const galeria = p.galeria
    ? `<h3>Algumas espécies do app</h3>
       <div class="galeria">${p.galeria
         .map(
           (g) => `<figure><img src="${esc(g.src)}" alt="${esc(g.legenda)}" loading="lazy">
                   <figcaption>${esc(g.legenda)}<small>${esc(g.credito)}</small></figcaption></figure>`
         )
         .join("")}</div>`
    : "";

  const links = p.links.length
    ? `<div class="hero__acoes">${p.links
        .map((l, i) => `<a class="botao${i === 0 ? " botao--cheio" : ""}" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.texto)}</a>`)
        .join("")}</div>`
    : "";

  $("#detalhe-conteudo").innerHTML = `
    <div class="detalhe__corpo">
      <div>
        <p class="sobretitulo">${esc(p.status || "Projeto")}</p>
        <h2 id="detalhe-titulo">${esc(p.nome)}</h2>
      </div>
      <p>${esc(p.descricao)}</p>
      <h3>Destaques</h3>
      <ul class="lista">${p.destaques.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
      <h3>Tecnologias</h3>
      ${tags(p.tecnologias)}
      ${galeria}
      ${links}
    </div>`;

  const dialogo = $("#detalhe");
  dialogo.showModal();
  dialogo.scrollTop = 0;
  history.replaceState(null, "", `#${p.id}`);
}

function configurarDetalhe() {
  const dialogo = $("#detalhe");
  $("#destaques").addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) abrirDetalhe(card.dataset.id);
  });
  $(".detalhe__fechar").addEventListener("click", () => dialogo.close());
  // Clique fora do conteúdo (no fundo escurecido) fecha
  dialogo.addEventListener("click", (e) => {
    if (e.target === dialogo) dialogo.close();
  });
  dialogo.addEventListener("close", () => history.replaceState(null, "", "#projetos"));

  // Link direto para um projeto, ex.: site.com/#bioscanner
  const hash = location.hash.slice(1);
  if (PROJETOS.some((p) => p.id === hash && !p.estudo)) abrirDetalhe(hash);
}

// ---------- Tema ----------
function configurarTema() {
  $(".tema").addEventListener("click", () => {
    const raiz = document.documentElement;
    const escuroAgora =
      raiz.dataset.theme === "dark" ||
      (!raiz.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    raiz.dataset.theme = escuroAgora ? "light" : "dark";
    try {
      localStorage.setItem("tema", raiz.dataset.theme);
    } catch (e) {}
  });
}

// ---------- Animações ao rolar ----------
function configurarRevelar() {
  const elementos = document.querySelectorAll(".revelar");
  if (!("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("visivel"));
    return;
  }
  const obs = new IntersectionObserver(
    (entradas) =>
      entradas.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visivel");
          obs.unobserve(en.target);
        }
      }),
    { threshold: 0.12 }
  );
  elementos.forEach((el) => obs.observe(el));
}

function configurarTopo() {
  const topo = $(".topo");
  const atualizar = () => topo.classList.toggle("rolou", scrollY > 8);
  addEventListener("scroll", atualizar, { passive: true });
  atualizar();
}

renderDestaques();
renderEstudos();
renderStack();
configurarFiltros();
configurarDetalhe();
configurarTema();
configurarRevelar();
configurarTopo();
$("#ano").textContent = new Date().getFullYear();
