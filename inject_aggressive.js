const fs = require('fs');

const files = ['index.html', 'watch.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove the old click-based smartlink JS block from the existing inline script
    // The old logic was: let clickCount = 0; document.addEventListener('click'...
    content = content.replace(/\/\/ Aggressive smartlink[\s\S]*?}\);/m, '// smartlink handled externally');

    // Add aggressive-ads.js before </body> if not already there
    if (!content.includes('aggressive-ads.js')) {
        content = content.replace('</body>', '<script src="aggressive-ads.js"></script>\n</body>');
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
});
