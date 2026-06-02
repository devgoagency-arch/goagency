const fs = require('fs');

let content = fs.readFileSync('src/pages/es/servicios/pauta-digital/index.astro', 'utf-8');

// 1. Remove cursor color
content = content.replace('cursorColor="#45ccaa"', '');

// 2. FAQ Schema 1
content = content.replace(
  '"text": "Porque las campañas necesitan tiempo para aprender y optimizarse. El algoritmo de Meta o Google tarda entre 2 y 4 semanas en acumular datos suficientes. Si paras antes, no sabes si la estrategia funciona — solo sabes que no le diste tiempo. Después de los 3 meses, continúas mes a mes y puedes cancelar con 15 días de anticipación."',
  '"text": "Las campañas digitales necesitan un mínimo de 3 meses porque el algoritmo de Meta o Google requiere tiempo para aprender, recopilar datos y optimizar los anuncios. Si se pausa antes, no se puede evaluar con claridad si la estrategia funciona; solo se interrumpe su proceso de aprendizaje. Después de ese periodo, puedes continuar mes a mes y cancelar con 15 días de anticipación."'
);

// 3. FAQ Schema 2
content = content.replace(
  '"text": "El presupuesto de pauta es tuyo y va directo a la plataforma. Nosotros no lo manejamos. Te recomendamos un mínimo según tu sector y objetivos, pero lo decides tú. Con nuestra calculadora puedes estimar un punto de partida."',
  '"text": "El presupuesto de pauta se define según tu sector, objetivos y alcance. Nosotros te asesoramos y recomendamos la inversión mínima necesaria para que la campaña tenga datos suficientes para aprender y optimizarse. Este valor se paga directamente a Meta o Google; no lo administramos nosotros."'
);

// 4. FAQ Schema 4
content = content.replace(
  '"text": "Sí. Google Ads y Meta Ads permiten segmentar por cargo, industria, comportamiento e intención de búsqueda. Si tus clientes usan internet — y lo hacen — hay una forma de llegar a ellos con pauta bien diseñada. No existe un sector no apto, solo estrategias mal diseñadas."',
  '"text": "Sí. Google Ads permite llegar a personas que están buscando activamente lo que ofreces, y Meta Ads segmenta por cargo, industria y comportamiento. Casi cualquier negocio puede beneficiarse de la pauta digital, la clave está en la estrategia. En la asesoría analizamos tu caso y te decimos por dónde empezar."'
);

// 5. FAQ Schema 5
content = content.replace(
  '"text": "Sí. Puedes tener campañas en Meta Ads, Google Ads y TikTok Ads dentro del mismo paquete si tiene sentido estratégico. Lo evaluamos antes de configurar cualquier cosa."',
  '"text": "Sí. Los paquetes no están limitados a una sola plataforma. Puedes distribuir las campañas entre Meta Ads, Google Ads, TikTok y más. La combinación ideal la definimos en la estrategia."'
);

// 6. FAQ HTML replacements
content = content.replace(
  '<p class="font-sans text-lg font-light text-zinc-600 pb-8 pr-12 leading-relaxed">Porque las campañas necesitan tiempo para aprender y optimizarse. El algoritmo de Meta o Google tarda entre 2 y 4 semanas en acumular datos suficientes. Si paras antes, no sabes si la estrategia funciona — solo sabes que no le diste tiempo. Después de los 3 meses, continúas mes a mes y puedes cancelar con 15 días de anticipación.</p>',
  '<p class="font-sans text-lg font-light text-zinc-600 pb-8 pr-12 leading-relaxed">Las campañas digitales necesitan un mínimo de 3 meses porque el algoritmo de Meta o Google requiere tiempo para aprender, recopilar datos y optimizar los anuncios. Si se pausa antes, no se puede evaluar con claridad si la estrategia funciona; solo se interrumpe su proceso de aprendizaje. Después de ese periodo, puedes continuar mes a mes y cancelar con 15 días de anticipación.</p>'
);
content = content.replace(
  '<p class="font-sans text-lg font-light text-zinc-600 pb-8 pr-12 leading-relaxed">El presupuesto de pauta es tuyo y va directo a la plataforma. Nosotros no lo manejamos. Te recomendamos un mínimo según tu sector y objetivos, pero lo decides tú. Con nuestra calculadora puedes estimar un punto de partida.</p>',
  '<p class="font-sans text-lg font-light text-zinc-600 pb-8 pr-12 leading-relaxed">El presupuesto de pauta se define según tu sector, objetivos y alcance. Nosotros te asesoramos y recomendamos la inversión mínima necesaria para que la campaña tenga datos suficientes para aprender y optimizarse. Este valor se paga directamente a Meta o Google; no lo administramos nosotros.</p>'
);
content = content.replace(
  '<p class="font-sans text-lg font-light text-zinc-600 pb-8 pr-12 leading-relaxed">Sí. Google Ads y Meta Ads permiten segmentar por cargo, industria, comportamiento e intención de búsqueda. Si tus clientes usan internet — y lo hacen — hay una forma de llegar a ellos con pauta bien diseñada. No existe un sector no apto, solo estrategias mal diseñadas.</p>',
  '<p class="font-sans text-lg font-light text-zinc-600 pb-8 pr-12 leading-relaxed">Sí. Google Ads permite llegar a personas que están buscando activamente lo que ofreces, y Meta Ads segmenta por cargo, industria y comportamiento. Casi cualquier negocio puede beneficiarse de la pauta digital, la clave está en la estrategia. En la asesoría analizamos tu caso y te decimos por dónde empezar.</p>'
);
content = content.replace(
  '<p class="font-sans text-lg font-light text-zinc-600 pb-8 pr-12 leading-relaxed">Sí. Puedes tener campañas en Meta Ads, Google Ads y TikTok Ads dentro del mismo paquete si tiene sentido estratégico. Lo evaluamos antes de configurar cualquier cosa.</p>',
  '<p class="font-sans text-lg font-light text-zinc-600 pb-8 pr-12 leading-relaxed">Sí. Los paquetes no están limitados a una sola plataforma. Puedes distribuir las campañas entre Meta Ads, Google Ads, TikTok y más. La combinación ideal la definimos en la estrategia.</p>'
);

