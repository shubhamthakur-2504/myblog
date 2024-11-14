import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute({children, authenticated = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const auth = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if ( authenticated && !auth) {
            navigate('/login')
        } else if (!authenticated && auth) {
            navigate('/')
        }
        setLoader(false)
    }, [auth,navigate])

  return loader ? <h1>Loading .... </h1> : <>{children}</>
}