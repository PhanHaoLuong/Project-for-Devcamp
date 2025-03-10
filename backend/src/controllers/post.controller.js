import post from '../models/post.model.js'
import user from '../models/user.model.js'
import code from '../models/code.model.js'

export const create_post = async (req, res) => {
    const author = res.locals.user._id
    const { title, content, codeData, files_metadata, tags } = req.body
    let postid = null
    try {
        if (!codeData.data){
            const newPost = new post(Object.assign({}, {author: author, title: title, content: content, files_metadata: files_metadata, tags: tags}))
            await user.updateOne({_id: author}, {$push: {posts: newPost._id}})
            await newPost.save();
            postid = newPost._id
        } else{
            const newCode = new code(Object.assign(codeData, {author: author}))
            const newPost = new post(Object.assign({}, {author: author, code: newCode._id, title: title, content: content, files_metadata: files_metadata, tags: tags}))
            await newCode.save();
            await newPost.save();
            await user.updateOne({_id: author}, {$push: {posts: newPost._id}})
            postid = newPost._id
        }
        res.status(201).json({"redirect" : postid})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const delete_post = async (req, res) => {
    const postid = req.params.postid
    const author = req.body.author
    try {
        await user.updateOne({_id: author}, {$pull: {posts: postid}})
        await post.deleteOne({_id: postid})
        res.status(200).send("OK")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const get_post = async (req, res, next) => {
    try {
        const page = req.query.page || 1
        if (page == 1) {
            const postid = req.params.postid
            const singlepost = await post.findById(postid)
            .populate('author', 'name')
            .populate('code', 'language data lines')

            res.locals.singlepost = singlepost
            next()
        }
        else{
            next()
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const get_forum_posts = async (req, res) => {
    try{
        const page = req.query.page
        const limit = 20
        const skip = (page - 1) * limit

        const posts = await post.find(
            {parent_post_id: { $exists: 0 }},{},
            {skip: skip, limit: limit, sort: {createdAt: -1}}
        ).populate('author', 'name')

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const create_comment = async (req, res) => {
    const postid = req.params.postid
    const author = res.locals.user._id
    const { content, codeData } = req.body 
    try {
        if (!codeData.data) {
            const newComment = new post(Object.assign({}, {author: author, content: content, parent_post_id: postid, is_comment: true, title: "comment"}))
            await user.updateOne({_id: author}, {$push: {posts: newComment._id}})
            await newComment.save();
        } else{
            const newCode = new code(Object.assign(codeData, {author: author}))
            const newComment = new post(Object.assign({}, {author: author, code: newCode._id, content: content, parent_post_id: postid, is_comment: true, title: "comment"}))
            await newCode.save();
            await newComment.save();
            await user.updateOne({_id: author}, {$push: {posts: newComment._id}})
        }
        res.status(201).json({"redirect" : postid})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const delete_comment = async (req, res) => {
    const commentid = req.body.commentid
    try {
        await post.deleteOne({_id: commentid})
        res.status(200).send("OK")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const get_post_comments = async (req, res) => {
    try {
        const postid = req.params.postid

        const page = req.query.page || 1
        const limit = 5
        const skip = (page - 1) * limit
        
        const singlepost = res.locals.singlepost
        if (page == 1) {
            if (singlepost.accepted_comment_id != null) {
                const accepted_comment = await post.find({_id: singlepost.accepted_comment_id}).populate('author', 'name').populate('code', 'language data lines')
                const comments = await post.find(
                    {parent_post_id: postid, _id: {$ne: singlepost.accepted_comment_id}},{},
                    {skip: skip, limit: limit - 1, sort: {votes: -1}})
                    .populate('author', 'name')
                res.status(200).json({post: res.locals.singlepost, accepted_comment: accepted_comment, comments: comments})
            }
            else{
                const comments = await post.find(
                    {parent_post_id: postid},{},
                    {skip: skip, limit: limit, sort: {votes: -1}})
                    .populate('author', 'name')
                    .populate('code', 'language data lines')
                res.status(200).json({post: res.locals.singlepost, comments: comments})
            }
        }
        else {
            const comments = await post.find(
                {parent_post_id: postid},{},
                {skip: skip, limit: limit, sort: {votes: -1}})
                .populate('author', 'name').populate('code', 'language data lines')
            res.status(200).json({comments: comments})
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const accept_comment = async (req, res) => {
    const postid = req.params.postid
    const commentid = req.body.commentid
    try {
        await post.updateOne({_id: postid}, {accepted_comment_id: commentid})
        res.status(200).send("OK")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const savePost = async (req, res) => {
    const { userId } = req.body;
    const postId = req.params.postId;

    try {
        const User = await user.findById(userId);
        if (!User) {
            return res.status(404).json({ message: "User not found." });
        }

        if (!User.savedPosts.includes(postId)) {
            User.savedPosts.push(postId);
            await User.save();
        }

        res.status(200).json({ message: "Post saved successfully." });
    } catch (err) {
        res.status(500).json({ message: "Error saving post." });
    }
};

export const unsavePost = async (req, res) => {
    const { userId } = req.body;
    const postId = req.params.postId;

    try {
        const User = await user.findById(userId);

        if (!User) {
            return res.status(404).json({ message: "User not found." });
        }

        User.savedPosts = User.savedPosts.filter(id => id.toString() !== postId);
        await User.save();
        

        res.status(200).json({ message: "Post unsaved successfully." });
    } catch (err) {
        res.status(500).json({ message: "Error unsaving post." });
    }
};

export const recentPost = async (req, res) => {
    try {
        const page = req.query.page
        const limit = 10
        const skip = (page - 1) * limit

        const posts = await post.find(
            {parent_post_id: { $exists: 0 }},{},
            {skip: skip, limit: limit, sort: {createdAt: -1}}
        ).populate('author', 'name')
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).send(error.message)
    }
}