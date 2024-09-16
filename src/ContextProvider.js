import { createContext, useContext, useReducer } from "react"
   const CONTEXT = createContext();
export  const  ContextProvider=({ data , reducer , children})=> 

   {
    return(
        <CONTEXT.Provider   value={useReducer(reducer , data)}>
        {children}
        </CONTEXT.Provider>
    )
   }


export const  useData = () => useContext(CONTEXT) ;