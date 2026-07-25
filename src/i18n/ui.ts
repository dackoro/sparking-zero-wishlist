export const languages = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  ja: '日本語',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

export const ui = {
  es: {
    // Nav
    'nav.roster': 'Roster deseado',
    'nav.filters': 'Filtros',
    'nav.stages': 'Escenarios',
    'nav.contribute': 'Contribuir',
    'nav.addFighter': 'Añadir personaje',
    'nav.menu': 'Menú',

    // Language switcher
    'lang.label': 'Idioma',

    // Hero
    'hero.title': 'Los que faltan',
    'hero.description':
      'El roster de <strong class="text-white">Sparking! ZERO</strong> es enorme, pero todavía deja fuera a muchos personajes de Dragon Ball. Esta es una lista de deseos hecha por la comunidad: personajes que nos gustaría que se consideraran para futuros DLC, ordenables por saga, por año de primera aparición o por cuánto los pide la gente. Al abrir una ficha verás también los <strong class="text-white">trajes y variantes</strong> que faltan.',

    // Stats
    'stats.fighters': 'Personajes propuestos',
    'stats.variants': 'Trajes y variantes',

    // Filter heading
    'filter.heading': 'Todos los candidatos',

    // Filter bar
    'filter.search': 'Buscar',
    'filter.searchPlaceholder': 'Nombre o saga…',
    'filter.series': 'Serie',
    'filter.allSeries': 'Todas',
    'filter.role': 'Rol',
    'filter.anyRole': 'Cualquiera',
    'filter.sort': 'Ordenar por',
    'filter.sortYearAsc': 'Primera aparición (antiguos)',
    'filter.sortYearDesc': 'Primera aparición (recientes)',
    'filter.sortSeries': 'Serie',
    'filter.sortNameAsc': 'Nombre (A-Z)',
    'filter.saga': 'Saga',
    'filter.allSagas': 'Todas las sagas',
    'filter.status': 'Estado',
    'filter.allStatuses': 'Todos',
    'filter.clear': 'Limpiar',
    'filter.toggle': 'Filtros',
    'filter.showNames': 'Mostrar nombres',
    'filter.hideNames': 'Ocultar nombres',
    'filter.countOf': ({ total }: { total: number }) =>
      ` de ${total} personajes en la lista de deseos.`,

    'filter.typeCharacters': 'Personajes',
    'filter.typeOutfits': 'Trajes',
    'outfitTile.from': (parent: string) => `de ${parent}`,
    'hive.outfitCount': ({ shown, total }: { shown: number; total: number }) =>
      `${shown} de ${total} trajes pendientes.`,

    // Hive
    'hive.empty': 'Ningún personaje encaja con esos filtros. Prueba a limpiarlos… o proponlo tú mismo.',


    // Modal
    'modal.close': 'Cerrar ficha',
    'modal.prev': 'Personaje anterior',
    'modal.next': 'Personaje siguiente',
    'modal.browse': 'Explorar personajes',

    // Fighter panel
    'panel.series': 'Serie',
    'panel.saga': 'Saga',
    'panel.firstAppearance': 'Primera vez visto',
    'panel.work': 'Obra',
    'panel.role': 'Rol',
    'panel.outfits': 'Trajes',
    'panel.defaultLook': 'Forma base',
    'panel.noVariants':
      'Nadie ha propuesto variantes todavía. ¿Te sabes alguna? Añádela por pull request.',

    // Detail page
    'detail.titleTemplate': (name: string) => `${name} en Sparking! ZERO — ficha de la wishlist`,
    'detail.descriptionTemplate': (name: string, series: string, year: number, description: string) =>
      `${name} (${series}, ${year}): ${description}`,
    'detail.jsonLdHeadline': (name: string) => `${name}, candidato a DLC de Sparking! ZERO`,
    'detail.jsonLdCollection': 'Personajes que faltan en Sparking! ZERO',
    'detail.breadcrumb': 'Wishlist',
    'detail.back': '← Volver al panal',
    'detail.edit': 'Corregir esta ficha',

    // Contribute page
    'contribute.title':
      'Cómo añadir un personaje a la wishlist',
    'contribute.description':
      'Guía para proponer personajes de Dragon Ball que faltan en Sparking! ZERO: crea un JSON en src/content/fighters y abre un pull request.',
    'contribute.heading': 'Añade tu personaje',
    'contribute.intro':
      'Cada personaje es un archivo JSON independiente dentro de <code class="rounded bg-white/10 px-1.5 py-0.5 text-ice">src/content/fighters/</code>. Así dos pull requests nunca chocan entre sí y el sitio se regenera solo. Si el JSON no cumple el esquema, el build falla y lo verás en el propio PR antes de que nadie lo revise.',

    'contribute.steps': '1. Los pasos',
    'contribute.step1':
      'Haz fork del repositorio y crea una rama, por ejemplo <code class="text-ice">add/pikkon</code>.',
    'contribute.step2':
      'Crea <code class="text-ice">src/content/fighters/&lt;slug&gt;.json</code> — el nombre del archivo, en minúsculas y con guiones, es la URL del personaje.',
    'contribute.step3':
      'Si tienes arte propio, déjalo en <code class="text-ice">public/fighters/</code> en formato WebP. Si no, no pongas nada: la página dibuja un placeholder con su color.',
    'contribute.step4':
      'Ejecuta <code class="text-ice">npm run build</code> para validar el esquema.',
    'contribute.step5':
      'Abre el pull request describiendo de dónde salen los datos.',

    'contribute.rules': '2. Reglas de la casa',
    'contribute.rule1':
      'Solo personajes que <strong class="text-white">no estén ya</strong> en el juego.',
    'contribute.rule2':
      'Si un personaje llega como DLC, no se borra: se cambia su <code class="text-ice">status</code> a "Ya es DLC".',
    'contribute.sectionTitle': '3. Personajes o Trajes',
    'contribute.sectionDesc':
      'El campo <code class="text-ice">section</code> define en qué grupo visual aparece: <code>fighters</code> (Personajes, arriba) o <code>outfits</code> (Trajes, abajo). Si un personaje ya está en el juego y solo faltan sus skins, ponle <code class="text-ice">"section": "outfits"</code>. El componente hexágono es exactamente el mismo — solo cambia en qué panal se dibuja.',

    'contribute.variantsTitle': 'Imágenes de cada variante',
    'contribute.variantsDesc':
      'El selector de trajes dibuja un hexágono por variante, y cada uno lleva su propia foto — igual que el panal del home. La imagen sale de <code class="text-ice">variants[].portrait</code>; si no la pones, cae en <code class="text-ice">variants[].image</code>, y si tampoco hay, el hexágono queda liso. El traje por defecto (el primero) usa el <code class="text-ice">portrait</code> del personaje, así que es la misma cara que ya se ve en el panal. Al pulsar un hexágono cambian a la vez el render de la izquierda (<code>image</code>) y el fondo de la cabecera (<code>scene</code>), por eso conviene rellenar los tres campos de cada variante.',

    'contribute.fields': '4. Los campos',
    'contribute.fieldsHeader': ['Campo', 'Obligatorio', 'Qué es'],
    'contribute.example': '5. Ejemplo: personaje nuevo',
    'contribute.exampleOutfit': '6. Ejemplo: traje o variante',

    // Footer
    'footer.nonprofit': 'Proyecto de fans, sin ánimo de lucro.',
    'footer.disclaimer':
      'Dragon Ball y DRAGON BALL: Sparking! ZERO son marcas de Bird Studio / Shueisha, Toei Animation y Bandai Namco Entertainment. Esta página no está afiliada ni respaldada por ellos: es una lista de deseos hecha por la comunidad.',
    'footer.opensource':
      'El código y los datos son abiertos. ¿Falta alguien? Abre un pull request con su ficha.',

    // HexTile
    'hexTile.new': 'Nuevo',

    // FighterArt
    'fighterArt.renderOf': (name: string) => `Render de ${name}`,
    'fighterArt.pendingArt': (name: string) => `Arte pendiente de ${name}`,

    // Stages
    'nav.stages': 'Escenarios',
    'stages.metaTitle': 'Escenarios que faltan en Sparking! ZERO — Wishlist de la comunidad',
    'stages.metaDesc': (count: number) => `Lista de deseos de escenarios: ${count} escenarios de Dragon Ball que aún no están en Sparking! ZERO.`,
    'stages.heading': 'Los escenarios que faltan',
    'stages.description': 'Escenarios icónicos de Dragon Ball que aún no han llegado a <strong class="text-white">Sparking! ZERO</strong>. Ordenables por saga y año.',
    'stages.empty': 'Ningún escenario encaja con esos filtros.',
    'stages.hint': '',
    'stages.breadcrumb': 'Escenarios',
    'stages.back': '← Volver a escenarios',
    'stages.detailTitle': (name: string) => `${name} — Escenario de la wishlist de Sparking! ZERO`,
    'stages.detailDesc': (name: string, series: string, year: number, description: string) =>
      `${name} (${series}, ${year}): ${description}`,
    'stages.jsonLdName': 'Escenarios que faltan en DRAGON BALL: Sparking! ZERO',

    // OG
    'og.siteName': 'DBSZ Wishlist',

    // Index meta
    'meta.indexTitle': 'Personajes que faltan en Sparking! ZERO — Wishlist de la comunidad',
    'meta.indexDescription': (count: number) =>
      `Lista de deseos hecha por fans: ${count} personajes de Dragon Ball que aún no están en Sparking! ZERO, con su saga, año de primera aparición y los trajes que también faltan.`,
    'meta.jsonLdName': 'Personajes que faltan en DRAGON BALL: Sparking! ZERO',
  },

  en: {
    // Nav
    'nav.roster': 'Wanted Roster',
    'nav.filters': 'Filters',
    'nav.stages': 'Stages',
    'nav.contribute': 'Contribute',
    'nav.addFighter': 'Add fighter',
    'nav.menu': 'Menu',

    // Language switcher
    'lang.label': 'Language',

    // Hero
    'hero.title': 'The Missing Ones',
    'hero.description':
      'The <strong class="text-white">Sparking! ZERO</strong> roster is huge, but it still leaves out many Dragon Ball characters. This is a community-made wishlist: characters we\'d love to see considered for future DLC, sortable by saga, first appearance year, or how strongly fans want them. Open a profile to also see the <strong class="text-white">outfits and variants</strong> that are missing.',

    // Stats
    'stats.fighters': 'Proposed fighters',
    'stats.variants': 'Outfits & variants',

    // Filter heading
    'filter.heading': 'All Candidates',

    // Filter bar
    'filter.search': 'Search',
    'filter.searchPlaceholder': 'Name or saga…',
    'filter.series': 'Series',
    'filter.allSeries': 'All',
    'filter.role': 'Role',
    'filter.anyRole': 'Any',
    'filter.sort': 'Sort by',
    'filter.sortYearAsc': 'First appearance (oldest)',
    'filter.sortYearDesc': 'First appearance (newest)',
    'filter.sortSeries': 'Series',
    'filter.sortNameAsc': 'Name (A-Z)',
    'filter.saga': 'Saga',
    'filter.allSagas': 'All sagas',
    'filter.status': 'Status',
    'filter.allStatuses': 'All',
    'filter.clear': 'Clear',
    'filter.toggle': 'Filters',
    'filter.showNames': 'Show names',
    'filter.hideNames': 'Hide names',
    'filter.countOf': ({ total }: { total: number }) =>
      ` of ${total} characters on the wishlist.`,

    'filter.typeCharacters': 'Characters',
    'filter.typeOutfits': 'Outfits',
    'outfitTile.from': (parent: string) => `from ${parent}`,
    'hive.outfitCount': ({ shown, total }: { shown: number; total: number }) =>
      `${shown} of ${total} outfits pending.`,

    // Hive
    'hive.empty':
      'No characters match those filters. Try clearing them… or propose one yourself.',


    // Modal
    'modal.close': 'Close profile',
    'modal.prev': 'Previous character',
    'modal.next': 'Next character',
    'modal.browse': 'Browse characters',

    // Fighter panel
    'panel.series': 'Series',
    'panel.saga': 'Saga',
    'panel.firstAppearance': 'First seen',
    'panel.work': 'Work',
    'panel.role': 'Role',
    'panel.outfits': 'Outfits',
    'panel.defaultLook': 'Base form',
    'panel.noVariants':
      'No one has proposed variants yet. Know any? Add them via pull request.',

    // Detail page
    'detail.titleTemplate': (name: string) => `${name} in Sparking! ZERO — wishlist profile`,
    'detail.descriptionTemplate': (name: string, series: string, year: number, description: string) =>
      `${name} (${series}, ${year}): ${description}`,
    'detail.jsonLdHeadline': (name: string) => `${name}, Sparking! ZERO DLC candidate`,
    'detail.jsonLdCollection': 'Missing characters in Sparking! ZERO',
    'detail.breadcrumb': 'Wishlist',
    'detail.back': '← Back to hive',
    'detail.edit': 'Edit this entry',

    // Contribute page
    'contribute.title':
      'How to add a character to the wishlist',
    'contribute.description':
      'Guide to proposing Dragon Ball characters missing from Sparking! ZERO: create a JSON in src/content/fighters and open a pull request.',
    'contribute.heading': 'Add your character',
    'contribute.intro':
      'Each character is a standalone JSON file inside <code class="rounded bg-white/10 px-1.5 py-0.5 text-ice">src/content/fighters/</code>. This way two pull requests never collide, and the site regenerates automatically. If the JSON doesn\'t pass the schema, the build fails and you\'ll see it in the PR before anyone reviews it.',

    'contribute.steps': '1. Steps',
    'contribute.step1':
      'Fork the repo and create a branch, e.g. <code class="text-ice">add/pikkon</code>.',
    'contribute.step2':
      'Create <code class="text-ice">src/content/fighters/&lt;slug&gt;.json</code> — the file name, in lowercase with hyphens, becomes the character URL.',
    'contribute.step3':
      'If you have your own art, place it in <code class="text-ice">public/fighters/</code> as WebP. Otherwise leave it blank: the page draws a placeholder with the character\'s accent color.',
    'contribute.step4':
      'Run <code class="text-ice">npm run build</code> to validate the schema.',
    'contribute.step5':
      'Open the pull request describing where the data comes from.',

    'contribute.rules': '2. House rules',
    'contribute.rule1':
      'Only characters <strong class="text-white">not already</strong> in the game.',
    'contribute.rule2':
      'If a character becomes DLC, don\'t delete it: change its <code class="text-ice">status</code> to "Ya es DLC".',
    'contribute.sectionTitle': '3. Characters or Outfits',
    'contribute.sectionDesc':
      'The <code class="text-ice">section</code> field defines which visual group the entry appears in: <code>fighters</code> (Characters, top) or <code>outfits</code> (Outfits, bottom). If a character is already in the game and only their skins are missing, use <code class="text-ice">"section": "outfits"</code>. The hexagon component is exactly the same — only the panel it renders in changes.',

    'contribute.variantsTitle': 'Images for each variant',
    'contribute.variantsDesc':
      'The outfit picker draws one hexagon per variant, and each carries its own photo — just like the home honeycomb. The image comes from <code class="text-ice">variants[].portrait</code>; if you omit it, it falls back to <code class="text-ice">variants[].image</code>, and with neither the hexagon stays flat. The default outfit (the first one) uses the character\'s own <code class="text-ice">portrait</code>, so it is the same face already shown in the honeycomb. Clicking a hexagon swaps both the render on the left (<code>image</code>) and the header background (<code>scene</code>), so it is worth filling all three fields on every variant.',

    'contribute.fields': '4. Fields',
    'contribute.fieldsHeader': ['Field', 'Required', 'What it is'],
    'contribute.example': '5. Example: new character',
    'contribute.exampleOutfit': '6. Example: outfit or variant',

    // Footer
    'footer.nonprofit': 'Fan project, non-profit.',
    'footer.disclaimer':
      'Dragon Ball and DRAGON BALL: Sparking! ZERO are trademarks of Bird Studio / Shueisha, Toei Animation, and Bandai Namco Entertainment. This site is not affiliated with or endorsed by them: it is a community-made wishlist.',
    'footer.opensource':
      'Code and data are open-source. Missing someone? Open a pull request with their profile.',

    // HexTile
    'hexTile.new': 'New',

    // FighterArt
    'fighterArt.renderOf': (name: string) => `Render of ${name}`,
    'fighterArt.pendingArt': (name: string) => `Art pending for ${name}`,

    // Stages
    'nav.stages': 'Stages',
    'stages.metaTitle': 'Missing stages in Sparking! ZERO — Community Wishlist',
    'stages.metaDesc': (count: number) => `Stage wishlist: ${count} Dragon Ball stages still not in Sparking! ZERO.`,
    'stages.heading': 'The Missing Stages',
    'stages.description': 'Iconic Dragon Ball stages that have not yet made it to <strong class="text-white">Sparking! ZERO</strong>. Sortable by saga and year.',
    'stages.empty': 'No stages match those filters.',
    'stages.hint': '',
    'stages.breadcrumb': 'Stages',
    'stages.back': '← Back to stages',
    'stages.detailTitle': (name: string) => `${name} — Sparking! ZERO stage wishlist`,
    'stages.detailDesc': (name: string, series: string, year: number, description: string) =>
      `${name} (${series}, ${year}): ${description}`,
    'stages.jsonLdName': 'Missing stages in DRAGON BALL: Sparking! ZERO',

    // OG
    'og.siteName': 'DBSZ Wishlist',

    // Index meta
    'meta.indexTitle':
      'Missing characters in Sparking! ZERO — Community Wishlist',
    'meta.indexDescription': (count: number) =>
      `Fan-made wishlist: ${count} Dragon Ball characters still not in Sparking! ZERO, with their saga, first appearance year, and missing outfits.`,
    'meta.jsonLdName': 'Missing characters in DRAGON BALL: Sparking! ZERO',
  },

  pt: {
    // Nav
    'nav.roster': 'Roster desejado',
    'nav.filters': 'Filtros',
    'nav.stages': 'Cenários',
    'nav.contribute': 'Contribuir',
    'nav.addFighter': 'Adicionar personagem',
    'nav.menu': 'Menu',

    // Language switcher
    'lang.label': 'Idioma',

    // Hero
    'hero.title': 'Os que faltam',
    'hero.description':
      'O elenco de <strong class="text-white">Sparking! ZERO</strong> é enorme, mas ainda deixa muitos personagens de Dragon Ball de fora. Esta é uma lista de desejos feita pela comunidade: personagens que gostaríamos de ver considerados para futuros DLC, ordenáveis por saga, ano de primeira aparição ou pela força do pedido dos fãs. Ao abrir uma ficha, você verá também os <strong class="text-white">trajes e variantes</strong> que faltam.',

    // Stats
    'stats.fighters': 'Personagens propostos',
    'stats.variants': 'Trajes e variantes',

    // Filter heading
    'filter.heading': 'Todos os candidatos',

    // Filter bar
    'filter.search': 'Buscar',
    'filter.searchPlaceholder': 'Nome ou saga…',
    'filter.series': 'Série',
    'filter.allSeries': 'Todas',
    'filter.role': 'Papel',
    'filter.anyRole': 'Qualquer',
    'filter.sort': 'Ordenar por',
    'filter.sortYearAsc': 'Primeira aparição (antigos)',
    'filter.sortYearDesc': 'Primeira aparição (recentes)',
    'filter.sortSeries': 'Série',
    'filter.sortNameAsc': 'Nome (A-Z)',
    'filter.saga': 'Saga',
    'filter.allSagas': 'Todas as sagas',
    'filter.status': 'Estado',
    'filter.allStatuses': 'Todos',
    'filter.clear': 'Limpar',
    'filter.toggle': 'Filtros',
    'filter.showNames': 'Mostrar nomes',
    'filter.hideNames': 'Ocultar nomes',
    'filter.countOf': ({ total }: { total: number }) =>
      ` de ${total} personagens na lista de desejos.`,

    'filter.typeCharacters': 'Personagens',
    'filter.typeOutfits': 'Trajes',
    'outfitTile.from': (parent: string) => `de ${parent}`,
    'hive.outfitCount': ({ shown, total }: { shown: number; total: number }) =>
      `${shown} de ${total} trajes pendentes.`,

    // Hive
    'hive.empty':
      'Nenhum personagem corresponde a esses filtros. Tente limpá-los… ou proponha você mesmo.',


    // Modal
    'modal.close': 'Fechar ficha',
    'modal.prev': 'Personagem anterior',
    'modal.next': 'Próximo personagem',
    'modal.browse': 'Explorar personagens',

    // Fighter panel
    'panel.series': 'Série',
    'panel.saga': 'Saga',
    'panel.firstAppearance': 'Visto pela primeira vez',
    'panel.work': 'Obra',
    'panel.role': 'Papel',
    'panel.outfits': 'Trajes',
    'panel.defaultLook': 'Forma base',
    'panel.noVariants':
      'Ninguém propôs variantes ainda. Conhece alguma? Adicione via pull request.',

    // Detail page
    'detail.titleTemplate': (name: string) => `${name} no Sparking! ZERO — ficha da wishlist`,
    'detail.descriptionTemplate': (name: string, series: string, year: number, description: string) =>
      `${name} (${series}, ${year}): ${description}`,
    'detail.jsonLdHeadline': (name: string) => `${name}, candidato a DLC do Sparking! ZERO`,
    'detail.jsonLdCollection': 'Personagens que faltam no Sparking! ZERO',
    'detail.breadcrumb': 'Wishlist',
    'detail.back': '← Voltar ao painel',
    'detail.edit': 'Corrigir esta ficha',

    // Contribute page
    'contribute.title':
      'Como adicionar um personagem à wishlist',
    'contribute.description':
      'Guia para propor personagens de Dragon Ball que faltam no Sparking! ZERO: crie um JSON em src/content/fighters e abra um pull request.',
    'contribute.heading': 'Adicione seu personagem',
    'contribute.intro':
      'Cada personagem é um arquivo JSON independente dentro de <code class="rounded bg-white/10 px-1.5 py-0.5 text-ice">src/content/fighters/</code>. Assim dois pull requests nunca colidem e o site se regenera sozinho. Se o JSON não passar no esquema, o build falha e você verá no próprio PR antes que alguém revise.',

    'contribute.steps': '1. Os passos',
    'contribute.step1':
      'Faça fork do repositório e crie uma branch, por exemplo <code class="text-ice">add/pikkon</code>.',
    'contribute.step2':
      'Crie <code class="text-ice">src/content/fighters/&lt;slug&gt;.json</code> — o nome do arquivo, em minúsculas e com hífens, é a URL do personagem.',
    'contribute.step3':
      'Se tiver arte própria, coloque em <code class="text-ice">public/fighters/</code> em formato WebP. Senão, não coloque nada: a página desenha um placeholder com a cor do personagem.',
    'contribute.step4':
      'Execute <code class="text-ice">npm run build</code> para validar o esquema.',
    'contribute.step5':
      'Abra o pull request descrevendo de onde vêm os dados.',

    'contribute.rules': '2. Regras da casa',
    'contribute.rule1':
      'Apenas personagens que <strong class="text-white">ainda não estão</strong> no jogo.',
    'contribute.rule2':
      'Se um personagem virar DLC, não apague: mude o <code class="text-ice">status</code> para "Ya es DLC".',
    'contribute.sectionTitle': '3. Personagens ou Trajes',
    'contribute.sectionDesc':
      'O campo <code class="text-ice">section</code> define em qual grupo visual a entrada aparece: <code>fighters</code> (Personagens, em cima) ou <code>outfits</code> (Trajes, embaixo). Se um personagem já está no jogo e só faltam suas skins, use <code class="text-ice">"section": "outfits"</code>. O componente hexágono é exatamente o mesmo — só muda em qual painel ele se desenha.',

    'contribute.variantsTitle': 'Imagens de cada variante',
    'contribute.variantsDesc':
      'O seletor de trajes desenha um hexágono por variante, e cada um leva sua própria foto — igual à colmeia da home. A imagem vem de <code class="text-ice">variants[].portrait</code>; se você não colocar, ela cai em <code class="text-ice">variants[].image</code>, e sem nenhuma das duas o hexágono fica liso. O traje padrão (o primeiro) usa o <code class="text-ice">portrait</code> do personagem, então é o mesmo rosto que já aparece na colmeia. Ao clicar em um hexágono mudam ao mesmo tempo o render da esquerda (<code>image</code>) e o fundo do cabeçalho (<code>scene</code>), por isso vale preencher os três campos de cada variante.',

    'contribute.fields': '4. Os campos',
    'contribute.fieldsHeader': ['Campo', 'Obrigatório', 'O que é'],
    'contribute.example': '5. Exemplo: personagem novo',
    'contribute.exampleOutfit': '6. Exemplo: traje ou variante',

    // Footer
    'footer.nonprofit': 'Projeto de fãs, sem fins lucrativos.',
    'footer.disclaimer':
      'Dragon Ball e DRAGON BALL: Sparking! ZERO são marcas da Bird Studio / Shueisha, Toei Animation e Bandai Namco Entertainment. Esta página não é afiliada nem endossada por eles: é uma lista de desejos feita pela comunidade.',
    'footer.opensource':
      'O código e os dados são abertos. Está faltando alguém? Abra um pull request com a ficha.',

    // HexTile
    'hexTile.new': 'Novo',

    // FighterArt
    'fighterArt.renderOf': (name: string) => `Render de ${name}`,
    'fighterArt.pendingArt': (name: string) => `Arte pendente de ${name}`,

    // Stages
    'nav.stages': 'Cenários',
    'stages.metaTitle': 'Cenários que faltam no Sparking! ZERO — Wishlist da comunidade',
    'stages.metaDesc': (count: number) => `Lista de desejo de cenários: ${count} cenários de Dragon Ball que ainda não estão no Sparking! ZERO.`,
    'stages.heading': 'Os cenários que faltam',
    'stages.description': 'Cenários icônicos de Dragon Ball que ainda não chegaram ao <strong class="text-white">Sparking! ZERO</strong>. Ordenáveis por saga e ano.',
    'stages.empty': 'Nenhum cenário corresponde aos filtros.',
    'stages.hint': '',
    'stages.breadcrumb': 'Cenários',
    'stages.back': '← Voltar aos cenários',
    'stages.detailTitle': (name: string) => `${name} — Cenário da wishlist do Sparking! ZERO`,
    'stages.detailDesc': (name: string, series: string, year: number, description: string) =>
      `${name} (${series}, ${year}): ${description}`,
    'stages.jsonLdName': 'Cenários que faltam no DRAGON BALL: Sparking! ZERO',

    // OG
    'og.siteName': 'DBSZ Wishlist',

    // Index meta
    'meta.indexTitle':
      'Personagens que faltam no Sparking! ZERO — Wishlist da comunidade',
    'meta.indexDescription': (count: number) =>
      `Lista de desejos feita por fãs: ${count} personagens de Dragon Ball que ainda não estão no Sparking! ZERO, com sua saga, ano de estreia e os trajes que também faltam.`,
    'meta.jsonLdName': 'Personagens que faltam no DRAGON BALL: Sparking! ZERO',
  },

  ja: {
    // Nav
    'nav.roster': '希望キャラクター',
    'nav.filters': 'フィルター',
    'nav.stages': 'ステージ',
    'nav.contribute': '貢献する',
    'nav.addFighter': '追加',
    'nav.menu': 'メニュー',

    // Language switcher
    'lang.label': '言語',

    // Hero
    'hero.title': 'まだいないキャラ',
    'hero.description':
      '<strong class="text-white">Sparking! ZERO</strong>のロースターは巨大ですが、それでもドラゴンボールの多くのキャラクターが登場していません。これはコミュニティが作った希望リストです：今後のDLCとして検討してほしいキャラクターを、編や初登場年、ファンの期待度で並べ替えられます。プロフィールを開くと、不足している<strong class="text-white">衣装やバリエーション</strong>も確認できます。',

    // Stats
    'stats.fighters': '提案されたキャラクター',
    'stats.variants': '衣装とバリエーション',

    // Filter heading
    'filter.heading': '全候補',

    // Filter bar
    'filter.search': '検索',
    'filter.searchPlaceholder': '名前または編…',
    'filter.series': 'シリーズ',
    'filter.allSeries': 'すべて',
    'filter.role': '役割',
    'filter.anyRole': 'すべて',
    'filter.sort': '並べ替え',
    'filter.sortYearAsc': '初登場（古い順）',
    'filter.sortYearDesc': '初登場（新しい順）',
    'filter.sortSeries': 'シリーズ',
    'filter.sortNameAsc': '名前（A-Z）',
    'filter.saga': '編',
    'filter.allSagas': 'すべての編',
    'filter.status': '状態',
    'filter.allStatuses': 'すべて',
    'filter.clear': 'クリア',
    'filter.toggle': 'フィルター',
    'filter.showNames': '名前を表示',
    'filter.hideNames': '名前を隠す',
    'filter.countOf': ({ total }: { total: number }) =>
      `願い事リストの${total}キャラクター中`,

    'filter.typeCharacters': 'キャラクター',
    'filter.typeOutfits': '衣装',
    'outfitTile.from': (parent: string) => `${parent}の`,
    'hive.outfitCount': ({ shown, total }: { shown: number; total: number }) =>
      `${total}件中${shown}件の未入手衣装。`,

    // Hive
    'hive.empty':
      'フィルターに一致するキャラクターはありません。フィルターをクリアするか、自分で提案してみてください。',

    // Modal
    'modal.close': '閉じる',
    'modal.prev': '前のキャラクター',
    'modal.next': '次のキャラクター',
    'modal.browse': 'キャラクターを見る',

    // Fighter panel
    'panel.series': 'シリーズ',
    'panel.saga': '編',
    'panel.firstAppearance': '初登場',
    'panel.work': '作品',
    'panel.role': '役割',
    'panel.outfits': '衣装',
    'panel.defaultLook': '基本形態',
    'panel.noVariants':
      'まだ誰もバリエーションを提案していません。ご存知ですか？プルリクエストで追加してください。',

    // Detail page
    'detail.titleTemplate': (name: string) => `${name} — Sparking! ZERO 希望リスト`,
    'detail.descriptionTemplate': (name: string, series: string, year: number, description: string) =>
      `${name}（${series}、${year}年）：${description}`,
    'detail.jsonLdHeadline': (name: string) => `${name} — Sparking! ZERO DLC候補`,
    'detail.jsonLdCollection': 'Sparking! ZEROにいないキャラクター',
    'detail.breadcrumb': '希望リスト',
    'detail.back': '← 一覧に戻る',
    'detail.edit': 'このエントリーを編集',

    // Contribute page
    'contribute.title':
      '希望リストにキャラクターを追加する方法',
    'contribute.description':
      'Sparking! ZEROに不足しているドラゴンボールのキャラクターを提案するガイド：src/content/fightersにJSONを作成し、プルリクエストを開きます。',
    'contribute.heading': 'キャラクターを追加',
    'contribute.intro':
      '各キャラクターは<code class="rounded bg-white/10 px-1.5 py-0.5 text-ice">src/content/fighters/</code>内の独立したJSONファイルです。これにより、2つのプルリクエストが衝突することはなく、サイトは自動的に再生成されます。JSONがスキーマを通過しない場合、ビルドは失敗し、誰かがレビューする前にPRで確認できます。',

    'contribute.steps': '1. 手順',
    'contribute.step1':
      'リポジトリをフォークし、ブランチを作成します（例：<code class="text-ice">add/pikkon</code>）。',
    'contribute.step2':
      '<code class="text-ice">src/content/fighters/&lt;slug&gt;.json</code>を作成します — 小文字とハイフンを使用したファイル名がキャラクターのURLになります。',
    'contribute.step3':
      '独自のアートワークがある場合は、WebP形式で<code class="text-ice">public/fighters/</code>に配置します。ない場合は空白のままにしてください：キャラクターのアクセントカラーのプレースホルダーが表示されます。',
    'contribute.step4':
      '<code class="text-ice">npm run build</code>を実行してスキーマを検証します。',
    'contribute.step5':
      'データの出典を説明してプルリクエストを開きます。',

    'contribute.rules': '2. ルール',
    'contribute.rule1':
      'ゲームに<strong class="text-white">まだいない</strong>キャラクターのみ。',
    'contribute.rule2':
      'キャラクターがDLCになった場合、削除せずに<code class="text-ice">status</code>を「Ya es DLC」に変更してください。',
    'contribute.sectionTitle': '3. キャラクターか衣装か',
    'contribute.sectionDesc':
      '<code class="text-ice">section</code>フィールドは、エントリーが表示されるビジュアルグループを定義します：<code>fighters</code>（キャラクター、上部）または<code>outfits</code>（衣装、下部）。キャラクターが既にゲームにいてスキンのみが不足している場合は、<code class="text-ice">"section": "outfits"</code>を使用します。六角形コンポーネントはまったく同じで、描画されるパネルのみが変わります。',

    'contribute.variantsTitle': '各バリエーションの画像',
    'contribute.variantsDesc':
      '衣装ピッカーはバリエーションごとに1つの六角形を描画し、それぞれに独自の写真が付いています — ホームのハニカムと同じです。画像は<code class="text-ice">variants[].portrait</code>から取得され、省略された場合は<code class="text-ice">variants[].image</code>にフォールバックし、どちらもない場合は六角形はフラットのままです。デフォルトの衣装（最初のもの）はキャラクター自身の<code class="text-ice">portrait</code>を使用するため、ハニカムに既に表示されているものと同じ顔になります。六角形をクリックすると、左側のレンダー（<code>image</code>）とヘッダーの背景（<code>scene</code>）の両方が同時に切り替わるため、各バリエーションの3つのフィールドすべてを埋める価値があります。',

    'contribute.fields': '4. フィールド',
    'contribute.fieldsHeader': ['フィールド', '必須', '説明'],
    'contribute.example': '5. 例：新しいキャラクター',
    'contribute.exampleOutfit': '6. 例：衣装またはバリエーション',

    // Footer
    'footer.nonprofit': 'ファンプロジェクト、非営利。',
    'footer.disclaimer':
      'ドラゴンボールおよびDRAGON BALL: Sparking! ZEROは、Bird Studio / 集英社、東映アニメーション、およびバンダイナムコエンターテインメントの商標です。このサイトはそれらと提携しておらず、承認もされていません：コミュニティによって作成された希望リストです。',
    'footer.opensource':
      'コードとデータはオープンソースです。誰か不足していますか？プルリクエストでプロフィールを開いてください。',

    // HexTile
    'hexTile.new': '新',

    // FighterArt
    'fighterArt.renderOf': (name: string) => `${name}のレンダー`,
    'fighterArt.pendingArt': (name: string) => `${name}のアート未定`,

    // Stages
    'nav.stages': 'ステージ',
    'stages.metaTitle': 'Sparking! ZEROにないステージ — コミュニティ希望リスト',
    'stages.metaDesc': (count: number) => `ステージ希望リスト：まだSparking! ZEROにないドラゴンボールのステージ${count}件。`,
    'stages.heading': 'まだないステージ',
    'stages.description': 'まだ<strong class="text-white">Sparking! ZERO</strong>に登場していないドラゴンボールの象徴的なステージ。編と年で並べ替え可能。',
    'stages.empty': 'フィルターに一致するステージはありません。',
    'stages.hint': '',
    'stages.breadcrumb': 'ステージ',
    'stages.back': '← ステージ一覧に戻る',
    'stages.detailTitle': (name: string) => `${name} — Sparking! ZERO ステージ希望リスト`,
    'stages.detailDesc': (name: string, series: string, year: number, description: string) =>
      `${name}（${series}、${year}年）：${description}`,
    'stages.jsonLdName': 'DRAGON BALL: Sparking! ZEROにないステージ',

    // OG
    'og.siteName': 'DBSZ 希望リスト',

    // Index meta
    'meta.indexTitle':
      'Sparking! ZEROにないキャラクター — コミュニティ希望リスト',
    'meta.indexDescription': (count: number) =>
      `ファン作成の希望リスト：まだSparking! ZEROにいないドラゴンボールのキャラクター${count}体、編や初登場年、不足している衣装付き。`,
    'meta.jsonLdName': 'DRAGON BALL: Sparking! ZEROにないキャラクター',
  },
} as const;

