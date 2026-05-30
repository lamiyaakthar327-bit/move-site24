// Ad Blocker Detection & Warning
(function() {
    // Create a bait element that ad blockers typically hide
    function createBait() {
        const bait = document.createElement('div');
        bait.setAttribute('class', 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links ad-text adSense adBlock adContent adBanner');
        bait.setAttribute('id', 'ad-bait-detector');
        bait.style.cssText = 'width: 1px; height: 1px; position: absolute; left: -9999px; top: -9999px;';
        bait.innerHTML = '&nbsp;';
        document.body.appendChild(bait);
        return bait;
    }

    // Inject warning modal CSS
    const style = document.createElement('style');
    style.innerHTML = `
        #adblock-overlay {
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.92);
            z-index: 999999;
            justify-content: center;
            align-items: center;
        }
        #adblock-overlay.show {
            display: flex;
        }
        #adblock-modal {
            background: #2a2a2a;
            border: 2px solid #71b148;
            border-radius: 12px;
            padding: 40px;
            max-width: 480px;
            width: 90%;
            text-align: center;
            font-family: 'Open Sans', Arial, sans-serif;
            color: white;
            animation: popIn 0.4s ease-out;
            box-shadow: 0 0 40px rgba(113,177,72,0.3);
        }
        @keyframes popIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        #adblock-modal .warn-icon {
            font-size: 60px;
            margin-bottom: 15px;
            display: block;
        }
        #adblock-modal h2 {
            color: #f59e0b;
            font-size: 22px;
            margin-bottom: 15px;
        }
        #adblock-modal p {
            color: #cccccc;
            font-size: 14px;
            line-height: 1.7;
            margin-bottom: 25px;
        }
        #adblock-modal .site-name {
            color: #71b148;
            font-weight: bold;
        }
        #adblock-modal .ad-steps {
            text-align: left;
            background: #333;
            border-radius: 8px;
            padding: 15px 20px;
            margin-bottom: 25px;
            font-size: 13px;
            color: #ccc;
            line-height: 2;
        }
        #adblock-modal .ad-steps strong {
            color: #71b148;
        }
        #adblock-modal .btn-dismiss {
            background: #71b148;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 6px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            transition: background 0.2s;
        }
        #adblock-modal .btn-dismiss:hover {
            background: #82c84b;
        }
        #adblock-modal .btn-dismiss:disabled {
            background: #555;
            cursor: not-allowed;
        }
        #countdown-text {
            font-size: 12px;
            color: #888;
            margin-top: 10px;
        }
    `;
    document.head.appendChild(style);

    // Inject the warning modal
    function injectModal() {
        const overlay = document.createElement('div');
        overlay.id = 'adblock-overlay';
        overlay.innerHTML = `
            <div id="adblock-modal">
                <span class="warn-icon">🚫</span>
                <h2>Ad Blocker Detected!</h2>
                <p>
                    আমরা দেখতে পাচ্ছি আপনি একটি <strong>Ad Blocker</strong> ব্যবহার করছেন।
                    <span class="site-name">Zynix HD Movies</span> সম্পূর্ণ বিনামূল্যে চালু রাখতে
                    আমরা বিজ্ঞাপনের উপর নির্ভর করি। অনুগ্রহ করে Ad Blocker বন্ধ করুন।
                </p>
                <div class="ad-steps">
                    <strong>কীভাবে বন্ধ করবেন:</strong><br>
                    1️⃣ ব্রাউজারের উপরে Ad Blocker আইকনে ক্লিক করুন<br>
                    2️⃣ <strong>"Disable for this site"</strong> বা <strong>"বন্ধ করুন"</strong> সিলেক্ট করুন<br>
                    3️⃣ পেজটি রিলোড করুন
                </div>
                <button class="btn-dismiss" id="adblock-dismiss-btn" disabled>
                    ✅ Ad Blocker বন্ধ করলাম, Continue করুন
                </button>
                <p id="countdown-text">বাটন <span id="countdown-num">10</span> সেকেন্ড পর চালু হবে...</p>
            </div>
        `;
        document.body.appendChild(overlay);

        // Countdown timer before dismiss button activates
        let seconds = 10;
        const countdownEl = document.getElementById('countdown-num');
        const dismissBtn = document.getElementById('adblock-dismiss-btn');
        const countdownText = document.getElementById('countdown-text');

        const timer = setInterval(() => {
            seconds--;
            countdownEl.textContent = seconds;
            if (seconds <= 0) {
                clearInterval(timer);
                dismissBtn.disabled = false;
                countdownText.textContent = '';
            }
        }, 1000);

        dismissBtn.addEventListener('click', () => {
            overlay.classList.remove('show');
            // Re-check after click; if still blocked, show again after 5s
            setTimeout(checkAdBlock, 5000);
        });

        return overlay;
    }

    let modal = null;

    function checkAdBlock() {
        const bait = document.getElementById('ad-bait-detector') || createBait();

        setTimeout(() => {
            const isBlocked = (
                !bait ||
                bait.offsetParent === null ||
                bait.offsetHeight === 0 ||
                bait.offsetWidth === 0 ||
                bait.clientHeight === 0 ||
                window.getComputedStyle(bait).display === 'none' ||
                window.getComputedStyle(bait).visibility === 'hidden'
            );

            if (isBlocked) {
                if (!modal) {
                    modal = injectModal();
                }
                modal.classList.add('show');
                // Re-check every 5 seconds to keep showing
                setTimeout(checkAdBlock, 5000);
            } else {
                if (modal) modal.classList.remove('show');
                // Keep monitoring
                setTimeout(checkAdBlock, 8000);
            }
        }, 200);
    }

    // Start checking after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createBait();
            setTimeout(checkAdBlock, 1000);
        });
    } else {
        createBait();
        setTimeout(checkAdBlock, 1000);
    }
})();
