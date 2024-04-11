import bcryptjs from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import User from "../models/user";

const signupSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        await signupSchema.validateAsync(req.body);

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ messages: ["Email đã tồn tại"] });
        }

        const hashedPassword = await bcryptjs.hash(password, 12);
        const user = await User.create({ ...req.body, password: hashedPassword });
        
        return res.status(201).json({ user });
    } catch (error) {
        return res.status(500).json({ messages: [error.message] });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ messages: ["Email không tồn tại"] });
        }
        
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ messages: ["Mật khẩu không chính xác"] });
        }
        
        const token = jwt.sign({ userId: user._id }, "123456", { expiresIn: "1h" });
        return res.status(200).json({ user, token });
    } catch (error) {
        return res.status(500).json({ messages: [error.message] });
    }
};
