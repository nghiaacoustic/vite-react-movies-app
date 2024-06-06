import { Credits, ListMovieSchema, MovieSchema } from '@/schemas/movie.schema'
import { z } from 'zod'

export type Category = 'popular' | 'now_playing' | 'latest'

export type MovieRequestParams = {
  certification?: string
  'certification.gte'?: string
  'certification.lte'?: string
  certification_country?: string
  include_adult?: boolean
  include_video?: boolean
  language?: string
  page?: number
  primary_release_year?: number
  'primary_release_date.lte'?: string | Date
  'primary_release_date.gte'?: string | Date
  'release_date.gte'?: string | Date
  'release_date.lte'?: string | Date
  region?: string
  sort_by?: string
  'vote_average.gte'?: number
  'vote_average.lte'?: number
  'vote_count.gte'?: number
  'vote_cou.lte'?: number
  watch_region?: string
  with_cast?: string
  with_companies?: string
  with_crew?: string
  with_genres?: string
  with_keywords?: string
  with_origin_country?: string
  with_original_language?: string
  with_people?: string
  with_release_type?: number
  'with_runtime.gte'?: number
  'with_runtime.lte'?: number
  with_watch_monetization_types?: string
  with_watch_providers?: string
  without_companies?: string
  without_genres?: string
  without_keywords?: string
  without_watch_providers?: string
  year?: number
}

export type Movie = z.infer<typeof MovieSchema>
export type Profile = z.infer<typeof Credits>
export type ListMovie = z.infer<typeof ListMovieSchema>

export interface CreditProfileInterface {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profilePath: string
  cast_id: number
  character: string
  credit_id: string
  order: number
  department?: string
}
