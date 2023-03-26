import mongoose from "mongoose";
import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import movieRoutes from "./routes/review.js"
import morgan from "morgan";
import sessions from 'client-sessions';
import { register } from "./controllers/auth.js";
//import MovieList from "./data/index.js"
//import Movielist from "./models/MovieList.js";
//import Movie from "./models/User.js";
//import Movies from "./models/User.js";
//import user from "./data/user.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Content-Type', 'application/json; charset=utf-8')
  next();
});

app.use(sessions({
  cookieName: 'sessioncookies',
  secret: 'lets-assume-this-is-a-good-secret',
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 60 * 60 * 1000,
}));

/* ROUTES WITH FILES */
app.post("/auth/register", register);
app.get('/movie', (req, res) => {
    Movie.find()
      .sort({ date: -1 })
      .then(reviews => res.json(reviews))
      .catch(error => console.error(error));
  });

  app.post('/:id/reviews', (req, res) => {
    const { user, rating, comment } = req.body;
    const newReview = new Movie({ user, rating, comment });
    newReview.save()
      .then(review => res.json(review))
      .catch(error => console.error(error));
  });

  app.delete('/reviews/:id', (req, res) => {
    const { id } = req.params;
    Review.findByIdAndDelete(id)
      .then(() => res.json({ success: true }))
      .catch(error => console.error(error));
  });

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/api/movies", movieRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        /* ADD DATA ONE TIME */
        //Movies.insertMany(user);
       //Movielist.insertMany(MovieList);
    })
    .catch((error) => console.log(`${error} did not connect`));