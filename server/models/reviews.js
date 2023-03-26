import mongoose from 'mongoose'

 const reviewSchema = mongoose.Schema(
   {
     name: { type: String, required: true },
     rating: { type: Number, required: true },
     comment: { type: Array,default:[], required: true },
     user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
       },
    },
   {
     timestamps: true,
   }
 )
   const Reviews= mongoose.model('Reviews', reviewSchema)

   export default Reviews;