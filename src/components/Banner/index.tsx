import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Movie } from '@/models'
import { BannerSkeleton } from '@/components'
import { formatDate, getImage, roundedNumber } from '@/utils/index.utils'
import { FaStar } from 'react-icons/fa'

export type BannerProps = {
  movie?: Movie
  isLoading: boolean
}

export const Banner: React.FC<BannerProps> = ({ movie, isLoading }) => {
  const { id } = useParams<{ id: string }>()

  if (isLoading) {
    return <BannerSkeleton />
  }

  return (
    <div
      className='relative mobile:h-[500px] tablet:h-[600px] desktop:h-[700px] monitor:h-[1080px] text-white-primary flex items-end justify-start p-8 !m-0'
      style={{
        backgroundImage: `url(${getImage(movie?.backdrop_path!, true)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}
      data-testid='banner'
    >
      <div className='bg-gradient-to-t from-black-primary via-transparent to-transparent absolute inset-0 z-0'></div>
      <div className='relative z-10 max-w-2xl space-y-4 tablet:text-xl monitor:text-3xl'>
        <h1 className='tablet:text-3xl text-2xl monitor:text-5xl font-bold mb-4'>
          {movie?.title}
        </h1>
        <p className='tablet:text-xl monitor:text-2xl text-sm mb-6'>
          {movie?.overview}
        </p>

        {!id ? (
          <div>
            <Link
              className='text-lg px-6 py-2 bg-red-600 hover:bg-red-700 text-white-primary rounded transition-colors ease-in-out duration-100'
              to={`/movie/${movie?.id}`}
            >
              More Info
            </Link>
          </div>
        ) : (
          <div className='space-y-2'>
            <p className='text-md'>
              <span className='font-semibold'>Release Date:</span>{' '}
              {formatDate(movie?.release_date!)}
            </p>
            <p className='text-md'>
              <span className='font-semibold'>Genres:</span>{' '}
              {movie?.genres?.map((genre) => genre.name).join(', ')}
            </p>
            <p className='text-md'>
              <span className='font-semibold'>Runtime:</span> {movie?.runtime}{' '}
              minutes
            </p>
            <div className='text-md flex-items-center gap-1'>
              <span className='font-semibold'>Rating:</span>
              <div className='flex-items-row gap-1'>
                <FaStar style={{ color: 'yellow' }} />
                <div className='text-lg font-bold text-yellow-400'>
                  {roundedNumber(movie?.vote_average ?? 0)}
                </div>
                ({movie?.vote_count} votes)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Banner
