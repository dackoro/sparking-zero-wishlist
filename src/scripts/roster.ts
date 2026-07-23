/**
 * Filtrado, orden y overlay del panal de personajes.
 *
 * El panal se reordena moviendo nodos reales (no ocultándolos) porque el
 * escalonado de las filas se calcula con :nth-child: si dejáramos huecos, las
 * filas dejarían de engranar.
 */
type Tile = HTMLAnchorElement;

const num = (el: Tile, key: string) => Number(el.dataset[key] ?? 0);

export function initRoster() {
  const hive = document.getElementById('hive');
  const modal = document.getElementById('fighter-modal');
  if (!hive || !modal) return;

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
    'importance-desc': (a, b) => num(b, 'importance') - num(a, 'importance') || num(a, 'year') - num(b, 'year'),
    'importance-asc': (a, b) => num(a, 'importance') - num(b, 'importance') || num(a, 'year') - num(b, 'year'),
    'hype-desc': (a, b) => num(b, 'hype') - num(a, 'hype') || num(b, 'importance') - num(a, 'importance'),
    series: (a, b) =>
      (a.dataset.series ?? '').localeCompare(b.dataset.series ?? '', 'es') ||
      num(a, 'year') - num(b, 'year'),
  };

  function apply() {
    const q = value('q').trim().toLowerCase();
    const series = value('series');
    const saga = value('saga');
    const role = value('role');
    const status = value('status');
    const minImportance = Number(value('importance') || 0);
    const sort = value('sort');

    const visible = tiles.filter((t) => {
      if (series && t.dataset.series !== series) return false;
      if (saga && t.dataset.saga !== saga) return false;
      if (role && t.dataset.role !== role) return false;
      if (status && t.dataset.status !== status) return false;
      if (num(t, 'importance') < minImportance) return false;
      if (q && !(t.dataset.name ?? '').includes(q) && !(t.dataset.saga ?? '').toLowerCase().includes(q))
        return false;
      return true;
    });

    visible.sort(comparators[sort] ?? comparators['importance-desc']);
    visible.forEach((t, i) => t.style.setProperty('animation-delay', `${Math.min(i * 15, 400)}ms`));

    hive.replaceChildren(...visible);
    counter.textContent = String(visible.length);
    empty.hidden = visible.length > 0;
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

    lastFocus = document.activeElement as HTMLElement;
    content.replaceChildren(tpl.content.cloneNode(true));
    modal!.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    modal!.querySelector<HTMLButtonElement>('[data-close]')?.focus();
    if (push) history.pushState({ slug }, '', `/fighters/${slug}/`);
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
    const tile = (event.target as HTMLElement).closest<Tile>('[data-hex]');
    if (!tile || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    open(tile.dataset.slug!);
  });

  const hiveOutfits = document.getElementById('hive-outfits');
  if (hiveOutfits) {
    hiveOutfits.addEventListener('click', (event) => {
      const tile = (event.target as HTMLElement).closest<Tile>('[data-hex]');
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
}
