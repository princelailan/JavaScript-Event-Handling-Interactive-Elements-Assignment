// Rave Mode State
let isRaveMode = false;
const raveToggle = document.getElementById('rave-toggle');
let raveInterval = null;

raveToggle.addEventListener('click', () => {
    isRaveMode = !isRaveMode;
    raveToggle.textContent = isRaveMode ? 'Chill Mode 😎' : 'Toggle Rave Mode! 🎉';
    document.body.classList.toggle('rave-mode', isRaveMode);
    if (isRaveMode) {
        playRaveBeat();
        raveInterval = setInterval(() => {
            nextBtn.click(); // Auto-scroll gallery
            playSound(440, 0.1);
            spawnParticles();
            spawnEmojis();
        }, 2000);
    } else {
        clearInterval(raveInterval);
        stopRaveBeat();
        clearParticles();
        clearEmojis();
    }
});

// Particle and Emoji Effects for Rave Mode
function spawnParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (3 + Math.random() * 3) + 's';
        particlesContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 6000);
    }
}

function spawnEmojis() {
    const emojiContainer = document.getElementById('emoji-chaos');
    const emojis = ['🥭', '🍖', '🔥', '🛍️', '📿'];
    for (let i = 0; i < 5; i++) {
        const emoji = document.createElement('div');
        emoji.classList.add('emoji');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.animationDuration = (3 + Math.random() * 3) + 's';
        emojiContainer.appendChild(emoji);
        setTimeout(() => emoji.remove(), 6000);
    }
}

function clearParticles() {
    const particlesContainer = document.getElementById('particles');
    particlesContainer.innerHTML = '';
}

function clearEmojis() {
    const emojiContainer = document.getElementById('emoji-chaos');
    emojiContainer.innerHTML = '';
}

// Button Interaction
const marketButton = document.getElementById('market-button');
const buttonFeedback = document.getElementById('button-feedback');
let clickCount = 0;

marketButton.addEventListener('click', () => {
    clickCount++;
    const deals = [
        `Mambo! Deal #${clickCount}: 50% off beads, vuka border! 🦒`,
        `Poa sana! Deal #${clickCount}: Free nyama choma with kanga! 🍖`,
        `Wazito! Deal #${clickCount}: Spice mix na free ugali! 🌮`
    ];
    buttonFeedback.textContent = deals[clickCount % deals.length];
    marketButton.style.backgroundColor = clickCount % 2 === 0 ? '#ff3333' : '#00cc00';
    playSound(isRaveMode ? 880 : 440, 0.2);
    spawnButtonEmojis(marketButton);
});

marketButton.addEventListener('mouseover', () => {
    buttonFeedback.textContent = 'Wanjiku’s stall is LIT, mhesh! 🔥';
});

marketButton.addEventListener('mouseout', () => {
    buttonFeedback.textContent = `Grab Deal #${clickCount + 1}, it’s mbesha time! 💸`;
});

function spawnButtonEmojis(button) {
    const emojiContainer = document.getElementById('emoji-chaos');
    const emojis = ['💥', '🌟', '🎉', '🔥'];
    const rect = button.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
        const emoji = document.createElement('div');
        emoji.classList.add('emoji');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 100) + 'px';
        emoji.style.top = (rect.top - 20) + 'px';
        emoji.style.animationDuration = '2s';
        emojiContainer.appendChild(emoji);
        setTimeout(() => emoji.remove(), 2000);
    }
}

// Double-click Easter Egg with Screen Shake
marketButton.addEventListener('dblclick', () => {
    buttonFeedback.textContent = '🌪️ ULTRA MZUQA: Free matatu ride & chai! 🚌';
    marketButton.classList.add('animate-pulse');
    document.body.classList.add('shake');
    triggerConfetti();
    playSound(isRaveMode ? 1200 : 880, 0.3);
    setTimeout(() => {
        marketButton.classList.remove('animate-pulse');
        document.body.classList.remove('shake');
    }, 1000);
});

// Keypress Detection
document.addEventListener('keypress', (e) => {
    if (e.key === 'k') {
        buttonFeedback.textContent = 'K for Kamau! Beads ziko faya! 🔥';
        playSound(isRaveMode ? 1000 : 660, 0.2);
    }
});

// Painting Canvas
const canvas = document.getElementById('painting-canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');
const beadBrush = document.getElementById('bead-brush');
const raveSpray = document.getElementById('rave-spray');
const clearCanvas = document.getElementById('clear-canvas');
let isDrawing = false;
let useBeadBrush = false;
let useRaveSpray = false;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    draw(e);
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) draw(e);
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.beginPath();
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    ctx.beginPath();
});

