import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute({ auth }){

    return (
        auth ? <Outlet /> : <Navigate to='/auth' />
    )
}


export default PrivateRoute;
