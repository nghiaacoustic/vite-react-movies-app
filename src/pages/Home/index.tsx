import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Category, ListMovie, Movie } from '@/models'
import { fetchMoviesByCategory } from '@/services/movie.service'
import { Banner, MovieCard, Slider } from '@/components'
import ToastError from '@/components/ToastError'
import { capitalizeFirstLetter } from '@/utils/index.utils'

const HomePage: React.FC = () => {
  const categories: Category[] = ['popular', 'now_playing', 'latest']
  const queries = categories.map((category) =>
    useQuery<ListMovie>({
      queryKey: [category],
      queryFn: () => fetchMoviesByCategory(category, 1)
    })
  )

  const isLoading = queries.some((query) => query.isLoading)
  const errorMessage = queries.map((query) => query.error)
  const moviesData = queries.map((query) => query.data)

  const showToastError = () => {
    return errorMessage?.map(
      (error) => error && <ToastError errorMessage={`${error}`} />
    )
  }

  return (
    <>
      <Banner movie={moviesData[0]?.results[0]} isLoading={isLoading} />
      {categories.map((category, index) => (
        <Slider
          key={category}
          title={capitalizeFirstLetter(category.replace('_', ' '))}
        >
          {moviesData[index]?.results.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} isLoading={isLoading} />
          ))}
        </Slider>
      ))}
      {showToastError()}
    </>
  )
}

export default HomePage
