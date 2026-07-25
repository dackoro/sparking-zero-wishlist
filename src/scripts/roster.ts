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

  function open(slug: string, push = true) {
    const tpl = document.querySelector<HTMLTemplateElement>(`template[data-panel-for="${slug}"]`);
    if (!tpl) return;

    const wasOpen = !modal!.hidden;
    lastFocus = wasOpen ? lastFocus : (document.activeElement as HTMLElement);
    content.replaceChildren(tpl.content.cloneNode(true));
    modal!.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    if (!wasOpen) modal!.querySelector<HTMLButtonElement>('[data-close]')?.focus();
    if (push) history.pushState({ slug }, '', `/fighters/${slug}/`);

    const tile = tiles.find(t => t.dataset.slug === slug)
      ?? hiveOutfitsEl?.querySelector<HTMLElement>(`[data-hex][data-slug="${slug}"]`);
    currentSection = tile?.dataset.section ?? 'fighters';
    syncStrip(slug);
  }

  function close(pop = true) {
    if (modal!.hidden) return;
    modal!.hidden = true;
    content.replaceChildren();
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