function draw(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    if (useRaveSpray) {
        // Rave Spray: Random shapes in all directions
        for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 40;
            const shapeX = x + Math.cos(angle) * distance;
            const shapeY = y + Math.sin(angle) * distance;
            ctx.fillStyle = ['#ff3333', '#00cc00', '#000000', '#ffffff', '#ffe680'][Math.floor(Math.random() * 5)];
            const shapeType = Math.floor(Math.random() * 3);
            if (shapeType === 0) { // Circle
                ctx.arc(shapeX, shapeY, Math.random() * 5 + 2, 0, Math.PI * 2);
            } else if (shapeType === 1) { // Star
                drawStar(ctx, shapeX, shapeY, 5, 5, 2);
            } else { // Triangle
                drawTriangle(ctx, shapeX, shapeY, 10);
            }
            ctx.fill();
        }
    } else if (useBeadBrush) {
        // Maasai Party Brush: Randomized bead spray with sparkles
        for (let i = 0; i < 5; i++) {
            const offsetX = (Math.random() - 0.5) * 30;
            const offsetY = (Math.random() - 0.5) * 30;
            ctx.fillStyle = ['#ff3333', '#00cc00', '#000000', '#ffffff', '#ffe680'][Math.floor(Math.random() * 5)];
            ctx.arc(x + offsetX, y + offsetY, Math.random() * 5 + 2, 0, Math.PI * 2);
            ctx.fill();
            if (Math.random() > 0.7) {
                ctx.fillStyle = '#ffe680';
                ctx.arc(x + offsetX + (Math.random() - 0.5) * 10, y + offsetY + (Math.random() - 0.5) * 10, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    } else {
        ctx.fillStyle = colorPicker.value;
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.closePath();
    playSound(isRaveMode ? 1000 : 770, 0.1);
    canvas.classList.add('brushStroke');
    setTimeout(() => canvas.classList.remove('brushStroke'), 200);
}

function drawStar(ctx, x, y, points, outerRadius, innerRadius) {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (Math.PI / points) * i;
        ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
    }
    ctx.closePath();
}

function drawTriangle(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x - size, y + size);
    ctx.lineTo(x + size, y + size);
    ctx.closePath();
}

beadBrush.addEventListener('click', () => {
    useBeadBrush = !useBeadBrush;
    useRaveSpray = false;
    beadBrush.textContent = useBeadBrush ? 'Chill Brush' : 'Maasai Party Brush';
    raveSpray.textContent = 'Rave Spray';
    playSound(isRaveMode ? 880 : 550, 0.2);
});

raveSpray.addEventListener('click', () => {
    useRaveSpray = !useRaveSpray;
    useBeadBrush = false;
    raveSpray.textContent = useRaveSpray ? 'Chill Spray' : 'Rave Spray';
    beadBrush.textContent = 'Maasai Party Brush';
    playSound(isRaveMode ? 880 : 550, 0.2);
});

clearCanvas.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playSound(isRaveMode ? 1200 : 330, 0.2);
    if (isRaveMode) {
        document.body.classList.add('strobe');
        setTimeout(() => document.body.classList.remove('strobe'), 500);
    }
});

// Treasure Hunt Game
const treasureButton = document.getElementById('treasure-button');
const treasureFeedback = document.getElementById('treasure-feedback');
const treasures = [
    'Golden Maasai Chain! Worth 1000 KES! 💎',
    'Secret Spice Bomb! Too hot to handle! 🌶️',
    'Kanga Fit na Swagger! Pure drip! 🧵',
    'Mango Overload! Juiciest in Nairobi! 🥭',
    'Mystery Matatu Ride! Vroom vroom! 🚌',
    'SUPER TREASURE: Market King’s Crown! 👑'
];
let treasureCount = 0;

treasureButton.addEventListener('click', () => {
    treasureCount++;
    const randomTreasure = treasures[Math.floor(Math.random() * treasures.length)];
    treasureFeedback.textContent = `Loot #${treasureCount}: ${randomTreasure}`;
    treasureButton.style.transform = `rotate(${treasureCount * 15}deg)`;
    playSound(isRaveMode ? 1000 : 550, 0.25);
    if (randomTreasure.includes('Matatu') || randomTreasure.includes('SUPER')) {
        if (randomTreasure.includes('SUPER')) {
            triggerFireworks();
        } else {
            triggerConfetti();
        }
        playSound(isRaveMode ? 1500 : 1000, 0.4);
    }
});

