import React, { useState, useEffect } from "react";
import StarRating from "../starRating/starRating";
import axios from "axios";
import "./review.css";

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    
  
    const handleDelete = (id) => {
      axios.delete(`/api/reviews/${id}`)
        .then(res => setReviews(reviews.filter(review => review._id !== id)))
        .catch(error => console.error(error));
    };

    async function submit(e){
		e.preventDefault();
    axios.post('http://localhost:3001/:id/reviews', { rating, reviews })
        .then(res => {
          setReviews([...reviews, res.data]);
          setRating('');
        })
        .catch(error => console.error(error));
		}
		
	

    return (
    <>
    <div className="user-rev"> 
      <div className="rev">
      <h1> Reviews </h1>
      <StarRating/>
        <label className="comm">Comments:</label>
        <textarea className="comm-text"value={comment} onChange={event => setComment(event.target.value)}></textarea>
        <input className="comm-button" type="submit" onClick={submit}/>
        <button className="comm-button" onClick={() => handleDelete(reviews._id)}>Delete</button>
        
        <br></br>
      </div>
     </div>
     </>
)}

export default Review;