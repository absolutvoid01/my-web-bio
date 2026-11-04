function updateTime() {
    const timeElement = document.getElementById('local-time');
    if (!timeElement) return;

    const options = { 
        timeZone: 'Asia/Singapore', // Adjust to your preferred GMT+8 location
        timeStyle: 'medium', 
        hour12: true 
    };
    
    const timeString = new Date().toLocaleTimeString('en-US', options);
    timeElement.textContent = timeString;
}

// Update clock every second
setInterval(updateTime, 1000);

// Run immediately on page load
updateTime();

document.addEventListener('DOMContentLoaded', () => {
    // 1. Fade in the page on load
    document.body.classList.add('fade-in');

    // 2. Intercept internal links for a smooth fade-out
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetUrl = link.getAttribute('href');

            // Only apply transition to internal HTML pages (not external sites or # anchors)
            if (targetUrl && !targetUrl.startsWith('#') && !targetUrl.startsWith('http')) {
                e.preventDefault(); // Stop instant navigation

                // Trigger fade-out
                document.body.classList.remove('fade-in');

                // Navigate after the fade effect finishes (400ms matches the CSS transition time)
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 400);
            }
        });
    });
});