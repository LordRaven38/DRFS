import React, {useCallback, useEffect, useState} from 'react';
import {Outlet, Route, useNavigate} from 'react-router-dom';

const AdminProtectedRoute = (props)=>{

    const navigate=useNavigate();
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    const checkUserToken= useCallback(()=>{
        if(!localStorage.getItem('user_object'))
        {
            return navigate('/login');
        }
        const userObject= JSON.parse(localStorage.getItem('user_object'))
        //console.log(userToken)
        if((userObject.role!=='admin')) {
            setIsLoggedIn(false);
            console.log('Invalid Token. Redirecting')
            return navigate('/login');
        }

        setIsLoggedIn(true);
    },[])

    useEffect(
        ()=>{
            checkUserToken();
        },[isLoggedIn]
    )

    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : navigate('/login')
            }
        </React.Fragment>
    )
}

export default AdminProtectedRoute;