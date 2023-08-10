import React from 'react'

const loader = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <span className='text-2xl'>Loading<span className='animate-pulse text-5xl'>...</span></span>
    </div>
  )
}

export default loader