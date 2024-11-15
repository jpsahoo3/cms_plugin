// pages/edit-post/[id].js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WysiwygEditor from "../../components/WysiwygEditor"

const EditPost = () => {
    const router = useRouter();
    const { id } = router.query; // Get the post ID from the URL
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');

    // Fetch post data when component mounts or ID changes
    useEffect(() => {
        if (id) {
            fetch(`/api/posts/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setPost(data);
                    setTitle(data.title);
                    setSlug(data.slug);
                    setContent(data.content);
                })
                .catch((error) => console.error('Error fetching post:', error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: 'PUT', // Use PUT for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, slug, content }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Failed to update post.'}`);
                return;
            }

            const updatedPost = await response.json();
            // console.log('Post updated:', updatedPost);
            router.push('/manage-posts'); // Redirect after successful update
        } catch (error) {
            console.error('Error updating post:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    if (!post) return <div>Loading...</div>; // Show loading state while fetching

    return (
        <div>
            <h1>Edit Post</h1>
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
                {/* Assuming WysiwygEditor is a rich text editor component */}
                <WysiwygEditor content={content} setContent={setContent} />
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;