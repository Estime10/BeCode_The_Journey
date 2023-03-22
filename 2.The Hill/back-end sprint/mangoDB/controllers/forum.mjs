import User from "../models/user.mjs";

// get forum
export const getForum = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.render("forum", { users });
    } catch (err) {
        res.json({ message: err.message });
    }
    }