// Image Gallery
const galleryImage = document.getElementById('gallery-image');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const images = [
    'https://images.unsplash.com/photo-1598973563502-29e39f989b4a', // Nairobi market stalls
    'https://images.unsplash.com/photo-1598973564060-6f31e7be9150', // Street scene with matatu
    'https://images.unsplash.com/photo-1598973564029-6b3943e9c216', // Kenyan crafts
    'https://images.unsplash.com/photo-1598973563744-6eb2d3e033eb'  // Fresh produce
];
const altTexts = [
    'Vibrant Nairobi market with colorful stalls',
    'Busy Nairobi street with a matatu taxi',
    'Traditional Kenyan crafts and beads',
    'Fresh fruits at a Nairobi market'
];
let currentImageIndex = 0;

function updateGalleryImage() {
    galleryImage.src = images[currentImageIndex];
    galleryImage.alt = altTexts[currentImageIndex];
    galleryImage.classList.add('fade');
    if (isRaveMode) galleryImage.classList.add('glitch');
    playSound(isRaveMode ? 660 : 220, 0.15);
    setTimeout(() => {
        galleryImage.classList.remove('fade');
        if (!isRaveMode) galleryImage.classList.remove('glitch');
    }, 500);
}

prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateGalleryImage();
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateGalleryImage();
});

// Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        content.classList.toggle('active');
        playSound(isRaveMode ? 880 : 330, 0.2);
    });
});

// Form Validation
const form = document.getElementById('market-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const formFeedback = document.getElementById('form-feedback');

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(inputId, message) {
    document.getElementById(`${inputId}-error`).textContent = message;
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(error => error.textContent = '');
}

nameInput.addEventListener('input', () => {
    if (nameInput.value.trim() === '') {
        showError('name', 'Name iko wapi, bro? 😎');
    } else {
        showError('name', '');
    }
});

emailInput.addEventListener('input', () => {
    if (!validateEmail(emailInput.value)) {
        showError('email', 'Hii email ni feki, msee! 📧');
    } else {
        showError('email', '');
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.value.length < 8) {
        showError('password', 'Password inafaa iwe 8+, weka nguvu! 💪');
    } else {
        showError('password', '');
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    let isValid = true;

    if (nameInput.value.trim() === '') {
        showError('name', 'Name iko wapi, bro? 😎');
        isValid = false;
    }
    if (!validateEmail(emailInput.value)) {
        showError('email', 'Hii email ni feki, msee! 📧');
        isValid = false;
    }
    if (passwordInput.value.length < 8) {
        showError('password', 'Password inafaa iwe 8+, weka nguvu! 💪');
        isValid = false;
    }

    if (isValid) {
        formFeedback.textContent = `Mambo ${nameInput.value}! You’re the Rave King/Queen! 🎉`;
        triggerConfetti();
        playSound(isRaveMode ? 1200 : 880, 0.3);
        form.reset();
    }
});

// Sound Effects
function playSound(frequency, duration) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    oscillator.type = isRaveMode ? 'square' : 'sine';
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscillator.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
}

let raveBeatInterval = null;
function playRaveBeat() {
    let beatCount = 0;
    raveBeatInterval = setInterval(() => {
        playSound(beatCount % 2 === 0 ? 440 : 660, 0.1);
        beatCount++;
    }, 300);
}

function stopRaveBeat() {
    clearInterval(raveBeatInterval);
}

// Confetti Effect
function triggerConfetti() {
    const emojiContainer = document.getElementById('emoji-chaos');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('emoji');
        confetti.textContent = ['💥', '🌟', '🎉', '🔥'][Math.floor(Math.random() * 4)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-12px';
        confetti.style.animationDuration = (0.8 + Math.random() * 0.5) + 's';
        emojiContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);
    }
}

// Fireworks Effect for Super Treasure
function triggerFireworks() {
    const emojiContainer = document.getElementById('emoji-chaos');
    for (let i = 0; i < 50; i++) {
        const firework = document.createElement('div');
        firework.classList.add('emoji');
        firework.textContent = '✨';
        firework.style.left = Math.random() * 100 + 'vw';
        firework.style.top = Math.random() * 100 + 'vh';
        firework.style.animation = `firework ${1 + Math.random()}s ease`;
        emojiContainer.appendChild(firework);
        setTimeout(() => firework.remove(), 2000);
    }
}
