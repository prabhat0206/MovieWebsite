import asyncHandler from 'express-async-handler'
import Movielist from '../models/MovieList.js'
import Reviews from "../models/reviews.js";

 const getMovies = asyncHandler(async (req, res) => {
   const movies = await Movielist.find({})
   res.json(movies)
 })

 const getMovieById = asyncHandler(async (req, res) => {
   const movie = await Movielist.findById(req.params.id)

   if (movie) {
     res.json(movie)
   } else {
     res.status(404)
     throw new Error('Movie not found')
   }
 })


const createMovieReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const movie = await Reviews.findById(req.params.id)

  if (movie) {
    const alreadyReviewed = Reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Movie already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    Reviews.push(review)

    movie.numReviews = movie.review.length

    movie.rating =
      movie.review.reduce((acc, item) => item.rating + acc, 0) /
      movie.review.length

    await movie.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Movie not found')
  }
})

 export { getMovies, getMovieById,  createMovieReview }