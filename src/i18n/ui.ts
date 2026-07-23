export const languages = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
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

    // Language switcher
    'lang.label': 'Idioma',

    // Hero
    'hero.title': 'Los que faltan',
    'hero.description':
      'El roster de <strong class="text-white">Sparking! ZERO</strong> es enorme, pero todavía deja fuera a medio Dragon Ball. Esta es la lista de deseos de la comunidad: personajes que nos gustaría ver como DLC, ordenables por saga, por año en que los vimos por primera vez o por lo secundarios que son. Al abrir una ficha verás también los <strong class="text-white">trajes y variantes</strong> que faltan.',

    // Stats
    'stats.fighters': 'Personajes propuestos',
    'stats.variants': 'Trajes y variantes',
    'stats.sagas': 'Sagas cubiertas',
    'stats.sinceYear': 'Desde el año',

    // Filter heading
    'filter.heading': 'Todos los candidatos',

    // Filter bar
    'filter.search': 'Buscar',
    'filter.searchPlaceholder': 'Nombre o saga…',
    'filter.series': 'Serie',
    'filter.allSeries': 'Todas',
    'filter.role': 'Rol',
    'filter.anyRole': 'Cualquiera',
    'filter.minImportance': 'Importancia mínima',
    'filter.anyImportance': 'Cualquiera',
    'filter.importance2': '2+ · con papel propio',
    'filter.importance3': '3+ · relevantes',
    'filter.importance4': '4+ · clave en su saga',
    'filter.importance5': '5 · capitales',
    'filter.sort': 'Ordenar por',
    'filter.sortImportanceDesc': 'Más importantes primero',
    'filter.sortImportanceAsc': 'Más secundarios primero',
    'filter.sortHypeDesc': 'Más pedidos por los fans',
    'filter.sortYearAsc': 'Primera aparición (antiguos)',
    'filter.sortYearDesc': 'Primera aparición (recientes)',
    'filter.sortSeries': 'Serie',
    'filter.sortNameAsc': 'Nombre (A-Z)',
    'filter.saga': 'Saga',
    'filter.allSagas': 'Todas las sagas',
    'filter.status': 'Estado',
    'filter.allStatuses': 'Todos',
    'filter.clear': 'Limpiar',
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

    // Fighter panel
    'panel.series': 'Serie',
    'panel.saga': 'Saga',
    'panel.firstAppearance': 'Primera vez visto',
    'panel.work': 'Obra',
    'panel.role': 'Rol',
    'panel.whyWanted': 'Por qué lo queremos',
    'panel.techniques': 'Técnicas',
    'panel.importance': 'Importancia',
    'panel.fanHype': 'Petición de los fans',
    'panel.outfits': 'Trajes y variantes que faltan',
    'panel.defaultLook': 'Look por defecto',
    'panel.noVariants':
      'Nadie ha propuesto variantes todavía. ¿Te sabes alguna? Añádela por pull request.',

    // Detail page
    'detail.titleTemplate': (name: string) => `${name} en Sparking! ZERO — ficha de la wishlist`,
    'detail.descriptionTemplate': (name: string, series: string, year: number, whyWanted: string) =>
      `${name} (${series}, ${year}): ${whyWanted}`,
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
    'contribute.rule3':
      'Nada de arte robado. Sube solo trabajo propio o con licencia que lo permita.',
    'contribute.rule4':
      '<code class="text-ice">importance</code> mide su peso en la historia; <code class="text-ice">hype</code> mide cuánto lo pide la gente. No son lo mismo y no pasa nada por que no coincidan.',

    'contribute.fields': '3. Los campos',
    'contribute.fieldsHeader': ['Campo', 'Obligatorio', 'Qué es'],
    'contribute.example': '4. Ejemplo completo',

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
    'stages.hint': 'Pulsa cualquier tarjeta para ver su ficha.',
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
      `Lista de deseos hecha por fans: ${count} personajes de Dragon Ball que aún no están en Sparking! ZERO, con su saga, año de primera aparición, nivel de importancia y los trajes que también faltan.`,
    'meta.jsonLdName': 'Personajes que faltan en DRAGON BALL: Sparking! ZERO',
  },

  en: {
    // Nav
    'nav.roster': 'Wanted Roster',
    'nav.filters': 'Filters',
    'nav.stages': 'Stages',
    'nav.contribute': 'Contribute',
    'nav.addFighter': 'Add fighter',

    // Language switcher
    'lang.label': 'Language',

    // Hero
    'hero.title': 'The Missing Ones',
    'hero.description':
      'The <strong class="text-white">Sparking! ZERO</strong> roster is huge, but it still leaves out half of Dragon Ball. This is the community wishlist: characters we\'d love to see as DLC, sortable by saga, by the year we first saw them, or by how minor they are. Open a profile to also see the <strong class="text-white">outfits and variants</strong> that are missing.',

    // Stats
    'stats.fighters': 'Proposed fighters',
    'stats.variants': 'Outfits & variants',
    'stats.sagas': 'Sagas covered',
    'stats.sinceYear': 'Since year',

    // Filter heading
    'filter.heading': 'All Candidates',

    // Filter bar
    'filter.search': 'Search',
    'filter.searchPlaceholder': 'Name or saga…',
    'filter.series': 'Series',
    'filter.allSeries': 'All',
    'filter.role': 'Role',
    'filter.anyRole': 'Any',
    'filter.minImportance': 'Min importance',
    'filter.anyImportance': 'Any',
    'filter.importance2': '2+ · has own role',
    'filter.importance3': '3+ · relevant',
    'filter.importance4': '4+ · key in saga',
    'filter.importance5': '5 · essential',
    'filter.sort': 'Sort by',
    'filter.sortImportanceDesc': 'Most important first',
    'filter.sortImportanceAsc': 'Most minor first',
    'filter.sortHypeDesc': 'Most requested by fans',
    'filter.sortYearAsc': 'First appearance (oldest)',
    'filter.sortYearDesc': 'First appearance (newest)',
    'filter.sortSeries': 'Series',
    'filter.sortNameAsc': 'Name (A-Z)',
    'filter.saga': 'Saga',
    'filter.allSagas': 'All sagas',
    'filter.status': 'Status',
    'filter.allStatuses': 'All',
    'filter.clear': 'Clear',
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

    // Fighter panel
    'panel.series': 'Series',
    'panel.saga': 'Saga',
    'panel.firstAppearance': 'First seen',
    'panel.work': 'Work',
    'panel.role': 'Role',
    'panel.whyWanted': 'Why we want them',
    'panel.techniques': 'Techniques',
    'panel.importance': 'Importance',
    'panel.fanHype': 'Fan demand',
    'panel.outfits': 'Missing outfits & variants',
    'panel.defaultLook': 'Default look',
    'panel.noVariants':
      'No one has proposed variants yet. Know any? Add them via pull request.',

    // Detail page
    'detail.titleTemplate': (name: string) => `${name} in Sparking! ZERO — wishlist profile`,
    'detail.descriptionTemplate': (name: string, series: string, year: number, whyWanted: string) =>
      `${name} (${series}, ${year}): ${whyWanted}`,
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
    'contribute.rule3':
      'No stolen art. Only upload your own work or properly licensed material.',
    'contribute.rule4':
      '<code class="text-ice">importance</code> measures story weight; <code class="text-ice">hype</code> measures fan demand. They aren\'t the same, and it\'s fine if they don\'t match.',

    'contribute.fields': '3. Fields',
    'contribute.fieldsHeader': ['Field', 'Required', 'What it is'],
    'contribute.example': '4. Full example',

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
    'stages.hint': 'Tap any card to view the full details.',
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
      `Fan-made wishlist: ${count} Dragon Ball characters still not in Sparking! ZERO, with their saga, first appearance year, importance level, and missing outfits.`,
    'meta.jsonLdName': 'Missing characters in DRAGON BALL: Sparking! ZERO',
  },

  pt: {
    // Nav
    'nav.roster': 'Roster desejado',
    'nav.filters': 'Filtros',
    'nav.stages': 'Cenários',
    'nav.contribute': 'Contribuir',
    'nav.addFighter': 'Adicionar personagem',

    // Language switcher
    'lang.label': 'Idioma',

    // Hero
    'hero.title': 'Os que faltam',
    'hero.description':
      'O elenco de <strong class="text-white">Sparking! ZERO</strong> é enorme, mas ainda deixa metade de Dragon Ball de fora. Esta é a lista de desejos da comunidade: personagens que gostaríamos de ver como DLC, ordenáveis por saga, por ano de estreia ou por quão secundários são. Ao abrir uma ficha você verá também os <strong class="text-white">trajes e variantes</strong> que faltam.',

    // Stats
    'stats.fighters': 'Personagens propostos',
    'stats.variants': 'Trajes e variantes',
    'stats.sagas': 'Sagas cobertas',
    'stats.sinceYear': 'Desde o ano',

    // Filter heading
    'filter.heading': 'Todos os candidatos',

    // Filter bar
    'filter.search': 'Buscar',
    'filter.searchPlaceholder': 'Nome ou saga…',
    'filter.series': 'Série',
    'filter.allSeries': 'Todas',
    'filter.role': 'Papel',
    'filter.anyRole': 'Qualquer',
    'filter.minImportance': 'Importância mínima',
    'filter.anyImportance': 'Qualquer',
    'filter.importance2': '2+ · com papel próprio',
    'filter.importance3': '3+ · relevantes',
    'filter.importance4': '4+ · chave na saga',
    'filter.importance5': '5 · capitais',
    'filter.sort': 'Ordenar por',
    'filter.sortImportanceDesc': 'Mais importantes primeiro',
    'filter.sortImportanceAsc': 'Mais secundários primeiro',
    'filter.sortHypeDesc': 'Mais pedidos pelos fãs',
    'filter.sortYearAsc': 'Primeira aparição (antigos)',
    'filter.sortYearDesc': 'Primeira aparição (recentes)',
    'filter.sortSeries': 'Série',
    'filter.sortNameAsc': 'Nome (A-Z)',
    'filter.saga': 'Saga',
    'filter.allSagas': 'Todas as sagas',
    'filter.status': 'Estado',
    'filter.allStatuses': 'Todos',
    'filter.clear': 'Limpar',
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

    // Fighter panel
    'panel.series': 'Série',
    'panel.saga': 'Saga',
    'panel.firstAppearance': 'Visto pela primeira vez',
    'panel.work': 'Obra',
    'panel.role': 'Papel',
    'panel.whyWanted': 'Por que queremos',
    'panel.techniques': 'Técnicas',
    'panel.importance': 'Importância',
    'panel.fanHype': 'Pedido dos fãs',
    'panel.outfits': 'Trajes e variantes que faltam',
    'panel.defaultLook': 'Visual padrão',
    'panel.noVariants':
      'Ninguém propôs variantes ainda. Conhece alguma? Adicione via pull request.',

    // Detail page
    'detail.titleTemplate': (name: string) => `${name} no Sparking! ZERO — ficha da wishlist`,
    'detail.descriptionTemplate': (name: string, series: string, year: number, whyWanted: string) =>
      `${name} (${series}, ${year}): ${whyWanted}`,
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
    'contribute.rule3':
      'Nada de arte roubada. Envie apenas trabalho próprio ou com licença que permita.',
    'contribute.rule4':
      '<code class="text-ice">importance</code> mede o peso na história; <code class="text-ice">hype</code> mede o quanto o público pede. Não são a mesma coisa e não tem problema se não coincidirem.',

    'contribute.fields': '3. Os campos',
    'contribute.fieldsHeader': ['Campo', 'Obrigatório', 'O que é'],
    'contribute.example': '4. Exemplo completo',

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
    'stages.hint': 'Toque em qualquer card para ver os detalhes.',
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
      `Lista de desejos feita por fãs: ${count} personagens de Dragon Ball que ainda não estão no Sparking! ZERO, com sua saga, ano de estreia, nível de importância e os trajes que também faltam.`,
    'meta.jsonLdName': 'Personagens que faltam no DRAGON BALL: Sparking! ZERO',
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
    'importance': '1 = figurante olvidado · 5 = personaje capital de su arco.',
    'hype': '1 = petición de nicho · 5 = clamor popular.',
    'status': 'Uno de: Wishlist · Anunciado · Ya es DLC. Por defecto "Wishlist".',
    'accent': 'Color hex de 6 dígitos que tiñe su ficha. Ej: #22c55e',
    'quote': 'Frase corta del personaje.',
    'description': 'Quién es, en una o dos frases (mínimo 20 caracteres).',
    'whyWanted': 'Por qué merece entrar al juego (mínimo 20 caracteres).',
    'signatureMoves': 'Lista de técnicas.',
    'variants': 'Trajes o formas que también faltan.',
    'render': 'Ruta en /public/fighters. Si falta se dibuja un placeholder.',
    'portrait': 'Retrato para el hexágono.',
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
    'importance': '1 = forgotten extra · 5 = pivotal character of their arc.',
    'hype': '1 = niche request · 5 = popular demand.',
    'status': 'One of: Wishlist · Announced · Already DLC. Defaults to "Wishlist".',
    'accent': '6-digit hex color that tints their profile. E.g. #22c55e',
    'quote': 'Short character quote.',
    'description': 'Who they are, in one or two sentences (min 20 characters).',
    'whyWanted': 'Why they deserve to be in the game (min 20 characters).',
    'signatureMoves': 'List of techniques.',
    'variants': 'Outfits or forms that are also missing.',
    'render': 'Path under /public/fighters. If missing, a placeholder is drawn.',
    'portrait': 'Portrait for the hexagon.',
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
    'importance': '1 = figurante esquecido · 5 = personagem capital do seu arco.',
    'hype': '1 = pedido de nicho · 5 = clamor popular.',
    'status': 'Um de: Wishlist · Anunciado · Já é DLC. Padrão "Wishlist".',
    'accent': 'Cor hex de 6 dígitos que colore a ficha. Ex: #22c55e',
    'quote': 'Frase curta do personagem.',
    'description': 'Quem é, em uma ou duas frases (mínimo 20 caracteres).',
    'whyWanted': 'Por que merece entrar no jogo (mínimo 20 caracteres).',
    'signatureMoves': 'Lista de técnicas.',
    'variants': 'Trajes ou formas que também faltam.',
    'render': 'Caminho em /public/fighters. Se faltar, desenha um placeholder.',
    'portrait': 'Retrato para o hexágono.',
    'scene': 'Imagem de fundo para o lado direito da ficha.',
    'tags': 'Tags livres em minúsculas.',
    'sí': 'sim',
    'no': 'não',
  },
};
