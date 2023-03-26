import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import MovieUser from "../models/MovieUser.js";

//Register
export const register = async(req, res)=>{

    const{
        email,
        password,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new MovieUser({
        email,
        password:passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
};

//loggin
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const user = await MovieUser.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist.. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        req.sessioncookies.token = token;
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};