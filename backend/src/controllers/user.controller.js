export const editUserProfile = async (req, res) => {
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