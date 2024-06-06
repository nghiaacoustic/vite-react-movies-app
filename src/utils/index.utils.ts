import { config } from '@/constants/config.constant'
import DefaultBanner from '@/assets/default-banner.png'
import DefaultImage from '@/assets/default-image.png'
import { CreditProfileInterface, Profile } from '@/models'

export const getImage = (
  url: string = '',
  isBackdropImage: boolean = false
): string => {
  if (!url) {
    return isBackdropImage ? DefaultBanner : DefaultImage
  }
  return `${config.baseImageUrl}${url}`
}

export const roundedNumber = (value: number, decimal: number = 1): number => {
  return Number(value.toFixed(decimal))
}

export const formatDate = (dateString: string): string => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  const date = new Date(dateString)
  if (!dateRegex.test(dateString) || isNaN(date.getTime())) {
    return 'Invalid Date'
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).replace('_', ' ')
}

export const getCurrentDateFormatted = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const convertToSnakeCase = (str: string): string => {
  return str.toLowerCase().replace(/ /g, '_')
}

export const isCategoryExist = (category: string): boolean => {
  return ['popular', 'now_playing', 'latest'].includes(category)
}

export const getProfilesSortedByPopularity = (
  data: Profile['cast'],
  department: 'acting' | 'production'
): CreditProfileInterface[] | [] => {
  if (!data) {
    return []
  }
  const popularitySortedProfiles = data.sort(
    (a, b) => (b?.popularity ?? 0) - (a?.popularity ?? 0)
  )
  const profiles = popularitySortedProfiles
    .map(
      (profile) =>
        profile?.known_for_department?.toLowerCase() ===
          department.toLowerCase() && {
          id: profile.id,
          name: profile.name,
          profilePath: profile.profile_path!,
          character: profile.character
        }
    )
    .filter((value) => value !== false)

  return (profiles as unknown as CreditProfileInterface[]) ?? []
}
