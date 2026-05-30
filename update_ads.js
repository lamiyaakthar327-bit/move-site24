const fs = require('fs');

const files = ['index.html', 'watch.html'];

const replacements = [
    // Popunder
    [
        '<script src="https://pl29588216.effectivecpmnetwork.com/65/40/d8/6540d8500b6d64ae9740b36c253d7094.js"></script>',
        '<script src="https://pl29588862.effectivecpmnetwork.com/a1/7b/e7/a17be77ee7258d5b68e456d624eb19ca.js"></script>'
    ],
    // Smartlink
    [
        'https://www.effectivecpmnetwork.com/gkyr905z?key=0feca37c9416694a2e63b90073def1c7',
        'https://www.effectivecpmnetwork.com/cv83sqanb?key=f95fc5c74d9a0ea8f4d2b37da39db849'
    ],
    // Social Bar
    [
        '<script src="https://pl29588218.effectivecpmnetwork.com/2e/d1/ed/2ed1edc8ae4ef9798887afa179fb0150.js"></script>',
        '<script src="https://pl29588864.effectivecpmnetwork.com/e3/46/c3/e346c32ffbf3e691f1f51656d4258f27.js"></script>'
    ],
    // Native Banner
    [
        '<script async="async" data-cfasync="false" src="https://pl29588219.effectivecpmnetwork.com/d4cbd2587332c96b7a8736c8c0fce2bb/invoke.js"><\\/script><div id="container-d4cbd2587332c96b7a8736c8c0fce2bb"></div>',
        '<script async="async" data-cfasync="false" src="https://pl29588865.effectivecpmnetwork.com/23f1faf85cdcc5df75b098bbdf4eed8a/invoke.js"><\\/script><div id="container-23f1faf85cdcc5df75b098bbdf4eed8a"></div>'
    ],
    // Native Banner HTML (non-escaped script tag in adTemplates vs DOM)
    [
        '<script async="async" data-cfasync="false" src="https://pl29588219.effectivecpmnetwork.com/d4cbd2587332c96b7a8736c8c0fce2bb/invoke.js"></script><div id="container-d4cbd2587332c96b7a8736c8c0fce2bb"></div>',
        '<script async="async" data-cfasync="false" src="https://pl29588865.effectivecpmnetwork.com/23f1faf85cdcc5df75b098bbdf4eed8a/invoke.js"></script><div id="container-23f1faf85cdcc5df75b098bbdf4eed8a"></div>'
    ],
    // 300x250 Banner Key
    [
        '"key":"3686cb8bcffb4eab58e13a218843b992"',
        '"key":"ac3cfd9ad8b2619c2adbb7aab81719fb"'
    ],
    // 300x250 Banner URL
    [
        'https://www.highperformanceformat.com/3686cb8bcffb4eab58e13a218843b992/invoke.js',
        'https://www.highperformanceformat.com/ac3cfd9ad8b2619c2adbb7aab81719fb/invoke.js'
    ],
    // 320x50 Banner Key
    [
        '"key":"4ab9a00f39a18585fd976f302a3219b8"',
        '"key":"5088347196ccbe2ddfefa08e05e8883b"'
    ],
    // 320x50 Banner URL
    [
        'https://www.highperformanceformat.com/4ab9a00f39a18585fd976f302a3219b8/invoke.js',
        'https://www.highperformanceformat.com/5088347196ccbe2ddfefa08e05e8883b/invoke.js'
    ]
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    replacements.forEach(([oldStr, newStr]) => {
        // use split join to replace all occurrences without regex escaping issues
        content = content.split(oldStr).join(newStr);
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ads in ${file}`);
    } else {
        console.log(`No old ads found in ${file}`);
    }
});
