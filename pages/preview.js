// pages/preview.js

import { useEffect, useState } from 'react';

const Preview = ({ slug }) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/posts/${slug}`);
            const data = await response.json();
            setPost(data);
        };
        
        fetchPost();
    }, [slug]);

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    );
};

export async function getServerSideProps(context) {
    const { slug } = context.query;

    return { props: { slug } };
}

export default Preview;