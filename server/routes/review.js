import express from 'express'
import {
  getMovies,
  createMovieReview,
  getMovieById,
} from '../controllers/movieController.js'

 const router = express.Router()
 
 router.route('/movie').get(getMovies)
 router.route('/:id/reviews').post(createMovieReview)
 router.route('/:id').get(getMovieById)
 

 export default router 