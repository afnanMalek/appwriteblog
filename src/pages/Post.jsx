import React, { useState, useEffect } from 'react';
import { Container, Button } from '../components';
import database_services from '../appwrite/config';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from "html-react-parser";


export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    let userId;
    if(userData?.$id){
        userId=userData.$id
    }
    else if(userData.userData?.$id){
        userId=userData.userData.$id;
    }

    const isAuthor = post && userData && post.user_id === userId;

    useEffect(() => {
        if (slug) {
            database_services.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = async () => {
        await database_services.deletePost(post.$id).then((status) => {
            if (status) {
                database_services.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 bg-gray-50">
            <Container>
                <div className="max-w-3xl mx-auto">
                    {post && post.featuredImage && (
                        <img
                            src={database_services.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-auto rounded-xl mb-6 shadow-md"
                            style={{ maxHeight: '400px', objectFit: 'contain' }}
                        />
                    )}
                    
                    <div className="mb-4">
                        <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
                    </div>

                    <div className="prose lg:prose-xl max-w-none">
                        <p text-black>{parse(post.content)}</p>
                    </div>

                    {isAuthor && (
                        <div className="mt-6 flex space-x-4">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    ) : null;
}
