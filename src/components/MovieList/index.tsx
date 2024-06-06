import React from 'react'
import { ListCardSkeleton, MovieCard } from '@/components'
import { Movie } from '@/models'
import { capitalizeFirstLetter } from '@/utils/index.utils'

type MovieListProps = {
  movies: Movie[]
  isLoading: boolean
  title: string
}

export const MovieList: React.FC<MovieListProps> = ({
  movies,
  isLoading,
  title
}) => {
  if (isLoading) {
    return <ListCardSkeleton count={20} />
  }

  return (
    <>
      <h1 className='font-bold text-4xl px-8 pt-10 pb-4 text-center'>
        {capitalizeFirstLetter(title)} Movies
      </h1>
      <div className='flex-full-center flex-row gap-2  mx-auto overflow-hidden flex-wrap'>
        {movies?.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} isLoading={isLoading} />
          </div>
        ))}
      </div>
    </>
  )
}
