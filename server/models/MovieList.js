import mongoose from 'mongoose';

 const movieSchema = mongoose.Schema(
   {
    
     original_title: {
       type: String,
       required: true,
     },
     genre_ids:{
type: Array
     },
     backdrop_path: {
       type: String,
       required: true,
     },
     poster_path: {
       type: String,
       required: true,
     },
     title: {
       type: String,
       required: true,
     },
     tagline:{
        type:String
     },
     overview: {
       type: String,
       required: true,
     },
     vote_average: {
       type: Number,
       required: true,
       default: 0,
     },
     numReviews: {
       type: Number,
       required: true,
       default: 0,
     },
     vote_count: {
       type: Number,
       required: true,
       default: 0,
     },
     release_date: {
       type: String,
       required: true,
     },
   },
   {
     timestamps: true,
   }
 )

 const Movielist = mongoose.model('Movielist', movieSchema)

 export default Movielist