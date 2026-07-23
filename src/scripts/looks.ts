/**
 * Selector de trajes/variantes dentro de cualquier ficha de personaje.
 * Se delega en `document` para que funcione también con las fichas que el
 * modal clona desde un <template>.
 */
export function initLooks() {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const btn = target?.closest<HTMLButtonElement>('[data-look-btn]');
    if (!btn) return;

    const panel = btn.closest<HTMLElement>('[data-panel]');
    if (!panel) return;

    const index = btn.dataset.lookBtn!;

    panel.querySelectorAll<HTMLElement>('[data-look]').forEach((layer) => {
      layer.hidden = layer.dataset.look !== index;
    });

    panel.querySelectorAll<HTMLButtonElement>('[data-look-btn]').forEach((other) => {
      const active = other === btn;
      other.setAttribute('aria-pressed', String(active));
      other.style.background = active ? (other.dataset.accent ?? '') : '';
      other.style.color = active ? '#0b0616' : '';
    });

    const desc = panel.querySelector<HTMLElement>('[data-look-desc]');
    if (desc) desc.textContent = btn.dataset.desc || '';
  });
}
