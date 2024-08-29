import React from 'react';

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button 
      type={type} 
      className={`px-4 py-2 rounded-lg font-medium transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${textColor} ${bgColor} ${className}`} 
      {...props}>
      {children}
    </button>
  );
}

export default Button;
