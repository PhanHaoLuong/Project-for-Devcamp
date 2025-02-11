import express from 'express';

import user from '../models/user.model.js';
import { editUserProfile, updateVisits } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/:userid', async (req, res) => {
    try {
        const userid = req.params.userid;
        const userinfo = await user.findOne({ _id: userid },{password:0})
        .populate('posts');
        res.status(200).json(userinfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:userid/visit', updateVisits);

router.post('/:userid/edit', editUserProfile); 

export default router;
