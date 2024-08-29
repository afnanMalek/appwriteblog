import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-xl font-bold text-white">
          MyBrand
        </span>
      </Link>
    </div>
  );
}

export default Logo;
