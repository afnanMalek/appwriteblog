import React from 'react';
import database_services from '../appwrite/config';
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="block transform transition-transform duration-200 hover:scale-105">
            <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
                <div className='w-full mb-4'>
                    <img 
                        src={database_services.getFilePreview(featuredImage)} 
                        alt={title} 
                        className='w-full h-48 object-contain'
                    />
                </div>
                <div className="p-4">
                    <h2 className='text-lg font-bold text-gray-800 line-clamp-2'>
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
