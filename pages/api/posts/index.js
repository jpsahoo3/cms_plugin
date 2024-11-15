// pages/api/posts/index.js

import Post from '../../../models/Post';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const posts = await Post.findAll(); // Fetch all posts
                res.status(200).json(posts);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;
        case 'POST':
            try {
                const newPost = await Post.create(req.body); // Create a new post
                res.status(201).json(newPost); // Return the created post
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}