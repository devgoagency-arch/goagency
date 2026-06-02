const fs = require('fs');

let content = fs.readFileSync('src/pages/es/servicios/pauta-digital/index.astro', 'utf-8');

// Remove periods right before closing heading tags
content = content.replace(/\.\s*<\/h1>/gi, '</h1>');
content = content.replace(/\.\s*<\/h2>/gi, '</h2>');
content = content.replace(/\.\s*<\/h3>/gi, '</h3>');
content = content.replace(/\.\s*<\/h4>/gi, '</h4>');
content = content.replace(/\.\s*<\/h5>/gi, '</h5>');
content = content.replace(/\.\s*<\/h6>/gi, '</h6>');

// Ensure 'Sin presupuesto quemado' is totally gone just in case
content = content.replace(/Sin presupuesto quemado\.?/gi, '');

fs.writeFileSync('src/pages/es/servicios/pauta-digital/index.astro', content);
console.log("Titles fixed");
