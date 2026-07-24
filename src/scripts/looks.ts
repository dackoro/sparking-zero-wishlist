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

    // Solo se mueve `aria-pressed`: el color del borde y el realce de la
    // foto los resuelve el CSS a partir de ese atributo.
    panel.querySelectorAll<HTMLButtonElement>('[data-look-btn]').forEach((other) => {
      other.setAttribute('aria-pressed', String(other === btn));
    });

    const desc = panel.querySelector<HTMLElement>('[data-look-desc]');
    if (desc) desc.textContent = btn.dataset.desc || '';
  });
}
