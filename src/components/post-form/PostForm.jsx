import React from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import database_services from '../../appwrite/config';
import { Input, Button, Select, RTE } from '../index';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            let userId;
            let fileId;

            if (userData?.$id) {
                userId = userData.$id;
            } else {
                userId = userData.userData.$id;
            }

            if (!userId) {
                throw new Error('User ID is undefined');
            }

            if (data.image && data.image.length > 0) {
                const file = await database_services.uploadFile(data.image[0]);
                fileId = file.$id;
            }

            if (post) {
                const updatedPost = await database_services.updatePost(post.$id, {
                    ...data,
                    featuredImage: fileId || post.featuredImage,
                });

                if (updatedPost) {
                    navigate(`/post/${updatedPost.$id}`);
                }
            } else {
                const newPost = await database_services.createPost({
                    ...data,
                    featuredImage: fileId,
                    userId,
                });

                if (newPost) {
                    navigate(`/post/${newPost.$id}`);
                }
            }
        } catch (error) {
            console.error('Error during post creation/updating:', error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        }
        return '';
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                const newSlug = slugTransform(value.title);
                setValue('slug', newSlug, { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-full lg:w-2/3 px-2 mb-6">
                <Input
                    label="Title:"
                    placeholder="Enter the title"
                    className="mb-4"
                    {...register('title', { required: true })}
                />
                <Input
                    label="Slug:"
                    placeholder="Generated slug"
                    className="mb-4"
                    value={getValues('slug')}
                    {...register('slug', { required: true })}
                    readOnly
                />
                <RTE
                    label="Content:"
                    name="content"
                    control={control}
                    defaultValue={getValues('content')}
                />
            </div>

            <div className="w-full lg:w-1/3 px-2 mb-6">
                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('image', { required: !post })}
                />

                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={database_services.getFilePreview(post.featuredImage)}
                            alt={post.name}
                            className="rounded-lg w-full h-auto object-cover"
                        />
                    </div>
                )}
                <Select
                    options={['active', 'inactive']}
                    label="Status"
                    className="mb-4"
                    {...register('status', { required: true })}
                />
                <Button type="submit" bgColor={post ? 'bg-green-500' : undefined} className="w-full">
                    {post ? 'Update' : 'Submit'}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;


