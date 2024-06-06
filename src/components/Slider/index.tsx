import React, { ReactNode, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { IoIosArrowForward } from 'react-icons/io'
import { convertToSnakeCase } from '@/utils/index.utils'

export type SliderProps = {
  title: string
  isExpanable?: boolean
  children: string | JSX.Element | JSX.Element[] | ReactNode
}

export const Slider: React.FC<SliderProps> = ({
  title,
  children,
  isExpanable = true
}) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  const checkButtons = () => {
    const slider = sliderRef.current
    if (slider) {
      setShowLeftButton(slider.scrollLeft > 0)
      setShowRightButton(
        slider.scrollWidth > slider.clientWidth &&
          slider.scrollLeft + slider.clientWidth < slider.scrollWidth
      )
    }
  }

  const scrollLeft = () => {
    const slider = sliderRef.current
    if (slider) {
      slider.scrollLeft -= slider.clientWidth / 2
    }
  }

  const scrollRight = () => {
    const slider = sliderRef.current
    if (slider) {
      slider.scrollLeft += slider.clientWidth / 2
    }
  }

  return (
    <div className='relative w-full overflow-hidden px-4 py-8'>
      <div className='flex-items-center relative group pb-4'>
        <h2 className='text-2xl  transition-opacity group-hover select-none p-2'>
          {title}
        </h2>
        {isExpanable && (
          <div className='select-none transition-opacity duration-500 ease-in-out transform opacity-0 group-hover:opacity-100 text-xl font-bold pr-2'>
            <Link
              className='flex-items-row cursor-pointer text-red-primary'
              to={`/movies/${convertToSnakeCase(title)}`}
            >
              <IoIosArrowForward />
              <span className='text-sm'>Explore All</span>
            </Link>
          </div>
        )}
      </div>
      {showLeftButton && (
        <button
          data-testid='scroll-back'
          aria-label='scroll back'
          className='absolute w-10 h-16 left-0 top-1/2 transform -translate-y-1/2 bg-black-primary bg-opacity-70 text-white-primary p-2 z-10'
          onClick={scrollLeft}
        >
          {''}
          <BsArrowLeft size={20} />
        </button>
      )}
      <div
        className='flex overflow-x-auto scroll-smooth gap-2'
        ref={sliderRef}
        onScroll={checkButtons}
        data-testid='slider'
      >
        {children}
      </div>
      {showRightButton && (
        <button
          data-testid='scroll-next'
          className='absolute w-10 h-16 right-0 top-1/2 transform -translate-y-1/2 bg-black-primary bg-opacity-70 text-white-primary p-2 z-10'
          onClick={scrollRight}
          aria-label='scroll next'
        >
          <BsArrowRight size={20} />
        </button>
      )}
    </div>
  )
}
