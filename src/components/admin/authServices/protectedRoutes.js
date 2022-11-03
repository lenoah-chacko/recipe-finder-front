import { React, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthService from './authService'
function ProtectedRoutes({ redirectPath = '/login' }) {
    const [auth, setAuth] = useState("neutral")
    useEffect(() => {
        async function authorizeUser()
        {
            let authorized=await AuthService()
            setAuth(authorized)
        }
        authorizeUser()
    }, [])

    function checkAuth() {
        if (auth == "unauthorized") {
            return <Navigate to={redirectPath} replace />;
        }
        else if (auth == "authorized") {

            return <Outlet/>;
        }
        else if (auth == "neutral") {
            setTimeout(checkAuth,500)
        }
    }
    return checkAuth()
}

export default ProtectedRoutes