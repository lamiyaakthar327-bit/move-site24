import re
import os

files = ['index.html', 'watch.html']

popunder = '<script src="https://pl29588216.effectivecpmnetwork.com/65/40/d8/6540d8500b6d64ae9740b36c253d7094.js"></script>'
social_bar = '<script src="https://pl29588218.effectivecpmnetwork.com/2e/d1/ed/2ed1edc8ae4ef9798887afa179fb0150.js"></script>'

custom_js = '''
<script>
// Aggressive smartlink
let clickCount = 0;
document.addEventListener('click', function(e) {
    clickCount++;
    if (clickCount % 2 !== 0) { // On every odd click
        window.open('https://www.effectivecpmnetwork.com/gkyr905z?key=0feca37c9416694a2e63b90073def1c7', '_blank');
    }
});

// Ad restorer
const adTemplates = {
    'native': '<script async="async" data-cfasync="false" src="https://pl29588219.effectivecpmnetwork.com/d4cbd2587332c96b7a8736c8c0fce2bb/invoke.js"><\/script><div id="container-d4cbd2587332c96b7a8736c8c0fce2bb"></div>',
    '300x250': '<script>atOptions={"key":"3686cb8bcffb4eab58e13a218843b992","format":"iframe","height":250,"width":300,"params":{}}<\/script><script src="https://www.highperformanceformat.com/3686cb8bcffb4eab58e13a218843b992/invoke.js"><\/script>',
    '320x50': '<script>atOptions={"key":"4ab9a00f39a18585fd976f302a3219b8","format":"iframe","height":50,"width":320,"params":{}}<\/script><script src="https://www.highperformanceformat.com/4ab9a00f39a18585fd976f302a3219b8/invoke.js"><\/script>'
};

function injectScripts(container) {
    Array.from(container.querySelectorAll('script')).forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.innerHTML = oldScript.innerHTML;
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

function monitorAd(containerId, adKey) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const observer = new MutationObserver(() => {
        observer.disconnect();
        setTimeout(() => {
            container.innerHTML = adTemplates[adKey];
            injectScripts(container);
            monitorAd(containerId, adKey);
        }, 3000);
    });
    observer.observe(container, { childList: true, subtree: true, characterData: true });
}

window.addEventListener('DOMContentLoaded', () => {
    // initialize contents if empty
    ['native', '300x250', '320x50'].forEach(key => {
        let el = document.getElementById('ad-zone-' + (key === 'native' ? 'native' : (key==='300x250'?'300':'320')));
        if(el) {
            el.innerHTML = adTemplates[key];
            injectScripts(el);
            monitorAd(el.id, key);
        }
    });
});
</script>
'''

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Insert before </head>
    content = content.replace('</head>', f'{popunder}\n</head>')

    # Insert before </body>
    content = content.replace('</body>', f'{social_bar}\n{custom_js}\n</body>')

    # Replace ad banners
    # First ad-banner -> native
    content = re.sub(r'<div class="ad-banner">.*?</div>', r'<div class="ad-banner" id="ad-zone-native" style="min-height: 250px;"></div>', content, count=1, flags=re.DOTALL)
    
    # Second ad-banner -> 300x250
    content = re.sub(r'<div class="ad-banner">.*?</div>', r'<div class="ad-banner" id="ad-zone-300" style="min-height: 250px;"></div>', content, count=1, flags=re.DOTALL)

    # Insert 320x50 above main content
    content = content.replace('<main class="main-content">', '<main class="main-content">\n<div id="ad-zone-320" style="text-align:center; margin-bottom: 20px; min-height: 50px;"></div>\n')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Ads successfully injected into all files!")
