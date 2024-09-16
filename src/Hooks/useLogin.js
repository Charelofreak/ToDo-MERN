import { useState } from 'react'
import { useUser } from '../UserContext'
const useLogin = (url , body) => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [data , dispatch] = useUser()

    const login = async (body) => {
        setIsLoading(true)
        setError(null)
        console.log(body)
        const response = await fetch(url, {
            method: 'POST' ,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to lacal storage
            sessionStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({type: 'LOGIN' , payload: json})
            setIsLoading(false)
        }
    }

    return { login, isLoading, error}
}
export default useLogin