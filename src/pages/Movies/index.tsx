import React, { useEffect, useState } from 'react'
import { fetchMoviesByCategory } from '@/services/movie.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Category, ListMovie, Movie } from '@/models'
import { FaArrowDown } from 'react-icons/fa'
import { MovieList } from '@/components/MovieList'
import { Banner } from '@/components'
import ToastError from '@/components/ToastError'
import { isCategoryExist } from '@/utils/index.utils'
const PageNotFound = React.lazy(() => import('@/pages/PageNotFound'))

const Movies: React.FC = () => {
  const { category } = useParams()

  const [page, setPage] = useState<number>(1)
  const [movies, setMovies] = useState<Movie[]>([])
  const { data, error, isLoading } = useQuery<ListMovie>({
    queryKey: ['movies', category, page],
    queryFn: () => fetchMoviesByCategory(category! as Category, page),
    enabled: isCategoryExist(category!)
  })

  useEffect(() => {
    if (data?.results) {
      setMovies((prevMovies) => [...prevMovies, ...data.results])
    }
  }, [data?.results, movies])

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const getFirstMovieWithBackdropAvailalbe = (movies: Movie[]) =>
    movies.find((movie) => !!movie.backdrop_path)

  if (!isCategoryExist(category!)) {
    return (
      <>
        {error && <ToastError errorMessage={`${error}`} />}
        <PageNotFound />
      </>
    )
  }

  return (
    <>
      <Banner
        isLoading={isLoading}
        movie={getFirstMovieWithBackdropAvailalbe(movies)}
      />
      {
        <MovieList
          movies={movies}
          isLoading={isLoading}
          title={category ?? ''}
        />
      }
      <div className='text-center flex-full-center py-2 bg-black-primary'>
        <button
          className=' text-red-primary bg-transparent flex-items-center justify-start gap-2 border-white-primary border-2 p-4 rounded-md hover:text-red-hover duration-500'
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          <span className='bg-black-primary'>More Movies</span>
          <FaArrowDown />
        </button>
      </div>
    </>
  )
}

export default Movies
