import React, { useEffect, useState } from 'react'

type ErrorProps = {
  errorMessage: string
}

const ToastError: React.FC<ErrorProps> = ({ errorMessage }) => {
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (errorMessage) {
      setShowToast(true)
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  return (
    <>
      {showToast && (
        <div
          data-testid='toast-error'
          className='fixed top-5 right-5 bg-red-primary text-white-primary px-4 py-2 rounded shadow-lg z-50 animate-toast-in'
        >
          <div className='font-bold'>{errorMessage}</div>
        </div>
      )}
    </>
  )
}

export default ToastError
