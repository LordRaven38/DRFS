import React, {useCallback, useEffect, useState} from 'react';
import {Outlet, Route, useNavigate} from 'react-router-dom';

const ProtectedRoute = (props)=>{

    const navigate=useNavigate();
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    const checkUserToken= useCallback(()=>{
        if(!localStorage.getItem('user_object'))
        {
            navigate('/login')
        }
        const userObject = localStorage.getItem('user_object');
        console.log(userObject)
        if(!userObject || userObject === 'undefined') {
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

export default ProtectedRoute;