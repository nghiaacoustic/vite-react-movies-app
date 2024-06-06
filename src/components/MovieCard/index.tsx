import React from 'react'
import { Link } from 'react-router-dom'
import { Movie } from '@/models'
import { FaStar } from 'react-icons/fa'
import { IoIosPlayCircle } from 'react-icons/io'
import { CardSkeleton } from '@/components'
import {
  capitalizeFirstLetter,
  formatDate,
  getImage,
  roundedNumber
} from '@/utils/index.utils'

export type MovieCardProps = {
  movie: Movie
  isLoading: boolean
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, isLoading }) => {
  if (isLoading && !movie) {
    return <CardSkeleton />
  }

  const { id, title, vote_average, release_date, poster_path } = movie
  return (
    <div
      data-testid='movie-card'
      className='max-w-sm min-w-[236px] w-full overflow-hidden shadow-md rounded-lg h-[350px] mx-auto p-2'
    >
      <Link to={`/movie/${id}`}>
        <div className='overflow-hidden rounded-xl relative flex-items-col transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white-primary h-[350px]'>
          <div className='absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black-primary via-gray-900 to-transparent'></div>
          <div
            className='relative h-full cursor-pointer group z-10 px-10 pt-10 space-y-6 movie_info'
            data-lity=''
          >
            <div className='flex-items-col justify-between h-full'>
              <div className='h-40' />
              <div className='flex flex-col space-y-6 detail_info h-full'>
                <div className='flex flex-col space-y-2 inner w-52'>
                  <div
                    className='relative flex-items-center w-min flex-shrink-0 p-1 text-center text-white-primary bg-red-primary rounded-full group-hover:bg-red-hover transition-colors'
                    data-unsp-sanitized='clean'
                  >
                    <IoIosPlayCircle className='w-10 h-10' />
                    <div className='absolute transition opacity-0 duration-500 ease-in-out transform group-hover:opacity-100 group-hover:translate-x-16 text-xl font-bold text-white-primary group-hover:pr-2'>
                      Details
                    </div>
                  </div>
                  <h1 className='text-xl font-bold text-white-primary'>
                    {capitalizeFirstLetter(title)}
                  </h1>
                </div>

                <div className='flex flex-col justify-end flex-1 pb-4 '>
                  <div className='flex-items-row space-x-2 bg-gradient-to-t from-black-primary via-gray-900 to-transparent p-2 rounded-lg'>
                    <FaStar style={{ color: 'yellow' }} />
                    <div className='text-lg font-bold text-yellow-400'>
                      {roundedNumber(vote_average)}
                    </div>
                  </div>
                  <div className='flex-items-row space-x-2 mt-2'>
                    <div className='text-lg font-bold text-white-primary'>
                      {formatDate(release_date)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            className='absolute inset-0 transform w-full -translate-y-4 object-cover h-full'
            src={getImage(poster_path!)}
            style={{ filter: 'grayscale(0)' }}
            alt='poster-image'
          />
        </div>
      </Link>
    </div>
  )
}
