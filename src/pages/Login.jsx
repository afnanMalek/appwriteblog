import React from 'react';
import { Login as Login_Component } from '../components';

function LoginPage() {
    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-black'>
            <Login_Component />
        </div>
    );
}

export default LoginPage;


