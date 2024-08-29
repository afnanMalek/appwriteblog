import React, { useState } from 'react';
import authService from "../appwrite/auth_service";
import { login } from "./index";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Logo, Input, Button } from './index';
import { useForm } from 'react-hook-form';

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm("");

    const create = async (data) => {
        try {
            console.log("Data of user from Form:", data);
            setError("");
            const session = await authService.createAccount(data);

            if (session) {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    dispatch(login(userData));
                    navigate("/");
                }
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold text-gray-800">Sign up to create an account</h2>
                <p className="mt-2 text-center text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline"
                    >
                        Log In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className="space-y-6">
                        <Input 
                            label="Full Name:" 
                            placeholder="Enter Your Full Name" 
                            type="text"
                            {...register("name", {
                                required: true
                            })}
                        />
                        <Input 
                            label="Email:" 
                            type="email" 
                            placeholder="Enter Valid Email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => 
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input 
                            label="Password:" 
                            placeholder="Enter Password" 
                            type="password"
                            {...register("password", {
                                required: true
                            })}
                        />

                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
