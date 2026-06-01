export const languages = {
	en: "English",
	es: "Español",
};

export const defaultLang = "en";

/** Mapa de rutas por idioma: ruta en EN → ruta en ES */
export const routes: Record<string, Record<string, string>> = {
	en: {
		about: "about",
		services: "services",
		proyectos: "proyectos",
		blog: "blog",
		contact: "contact",
	},
	es: {
		about: "nosotros",
		services: "servicios",
		proyectos: "proyectos",
		blog: "blog",
		contact: "contacto",
	},
};

export const ui = {
	en: {
		or: "or",
		contact: "Contact",
		contacts: "Contact",
		contactus: "Contact us",
		projects: "Projects",
		services: "Services",
		about: "About",
		homepage: "Homepage",
		tagline:
			"Our aim is to make your brand a powerful driver for growth and conversions, combining creative strategy, digital presence, and strong SEO. We focus on connecting your story with your audience, ensuring your business stands out. Your success is our mission.",
		"projects.see": "See project",
		"projects.all": "View all projects",
		"projects.subtitle": "Strategy and creativity for brands that want to grow",
		"hero.title.main": "We create",
		"hero.title.1": "strategies",
		"hero.title.2": "identities",
		"hero.title.3": "experiences",
		"hero.title.4": "results",
		"hero.subtitle":
			"Go Estrategia Creativa is a creative agency that transforms brands through strategic communication, digital design, and compelling content.",
		"hero.scroll": "scroll down to explore more",
		"hero.cta": "Let's talk",
		// Services
		"services.pillar1.title": "Creative Strategy",
		"services.pillar2.title": "Digital Presence",
		"services.pillar3.title": "Content & SEO",
		// About
		"about.title": "About Us",
		"about.subtitle": "The team behind Go",
		// Contact
		"contact.title": "Contact",
		"contact.subtitle": "Big projects start with an honest conversation",
		"contact.name": "Name",
		"contact.email": "Email",
		"contact.message": "Message",
		"contact.company": "Company",
		"contact.agree": "By sending this, you agree to our",
		"contact.send": "Send message",
		// Blog
		"blog.title": "Blog",
		"blog.subtitle": "Ideas, strategy, and creativity for brands that want to grow",
		"blog.gotoproject": "Go to project",
		"blog.readmore": "Read more",
		// Footer
		"footer.newsletter": "Subscribe to",
		"footer.newsletter2": "our newsletter",
		"footer.yourmail": "Your email",
		// Misc
		"privacy.wip": "Work in progress",
		"privacy.wip.content": "This page will be updated soon",
		"thanks.subtitle": "Message sent successfully",
		"thanks.title": "Thank you",
		"thanks.content": "We will get back to you as soon as possible",
	},
	es: {
		or: "o",
		contact: "Contact",
		contacts: "Contact",
		contactus: "Contáctanos",
		projects: "Projects",
		services: "Services",
		about: "About",
		homepage: "Inicio",
		tagline:
			"Nuestro objetivo es convertir tu marca en un motor poderoso de crecimiento y conversiones, combinando estrategia creativa, presencia digital y SEO sólido. Nos enfocamos en conectar tu historia con tu audiencia, asegurándonos de que tu negocio destaque. Tu éxito es nuestra misión.",
		"projects.see": "Ver proyecto",
		"projects.all": "Ver todos los proyectos",
		"projects.subtitle": "Estrategia y creatividad para marcas que quieren crecer",
		"hero.title.main": "Creamos",
		"hero.title.1": "estrategias",
		"hero.title.2": "identidades",
		"hero.title.3": "experiencias",
		"hero.title.4": "resultados",
		"hero.subtitle":
			"Go Estrategia Creativa es una agencia creativa que transforma marcas a través de comunicación estratégica, diseño digital y contenido de impacto.",
		"hero.scroll": "desliza para explorar más",
		"hero.cta": "Hablemos",
		// Services
		"services.pillar1.title": "Estrategia Creativa",
		"services.pillar2.title": "Presencia Digital",
		"services.pillar3.title": "Contenido y SEO",
		// About
		"about.title": "Nosotros",
		"about.subtitle": "El equipo detrás de Go",
		// Contact
		"contact.title": "Contacto",
		"contact.subtitle": "Grandes proyectos empiezan con una conversación honesta",
		"contact.name": "Nombre",
		"contact.email": "Email",
		"contact.message": "Mensaje",
		"contact.company": "Empresa",
		"contact.agree": "Al enviar, aceptas nuestra",
		"contact.send": "Enviar mensaje",
		// Blog
		"blog.title": "Blog",
		"blog.subtitle": "Ideas, estrategia y creatividad para marcas que quieren crecer",
		"blog.gotoproject": "Ver proyecto",
		"blog.readmore": "Leer más",
		// Footer
		"footer.newsletter": "Suscríbete a",
		"footer.newsletter2": "nuestro newsletter",
		"footer.yourmail": "Tu email",
		// Misc
		"privacy.wip": "En construcción",
		"privacy.wip.content": "Esta página se actualizará pronto",
		"thanks.subtitle": "Mensaje enviado con éxito",
		"thanks.title": "Gracias",
		"thanks.content": "Te responderemos lo antes posible",
	},
} as const;

export const showDefaultLang = false;
