// Variables principales del DOM
let noClickCount = 0;
const siBtn = document.getElementById('si-btn');
const noBtn = document.getElementById('no-btn');
const funnyText = document.getElementById('funny-text');
const musicControlBtn = document.getElementById('music-control');
const resetBtn = document.getElementById('reset-btn');

const bgMusic = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');
const musicText = document.getElementById('music-text');

let isPlaying = false;

// Frases juguetonas para el botón "No"
const funnyMessages = [
    "¿Estás segura? 🥺",
    "¡Piénsalo bien! 💭",
    "¡Esa opción está fallando! 😜",
    "¡Anda, di que sí! ✨",
    "¡No te dejaré presionar No! 🙈",
    "¡El destino dice que SÍ! ✨"
];

// Función para alternar la música (Play / Pause)
function toggleMusic(event) {
    if (event) event.stopPropagation();

    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

// Reproducir audio MP3 real
function playMusic() {
    isPlaying = true;
    bgMusic.volume = 0.20; // Volumen suave ideal para la melodía instrumental (20%)
    
    bgMusic.play().then(() => {
        updateMusicUI(true, "Espérame en El Cielo 🎵");
    }).catch(error => {
        console.log("Esperando interacción del usuario para reproducir audio...");
    });
}

// Pausar audio MP3 real
function pauseMusic() {
    isPlaying = false;
    bgMusic.pause();
    updateMusicUI(false, "Música: Pausada");
}

// Actualizar la interfaz del botón de música
function updateMusicUI(active, text) {
    if (active) {
        musicIcon.className = 'fa-solid fa-volume-high text-pink-500 animate-pulse';
        musicText.innerText = text;
    } else {
        musicIcon.className = 'fa-solid fa-music text-pink-500';
        musicText.innerText = text;
    }
}

// Acción del botón "NO" (Crece el SÍ, se mueve el NO)
function handleNoClick() {
    noClickCount++;

    const currentSiScale = 1 + (noClickCount * 0.25);
    siBtn.style.transform = `scale(${currentSiScale})`;

    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 120;

    noBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(${Math.max(0.6, 1 - noClickCount * 0.1)})`;

    const msgIndex = Math.min(noClickCount - 1, funnyMessages.length - 1);
    funnyText.innerText = funnyMessages[msgIndex];
    funnyText.style.opacity = '1';
}

// Transición a la carta al presionar "SÍ" y reproducir canción
function goToStep2() {
    if (!isPlaying) {
        playMusic();
    }

    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');

    step1.classList.add('opacity-0', 'scale-95');
    
    setTimeout(() => {
        step1.classList.add('hidden');
        
        step2.classList.remove('hidden');
        setTimeout(() => {
            step2.classList.remove('opacity-0', 'scale-95');
            step2.classList.add('opacity-100', 'scale-100');
        }, 50);
    }, 400);
}

// Reiniciar pantalla
function resetApp() {
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');

    noClickCount = 0;
    siBtn.style.transform = 'scale(1)';
    if (noBtn) noBtn.style.transform = 'translate(0px, 0px) scale(1)';
    funnyText.style.opacity = '0';

    step2.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
        step2.classList.add('hidden');
        step1.classList.remove('hidden');
        setTimeout(() => {
            step1.classList.remove('opacity-0', 'scale-95');
            step1.classList.add('opacity-100', 'scale-100');
        }, 50);
    }, 400);
}

// Asignación de Eventos en el DOM
if (siBtn) siBtn.addEventListener('click', goToStep2);
if (noBtn) {
    noBtn.addEventListener('click', handleNoClick);
    noBtn.addEventListener('mouseenter', () => {
        if (noClickCount > 2) {
            handleNoClick();
        }
    });
}
if (musicControlBtn) musicControlBtn.addEventListener('click', toggleMusic);
if (resetBtn) resetBtn.addEventListener('click', resetApp);