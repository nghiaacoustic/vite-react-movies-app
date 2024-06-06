import type { Meta, StoryObj } from '@storybook/react'
import { PROFILE_LIST } from '@/stories/components/data/movie.data'
import { ProfileCard } from '@/components'
import { CreditProfileInterface } from '@/models'

const Component = (args: {
  profile: CreditProfileInterface
  isLoading: boolean
}) => {
  return (
    <div className='h-[330px]'>
      <ProfileCard {...args} />
    </div>
  )
}

const meta = {
  title: 'Component/ProfileCard',
  component: Component,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof ProfileCard>

export default meta

type Story = StoryObj<typeof meta>

const profile: CreditProfileInterface = PROFILE_LIST[0]
export const ProfileCardComponent: Story = {
  args: {
    isLoading: false,
    profile
  }
}
