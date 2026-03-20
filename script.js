// Configuration
const ANONYLOADR_URL = 'https://anonyloadr.vercel.app';
const CHATTER_URL = 'https://chatter-5ufw.onrender.com';
const AETHERIA_URL = 'https://chatter-5ufw.onrender.com/aetheria/';

// DOM Elements
const modalOverlay = document.getElementById('modalOverlay');
const anonyloadrCard = document.getElementById('anonyloadrCard');
const chatterCard = document.getElementById('chatterCard');
const aetheriaCard = document.getElementById('aetheriaCard');
const modalClose = document.getElementById('modalClose');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const luckyBtn = document.getElementById('luckyBtn');
const appsIcon = document.getElementById('appsIcon');
const appsMenu = document.getElementById('appsMenu');

// "I'm Feeling Lucky" text variations
const luckyTexts = [
    "I'm Feeling Lucky",
    "I'm Feeling Curious",
    "I'm Feeling Playful",
    "I'm Feeling Artistic",
    "I'm Feeling Doodley",
    "I'm Feeling Hungry",
    "I'm Feeling Stellar",
    "I'm Feeling Trendy"
];
let luckyIndex = 0;

// Cloak and redirect function
function cloakAndRedirect(url) {
    const win = window.open();
    if (win) {
        win.document.write('<iframe src="' + url + '" style="width:100%;height:100vh;border:none;"></iframe>');
        win.document.body.style.margin = '0';
        win.document.body.style.overflow = 'hidden';
        win.document.title = 'Google';
        
        // Replace this page with Google
        window.location.replace('https://google.com');
    }
}

// Show modal function
function showModal() {
    modalOverlay.classList.add('active');
}

// Hide modal function
function hideModal() {
    modalOverlay.classList.remove('active');
}

// Google Search function
function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
        window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    }
}

// "I'm Feeling Lucky" function
function feelingLucky() {
    const query = searchInput.value.trim();
    if (query) {
        window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query) + '&btnI=I';
    } else {
        window.location.href = 'https://www.google.com/doodles';
    }
}

// Event Listeners

// Search on Enter key
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Google Search button click
searchBtn.addEventListener('click', performSearch);

// I'm Feeling Lucky button
luckyBtn.addEventListener('click', feelingLucky);

// I'm Feeling Lucky hover text rotation
luckyBtn.addEventListener('mouseenter', function() {
    luckyIndex = (luckyIndex + 1) % luckyTexts.length;
    luckyBtn.textContent = luckyTexts[luckyIndex];
});

luckyBtn.addEventListener('mouseleave', function() {
    luckyBtn.textContent = "I'm Feeling Lucky";
});

// AnonyLoadr option click
anonyloadrCard.addEventListener('click', function() {
    cloakAndRedirect(ANONYLOADR_URL);
});

// Chatter option click
chatterCard.addEventListener('click', function() {
    cloakAndRedirect(CHATTER_URL);
});

// Aetheria option click (NEW)
aetheriaCard.addEventListener('click', function() {
    cloakAndRedirect(AETHERIA_URL);
});

// Close modal button
modalClose.addEventListener('click', function() {
    hideModal();
});

// Close modal on overlay click
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        hideModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        hideModal();
    }
});

// Secret keycode: Alt+E
document.addEventListener('keydown', function(e) {
    if (e.altKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        showModal();
    }
});

// Apps menu toggle
appsIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    appsMenu.classList.toggle('active');
});

// Close apps menu when clicking outside
document.addEventListener('click', function() {
    appsMenu.classList.remove('active');
});

// Focus search on '/' key
document.addEventListener('keydown', function(e) {
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
    }
});

// Add hover sound effects (optional enhancement)
const optionCards = document.querySelectorAll('.option-card');
optionCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
