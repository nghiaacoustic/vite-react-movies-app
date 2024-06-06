import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchMovieDetail } from '@/services/movie.service'
import { Movie } from '@/models'
import { Banner, ProfileCard, Slider } from '@/components'
import ToastError from '@/components/ToastError'
import { getProfilesSortedByPopularity } from '@/utils/index.utils'

const MovieDetail: React.FC = () => {
  const { id } = useParams()
  const { data, error, isLoading } = useQuery<Movie>({
    queryKey: ['movies', id],
    queryFn: () => fetchMovieDetail(id!),
    enabled: !!id
  })

  const getActors = () =>
    getProfilesSortedByPopularity(data?.credits?.cast!, 'acting')

  const getProducers = () =>
    getProfilesSortedByPopularity(data?.credits?.crew!, 'production')

  return (
    <>
      {error && (
        <>
          <Banner isLoading={true} />
          <ToastError errorMessage={`${error}`} />
        </>
      )}

      <Banner movie={data} isLoading={isLoading} />
      {getActors().length > 0 && (
        <Slider title='Actors' isExpanable={false}>
          {getActors().map((item) => {
            return (
              <ProfileCard key={item.id} profile={item} isLoading={isLoading} />
            )
          })}
        </Slider>
      )}
      {getProducers().length > 0 && (
        <Slider title='Producers' isExpanable={false}>
          {getProducers()?.map((item) => {
            return (
              <ProfileCard key={item.id} profile={item} isLoading={isLoading} />
            )
          })}
        </Slider>
      )}
    </>
  )
}

export default MovieDetail
