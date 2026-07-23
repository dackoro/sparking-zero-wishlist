import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Esquema de un personaje de la wishlist.
 *
 * Cada personaje vive en su propio archivo `src/content/fighters/<slug>.json`,
 * así un pull request solo toca un archivo y nunca hay conflictos de merge.
 * Si un campo no cumple el esquema, `npm run build` falla y el CI marca el PR.
 */
export const SERIES = [
  'Dragon Ball',
  'Dragon Ball Z',
  'Dragon Ball GT',
  'Dragon Ball Super',
  'Dragon Ball Daima',
  'Películas',
  'Especiales de TV',
  'Spin-off',
] as const;

export const ROLES = [
  'Protagonista',
  'Antagonista',
  'Secundario',
  'Apoyo',
  'Relleno',
  'Cameo',
] as const;

export const MEDIA = ['Manga', 'Anime', 'Película', 'Videojuego'] as const;

export const STATUS = ['Wishlist', 'Anunciado', 'Ya es DLC'] as const;

export const SECTIONS = ['fighters', 'outfits'] as const;

const variant = z.object({
  name: z.string().min(2),
  source: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  accent: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, 'Usa un hex de 6 dígitos, ej: #7c3aed')
    .optional(),
}).passthrough();

const fighters = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/fighters' }),
  schema: z.object({
    name: z.string().min(2),
    nameJa: z.string().optional(),
    series: z.enum(SERIES),
    /** Saga o arco donde aparece por primera vez */
    saga: z.string().min(2),
    firstAppearance: z.object({
      year: z.number().int().min(1984).max(2030),
      /** Obra concreta. Ej: "Dragon Ball, cap. 40" */
      work: z.string().min(2),
      medium: z.enum(MEDIA),
    }),
    role: z.enum(ROLES),
    /** 1 = figurante olvidado · 5 = personaje capital de su arco */
    importance: z.number().int().min(1).max(5),
    /** Cuántos fans lo piden, a ojo de la comunidad. 1 = nicho · 5 = clamor popular */
    hype: z.number().int().min(1).max(5),
    status: z.enum(STATUS).default('Wishlist'),
    /** "fighters" = aparece en el panal de personajes; "outfits" = aparece en el panal de trajes */
    section: z.enum(SECTIONS).default('fighters'),
    /** Color de acento del overlay (hex de 6 dígitos) */
    accent: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Usa un hex de 6 dígitos, ej: #7c3aed'),
    /** Frase corta del personaje */
    quote: z.string().optional(),
    /** Quién es, en 1-3 frases */
    description: z.string().min(20),
    /** Por qué merece estar en el juego */
    whyWanted: z.string().min(20),
    signatureMoves: z.array(z.string()).default([]),
    /** Trajes / formas que también faltan */
    variants: z.array(variant).default([]),
    /** Render de cuerpo entero en /public/fighters (opcional: si falta se dibuja un placeholder) */
    render: z.string().optional(),
    /** Retrato para el hexágono */
    portrait: z.string().optional(),
    /** Imagen de escena para el fondo del overlay */
    scene: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }).passthrough(),
});

const stages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/stages' }),
  schema: z.object({
    name: z.string().min(2),
    series: z.enum(SERIES),
    saga: z.string().min(2),
    firstAppearance: z.object({
      year: z.number().int().min(1984).max(2030),
      work: z.string().min(2),
      medium: z.enum(MEDIA),
    }),
    description: z.string().min(20),
    hype: z.number().int().min(1).max(5),
    status: z.enum(STATUS).default('Wishlist'),
    accent: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Usa un hex de 6 dígitos, ej: #7c3aed'),
    scene: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }).passthrough(),
});

export const collections = { fighters, stages };
