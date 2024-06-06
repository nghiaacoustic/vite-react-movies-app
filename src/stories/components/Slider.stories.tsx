import type { Meta, StoryObj } from '@storybook/react'
import { MovieCard, Slider, SliderProps } from '@/components'
import { MovieListMock } from '@/tests/mocks'
import { Movie } from '@/models'

const Component: React.FC<SliderProps> = (args) => (
  <div className='h-[330px] w-screen'>
    <Slider {...args} />
  </div>
)

const meta = {
  title: 'Component/Slider',
  component: Component,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

const mockListMovies = MovieListMock.results
export const SliderComponent: Story = {
  args: {
    children: mockListMovies.map((movie: Movie) => (
      <MovieCard key={movie.id} movie={movie} isLoading={false} />
    )),
    title: 'Popular',
    isExpanable: false
  }
}
