/* ==========================================================================
   Datos
   ========================================================================== */
const characters = [
  { name: "Homero Simpson", group: "familia", initials: "HS", color: "#FED41D",
    role: "Padre de familia", blurb: "Trabaja en la planta nuclear y ama los donas casi tanto como a su familia.",
    quote: "D'oh!" },
  { name: "Marge Simpson", group: "familia", initials: "MS", color: "#4AACE0",
    role: "Madre de familia", blurb: "El pilar del hogar, reconocible por su peinado imposiblemente alto.",
    quote: "Homero, por favor..." },
  { name: "Bart Simpson", group: "familia", initials: "BS", color: "#F7A8C4",
    role: "El bromista", blurb: "Estudiante de cuarto grado experto en patineta y travesuras.",
    quote: "¡Ay, caramba!" },
  { name: "Lisa Simpson", group: "familia", initials: "LS", color: "#6FCF37",
    role: "La intelectual", blurb: "Saxofonista, vegetariana y la mente más brillante de la casa.",
    quote: "Esto es una injusticia." },
  { name: "Maggie Simpson", group: "familia", initials: "MG", color: "#FED41D",
    role: "La bebé", blurb: "No habla, pero siempre está chupando su chupón con actitud.",
    quote: "..." },
  { name: "Abuelo Abraham", group: "familia", initials: "AA", color: "#B9C2DE",
    role: "El abuelo", blurb: "Vive en el asilo de ancianos y siempre tiene una historia larguísima que contar.",
    quote: "En mis tiempos..." },
  { name: "Milhouse Van Houten", group: "amigos", initials: "MV", color: "#4AACE0",
    role: "Mejor amigo de Bart", blurb: "Usa lentes, es alérgico a casi todo y tiene mala suerte crónica.",
    quote: "Todo el tiempo, Milhouse." },
  { name: "Moe Szyslak", group: "amigos", initials: "MZ", color: "#6FCF37",
    role: "Cantinero", blurb: "Dueño de la taberna de Moe, punto de reunión de Homero y sus amigos.",
    quote: "Taberna de Moe, ¿diga?" },
  { name: "Barney Gumble", group: "amigos", initials: "BG", color: "#F7A8C4",
    role: "El mejor amigo", blurb: "Cliente número uno de la taberna y sorprendentemente buen cantante de ópera.",
    quote: "¡Eh!" },
  { name: "Ned Flanders", group: "vecinos", initials: "NF", color: "#FED41D",
    role: "El vecino", blurb: "Vive al lado de los Simpson, siempre alegre, religioso y bien vestido.",
    quote: "¡Hola-diga, vecinito-dito!" },
  { name: "Jefe Wiggum", group: "vecinos", initials: "JW", color: "#F4B400",
    role: "Jefe de policía", blurb: "Encargado de la seguridad de Springfield, aunque prefiere las donas al deber.",
    quote: "Circulen, no hay nada que ver." },
  { name: "Krusty el Payaso", group: "vecinos", initials: "KP", color: "#4AACE0",
    role: "Estrella de TV", blurb: "Conductor del show infantil favorito de Bart y Lisa en Canal 6.",
    quote: "¡Hola, hola, niños!" }
];

const quotes = [
  { text: "¡Ay, caramba!", author: "Bart Simpson" },
  { text: "D'oh!", author: "Homero Simpson" },
  { text: "Multiplícate por cero.", author: "Bart Simpson" },
  { text: "Excelente...", author: "Mr. Burns" },
  { text: "Yo no fui.", author: "Bart Simpson" },
  { text: "¡Hola-diga, vecinito-dito!", author: "Ned Flanders" },
  { text: "Circulen, no hay nada que ver.", author: "Jefe Wiggum" }
];

const quizQuestions = [
  { q: "¿Cómo se llama la ciudad ficticia donde viven los Simpson?", options: ["Shelbyville", "Springfield", "Ogdenville", "Capital City"], correct: 1 },
  { q: "¿Cómo se llama el perro de la familia Simpson?", options: ["Bola de Nieve", "Santa's Little Helper (Ayudante de Santa)", "Rex", "Duque"], correct: 1 },
  { q: "¿Cuál es la profesión de Homero Simpson?", options: ["Bombero", "Maestro", "Inspector de seguridad en la planta nuclear", "Policía"], correct: 2 },
  { q: "¿Quién creó Los Simpson?", options: ["Seth MacFarlane", "Matt Groening", "Trey Parker", "Mike Judge"], correct: 1 },
  { q: "¿Qué instrumento toca Lisa Simpson?", options: ["Guitarra", "Piano", "Saxofón", "Batería"], correct: 2 }
];

const pollSeed = [
  { name: "Homero Simpson", votes: 128 },
  { name: "Bart Simpson", votes: 96 },
  { name: "Lisa Simpson", votes: 74 },
  { name: "Marge Simpson", votes: 51 },
  { name: "Ned Flanders", votes: 38 },
  { name: "Milhouse Van Houten", votes: 22 }
];

/* ==========================================================================
   Navegación
   ========================================================================== */
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => mainNav.classList.remove("is-open"));
});

/* Tema día / noche */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
themeToggle.addEventListener("click", () => {
  const isNight = document.body.dataset.theme === "noche";
  document.body.dataset.theme = isNight ? "dia" : "noche";
  themeIcon.textContent = isNight ? "☀️" : "🌙";
  themeLabel.textContent = isNight ? "Día" : "Noche";
});