/** Display labels for fighter enum values (series, roles, statuses). */
export const enumLabels: Record<Lang, Record<string, string>> = {
  es: {
    // SERIES
    'Dragon Ball': 'Dragon Ball',
    'Dragon Ball Z': 'Dragon Ball Z',
    'Dragon Ball GT': 'Dragon Ball GT',
    'Dragon Ball Super': 'Dragon Ball Super',
    'Películas': 'Películas',
    'Especiales de TV': 'Especiales de TV',
    'Spin-off': 'Spin-off',
    // ROLES
    'Protagonista': 'Protagonista',
    'Antagonista': 'Antagonista',
    'Secundario': 'Secundario',
    'Apoyo': 'Apoyo',
    'Relleno': 'Relleno',
    'Cameo': 'Cameo',
    // STATUS
    'Wishlist': 'Wishlist',
    'Anunciado': 'Anunciado',
    'Ya es DLC': 'Ya es DLC',
    // MEDIA
    'Manga': 'Manga',
    'Anime': 'Anime',
    'Película': 'Película',
    'Videojuego': 'Videojuego',
    // Fields for contribute page
    'name': 'Nombre en español tal y como se conoce en la comunidad.',
    'nameJa': 'Nombre original en japonés.',
    'series': 'Uno de: Dragon Ball · Dragon Ball Z · Dragon Ball GT · Dragon Ball Super · Películas · Especiales de TV · Spin-off',
    'saga': 'Arco o saga donde aparece por primera vez.',
    'firstAppearance.year': 'Año de la primera aparición (1984-2030).',
    'firstAppearance.work': 'Obra concreta: capítulo, episodio o película.',
    'firstAppearance.medium': 'Uno de: Manga · Anime · Película · Videojuego',
    'role': 'Uno de: Protagonista · Antagonista · Secundario · Apoyo · Relleno · Cameo',
    'status': 'Uno de: Wishlist · Anunciado · Ya es DLC. Por defecto "Wishlist".',
    'section': 'Uno de: fighters · outfits. "fighters" = panel de Personajes, "outfits" = panel de Trajes (para skins/formas de un personaje que ya está en el juego). Por defecto "fighters".',
    'accent': 'Color hex de 6 dígitos que tiñe su ficha. Ej: #22c55e',
    'description': 'Quién es, en una o dos frases (mínimo 20 caracteres).',
    'variants': 'Trajes o formas que también faltan. Cada una lleva su propia imagen.',
    'variants[].name': 'Nombre de la variante, ej: "Forma Majin".',
    'variants[].source': 'De dónde sale la variante: película, saga, videojuego, etc.',
    'variants[].description': 'Qué la distingue del personaje base, en 1-2 frases.',
    'variants[].image': 'Render de cuerpo entero de la variante, con fondo transparente.',
    'variants[].portrait': 'Cara de la variante para su hexágono en el selector. Si falta, usa image.',
    'variants[].scene': 'Fondo de la cabecera cuando esa variante está seleccionada.',
    'variants[].accent': 'Color hex de 6 dígitos propio de la variante. Ej: #db2777',
    'render': 'Ruta en /public/fighters. Si falta se dibuja un placeholder.',
    'portrait': 'Cara del personaje: sale en el panal del home y en su hexágono de traje.',
    'scene': 'Imagen de fondo para el lado derecho de la ficha.',
    'tags': 'Etiquetas libres en minúscula.',
    // Required yes/no
    'sí': 'sí',
    'no': 'no',
  },
  en: {
    'Dragon Ball': 'Dragon Ball',
    'Dragon Ball Z': 'Dragon Ball Z',
    'Dragon Ball GT': 'Dragon Ball GT',
    'Dragon Ball Super': 'Dragon Ball Super',
    'Películas': 'Movies',
    'Especiales de TV': 'TV Specials',
    'Spin-off': 'Spin-off',
    'Protagonista': 'Protagonist',
    'Antagonista': 'Antagonist',
    'Secundario': 'Supporting',
    'Apoyo': 'Side character',
    'Relleno': 'Filler',
    'Cameo': 'Cameo',
    'Wishlist': 'Wishlist',
    'Anunciado': 'Announced',
    'Ya es DLC': 'Already DLC',
    'Manga': 'Manga',
    'Anime': 'Anime',
    'Película': 'Movie',
    'Videojuego': 'Video game',
    'name': 'Spanish name as the community knows it.',
    'nameJa': 'Original Japanese name.',
    'series': 'One of: Dragon Ball · Dragon Ball Z · Dragon Ball GT · Dragon Ball Super · Movies · TV Specials · Spin-off',
    'saga': 'Arc or saga where they first appear.',
    'firstAppearance.year': 'Year of first appearance (1984-2030).',
    'firstAppearance.work': 'Specific work: chapter, episode, or movie.',
    'firstAppearance.medium': 'One of: Manga · Anime · Movie · Video game',
    'role': 'One of: Protagonist · Antagonist · Supporting · Side character · Filler · Cameo',
    'status': 'One of: Wishlist · Announced · Already DLC. Defaults to "Wishlist".',
    'section': 'One of: fighters · outfits. "fighters" = Characters panel, "outfits" = Outfits panel (for skins/forms of a character already in the game). Defaults to "fighters".',
    'accent': '6-digit hex color that tints their profile. E.g. #22c55e',
    'description': 'Who they are, in one or two sentences (min 20 characters).',
    'variants': 'Outfits or forms that are also missing. Each one carries its own image.',
    'variants[].name': 'Variant name, e.g. "Majin Form".',
    'variants[].source': 'Where the variant comes from: movie, saga, video game, etc.',
    'variants[].description': 'What sets it apart from the base character, in 1-2 sentences.',
    'variants[].image': 'Full-body render of the variant, with a transparent background.',
    'variants[].portrait': 'Variant face for its hexagon in the picker. Falls back to image.',
    'variants[].scene': 'Header background shown while that variant is selected.',
    'variants[].accent': '6-digit hex color specific to the variant. E.g. #db2777',
    'render': 'Path under /public/fighters. If missing, a placeholder is drawn.',
    'portrait': 'Character face: used in the home honeycomb and in its outfit hexagon.',
    'scene': 'Background image for the right side of the profile.',
    'tags': 'Free lowercase tags.',
    'sí': 'yes',
    'no': 'no',
  },
  pt: {
    'Dragon Ball': 'Dragon Ball',
    'Dragon Ball Z': 'Dragon Ball Z',
    'Dragon Ball GT': 'Dragon Ball GT',
    'Dragon Ball Super': 'Dragon Ball Super',
    'Películas': 'Filmes',
    'Especiales de TV': 'Especiais de TV',
    'Spin-off': 'Spin-off',
    'Protagonista': 'Protagonista',
    'Antagonista': 'Antagonista',
    'Secundario': 'Secundário',
    'Apoyo': 'Apoio',
    'Relleno': 'Filler',
    'Cameo': 'Cameo',
    'Wishlist': 'Wishlist',
    'Anunciado': 'Anunciado',
    'Ya es DLC': 'Já é DLC',
    'Manga': 'Mangá',
    'Anime': 'Anime',
    'Película': 'Filme',
    'Videojuego': 'Video game',
    'name': 'Nome em espanhol como conhecido na comunidade.',
    'nameJa': 'Nome original em japonês.',
    'series': 'Um de: Dragon Ball · Dragon Ball Z · Dragon Ball GT · Dragon Ball Super · Filmes · Especiais de TV · Spin-off',
    'saga': 'Arco ou saga onde aparece pela primeira vez.',
    'firstAppearance.year': 'Ano da primeira aparição (1984-2030).',
    'firstAppearance.work': 'Obra concreta: capítulo, episódio ou filme.',
    'firstAppearance.medium': 'Um de: Mangá · Anime · Filme · Video game',
    'role': 'Um de: Protagonista · Antagonista · Secundário · Apoio · Filler · Cameo',
    'status': 'Um de: Wishlist · Anunciado · Já é DLC. Padrão "Wishlist".',
    'section': 'Um de: fighters · outfits. "fighters" = painel de Personagens, "outfits" = painel de Trajes (para skins/formas de um personagem que já está no jogo). Padrão "fighters".',
    'accent': 'Cor hex de 6 dígitos que colore a ficha. Ex: #22c55e',
    'description': 'Quem é, em uma ou duas frases (mínimo 20 caracteres).',
    'variants': 'Trajes ou formas que também faltam. Cada uma leva sua própria imagem.',
    'variants[].name': 'Nome da variante, ex: "Forma Majin".',
    'variants[].source': 'De onde vem a variante: filme, saga, video game, etc.',
    'variants[].description': 'O que a diferencia do personagem base, em 1-2 frases.',
    'variants[].image': 'Render de corpo inteiro da variante, com fundo transparente.',
    'variants[].portrait': 'Rosto da variante para o hexágono do seletor. Se faltar, usa image.',
    'variants[].scene': 'Fundo do cabeçalho quando essa variante está selecionada.',
    'variants[].accent': 'Cor hex de 6 dígitos própria da variante. Ex: #db2777',
    'render': 'Caminho em /public/fighters. Se faltar, desenha um placeholder.',
    'portrait': 'Rosto do personagem: aparece na colmeia da home e no hexágono do traje.',
    'scene': 'Imagem de fundo para o lado direito da ficha.',
    'tags': 'Tags livres em minúsculas.',
    'sí': 'sim',
    'no': 'não',
  },
  ja: {
    'Dragon Ball': 'ドラゴンボール',
    'Dragon Ball Z': 'ドラゴンボールZ',
    'Dragon Ball GT': 'ドラゴンボールGT',
    'Dragon Ball Super': 'ドラゴンボール超',
    'Películas': '映画',
    'Especiales de TV': 'TVスペシャル',
    'Spin-off': 'スピンオフ',
    'Protagonista': '主人公',
    'Antagonista': '敵役',
    'Secundario': '準主要',
    'Apoyo': '脇役',
    'Relleno': 'フィラー',
    'Cameo': 'カメオ',
    'Wishlist': '希望',
    'Anunciado': '発表済み',
    'Ya es DLC': 'DLC化済み',
    'Manga': '漫画',
    'Anime': 'アニメ',
    'Película': '映画',
    'Videojuego': 'ゲーム',
    'name': 'コミュニティで知られているスペイン語名。',
    'nameJa': '日本語の正式名称。',
    'series': 'いずれか：ドラゴンボール · ドラゴンボールZ · ドラゴンボールGT · ドラゴンボール超 · 映画 · TVスペシャル · スピンオフ',
    'saga': '初登場する編またはアーク。',
    'firstAppearance.year': '初登場年（1984-2030）。',
    'firstAppearance.work': '具体的な作品：巻、話、または映画。',
    'firstAppearance.medium': 'いずれか：漫画 · アニメ · 映画 · ゲーム',
    'role': 'いずれか：主人公 · 敵役 · 準主要 · 脇役 · フィラー · カメオ',
    'status': 'いずれか：希望 · 発表済み · DLC化済み。デフォルトは「希望」。',
    'section': 'いずれか：fighters · outfits。「fighters」= キャラクターパネル、「outfits」= 衣装パネル（既にゲームにいるキャラクターのスキン/形態用）。デフォルトは「fighters」。',
    'accent': 'プロフィールを彩る6桁の16進数カラー。例：#22c55e',
    'description': '1〜2文での説明（最低20文字）。',
    'variants': '不足している衣装や形態。それぞれに独自の画像があります。',
    'variants[].name': 'バリエーション名。例：「魔人形態」',
    'variants[].source': 'バリエーションの出典：映画、編、ゲームなど。',
    'variants[].description': 'ベースキャラクターとの違いを1〜2文で。',
    'variants[].image': '背景透過のバリエーション全身レンダー。',
    'variants[].portrait': 'ピッカー内の六角形用のバリエーションの顔。ない場合はimageを使用。',
    'variants[].scene': 'そのバリエーション選択時に表示されるヘッダー背景。',
    'variants[].accent': 'バリエーション専用の6桁の16進数カラー。例：#db2777',
    'render': '/public/fighters以下のパス。ない場合はプレースホルダーが表示されます。',
    'portrait': 'キャラクターの顔：ホームのハニカムと衣装の六角形に表示されます。',
    'scene': 'プロフィール右側の背景画像。',
    'tags': '小文字の自由タグ。',
    'sí': 'はい',
    'no': 'いいえ',
  },
};
