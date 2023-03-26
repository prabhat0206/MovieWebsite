import React, { useState, useEffect } from "react";
import "./starRating.css";
import {FaStar} from "react-icons/fa";
import axios from "axios";



const StarRating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState('');
    
  
    useEffect(() => {
      axios.get('/api/reviews')
        .then(res => setReviews(res.data))
        .catch(error => console.error(error));
    }, []);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('/api/reviews', {rating, comment })
        .then(res => {
          setReviews([...reviews, res.data]);
          setComment('');
        })
        .catch(error => console.error(error));
    };
  
    const handleDelete = (id) => {
      axios.delete(`/api/reviews/${id}`)
        .then(res => setReviews(reviews.filter(review => review._id !== id)))
        .catch(error => console.error(error));
    };

    async function submit(e){
		e.preventDefault();
       
           
        
	}

    return <div> 
        <form className="rating"onSubmit={handleSubmit}>
        {[ ...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
                <label>
                    <input type="radio" 
                    name="rating" 
                    value={ratingValue} 
                    onClick={()=> setRating(ratingValue)}
                    />

                    <FaStar className="star" 
                    color={ratingValue <= (hover || rating)? "#ffc107" : "#e4e5e9"}
                    size={25} 
                    onMouseEnter={()=> setHover(ratingValue)}
                    onMouseLeave={()=> setHover(null)}/>
                </label>
                
            );
        })}
        <p> Your Rating: {rating} <FaStar size={15}/> </p>
        
        </form>
        
     </div>
}

export default StarRating;