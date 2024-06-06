import type { Meta, StoryObj } from '@storybook/react'
import { MovieCard, Slider, SliderProps } from '@/components'
// import { MOVIE_LIST_MOCK } from '@/tests/mocks'
import { Movie } from '@/models'
import { MOVIE_LIST } from './data/movie.data'

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

const mockListMovies = MOVIE_LIST
export const SliderComponent: Story = {
  args: {
    children: mockListMovies.map((movie: Movie) => (
      <MovieCard key={movie.id} movie={movie} isLoading={false} />
    )),
    title: 'Popular',
    isExpanable: false
  }
}
