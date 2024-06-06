import type { Meta, StoryObj } from '@storybook/react'
import { MovieCard, MovieCardProps } from '@/components'
import { Movie } from '@/models'
import { MovieListMock } from '@/tests/mocks'

const Component = (args: MovieCardProps) => {
  return (
    <div className='h-[330px]'>
      <MovieCard {...args} />
    </div>
  )
}

const meta = {
  title: 'Component/MovieCard',
  component: Component,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof MovieCard>

export default meta

type Story = StoryObj<typeof meta>

const movie: Movie = MovieListMock.results[0]
export const MovieCardComponent: Story = {
  args: {
    isLoading: false,
    movie
  }
}
