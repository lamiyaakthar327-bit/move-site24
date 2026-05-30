const fs = require('fs');

const files = ['index.html', 'watch.html'];

const replacements = [
    // Popunder
    [
        'https://pl29588862.effectivecpmnetwork.com/a1/7b/e7/a17be77ee7258d5b68e456d624eb19ca.js',
        'https://pl29589568.effectivecpmnetwork.com/52/d8/53/52d853ed3c9b96b3c8a59b7209444454.js'
    ],
    // Smartlink
    [
        'https://www.effectivecpmnetwork.com/cv83sqanb?key=f95fc5c74d9a0ea8f4d2b37da39db849',
        'https://www.effectivecpmnetwork.com/bkfrnfqtw?key=9c0864051953bd3cee318c6b2e8d7ac9'
    ],
    // Social Bar
    [
        'https://pl29588864.effectivecpmnetwork.com/e3/46/c3/e346c32ffbf3e691f1f51656d4258f27.js',
        'https://pl29589569.effectivecpmnetwork.com/be/65/e5/be65e5d8cc14833b3746bc6d73b3aab5.js'
    ],
    // Native Banner src
    [
        'https://pl29588865.effectivecpmnetwork.com/23f1faf85cdcc5df75b098bbdf4eed8a/invoke.js',
        'https://pl29589571.effectivecpmnetwork.com/80f1ef3c81a68c5d79172bcf3093101e/invoke.js'
    ],
    // Native Banner container id (escaped for adTemplates string)
    [
        'container-23f1faf85cdcc5df75b098bbdf4eed8a',
        'container-80f1ef3c81a68c5d79172bcf3093101e'
    ],
    // 300x250 key
    [
        '"key":"ac3cfd9ad8b2619c2adbb7aab81719fb"',
        '"key":"6e3ffccc84926001ed92973f9949cf27"'
    ],
    // 300x250 URL
    [
        'https://www.highperformanceformat.com/ac3cfd9ad8b2619c2adbb7aab81719fb/invoke.js',
        'https://www.highperformanceformat.com/6e3ffccc84926001ed92973f9949cf27/invoke.js'
    ],
    // 320x50 key
    [
        '"key":"5088347196ccbe2ddfefa08e05e8883b"',
        '"key":"1594e1c776d692409b5b3beef8c77f40"'
    ],
    // 320x50 URL
    [
        'https://www.highperformanceformat.com/5088347196ccbe2ddfefa08e05e8883b/invoke.js',
        'https://www.highperformanceformat.com/1594e1c776d692409b5b3beef8c77f40/invoke.js'
    ]
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    replacements.forEach(([oldStr, newStr]) => {
        content = content.split(oldStr).join(newStr);
    });

    // Fix social bar - inject it multiple times (before </body> already exists, add one more inside main content top)
    // First ensure social bar script appears twice in body for more visibility
    const socialBarScript = '<script src="https://pl29589569.effectivecpmnetwork.com/be/65/e5/be65e5d8cc14833b3746bc6d73b3aab5.js"></script>';
    
    // Add social bar also right after the notice bar for more placement
    if (!content.includes('<!-- social-bar-extra -->')) {
        content = content.replace(
            '<div class="notice-bar">',
            `${socialBarScript}\n<!-- social-bar-extra -->\n<div class="notice-bar">`
        );
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ads in ${file}`);
    } else {
        console.log(`Nothing changed in ${file}, check old ad keys!`);
    }
});
