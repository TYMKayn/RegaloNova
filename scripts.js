// --- Música ---
const musica = document.getElementById("musica");
const musicaBtn = document.getElementById("musicaBtn");
musicaBtn.addEventListener("click", () => {
    if (musica.paused) {
        musica.play();
        musicaBtn.textContent = "⏸️";
    } else {
        musica.pause();
        musicaBtn.textContent = "🎵";
    }
});

// --- Iniciar contador y mostrar contenido ---
function iniciar() {
    const fechaInput = document.getElementById("fecha").value;
    if (!fechaInput) return alert("Por favor, elige una fecha 🥰");

    const fechaInicio = new Date(fechaInput);
    
    // Ocultar pantalla inicial
    document.getElementById("inicio").style.display = "none";
    // En la función iniciar():
document.getElementById("dedicatoria").style.display = "block";

    
    // Mostrar dedicatoria con efecto
    setTimeout(() => {
        const dedicatoria = document.getElementById("dedicatoria");
        dedicatoria.classList.remove("oculto");
        efectoMaquinaEscribir("textoDedicatoria");
    }, 500);

    // Iniciar contador
    setInterval(() => {
        const ahora = new Date();
        const diferencia = ahora - fechaInicio;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
        const segundos = Math.floor((diferencia / 1000) % 60);

        document.getElementById("contador").textContent =
            `Juntos desde hace ${dias} días, ${horas}h ${minutos}m ${segundos}s 💞`;
    }, 1000);
}

// --- Efecto máquina de escribir ---
function efectoMaquinaEscribir(idElemento) {
    const elemento = document.getElementById(idElemento);
    const texto = elemento.textContent.trim();
    elemento.textContent = "";
    let i = 0;

    function escribir() {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
            setTimeout(escribir, 50);
        }
    }
    escribir();
}

// --- Carrusel automático ---
let indice = 0;
const slides = document.querySelectorAll(".slide");

function cambiarSlide() {
    slides[indice].classList.remove("activo");
    slides[indice].classList.add("saliente");
    indice = (indice + 1) % slides.length;
    slides[indice].classList.add("entrante");
    slides[indice].classList.add("activo");

    setTimeout(() => {
        slides.forEach(s => s.classList.remove("saliente", "entrante"));
    }, 1500);
}

setInterval(cambiarSlide, 6000);

// --- Pétalos con imagen personalizada ---
const canvas = document.getElementById('petalos');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const petalos = [];

// 👉 Cambia esta ruta por la imagen que quieras (petalo, corazón, etc.)
const petaloImg = new Image();
petaloImg.src = 'cora.png';

class Petalo {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.size = 20 + Math.random() * 25;
    this.speed = 0.5 + Math.random() * 2;
    this.swing = Math.random() * 2; 
    this.angle = Math.random() * Math.PI * 2;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
  }
  update() {
    this.y += this.speed;
    this.x += Math.sin(this.angle) * this.swing;
    this.angle += 0.02;
    this.rotation += this.rotationSpeed;

    if (this.y > height + 30) this.reset();
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(petaloImg, -this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

for (let i = 0; i < 50; i++) petalos.push(new Petalo());

function animarPetalos() {
  ctx.clearRect(0, 0, width, height);
  petalos.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animarPetalos);
}

petaloImg.onload = animarPetalos;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});
