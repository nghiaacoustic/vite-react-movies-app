import { Meta } from '@storybook/react'
import { CardSkeleton } from '@/components'

export default {
  title: 'Component/CardSkeleton',
  component: CardSkeleton
} as Meta

export const DefaultCardSkeleton = () => (
  <div className='flex-full-center'>
    <CardSkeleton />
  </div>
)
