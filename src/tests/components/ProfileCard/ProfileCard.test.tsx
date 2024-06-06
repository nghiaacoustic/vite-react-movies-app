import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ProfileCard } from '@/components'
import { CreditProfileInterface } from '@/models'
import { PROFILE_LIST_MOCK } from '@/tests/mocks/data/profiles'
import { Route } from 'react-router-dom'
import { customRender } from '@/tests/mocks'

describe('ProfileCard component', () => {
  const profile: CreditProfileInterface = PROFILE_LIST_MOCK[0]

  const renderComponent = () => {
    return customRender(
      <Route
        path='/'
        element={<ProfileCard profile={profile} isLoading={false} />}
      />,
      ['/']
    )
  }
  it('should match snapshot', () => {
    renderComponent()
    expect(screen).matchSnapshot()
  })

  it('should render profile data when not loading', async () => {
    const { getByText, getByAltText } = render(
      <ProfileCard profile={profile} isLoading={false} />
    )

    expect(getByText('Freya Allan')).toBeInTheDocument()
    expect(getByText('Nova / Mae')).toBeInTheDocument()
    expect(getByAltText('poster-image')).toBeInTheDocument()
  })
})
