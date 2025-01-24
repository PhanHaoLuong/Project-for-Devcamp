import post from '../models/post.model.js'
import code from '../models/code.model.js'
import user from '../models/user.model.js'

// Search posts by title
export const search = async (req, res) => {
    try {
        const searchQuery = req.query.q
        const posts = await post.find({title: {$regex: searchQuery, $options: 'i'}})
        .populate('author', 'name')
        .populate('code', 'language data lines')
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).send(error.message)
    }
}