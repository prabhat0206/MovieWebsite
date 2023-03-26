import mongoose from "mongoose";

const MovieUserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            max: 50,
            min:2,
            required:true,
            },
            password: {
                type: String,
                required:true,
                min:5,
                path: 'password',
            }
    }
);

const MovieUser = mongoose.model("MovieUser", MovieUserSchema);
export default MovieUser;