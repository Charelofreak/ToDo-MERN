import React, { useState } from 'react'
import './Groupe.css'
import GroupeItem from './GroupeItem'
import addIcon from '../imgs/addIcon.png'
import { Link } from 'react-router-dom'
import { useData } from '../ContextProvider'
export default function Groupe({grs}) {
  return (
    <div className='groupe-todo  w-[35vw]  md:w-[25vw] lg:w-[20vw]'>
        <div>
        <span>Groupes</span>
        </div>
        <div className="add-groupes flex p-3" >
          <span className='w-[90%] outline-none placeholder:uppercase'>add new groupe </span>
        <Link to={"CreateGroupe"}><img className='h-[30px] w-[30px] cursor-pointer' src={addIcon}  />
            
        </Link>

          </div>
        <div className=" groupes flex flex-col   w-[100%] gap-1  h-[50vh] overflow-y-auto ">
          {
            grs?.map(e=>{
              return <GroupeItem key={e.id} gr={e} ></GroupeItem>
             })
            
          }
        </div>

    </div>
  )
}
