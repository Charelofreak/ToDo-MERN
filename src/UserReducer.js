export const userState ={
    user : null ,
    token : null
}

export function userReducer(state , action){
    switch(action.type){
           case "LOGIN" : 
                 console.log(action.payload?.login) 
           return {
            ... state , 
            user : action.payload?.user ,      
            login : action.payload?.login
           }
          
    }
}