/* ==========================================================================
   Personajes: render + filtro + búsqueda
   ========================================================================== */
const grid = document.getElementById("characterGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const chips = document.querySelectorAll(".chip");
let activeFilter = "todos";

function renderCharacters(){
  const term = searchInput.value.trim().toLowerCase();
  const filtered = characters.filter(c => {
    const matchesGroup = activeFilter === "todos" || c.group === activeFilter;
    const matchesTerm = c.name.toLowerCase().includes(term);
    return matchesGroup && matchesTerm;
  });

  grid.innerHTML = filtered.map(c => `
    <article class="card">
      <div class="card__avatar" style="background:${c.color}">${c.initials}</div>
      <h3 class="card__name">${c.name}</h3>
      <p class="card__role">${c.role}</p>
      <p class="card__blurb">${c.blurb}</p>
      <p class="card__quote">"${c.quote}"</p>
    </article>
  `).join("");

  emptyState.hidden = filtered.length !== 0;
}

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    activeFilter = chip.dataset.filter;
    renderCharacters();
  });
});
searchInput.addEventListener("input", renderCharacters);
renderCharacters();

/* ==========================================================================
   Frase del día
   ========================================================================== */
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const quoteBtn = document.getElementById("quoteBtn");
let lastQuoteIndex = -1;

quoteBtn.addEventListener("click", () => {
  let index;
  do { index = Math.floor(Math.random() * quotes.length); } while (index === lastQuoteIndex && quotes.length > 1);
  lastQuoteIndex = index;
  const q = quotes[index];
  quoteText.textContent = `"${q.text}"`;
  quoteAuthor.textContent = `— ${q.author}`;
  quoteText.classList.remove("fade-in");
  void quoteText.offsetWidth; // reinicia la animación
  quoteText.classList.add("fade-in");
});

/* ==========================================================================
   Trivia
   ========================================================================== */
const quizQuestionEl = document.getElementById("quizQuestion");
const quizOptionsEl = document.getElementById("quizOptions");
const quizProgressEl = document.getElementById("quizProgress");
const quizScoreEl = document.getElementById("quizScore");
const quizFeedbackEl = document.getElementById("quizFeedback");
const quizNextBtn = document.getElementById("quizNextBtn");
const quizRestartBtn = document.getElementById("quizRestartBtn");

let quizIndex = 0;
let quizScore = 0;

function renderQuizQuestion(){
  const item = quizQuestions[quizIndex];
  quizQuestionEl.textContent = item.q;
  quizProgressEl.textContent = `Pregunta ${quizIndex + 1} de ${quizQuestions.length}`;
  quizScoreEl.textContent = `Puntaje: ${quizScore}`;
  quizFeedbackEl.textContent = "";
  quizNextBtn.hidden = true;
  quizRestartBtn.hidden = true;

  quizOptionsEl.innerHTML = "";
  item.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.className = "quiz__option";
    btn.textContent = option;
    btn.addEventListener("click", () => handleAnswer(i, btn));
    quizOptionsEl.appendChild(btn);
  });
}

function handleAnswer(selected, btnEl){
  const item = quizQuestions[quizIndex];
  const allOptions = quizOptionsEl.querySelectorAll(".quiz__option");
  allOptions.forEach(b => b.disabled = true);

  if (selected === item.correct){
    btnEl.classList.add("is-correct");
    quizFeedbackEl.textContent = "¡Correcto!";
    quizScore++;
  } else {
    btnEl.classList.add("is-wrong");
    allOptions[item.correct].classList.add("is-correct");
    quizFeedbackEl.textContent = "No era esa, ¡sigue intentando!";
  }
  quizScoreEl.textContent = `Puntaje: ${quizScore}`;

  if (quizIndex < quizQuestions.length - 1){
    quizNextBtn.hidden = false;
  } else {
    quizFeedbackEl.textContent += ` Terminaste con ${quizScore} de ${quizQuestions.length}.`;
    quizRestartBtn.hidden = false;
  }
}

quizNextBtn.addEventListener("click", () => {
  quizIndex++;
  renderQuizQuestion();
});
quizRestartBtn.addEventListener("click", () => {
  quizIndex = 0;
  quizScore = 0;
  renderQuizQuestion();
});

renderQuizQuestion();

/* ==========================================================================
   Votación
   ========================================================================== */
const pollEl = document.getElementById("poll");
const pollData = pollSeed.map(p => ({ ...p }));

function renderPoll(){
  const total = pollData.reduce((sum, p) => sum + p.votes, 0);
  pollEl.innerHTML = pollData.map((p, i) => {
    const pct = total ? Math.round((p.votes / total) * 100) : 0;
    return `
      <div class="poll__row">
        <div class="poll__top">
          <span class="poll__name">${p.name}</span>
          <span class="poll__count">${p.votes} votos · ${pct}%</span>
        </div>
        <div class="poll__track"><div class="poll__bar" style="width:${pct}%"></div></div>
        <button class="poll__vote" data-index="${i}">Votar</button>
      </div>
    `;
  }).join("");

  pollEl.querySelectorAll(".poll__vote").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.index);
      pollData[i].votes++;
      renderPoll();
    });
  });
}
renderPoll();
