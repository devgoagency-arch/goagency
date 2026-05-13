import { ui, defaultLang, showDefaultLang, routes } from "./ui";

export type Lang = keyof typeof ui;

/** Detecta el idioma desde la URL */
export function getLangFromUrl(url: URL): Lang {
	const [, lang] = url.pathname.split("/");
	if (lang in ui) return lang as Lang;
	return defaultLang;
}

/** Retorna la ruta sin prefijo de idioma */
export function getUrlWithoutLang(url: URL): string {
	const [, langOrPath, ...rest] = url.pathname.split("/");
	if (langOrPath in ui) {
		return `/${rest.join("/")}`;
	}
	return `/${langOrPath}${rest.length ? "/" + rest.join("/") : ""}`;
}

/** Hook de traducciones */
export function useTranslations(lang: Lang) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
		return (ui[lang] as any)[key] ?? (ui[defaultLang] as any)[key] ?? key;
	};
}

/**
 * Hook para construir URLs con prefijo de idioma.
 * Respeta el mapa de rutas (ej. /work → /proyectos en ES)
 */
export function useTranslatedPath(lang: Lang) {
	return function translatePath(path: string, targetLang: string = lang): string {
		const cleanPath = path.replace(/^\//, ""); // quitar slash inicial

		const enRoutes = routes["en"] as Record<string, string>;
		const targetRoutes = (routes[targetLang] ?? {}) as Record<string, string>;

		const segments = cleanPath.split("/");
		const translatedSegments = segments.map((seg) => {
			if (!seg) return seg; // slash final vacío

			// 1. ¿Es una clave EN directa? (ej. "work", "blog", "about")
			if (enRoutes[seg] !== undefined) {
				return targetRoutes[seg] ?? seg;
			}

			// 2. ¿Es un valor de otro idioma? (reverse-lookup)
			for (const [enKey, localVal] of Object.entries(routes)) {
				for (const [rKey, rVal] of Object.entries(localVal as Record<string, string>)) {
					if (rVal === seg) {
						// rKey es la clave EN → buscar en targetRoutes
						return targetRoutes[rKey] ?? seg;
					}
				}
			}

			// 3. Sin traducción conocida → mantener
			return seg;
		});

		const translatedPath = "/" + translatedSegments.join("/");
		const prefix = !showDefaultLang && targetLang === defaultLang ? "" : `/${targetLang}`;
		return `${prefix}${translatedPath}`;
	};
}

/**
 * Genera links hreflang para SEO multiidioma
 * @param slug  slug sin prefijo (ej. "blog/mi-articulo")
 * @param siteUrl URL base (ej. "https://goagency.com")
 */
export function getHreflangLinks(slug: string, siteUrl: string): { lang: string; url: string }[] {
	const langs = Object.keys(ui) as Lang[];
	return langs.map((lang) => {
		const prefix = !showDefaultLang && lang === defaultLang ? "" : `/${lang}`;
		return {
			lang,
			url: `${siteUrl}${prefix}/${slug}`.replace(/\/+/g, "/").replace(":/", "://"),
		};
	});
}

/** Retorna el idioma alternativo (para el toggle de idioma del menú) */
export function getAlternateLang(lang: Lang): Lang {
	const langs = Object.keys(ui) as Lang[];
	return langs.find((l) => l !== lang) ?? defaultLang;
}
