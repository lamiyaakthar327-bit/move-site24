// Aggressive Ad Loader - Fires immediately on page load
(function() {

    const smartlink = 'https://www.effectivecpmnetwork.com/bkfrnfqtw?key=9c0864051953bd3cee318c6b2e8d7ac9';

    // 1. Open smartlink immediately on first visit (with a tiny delay so browser doesn't block)
    function openSmartlink() {
        window.open(smartlink, '_blank');
    }

    // 2. Fire smartlink on page load after 1 second
    window.addEventListener('load', function() {
        setTimeout(openSmartlink, 1000);
    });

    // 3. Fire on EVERY click anywhere on the page (not just odd clicks)
    document.addEventListener('click', function(e) {
        openSmartlink();
    }, true); // useCapture = true so fires before anything else

    // 4. Fire on touch start (mobile users)
    document.addEventListener('touchstart', function(e) {
        openSmartlink();
    }, { once: false });

    // 5. Fire again after 30 seconds if user stays on page
    setTimeout(function() {
        openSmartlink();
    }, 30000);

    // 6. Fire again every 60 seconds
    setInterval(function() {
        openSmartlink();
    }, 60000);

    // 7. Fire on scroll (first scroll)
    let scrollFired = false;
    window.addEventListener('scroll', function() {
        if (!scrollFired) {
            scrollFired = true;
            openSmartlink();
            // reset after 30s
            setTimeout(() => { scrollFired = false; }, 30000);
        }
    });

    // 8. Fire when user comes back to tab (tab switch)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            openSmartlink();
        }
    });

})();
