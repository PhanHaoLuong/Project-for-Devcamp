import express from 'express';

import user from '../models/user.model.js';

const router = express.Router();

router.get('/:userid', async (req, res) => {
    try {
        const userid = req.params.userid;
        const userinfo = await user.findOne({ _id: userid },{password:0});
        res.status(200).json(userinfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router