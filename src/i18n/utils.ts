import { ui, defaultLang, type Lang, languages, enumLabels } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const segments = url.pathname.replace(/\/$/, '').split('/').filter(Boolean);
  if (segments.length > 0 && Object.keys(languages).includes(segments[0])) {
    return segments[0] as Lang;
  }
  return defaultLang;
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
