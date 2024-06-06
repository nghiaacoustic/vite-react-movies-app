import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const PageNotFound: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='h-[100vh] bg-black-primary flex-full-center'>
      <div className='text-center mobile:text-2xl desktop:3xl flex gap-4 flex-col '>
        <h1 className='text-red-primary'>404</h1>
        <p className='text-white-primary mobile:text-4xl desktop:6xl'>
          Page not found
        </p>
        <button
          aria-label='back to homepage'
          onClick={() => navigate('/')}
          className=' text-white-primary flex-full-center gap-2 border px-2 py-4 rounded-md'
        >
          <FaArrowLeft />
          Back to Home
        </button>
      </div>
    </div>
  )
}

export default PageNotFound
