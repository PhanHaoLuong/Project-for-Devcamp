import post from '../models/post.model.js'
import user from '../models/user.model.js'
import comment from '../models/comment.model.js'

export const create_post = async (req, res) => {
    const author = req.body.author
    const newPost = new post(req.body)
    try {
        await user.updateOne({_id: author}, {$push: {posts: newPost._id}})
        await newPost.save();
        res.status(201).send("OK")
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
        const limit = 10
        const skip = (page - 1) * limit

        const posts = await post.find(
            {},{},
            {skip: skip, limit: limit, sort: {createdAt: -1}}
        )

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const create_comment = async (req, res) => {
    const postid = req.params.postid
    const newComment = new post(Object.assign(req.body, {parent_post_id: postid, is_comment: true}))
    try {
        await newComment.save();
        res.status(201).send("OK")
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
                const accepted_comment = await post.find({_id: singlepost.accepted_comment_id})
                const comments = await post.find(
                    {parent_post_id: postid, _id: {$ne: singlepost.accepted_comment_id}},{},
                    {skip: skip, limit: limit - 1, sort: {votes: -1}})
                res.status(200).json({post: res.locals.singlepost, accepted_comment: accepted_comment, comments: comments})
            }
            else{
                const comments = await post.find(
                    {parent_post_id: postid},{},
                    {skip: skip, limit: limit, sort: {votes: -1}})
                res.status(200).json({post: res.locals.singlepost, comments: comments})
            }
        }
        else {
            const comments = await post.find(
                {parent_post_id: postid},{},
                {skip: skip, limit: limit, sort: {votes: -1}})
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