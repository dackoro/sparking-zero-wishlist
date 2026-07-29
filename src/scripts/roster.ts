/**
 * Filtrado, orden y overlay del panal de personajes.
 *
 * El panal se reordena moviendo nodos reales (no ocultándolos) porque el
 * escalonado de las filas se recalcula (layoutHive) midiendo la posición real
 * de cada celda: si dejáramos huecos, las filas dejarían de engranar.
 */
type Tile = HTMLElement;

const num = (el: Tile, key: string) => Number(el.dataset[key] ?? 0);

/**
 * En desktop (sm+, `--cols` fijo) el desfase de fila lo pone CSS con
 * :nth-child porque queda mejor distribuido con columnas fijas; ahí no
 * tocamos --shift por JS, solo limpiamos cualquier valor inline que
 * hubiera quedado de un resize anterior desde mobile.
 */
/**
 * Calcula a qué fila cayó cada celda tras el auto-layout del grid (columnas
 * `auto-fill`, así que el número de columnas por fila lo decide el navegador
 * según el ancho real, no un breakpoint) y desplaza medio hexágono las filas
 * impares para que el panal engrane. Se recalcula en cada resize real del
 * contenedor, así se acomoda solo sin importar el ancho. Solo aplica en
 * mobile: en desktop el desfase lo pone CSS (ver global.css).
 */
function layoutHive(hive: HTMLElement) {
  const cells = Array.from(hive.children) as HTMLElement[];
  const width = window.innerWidth;
  const pattern = width >= 1024 ? [6, 7] : width >= 768 ? [4, 5] : width >= 640 ? [3, 4] : [3, 2];
  const maxCols = Math.max(...pattern);
  hive.style.setProperty('--hive-max-cols', String(maxCols));

  let row = 1;
  let column = 1;
  let patternIndex = 0;
  let rowSize = pattern[patternIndex];
  for (const cell of cells) {
    if (column > rowSize) {
      row++;
      patternIndex = (patternIndex + 1) % pattern.length;
      rowSize = pattern[patternIndex];
      column = 1;
    }
    cell.style.gridColumn = String(column);
    cell.style.gridRow = String(row);
    cell.style.setProperty('--shift', rowSize < maxCols ? 'calc(50% + var(--hex-gap) / 2)' : '0px');
    column++;
  }
}

function watchHiveLayout(hive: HTMLElement) {
  layoutHive(hive);
  const observer = new ResizeObserver(() => layoutHive(hive));
  observer.observe(hive);
  return observer;
}

