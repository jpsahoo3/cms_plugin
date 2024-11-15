// pages/create-post.js

import Head from 'next/head';
import WysiwygEditor from '../components/WysiwygEditor';
import { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter(); // Initialize router

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, slug, content }),
            });

            // Check if the response is successful
            if (!response.ok) {
                // Handle specific error responses
                const errorData = await response.json();
                console.error('Failed to create post:', errorData);
                alert(`Error: ${errorData.message || 'Failed to create post.'}`);
                return; // Exit the function early
            }

            const data = await response.json();

            // Redirect to manage posts page after successful creation
            router.push('/manage-posts'); // Redirect to manage posts page
        } catch (error) {
            alert('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div>
            <Head>
                <title>Create Post</title>
            </Head>
            <h1>Create New Post</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Slug" 
                    value={slug} 
                    onChange={(e) => setSlug(e.target.value)} 
                    required 
                />
                <WysiwygEditor content={content} setContent={setContent} />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
}