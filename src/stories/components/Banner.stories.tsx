import type { Meta, StoryObj } from '@storybook/react'
import { DETAIL_MOVIE } from './data/movie.data'
import { Banner, BannerProps } from '@/components'

const Component = (args: BannerProps) => {
  return (
    <div className='relative w-full h-[800px]'>
      <Banner {...args} />
    </div>
  )
}
const meta = {
  title: 'Component/Banner',
  component: Component,
  parameters: {
    layout: 'start'
  }
} satisfies Meta<typeof Banner>

export default meta

type Story = StoryObj<typeof meta>

export const BannerComponent: Story = {
  args: {
    movie: DETAIL_MOVIE,
    isLoading: false
  }
}

export const BannerSkeletonComponent: Story = {
  args: {
    movie: DETAIL_MOVIE,
    isLoading: true
  }
}
