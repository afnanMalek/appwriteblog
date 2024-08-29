import React from 'react';
import { useId } from "react";

function Select({ label, options = [], className = "", ...props }, ref) {
    const id = useId();
    return (
        <div className='w-full mb-4'>
            {label && (
                <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-700'>
                    {label}
                </label>
            )}
            <select 
                id={id} 
                {...props} 
                ref={ref} 
                className={`px-4 py-2 rounded-lg bg-gray-50 text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 border border-gray-300 w-full ${className}`}>
                {options?.map((option) => (
                    <option key={option} value={option} className="text-gray-900">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select);
