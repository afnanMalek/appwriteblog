import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Logo, Button } from './index';
import authService from "../appwrite/auth_service";
import { login as authLogin } from '../feature/authSlice';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);

            if (session) {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (err) {
            setError(err.message || "An error occurred during login!");
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50'>
            <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8'>
                <div className='flex justify-center mb-6'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold text-gray-800'>Sign in to your account</h2>
                <p className='mt-2 text-center text-gray-600'>
                    Don&apos;t have an account?&nbsp;
                    <Link to="/signup" className='text-blue-600 hover:underline'>
                        Sign Up
                    </Link>
                </p>
                {error && <p className='mt-4 text-center text-red-600'>{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-6'>
                        <Input
                            label="Email:"
                            placeholder="Enter Your Email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address"
                                }
                            })}
                        />
                        <Input
                            label="Password:"
                            placeholder="Enter Password"
                            type="password"
                            {...register("password", { required: true })}
                        />
                        <Button type="submit" className='w-full'>
                            Log in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
