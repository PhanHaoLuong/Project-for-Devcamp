import user from '../models/user.model.js';
import post from '../models/post.model.js';

// Search users by name
export const searchUsers = async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const users = await user.find({ name: { $regex: searchQuery, $options: 'i' } })
        .sort({ reputation: -1 })
        .sort({ createdAt: -1 })
        .limit(10);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Search posts by title
export const searchPosts = async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const posts = await post.find({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { content: { $regex: searchQuery, $options: 'i' } }
            ]
        })
            .populate('author', 'name')
            .populate('code', 'language data lines')
            .sort({ votes: -1 })
            .sort({ createdAt: -1 })
            .limit(10);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).send(error.message);
    }
};