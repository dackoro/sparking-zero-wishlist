const lazyMediaSelector = 'img[data-src], [data-bg-src]';

function loadMedia(element: Element) {
  if (element instanceof HTMLImageElement) {
    const src = element.dataset.src;
    if (!src) return;

    element.src = src;
    delete element.dataset.src;
    return;
  }

  if (element instanceof HTMLElement) {
    const src = element.dataset.bgSrc;
    if (!src) return;

    element.style.backgroundImage = `url("${src.replaceAll('"', '\\"')}")`;
    delete element.dataset.bgSrc;
  }
}

export function initLazyMedia() {
  const observer =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              loadMedia(entry.target);
              observer?.unobserve(entry.target);
            }
          },
          {
            // Da un pequeño margen para que la imagen termine de cargar antes
            // de entrar en pantalla, sin descargar el resto del documento.
            rootMargin: '350px 0px',
            threshold: 0.01,
          },
        )
      : null;

  const register = (root: ParentNode) => {
    const media = root.querySelectorAll<Element>(lazyMediaSelector);
    for (const element of media) {
      if (observer) observer.observe(element);
      else loadMedia(element);
    }
  };

  register(document);

  // Las fichas viven en <template> y se clonan al abrir el modal. Al observar
  // las inserciones, sus medios entran en la misma política de viewport.
  const mutations = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node.matches(lazyMediaSelector)) {
          if (observer) observer.observe(node);
          else loadMedia(node);
        }
        register(node);
      }
    }
  });

  mutations.observe(document.body, { childList: true, subtree: true });
}
