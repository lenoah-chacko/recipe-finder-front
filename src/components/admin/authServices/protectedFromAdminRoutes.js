import { useEffect} from 'react'
function ProtectedFromAdminRoutes({ checkAuth, authorizeUser }) {
    useEffect(() => {
        authorizeUser()
    }, [authorizeUser])
    return checkAuth("unauthorized","authorized")
}

export default ProtectedFromAdminRoutes