// Final CTA replacement
content = content.replace(
  'El primer paso no te cuesta nada. Agenda una asesoría gratuita de 30 minutos. Te decimos con honestidad si la pauta digital tiene sentido para tu negocio ahora mismo.',
  'Agenda una asesoría gratuita de tu pauta digital. En 30 minutos analizamos tu negocio, tus objetivos y te entregamos un punto de partida claro para estructurar tu estrategia web.'
);

// 7. Remove 'Sin presupuesto quemado'
content = content.replace('Diseñamos la estrategia y gestionamos las campañas. Sin presupuesto quemado.', 'Diseñamos la estrategia y gestionamos las campañas.');

// 8. Remove periods from H2s
content = content.replace('Lo que incluye trabajar con nosotros.', 'Lo que incluye trabajar con nosotros');
content = content.replace('Elige el paquete que se ajusta a tus objetivos.', 'Elige el paquete que se ajusta a tus objetivos');
content = content.replace('Estima cuánto pagarías cada mes.', 'Estima cuánto pagarías cada mes');
content = content.replace('Donde están tus clientes, ahí llegamos.', 'Donde están tus clientes, ahí llegamos');
content = content.replace('Hemos trabajado con empresas de todos estos sectores.', 'Hemos trabajado con empresas de todos estos sectores');
content = content.replace('Así trabajamos contigo.', 'Así trabajamos contigo');
content = content.replace('Este servicio es para ti si...', 'Este servicio es para ti si');
content = content.replace('Lo que más nos preguntan.', 'Lo que más nos preguntan');

// 9. Packages texts
content = content.replace('Gestión mensual con setup incluido. El presupuesto de pauta lo pagas directamente a la plataforma — no pasa por nosotros.', 'Gestión mensual con setup incluido, el presupuesto de pauta lo pagas directamente a la plataforma, no pasa por nosotros.');

// Add "Mas popular" to Base package
content = content.replace(
  '<p class="text-xs uppercase tracking-[0.2em] text-[#45ccaa] font-mono mb-4">Paquete Base</p>',
  '<div class="absolute -top-4 right-8 bg-[#e25432] text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full">Más popular</div>\n          <p class="text-xs uppercase tracking-[0.2em] text-[#45ccaa] font-mono mb-4">Paquete Base</p>'
);

// Character encoding 2-3
content = content.split('Hasta 2â€“3 anuncios por campaña').join('Hasta 2-3 anuncios por campaña');

// Inversion pauta
content = content.split('+ pauta publicitaria (va directo a la plataforma)').join('+ Inversión por pauta publicitaria (va directo a la plataforma)');

// Add-ons text
content = content.replace(
  'Los paquetes de gestión no incluyen diseño — así el precio base solo cubre lo que todos necesitan. Si necesitas que GO diseñe las piezas, agrégalo por campaña.',
  'Los paquetes de gestión no incluyen diseño. Si necesitas que diseñemos las piezas, agrégalo por campaña.'
);

content = content.replace(
  '1 imagen estática + 1 versión stories/vertical + 1 variación A/B',
  '1 imagen estática + 1 versión stories/vertical + 1 versión alternativa para probar cuál funciona mejor'
);

// Calculator styles: make text darker
const calculatorIndex = content.indexOf('<!-- CALCULATOR -->');
const platformIndex = content.indexOf('<!-- PLATFORMS -->');
if (calculatorIndex !== -1 && platformIndex !== -1) {
  let calcSection = content.substring(calculatorIndex, platformIndex);
  calcSection = calcSection.replace(/text-zinc-500/g, 'text-zinc-700');
  
  // Add min budget text
  calcSection = calcSection.replace(
    'Va directo a Meta, Google, TikTok, etc.</div>',
    'Va directo a Meta, Google, TikTok, etc.</div>\n            <div class="text-[11px] text-zinc-700 mt-4 leading-relaxed">El presupuesto mínimo depende del objetivo: campañas de alcance desde $300.000/mes, tráfico e interacción desde $600.000/mes, ventas y formularios desde $1.200.000/mes. En la asesoría te ayudamos a definir el ideal para tu negocio.</div>'
  );
  
  content = content.substring(0, calculatorIndex) + calcSection + content.substring(platformIndex);
}

// Para Quien (list to paragraph)
const forWhomStart = content.indexOf('<ul class="max-w-4xl space-y-2">');
const forWhomEnd = content.indexOf('</ul>', forWhomStart) + '</ul>'.length;

const paraText = '<p class="font-sans text-xl lg:text-2xl font-light text-zinc-600 leading-relaxed max-w-4xl py-6">Tienes un negocio y quieres conseguir más clientes a través de pauta digital, crees que la pauta "no aplica para tu sector" pero quieres comprobarlo, ya invertiste en pauta antes y no obtuviste los resultados esperados, tienes presupuesto para anunciarte pero no sabes por dónde empezar, tu equipo no tiene tiempo ni experiencia para gestionar campañas, o quieres escalar lo que ya funciona con una estrategia más sólida.</p>';

content = content.substring(0, forWhomStart) + paraText + content.substring(forWhomEnd);

fs.writeFileSync('src/pages/es/servicios/pauta-digital/index.astro', content);
console.log("Done");
