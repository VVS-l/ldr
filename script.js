// Configuration
const ANONYLOADR_URL = 'https://anonyloadr.vercel.app';
const CHATTER_URL = 'https://chatter-5ufw.onrender.com';

// DOM Elements
const modalOverlay = document.getElementById('modalOverlay');
const anonyloadrCard = document.getElementById('anonyloadrCard');
const chatterCard = document.getElementById('chatterCard');
const modalClose = document.getElementById('modalClose');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

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

// Event Listeners

// Trigger on Enter key in search box
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        showModal();
    }
});

// Trigger on Google Search button click
searchBtn.addEventListener('click', function() {
    showModal();
});

// AnonyLoadr option click
anonyloadrCard.addEventListener('click', function() {
    cloakAndRedirect(ANONYLOADR_URL);
});

// Chatter option click
chatterCard.addEventListener('click', function() {
    cloakAndRedirect(CHATTER_URL);
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