export function initRoster() {
  const hive = document.getElementById('hive');
  const modal = document.getElementById('fighter-modal');
  if (!hive || !modal) return;

  watchHiveLayout(hive);
  const hiveOutfitsEl = document.getElementById('hive-outfits');
  if (hiveOutfitsEl) watchHiveLayout(hiveOutfitsEl);

  const tiles = Array.from(hive.querySelectorAll<Tile>('[data-hex]'));
  const empty = document.getElementById('hive-empty')!;
  const counter = document.getElementById('hive-count')!;
  const form = document.getElementById('filtros') as HTMLFormElement;

  const value = (name: string) =>
    (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null)?.value ?? '';

  const comparators: Record<string, (a: Tile, b: Tile) => number> = {
    'year-asc': (a, b) => num(a, 'year') - num(b, 'year'),
    'year-desc': (a, b) => num(b, 'year') - num(a, 'year'),
    'name-asc': (a, b) => (a.dataset.name ?? '').localeCompare(b.dataset.name ?? '', 'es'),
    series: (a, b) =>
      (a.dataset.series ?? '').localeCompare(b.dataset.series ?? '', 'es') ||
      num(a, 'year') - num(b, 'year'),
  };

  /* --------------------- Tira de navegación entre fichas --------------------- */
  const strip = document.getElementById('fighter-strip');
  const stripTrack = strip?.firstElementChild as HTMLElement | undefined;
  let stripBtns = strip ? Array.from(strip.querySelectorAll<HTMLButtonElement>('[data-strip-slug]')) : [];
  const prevBtn = document.getElementById('fighter-strip-prev');
  const nextBtn = document.getElementById('fighter-strip-next');
  const preloadCache = new Map<string, Promise<void>>();
  const criticalMediaCache = new Map<string, string[]>();

  function criticalMediaFor(slug: string) {
    const cached = criticalMediaCache.get(slug);
    if (cached) return cached;

    const tpl = document.querySelector<HTMLTemplateElement>(`template[data-panel-for="${slug}"]`);
    const scene = tpl?.content.querySelector<HTMLElement>('[data-look="0"][data-bg-src]')?.dataset.bgSrc;
    const render = tpl?.content
      .querySelector<HTMLImageElement>('[data-look="0"] img[src]')
      ?.getAttribute('src');
    const urls = [scene, render]
      .filter((url): url is string => Boolean(url))
      .map((url) => new URL(url, location.href).href);

    criticalMediaCache.set(slug, urls);
    return urls;
  }

  function preloadUrl(url: string, priority: 'high' | 'low') {
    const cached = preloadCache.get(url);
    if (cached) return cached;

    const pending = new Promise<void>((resolve) => {
      const image = new Image();
      image.decoding = 'async';
      image.fetchPriority = priority;
      image.onload = image.onerror = () => resolve();
      image.src = url;
    });
    preloadCache.set(url, pending);
    return pending;
  }

  function preloadPanel(slug: string, priority: 'high' | 'low' = 'high') {
    return Promise.all(criticalMediaFor(slug).map((url) => preloadUrl(url, priority)));
  }

  const preloadFromEvent = (event: Event) => {
    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-slug], [data-strip-slug]');
    const slug = target?.dataset.slug ?? target?.dataset.stripSlug;
    if (slug) void preloadPanel(slug);
  };

  // En escritorio normalmente hay tiempo entre apuntar y hacer clic; en
  // teclado/táctil iniciamos la descarga en el primer gesto disponible.
  for (const container of [hive, hiveOutfitsEl, strip]) {
    container?.addEventListener('pointerover', preloadFromEvent, { passive: true });
    container?.addEventListener('pointerdown', preloadFromEvent, { passive: true });
    container?.addEventListener('focusin', preloadFromEvent);
  }

  type NavigatorWithConnection = Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const connection = (navigator as NavigatorWithConnection).connection;
  const allowsSpeculation = !connection?.saveData && !connection?.effectiveType?.includes('2g');

  if (allowsSpeculation && 'IntersectionObserver' in window) {
    let budget = window.innerWidth >= 1024 ? 8 : 4;
    const idle = (callback: () => void) => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback, { timeout: 1200 });
      } else {
        window.setTimeout(callback, 250);
      }
    };

    const visibleObserver = new IntersectionObserver(
      (entries) => {
        const viewportCenter = window.innerHeight / 2;
        const candidates = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - viewportCenter) -
              Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - viewportCenter),
          )
          .slice(0, budget);

        if (candidates.length === 0) return;
        budget -= candidates.length;
        candidates.forEach((entry) => visibleObserver.unobserve(entry.target));
        idle(() => {
          for (const entry of candidates) {
            const slug = (entry.target as HTMLElement).dataset.slug;
            if (slug) void preloadPanel(slug, 'low');
          }
        });
        if (budget <= 0) visibleObserver.disconnect();
      },
      { rootMargin: '150px 0px', threshold: 0.25 },
    );

    const outfitTiles = hiveOutfitsEl?.querySelectorAll<HTMLElement>('[data-hex]') ?? [];
    [...tiles, ...outfitTiles].forEach((tile) => visibleObserver.observe(tile));
  }

  function applyStripOrder() {
    if (!strip || !stripTrack || stripBtns.length === 0) return;
    const sort = value('sort');
    const sorted = [...stripBtns].sort(comparators[sort] ?? comparators['year-asc']);
    stripTrack.append(...sorted);
    stripBtns = sorted;
  }

  function apply() {
    const q = value('q').trim().toLowerCase();
    const series = value('series');
    const saga = value('saga');
    const role = value('role');
    const status = value('status');
    const sort = value('sort');

    const visible = tiles.filter((t) => {
      if (series && t.dataset.series !== series) return false;
      if (saga && t.dataset.saga !== saga) return false;
      if (role && t.dataset.role !== role) return false;
      if (status && t.dataset.status !== status) return false;
      if (q && !(t.dataset.name ?? '').includes(q) && !(t.dataset.saga ?? '').toLowerCase().includes(q))
        return false;
      return true;
    });

    visible.sort(comparators[sort] ?? comparators['year-asc']);
    visible.forEach((t, i) => t.style.setProperty('animation-delay', `${Math.min(i * 15, 400)}ms`));

    hive.replaceChildren(...visible);
    counter.textContent = String(visible.length);
    empty.hidden = visible.length > 0;
    layoutHive(hive);

    applyStripOrder();
  }

  form.addEventListener('input', apply);
  form.addEventListener('reset', () => setTimeout(apply));
  apply();

  /* ---------------------------- Overlay ---------------------------- */
  const content = document.getElementById('fighter-modal-content')!;
  const home = location.pathname;
  let lastFocus: HTMLElement | null = null;
  const panelCache = new Map<string, HTMLElement>();
  let activePanel: HTMLElement | null = null;

  function getPanel(slug: string) {
    const cached = panelCache.get(slug);
    if (cached) return cached;

    const tpl = document.querySelector<HTMLTemplateElement>(`template[data-panel-for="${slug}"]`);
    const panel = tpl?.content.firstElementChild?.cloneNode(true);
    if (!(panel instanceof HTMLElement)) return null;

    // El fondo crítico se activa sin esperar otro ciclo del IntersectionObserver.
    const background = panel.querySelector<HTMLElement>('[data-look="0"][data-bg-src]');
    if (background?.dataset.bgSrc) {
      background.style.backgroundImage = `url("${background.dataset.bgSrc.replaceAll('"', '\\"')}")`;
      delete background.dataset.bgSrc;
    }

    panel.hidden = true;
    content.append(panel);
    panelCache.set(slug, panel);
    return panel;
  }

  function open(slug: string, push = true) {
    void preloadPanel(slug);
    const panel = getPanel(slug);
    if (!panel) return;

    const wasOpen = !modal!.hidden;
    lastFocus = wasOpen ? lastFocus : (document.activeElement as HTMLElement);
    if (activePanel !== panel) {
      if (activePanel) activePanel.hidden = true;
      panel.hidden = false;
      activePanel = panel;
    }
    modal!.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    if (!wasOpen) modal!.querySelector<HTMLButtonElement>('[data-close]')?.focus();
    if (push) history.pushState({ slug }, '', `/fighters/${slug}/`);

    const tile = tiles.find(t => t.dataset.slug === slug)
      ?? hiveOutfitsEl?.querySelector<HTMLElement>(`[data-hex][data-slug="${slug}"]`);
    currentSection = tile?.dataset.section ?? 'fighters';
    syncStrip(slug);

    const visibleStrip = stripBtns.filter((btn) => !btn.hidden);
    const current = visibleStrip.findIndex((btn) => btn.dataset.stripSlug === slug);
    if (current !== -1 && visibleStrip.length > 1) {
      const previous = visibleStrip[(current - 1 + visibleStrip.length) % visibleStrip.length];
      const next = visibleStrip[(current + 1) % visibleStrip.length];
      window.setTimeout(() => {
        void preloadPanel(previous.dataset.stripSlug!, 'low');
        void preloadPanel(next.dataset.stripSlug!, 'low');
      }, 150);
    }
  }

  function close(pop = true) {
    if (modal!.hidden) return;
    modal!.hidden = true;
    document.documentElement.style.overflow = '';
    lastFocus?.focus();
    if (pop && history.state?.slug) history.replaceState(null, '', home);
  }

  hive.addEventListener('click', (event) => {
    const tile = (event.target as HTMLElement).closest<HTMLAnchorElement>('[data-hex]');
    if (!tile || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    open(tile.dataset.slug!);
  });

  const hiveOutfits = document.getElementById('hive-outfits');
  if (hiveOutfits) {
    hiveOutfits.addEventListener('click', (event) => {
      const tile = (event.target as HTMLElement).closest<HTMLAnchorElement>('[data-hex]');
      if (!tile || event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      open(tile.dataset.slug!);
    });
  }

  modal.addEventListener('click', (event) => {
    const el = event.target as HTMLElement;
    if (el.closest('[data-close]') || el.hasAttribute('data-backdrop')) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  window.addEventListener('popstate', () => close(false));

  let currentSection = 'fighters';

  function syncStrip(slug: string) {
    stripBtns.forEach((btn) => {
      btn.hidden = btn.dataset.section !== currentSection;
      const active = btn.dataset.stripSlug === slug && !btn.hidden;
      btn.setAttribute('aria-current', active ? 'page' : 'false');
      if (active) btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  }

  function step(delta: number) {
    if (modal!.hidden || stripBtns.length === 0) return;
    const visible = stripBtns.filter(b => !b.hidden);
    const current = visible.findIndex((btn) => btn.getAttribute('aria-current') === 'page');
    const from = current === -1 ? 0 : current;
    const next = (from + delta + visible.length) % visible.length;
    open(visible[next].dataset.stripSlug!);
  }

  let dragged = false;

  strip?.addEventListener('click', (event) => {
    if (dragged) {
      dragged = false;
      return;
    }
    const btn = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-strip-slug]');
    if (!btn) return;
    open(btn.dataset.stripSlug!);
  });

  prevBtn?.addEventListener('click', () => step(-1));
  nextBtn?.addEventListener('click', () => step(1));

  document.addEventListener('keydown', (event) => {
    if (modal!.hidden) return;
    const target = event.target as HTMLElement;
    if (target.closest('input, textarea, select, [contenteditable]')) return;
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
  });

  // Rueda del ratón mueve el scroll horizontal (el eje vertical no tiene sentido aquí).
  strip?.addEventListener(
    'wheel',
    (event) => {
      if (event.deltaY === 0) return;
      event.preventDefault();
      strip.scrollLeft += event.deltaY;
    },
    { passive: false },
  );

  // Arrastre con el ratón (el táctil ya funciona nativo con overflow-x: auto).
  let pointerDown = false;
  let dragStartX = 0;
  let dragStartScroll = 0;

  strip?.addEventListener('mousedown', (event) => {
    pointerDown = true;
    dragged = false;
    dragStartX = event.clientX;
    dragStartScroll = strip.scrollLeft;
  });

  strip?.addEventListener('mousemove', (event) => {
    if (!pointerDown) return;
    const delta = event.clientX - dragStartX;
    if (Math.abs(delta) > 5) dragged = true;
    strip.scrollLeft = dragStartScroll - delta;
  });

  const endDrag = () => {
    pointerDown = false;
    setTimeout(() => { dragged = false; }, 100);
  };
  document.addEventListener('mouseup', endDrag);
}
