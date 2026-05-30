document.addEventListener('DOMContentLoaded', () => {
    const videoUrlInput = document.getElementById('videoUrlInput');
    const loadBtn = document.getElementById('loadBtn');
    const playerSection = document.getElementById('playerSection');
    const moviePlayer = document.getElementById('moviePlayer');
    const downloadBtn = document.getElementById('downloadBtn');
    const movieTitle = document.getElementById('movieTitle');

    function loadMovie() {
        const url = videoUrlInput.value.trim();
        
        if (!url) {
            alert('Please enter a valid video link.');
            return;
        }

        // Basic URL validation
        try {
            new URL(url);
        } catch (e) {
            alert('Please enter a valid URL.');
            return;
        }

        // Set video source and load
        moviePlayer.src = url;
        moviePlayer.load();
        
        // Update download button
        downloadBtn.href = url;
        
        // Extract a simple title from the URL or set a default
        try {
            const urlObj = new URL(url);
            let filename = urlObj.pathname.split('/').pop();
            if (!filename || filename === '') {
                filename = 'Custom Movie Stream';
            } else {
                // Decode URI component to handle %20 etc, and remove extension for display
                filename = decodeURIComponent(filename);
            }
            movieTitle.textContent = filename;
            downloadBtn.setAttribute('download', filename);
        } catch (e) {
            movieTitle.textContent = 'Custom Movie Stream';
        }

        // Show the player section if it's hidden
        playerSection.style.display = 'block';

        // Optionally, try to auto-play (browsers may block this without interaction)
        // moviePlayer.play().catch(e => console.log('Autoplay prevented by browser'));
        
        // Scroll to player smoothly
        playerSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    loadBtn.addEventListener('click', loadMovie);

    // Also load when pressing Enter in the input field
    videoUrlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loadMovie();
        }
    });
});
