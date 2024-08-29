import React from 'react';
import { forwardRef, useId } from 'react';

const Input = forwardRef(({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();

    return (
        <div className='w-full mb-4'>
            {label && (
                <label 
                    className='block mb-2 text-sm font-medium text-gray-700' 
                    htmlFor={id}>
                    {label}
                </label>
            )}
            <input 
                type={type} 
                className={`px-4 py-2 rounded-lg bg-gray-50 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 border border-gray-300 w-full ${className}`} 
                ref={ref} 
                id={id} 
                {...props} 
            /> 
        </div>
    );
});

export default Input;
