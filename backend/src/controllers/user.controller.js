import mongoose from 'mongoose';
import user from '../models/user.model.js';

const editUserProfile = async (req, res) => {
    try {
        const { userid } = req.params;
        const { name, realname, bio } = req.body;
        const updatedUser = await user.findOneAndUpdate
        ({ _id: userid }, { name, realname, bio }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateVisits = async (req, res) => {
    try {
        const { userid } = req.params;
        const { visitorid } = req.body;
        if (!mongoose.Types.ObjectId.isValid(visitorid)) {
            return res.status(400).json({ message: 'Invalid visitor ID' });
        }

        const owner = await user.findOne({ _id: userid });
        if (!owner) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const existingVisit = owner.visits.find(visit => visit.toString() === visitorid);

        if (!existingVisit) {
            owner.visits.push(visitorid);
        }

        await owner.save();
        res.status(200).json({ message: 'Visit updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { editUserProfile, updateVisits };
