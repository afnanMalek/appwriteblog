import React, { useState, useEffect } from 'react';
import database_services from '../appwrite/config';
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const userdata = useSelector((state) => state.auth.userData);
    const [msg,setmsg]=useState("User Has not Uploaded any Blog!");
    let userId;
    console.log(userdata.userData);

    if (userdata?.$id) {
        userId = userdata?.$id;
    } else if(userdata.userData?.$id) {
        userId = userdata.userData.$id;
    }
    

    useEffect(() => {
        if (userId) {
            const fetchPosts = async () => {
                try {
                    const result = await database_services.getPosts();
                    console.log(result);
                    setPosts(result || []);
                } catch (err) {
                    console.log("Error fetching posts:", err);
                    setPosts([]); 
                }
            };

            fetchPosts();
        }

    }, [userId]);

    useEffect(() => {
        if (posts.some(post => post.user_id === userId)) {
            setmsg(null);
        } 
    }, [posts, userId]);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            post.user_id === userId && (
                                <div key={post.$id}>
                                    <PostCard {...post} />
                                </div>
                            )
                        ))
                    ) : (
                        msg!=null ? (<div className='w-full text-center text-gray-500'>
                            {msg}
                            </div>):(
                            <div className='w-full text-center text-gray-500'>
                             Loading...
                            </div>
                        )
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
