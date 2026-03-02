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

// REAL Cloak function - creates a blob URL and redirects to it
function cloakToBlob() {
    // Get the current HTML content to embed in the blob
    const currentUrl = window.location.href;
    
    // Create blob HTML that contains this site in an iframe
    const blobHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>about:blank</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; width: 100%; overflow: hidden; background: white; }
        iframe { width: 100%; height: 100%; border: none; }
    </style>
</head>
<body>
    <iframe src="${currentUrl}?cloaked=true" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"></iframe>
</body>
</html>`;
    
    // Create blob and navigate to it
    const blob = new Blob([blobHtml], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    
    // Redirect current page to blob URL (real cloak - URL changes to blob:...)
    window.location.replace(blobUrl);
}

// Check if we're already cloaked (inside the iframe)
const urlParams = new URLSearchParams(window.location.search);
const isCloaked = urlParams.get('cloaked') === 'true';

// On page load
window.addEventListener('load', function() {
    if (!isCloaked) {
        // 1. Open real Google in a new tab
        window.open('https://www.google.com', '_blank');
        
        // 2. Cloak this tab (redirect to blob URL)
        cloakToBlob();
    }
    // If cloaked, we're inside the iframe - just show the clone normally
});

// Cloak and redirect to AnonyLoadr/Chatter
function cloakAndRedirect(url) {
    const win = window.open();
    if (win) {
        win.document.write('<iframe src="' + url + '" style="width:100%;height:100vh;border:none;"></iframe>');
        win.document.body.style.margin = '0';
        win.document.body.style.overflow = 'hidden';
        win.document.title = 'Google';
        
        // Close the blob tab
        window.close();
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
