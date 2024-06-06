import { describe, it, expect } from 'vitest'
import {
  getImage,
  roundedNumber,
  formatDate,
  capitalizeFirstLetter,
  getCurrentDateFormatted,
  convertToSnakeCase,
  isCategoryExist,
  getProfilesSortedByPopularity
} from '@/utils/index.utils'

describe('Utility Functions', () => {
  describe('getImage Function', () => {
    it('should return image URL when provided', () => {
      const imageUrl = 'example.com/image.jpg'
      expect(getImage(imageUrl)).toBe(
        'https://image.tmdb.org/t/p/originalexample.com/image.jpg'
      )
    })

    it('should return default banner when URL not provided and isBackdropImage is true', () => {
      expect(getImage('', true)).toBe('/src/assets/default-banner.png')
    })

    it('should return default image when URL not provided and isBackdropImage is false', () => {
      expect(getImage('')).toBe('/src/assets/default-image.png')
    })
  })

  describe('roundedNumber Function', () => {
    it('should round number with default decimal value', () => {
      expect(roundedNumber(3.14159)).toBe(3.1)
    })

    it('should round number with custom decimal value', () => {
      expect(roundedNumber(3.14159, 2)).toBe(3.14)
    })
  })

  describe('formatDate Function', () => {
    it('should format a valid date string', () => {
      expect(formatDate('2024-06-12')).toBe('June 12, 2024')
    })

    it('should return "Invalid Date" for an invalid date string', () => {
      expect(formatDate('invalid_date')).toBe('Invalid Date')
    })
  })

  describe('capitalizeFirstLetter Function', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello')
    })
  })

  describe('getCurrentDateFormatted Function', () => {
    it('should return the current date formatted', () => {
      const formattedDateRegex = /^\d{4}-\d{2}-\d{2}$/
      expect(getCurrentDateFormatted()).toMatch(formattedDateRegex)
    })
  })

  describe('convertToSnakeCase Function', () => {
    it('should convert a string to snake case', () => {
      expect(convertToSnakeCase('Hello World')).toBe('hello_world')
    })
  })

  describe('isCategoryExist Function', () => {
    it('should return true for an existing category', () => {
      expect(isCategoryExist('popular')).toBe(true)
    })

    it('should return false for a non-existing category', () => {
      expect(isCategoryExist('random')).toBe(false)
    })
  })
})

describe('getProfilesSortedByPopularity function', () => {
  it('returns an empty array if data is falsy', () => {
    expect(getProfilesSortedByPopularity(null as any, 'acting')).toEqual([])
    expect(getProfilesSortedByPopularity(undefined, 'acting')).toEqual([])
    expect(getProfilesSortedByPopularity([], 'acting')).toEqual([])
  })

  it('sorts and filters profiles correctly', () => {
    const data = [
      {
        id: 1,
        name: 'John',
        popularity: 10,
        known_for_department: 'Acting',
        profile_path: '/path1',
        character: 'Character1'
      },
      {
        id: 2,
        name: 'Jane',
        popularity: 5,
        known_for_department: 'Production',
        profile_path: '/path2',
        character: 'Character2'
      },
      {
        id: 3,
        name: 'Alice',
        popularity: 15,
        known_for_department: 'Acting',
        profile_path: '/path3',
        character: 'Character3'
      }
    ]

    const expectedActors = [
      { id: 3, name: 'Alice', profilePath: '/path3', character: 'Character3' },
      { id: 1, name: 'John', profilePath: '/path1', character: 'Character1' }
    ]

    const expectedProducers = [
      { id: 2, name: 'Jane', profilePath: '/path2', character: 'Character2' }
    ]

    expect(getProfilesSortedByPopularity(data, 'acting')).toEqual(
      expectedActors
    )
    expect(getProfilesSortedByPopularity(data, 'production')).toEqual(
      expectedProducers
    )
  })
})
