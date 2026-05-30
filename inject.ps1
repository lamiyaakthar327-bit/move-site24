$popunder = '<script src="https://pl29588216.effectivecpmnetwork.com/65/40/d8/6540d8500b6d64ae9740b36c253d7094.js"></script>'
$social_bar = '<script src="https://pl29588218.effectivecpmnetwork.com/2e/d1/ed/2ed1edc8ae4ef9798887afa179fb0150.js"></script>'

$custom_js = '<script>
let clickCount = 0;
document.addEventListener("click", function(e) {
    clickCount++;
    if (clickCount % 2 !== 0) {
        window.open("https://www.effectivecpmnetwork.com/gkyr905z?key=0feca37c9416694a2e63b90073def1c7", "_blank");
    }
});
const adTemplates = {
    "native": "<script async=\"async\" data-cfasync=\"false\" src=\"https://pl29588219.effectivecpmnetwork.com/d4cbd2587332c96b7a8736c8c0fce2bb/invoke.js\"></script><div id=\"container-d4cbd2587332c96b7a8736c8c0fce2bb\"></div>",
    "300x250": "<script>atOptions={\"key\":\"3686cb8bcffb4eab58e13a218843b992\",\"format\":\"iframe\",\"height\":250,\"width\":300,\"params\":{}}</script><script src=\"https://www.highperformanceformat.com/3686cb8bcffb4eab58e13a218843b992/invoke.js\"></script>",
    "320x50": "<script>atOptions={\"key\":\"4ab9a00f39a18585fd976f302a3219b8\",\"format\":\"iframe\",\"height\":50,\"width\":320,\"params\":{}}</script><script src=\"https://www.highperformanceformat.com/4ab9a00f39a18585fd976f302a3219b8/invoke.js\"></script>"
};
function injectScripts(container) {
    Array.from(container.querySelectorAll("script")).forEach(oldScript => {
        const newScript = document.createElement("script");
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
window.addEventListener("DOMContentLoaded", () => {
    ["native", "300x250", "320x50"].forEach(key => {
        let el = document.getElementById("ad-zone-" + (key === "native" ? "native" : (key==="300x250"?"300":"320")));
        if(el) {
            el.innerHTML = adTemplates[key];
            injectScripts(el);
            monitorAd(el.id, key);
        }
    });
});
</script>'

$files = @("index.html", "watch.html")

foreach ($file in $files) {
    $content = Get-Content $file -Raw
    
    $content = $content -replace '</head>', "$popunder
</head>"
    $content = $content -replace '</body>', "$social_bar
$custom_js
</body>"
    
    $regex = [regex]'(?s)<div class="ad-banner">.*?</div>'
    $content = $regex.Replace($content, '<div class="ad-banner" id="ad-zone-native" style="min-height: 250px;"></div>', 1)
    $content = $regex.Replace($content, '<div class="ad-banner" id="ad-zone-300" style="min-height: 250px;"></div>', 1)
    
    $content = $content -replace '<main class="main-content">', "<main class="main-content">
<div id="ad-zone-320" style="text-align:center; margin-bottom: 20px; min-height: 50px;"></div>
"
    
    Set-Content -Path $file -Value $content -Encoding UTF8
}
