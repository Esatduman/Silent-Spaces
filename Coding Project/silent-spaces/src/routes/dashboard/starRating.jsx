import React from "react";
import { FaStar } from "react-icons/fa"
import { useState } from "react";

export default function StarRating() {

    const[rating, setRating] = useState(null)
    const[rateColor, setcolor] = useState(null)

    return (
        <>
        
            {[...Array(5)].map(star => {
                const currentRate = star + 1
                return (

                    <label>
                        
                    <input type="radio" name="rate"
                    value = {currentRate}
                    onClick = {() => setRating(currentRate)}
                    
                    />

                    
                    <FaStar 
                    color = {currentRate <= (hover || rating) ? "yellow" : "gray"}
                    
                    />
                    
                    </label>
                )
                
            })}
        
        
        
        
        </>
    )
}