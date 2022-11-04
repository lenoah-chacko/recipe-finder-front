import { useEffect } from 'react'
function ProtectedRoutes({authorizeUser, checkAuth }) {
    useEffect(() => {
        authorizeUser()
    }, [authorizeUser])
    return checkAuth("authorized","unauthorized")
}

export default ProtectedRoutes