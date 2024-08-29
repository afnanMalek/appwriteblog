import React, { useState, useEffect } from 'react';
import database_services from '../appwrite/config';
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector(state => state.auth.userData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                if (userData) { // Only fetch posts if the user is logged in
                    setLoading(true);
                    const data = await database_services.getPosts();
                    if (data) {
                        setPosts(data);
                        setError(null);
                    } else {
                        setPosts([]);
                    }
                } else {
                    setError('User not authenticated');
                }
            } catch (err) {
                console.error("Error fetching posts on Home Page: ", err);
                if (err.response && err.response.status === 401) {
                    setError('User not authenticated');
                } else {
                    setError('Failed to fetch posts');
                }
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [userData]);

    if (!userData) {
        return (
            <div className='w-full py-8 bg-gray-50 text-center'>
                <Container>
                    <div className='flex justify-center'>
                        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
                            <h1 className="text-3xl font-bold text-gray-800">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (loading) {
        return (
            <div className='w-full py-8 bg-gray-50 text-center'>
                <Container>
                    <div className='flex justify-center'>
                        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
                            <h1 className="text-3xl font-bold text-gray-800">
                                Loading...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className='w-full py-8 bg-gray-50 text-center'>
                <Container>
                    <div className='flex justify-center'>
                        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
                            <h1 className="text-3xl font-bold text-red-600">
                                {error}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className='w-full py-8 bg-gray-50 text-center'>
                <Container>
                    <div className='flex justify-center'>
                        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
                            <h1 className="text-3xl font-bold text-gray-800">
                                No posts available
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8 bg-gray-50'>
            <Container>
                <div className='flex flex-wrap -m-4'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-4 md:w-1/2 lg:w-1/3'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
