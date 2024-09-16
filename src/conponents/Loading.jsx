import React from 'react'

export default function Loading({visible}) {
  return (
    visible && <div className="flex justify-center  items-start h-[200px]">
      <div className=" mt-8 w-16 h-16 border-4 border-t-4 border-t-green-300 border-white rounded-full animate-spin"></div>
    </div>
  )
}
