import { useEffect} from 'react'
import AuthService from './authService'
function ProtectedFromAdminRoutes({setAuth, checkAuth }) {
    useEffect(() => {
        async function authorizeUser()
        {
            let authorized=await AuthService()
            setAuth(authorized)
        }
        authorizeUser()
    }, [])
    return checkAuth()
}

export default ProtectedFromAdminRoutes