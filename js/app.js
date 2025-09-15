const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const state = window.APP_DATA || { bebidas: [], promos: [] };

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
hamburger?.addEventListener("click", () => {
  const open = menu.style.display === "block";
  menu.style.display = open ? "none" : "block";
  hamburger.setAttribute("aria-expanded", String(!open));
});

document.getElementById("year").textContent = new Date().getFullYear();

function renderBebidas() {
  const grid = document.getElementById("grid-bebidas");
  state.bebidas.forEach((b) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="media"><img src="${b.img}" alt="${b.nombre}"></div>
      <div class="body">
        <div class="tag">${b.tag}</div>
        <h3>${b.nombre}</h3>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderPromos() {
  const track = document.getElementById("carTrack");
  state.promos.forEach((p) => {
    const slide = document.createElement("article");
    slide.className = "slide";
    slide.innerHTML = `
      <div class="media"><img src="${p.img}" alt="${p.titulo}"></div>
      <div class="body">
        <h3>${p.titulo}</h3>
        <p>${p.detalle}</p>
        <a class="btn primary" href="https://wa.me/595981742163?text=Hola%20Carvallo%20Bodega%2C%20por%20la%20promo%3A%20${encodeURIComponent(p.titulo)}" target="_blank" rel="noopener">Pedir por WhatsApp</a>
      </div>
    `;
    track.appendChild(slide);
  });
  const prev = document.getElementById("carPrev");
  const next = document.getElementById("carNext");
  const slideW = () => track.querySelector(".slide")?.getBoundingClientRect().width || 300;
  prev.addEventListener("click", () => track.scrollBy({ left: -slideW() - 16, behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: slideW() + 16, behavior: "smooth" }));
}

document.getElementById("contactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const nombre = data.get("nombre");
  const telefono = data.get("telefono");
  const mensaje = data.get("mensaje");
  const texto = `Hola Carvallo Bodega, soy ${nombre}. Tel/WA: ${telefono}. %0A%0A${encodeURIComponent(mensaje)}`;
  const url = `https://wa.me/595981742163?text=${texto}`;
  window.open(url, "_blank");
});

renderBebidas();
renderPromos();
