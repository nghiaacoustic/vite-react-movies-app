import { z } from 'zod'

const Genre = z.object({
  id: z.number().optional(),
  name: z.string().optional()
})

const Profile = z.object({
  id: z.number().optional(),
  known_for_department: z.string().optional(),
  name: z.string().optional(),
  character: z.string().optional(),
  profile_path: z.string().nullable().optional(),
  popularity: z.number().optional()
})

export const Credits = z.object({
  cast: z.array(Profile).optional(),
  crew: z.array(Profile).optional()
})

export const MovieSchema = z.object({
  backdrop_path: z.string().nullable().optional(),
  poster_path: z.string().nullable().optional(),
  id: z.number(),
  original_title: z.string(),
  overview: z.string(),
  release_date: z.string(),
  title: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  runtime: z.number().optional(),
  popularity: z.number().optional(),
  tagline: z.string().nullable().optional(),
  genres: z.array(Genre).optional(),
  credits: Credits.nullable().optional()
})

export const ListMovieSchema = z.object({
  page: z.number(),
  results: z.array(MovieSchema),
  total_pages: z.number(),
  total_results: z.number()
})

export const CreditProfileSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  cast_id: z.number(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number(),
  department: z.string().optional()
})
