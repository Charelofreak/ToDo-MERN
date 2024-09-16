import React, { useContext, useReducer } from 'react'
import { createContext  } from 'react'
import {userState , userReducer} from './UserReducer'
const USER_CONTEXT = createContext() ; 

export default function UserContext({children}) {
return (
    <USER_CONTEXT.Provider value={useReducer( userReducer  , userState )}   >
  {children}
    </USER_CONTEXT.Provider>
)
}
export const  useUser  = () => useContext(USER_CONTEXT)
