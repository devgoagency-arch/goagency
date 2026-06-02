const fs = require('fs');
let c = fs.readFileSync('src/pages/es/servicios/pauta-digital/index.astro', 'utf-8');

c = c.replace(
  '<span class="mb-8 text-xs uppercase tracking-[0.2em] text-[#45ccaa] font-mono">Pauta Digital para Empresas</span>',
  '<span class="mb-8 text-xs uppercase tracking-[0.2em] text-[#1b7a63] font-mono">Pauta Digital para Empresas</span>'
);

const lightSections = [
  'Calculadora de inversión',
  'Plataformas',
  'Sectores',
  'El proceso',
  '¿Para quién?',
  'Preguntas frecuentes'
];

lightSections.forEach(sec => {
  const target = '<span class="text-xs uppercase tracking-[0.2em] text-[#45ccaa] font-mono">' + sec + '</span>';
  const replacement = '<span class="text-xs uppercase tracking-[0.2em] text-[#1b7a63] font-mono">' + sec + '</span>';
  c = c.replace(target, replacement);
});

// Also the step numbers in "El proceso" which is a white section
// lines 507, 512, etc.: <p class="text-xs font-mono tracking-widest text-[#45ccaa] mb-6">01</p>
// We need to match those only inside the #proceso section.
const processStart = c.indexOf('<section id="proceso"');
const processEnd = c.indexOf('</section>', processStart);
if (processStart !== -1 && processEnd !== -1) {
  let procSection = c.substring(processStart, processEnd);
  procSection = procSection.replace(/text-\[\#45ccaa\]/g, 'text-[#1b7a63]');
  c = c.substring(0, processStart) + procSection + c.substring(processEnd);
}

fs.writeFileSync('src/pages/es/servicios/pauta-digital/index.astro', c);
console.log("Colors updated.");
