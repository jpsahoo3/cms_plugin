// // pages/api/posts/[id].js

import Post from '../../../models/Post.js';

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query; // Get the post ID from the query parameters

    switch (method) {
        case 'GET':
            try {
                const post = await Post.findByPk(id); // Fetch post by ID
                if (!post) {
                    return res.status(404).json({ message: 'Post not found' });
                }
                res.status(200).json(post); // Return the post data
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
            break;
        case 'PUT':
            try {
                const { title, slug, content } = req.body;
                const post = await Post.findByPk(id);

                if (!post) return res.status(404).json({ message: 'Post not found' });

                // Update fields
                post.title = title;
                post.slug = slug;
                post.content = content;

                await post.save(); // Save changes to the database
                res.status(200).json(post); // Return updated post
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
            break;
        case 'DELETE':
            try {
                const deletedPost = await Post.destroy({
                    where: { id },
                });
                if (deletedPost === 0) {
                    return res.status(404).json({ message: 'Post not found' });
                }
                res.status(204).end(); // No content to return
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}