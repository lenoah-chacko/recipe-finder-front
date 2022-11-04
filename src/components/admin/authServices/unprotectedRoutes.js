import { useEffect} from 'react'
import { Outlet } from 'react-router-dom';
function UnprotectedRoutes({authorizeUser }) {
    useEffect(() => {
        authorizeUser()
    }, [authorizeUser])
    return <Outlet/>;
}

export default UnprotectedRoutes