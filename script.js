// Configuration
const ANONYLOADR_URL = 'https://anonyloadr.vercel.app';
const CHATTER_URL = 'https://chatter-5ufw.onrender.com';
const REDIRECT_GOOGLE = 'https://www.google.com';

// Check if we're the cloaked window
const isCloaked = window.location.protocol === 'about:' || document.title === 'New Tab';

if (!isCloaked && window.location.protocol !== 'file:' && !window.location.href.includes('localhost')) {
    // === MAIN PAGE: Create cloaked window ===
    
    // Open real Google in new tab
    window.open(REDIRECT_GOOGLE, '_blank');
    
    // Get the base URL for loading resources
    const baseUrl = window.location.href.split('?')[0].replace(/\/[^\/]*$/, '/');
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    
    // Open about:blank in new tab
    const cloakedWin = window.open('about:blank', '_blank');
    
    if (cloakedWin) {
        // Write the cloaked content - loads this site in an iframe
        cloakedWin.document.write(`
<!DOCTYPE html>
<html>
<head>
    <title>New Tab</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; width: 100%; overflow: hidden; background: white; }
        iframe { width: 100%; height: 100%; border: none; }
    </style>
</head>
<body>
    <iframe src="${window.location.href}" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-downloads"></iframe>
</body>
</html>`);
        cloakedWin.document.close();
        
        // Close the original tab
        window.close();
    }
    
} else {
    // === CLOAKED WINDOW OR LOCAL FILE: Load site normally ===
    initSite();
}

function initSite() {
    function setupSite() {
        const modalOverlay = document.getElementById('modalOverlay');
        const anonyloadrCard = document.getElementById('anonyloadrCard');
        const chatterCard = document.getElementById('chatterCard');
        const modalClose = document.getElementById('modalClose');
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const luckyBtn = document.getElementById('luckyBtn');
        const appsIcon = document.getElementById('appsIcon');
        const appsMenu = document.getElementById('appsMenu');

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

        function cloakAndRedirect(url) {
            const win = window.open('about:blank', '_blank');
            if (win) {
                win.document.write('<iframe src="' + url + '" style="width:100%;height:100vh;border:none;"></iframe>');
                win.document.body.style.margin = '0';
                win.document.body.style.overflow = 'hidden';
                win.document.title = 'Google';
                win.document.close();
            }
        }

        function showModal() {
            modalOverlay.classList.add('active');
        }

        function hideModal() {
            modalOverlay.classList.remove('active');
        }

        function performSearch() {
            const query = searchInput.value.trim();
            if (query) {
                window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
            }
        }

        function feelingLucky() {
            const query = searchInput.value.trim();
            if (query) {
                window.open('https://www.google.com/search?q=' + encodeURIComponent(query) + '&btnI=I', '_blank');
            } else {
                window.open('https://www.google.com/doodles', '_blank');
            }
        }

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();
        });

        searchBtn.addEventListener('click', performSearch);
        luckyBtn.addEventListener('click', feelingLucky);

        luckyBtn.addEventListener('mouseenter', function() {
            luckyIndex = (luckyIndex + 1) % luckyTexts.length;
            luckyBtn.textContent = luckyTexts[luckyIndex];
        });

        luckyBtn.addEventListener('mouseleave', function() {
            luckyBtn.textContent = "I'm Feeling Lucky";
        });

        anonyloadrCard.addEventListener('click', function() {
            cloakAndRedirect(ANONYLOADR_URL);
        });

        chatterCard.addEventListener('click', function() {
            cloakAndRedirect(CHATTER_URL);
        });

        modalClose.addEventListener('click', hideModal);

        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) hideModal();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                hideModal();
            }
            if (e.altKey && e.key.toLowerCase() === 'e') {
                e.preventDefault();
                showModal();
            }
            if (e.key === '/' && document.activeElement !== searchInput) {
                e.preventDefault();
                searchInput.focus();
            }
        });

        appsIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            appsMenu.classList.toggle('active');
        });

        document.addEventListener('click', function() {
            appsMenu.classList.remove('active');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupSite);
    } else {
        setupSite();
    }
}
