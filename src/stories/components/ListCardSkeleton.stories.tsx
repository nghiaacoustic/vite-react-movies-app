import { Meta } from '@storybook/react'
import { ListCardSkeleton } from '@/components'

export default {
  title: 'Component/ListCardSkeleton',
  component: ListCardSkeleton
} as Meta

export const DefaultListCardSkeleton = () => (
  <div className='flex-full-center m-auto'>
    <ListCardSkeleton count={10} />
  </div>
)
