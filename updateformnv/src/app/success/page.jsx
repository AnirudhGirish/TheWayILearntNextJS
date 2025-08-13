import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-300 p-6 shadow-md rounded-lg'>
      <div className="bg-blue-200 shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-medium text-black text-center">Form Submitted Successsfully <span className='text-4xl'>&#127881;</span></h2>
        <p className='text-xl text-center pt-4 text-amber-700'>Data collected & updated to server</p>
      </div>
    </div>
  )
}

export default page