const fs = require('fs');

let c = fs.readFileSync('src/components/global/BlobCursorFollower.astro', 'utf-8');

// Replace the HTML blob
c = c.replace(
  '<div id="blob" class="blob" style={`background-color: ${color};`}></div>',
  '<div id="blob" class="blob"></div>'
);

// Replace styles
const styleStart = c.indexOf('<style>');
const styleEnd = c.indexOf('</style>') + 8;

const newStyles = `<style>
	#cursor-follower {
		pointer-events: none;
		opacity: 0;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9999;
		transition: opacity 0.2s ease-in-out 1s;
	}

	@keyframes fadeIn {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}

	#cursor-follower.active {
		animation: fadeIn 2s forwards;
	}

	#blob {
		position: fixed;
		border-radius: 50%;
		border: 1.5px solid #45ccaa;
		opacity: 0.3;
		top: 0;
		left: 0;
		height: 36px;
		width: 36px;
		background-color: transparent;
		transform: scale(1);
		z-index: 9999;
		transition: border-color 0.3s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
	}
</style>`;

c = c.substring(0, styleStart) + newStyles + c.substring(styleEnd);

// Replace GSAP hover states
c = c.replace(
  'gsap.to(blob, { duration: 0.5, opacity: 0.5 });',
  'gsap.to(blob, { duration: 0.3, opacity: 0.6, scale: 1.2 });'
);
c = c.replace(
  'gsap.to(blob, { duration: 0.5, opacity: 0.2 });',
  'gsap.to(blob, { duration: 0.3, opacity: 0.3, scale: 1 });'
);

// Add the background detector in JS
const jsInsertStr = `		magicCursor?.classList.add("active");`;
const jsNewCode = `
		// Change color based on background
		document.addEventListener("mouseover", (e) => {
			const target = e.target as HTMLElement;
			const section = target.closest('section, footer, header, .bg-white, .bg-zinc-900');
			if (section && blob) {
				const isWhite = section.classList.contains('bg-white') || section.classList.contains('bg-slate-50') || window.getComputedStyle(section).backgroundColor === 'rgb(255, 255, 255)';
				if (isWhite) {
					blob.style.borderColor = '#e25432'; // Naranja
				} else {
					blob.style.borderColor = '#45ccaa'; // Verde
				}
			}
		});

		magicCursor?.classList.add("active");
`;

c = c.replace(jsInsertStr, jsNewCode);

fs.writeFileSync('src/components/global/BlobCursorFollower.astro', c);
console.log("Cursor updated.");
