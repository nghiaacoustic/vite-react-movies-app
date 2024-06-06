import React from 'react'
import { CardSkeleton } from '@/components'

type ListCardSkeletonProps = {
  count: number
}

export const ListCardSkeleton: React.FC<ListCardSkeletonProps> = ({
  count
}) => {
  return (
    <div
      data-testid='list-card-skeleton'
      className='flex flex-wrap justify-start px-4'
    >
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
}

export default ListCardSkeleton
