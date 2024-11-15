// pages/manage-posts.js

import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ManagePosts = () => {
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    // Fetch all posts when the component mounts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    // Handle delete post
    const handleDelete = async (id) => {
        const confirmDelete = confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/posts/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setPosts(posts.filter(post => post.id !== id)); // Remove the deleted post from state
                    alert('Post deleted successfully');
                } else {
                    throw new Error('Failed to delete post');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    return (
        <div>
            <Head>
                <title>Manage Posts</title>
            </Head>
            <h1>Manage Posts</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Slug</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td>{post.title}</td>
                            <td>{post.slug}</td>
                            <td>
                                <button onClick={() => router.push(`/edit-post/${post.id}`)}>Edit</button>
                                <button onClick={() => handleDelete(post.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManagePosts;