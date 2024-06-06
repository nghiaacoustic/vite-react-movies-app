import React from 'react'
import { getImage } from '@/utils/index.utils'
import { CardSkeleton } from '@/components'
import { CreditProfileInterface } from '@/models'

type ProfileCardProps = {
  profile: CreditProfileInterface
  isLoading: boolean
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  isLoading
}) => {
  if (isLoading && !profile) {
    return <CardSkeleton />
  }

  const { character, name, profilePath } = profile
  return (
    <div className='max-w-sm min-w-[236px] w-full overflow-hidden shadow-md rounded-lg h-[350px] mx-auto p-2'>
      <div className='overflow-hidden rounded-xl relative flex flex-col transform hover:-translate-y-2 transition ease-in-out duration-500 shadow-lg hover:shadow-2xl movie-item text-white-primary h-[350px]'>
        <div className='absolute inset-0 z-10 transition duration-300 ease-in-out bg-gradient-to-t from-black-primary via-black-opacity to-transparent'></div>
        <div
          className='relative h-full group z-10 px-6 pt-10 pb-6 space-y-6 movie_info'
          data-lity=''
        >
          <div className='flex flex-col justify-end h-full'>
            <div className='text-center'>
              <p className='text-lg font-bold'>{name}</p>
              {character && (
                <div>
                  <span className='font-extralight'>Character: </span>
                  <span className='font-medium text-red-primary mt-1'>
                    {character}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <img
          className='absolute inset-0 transform w-full -translate-y-4 object-cover h-full'
          src={getImage(profilePath!)}
          style={{ filter: 'grayscale(0)' }}
          alt='poster-image'
          data-testid='poster-image'
        />
      </div>
    </div>
  )
}
