import { ui, defaultLang, type Lang, languages, enumLabels } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const segments = url.pathname.replace(/\/$/, '').split('/').filter(Boolean);
  if (segments.length > 0 && Object.keys(languages).includes(segments[0])) {
    return segments[0] as Lang;
  }
  return defaultLang;
}

/**
 * Parámetros para las rutas `[...lang]`: el idioma por defecto va sin prefijo
 * (`param: undefined` → `/`), el resto con el suyo (`/en/`, `/pt/`, `/ja/`).
 */
export function localeParams(): { lang: Lang; param: string | undefined }[] {
  return (Object.keys(languages) as Lang[]).map((lang) => ({
    lang,
    param: lang === defaultLang ? undefined : lang,
  }));
}

/** Prefijo de URL de un idioma: '' para el idioma por defecto, '/en' para el resto. */
export function localePrefix(lang: Lang): string {
  return lang === defaultLang ? '' : `/${lang}`;
}

export function useTranslations(lang: Lang) {
  const dictionary = ui[lang] ?? ui[defaultLang];
  function t(key: keyof typeof ui[typeof defaultLang]): any {
    return (dictionary as Record<string, unknown>)[key as string] ?? (ui[defaultLang] as Record<string, unknown>)[key as string] ?? key;
  }
  return t;
}

export function useEnumLabel(lang: Lang) {
  const dict = enumLabels[lang] ?? enumLabels[defaultLang];
  return function label(key: string): string {
    return dict[key] ?? key;
  };
}

export function switchLocaleUrl(pathname: string, targetLocale: Lang): string {
  const segments = pathname.replace(/\/$/, '').split('/').filter(Boolean);

  const localeKeys = Object.keys(languages);
  if (segments.length > 0 && localeKeys.includes(segments[0])) {
    segments.shift();
  }

  const base = segments.length > 0 ? '/' + segments.join('/') : '/';

  if (targetLocale === defaultLang) {
    return base;
  }
  return `/${targetLocale}${base}`;
}

/**
 * Obtiene el valor localizado de un campo de contenido.
 * Busca `field_lang` primero, cae de vuelta a `field` (español).
 */
export function localize(data: Record<string, unknown>, field: string, lang: Lang): string | undefined {
  if (lang === 'es') return data[field] as string | undefined;
  const localized = data[`${field}_${lang}`] as string | undefined;
  return localized ?? (data[field] as string | undefined);
}

/**
 * Obtiene un array localizado de strings.
 */
export function localizeArray(data: Record<string, unknown>, field: string, lang: Lang): string[] {
  if (lang === 'es') return (data[field] as string[]) ?? [];
  const localized = data[`${field}_${lang}`] as string[] | undefined;
  return localized ?? (data[field] as string[]) ?? [];
}
