import { useContext, useEffect } from 'react';
import { AuthContext } from "./AuthContext";
import { useNavigate } from 'react-router-dom';
import { SignIn } from '../pages/SignIn/index';




export const RequireAuth = ({children}: {children: JSX.Element}) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    
    if(!auth.user) {
        navigate('/login')
        return <SignIn />
    } else {
        return children
    }
   
    
}