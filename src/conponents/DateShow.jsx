import React, { useEffect } from 'react'
import { useData } from '../ContextProvider'

export default function DateShow({state ,children}) {
  return (
    <div>
          <span className='text-2xl ml-5 uppercase font-semibold '>{new Date(new Date().getFullYear() , children , new Date().getDate() ).toDateString("YYYY-MM-DD")}</span>
    </div>
  )
}

