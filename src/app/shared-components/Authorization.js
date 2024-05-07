import React from "react";
import { Navigate } from "react-router-dom";

const Authorization = () => {
    if (localStorage.getItem('auth_role') == 'user') return <Navigate to={'/user/home'} />;
    if (localStorage.getItem('auth_role') == 'admin') return <Navigate to={'/admin/dashboard'} />;
    else return <Navigate to={'/sign-in'}/>
}

export default Authorization