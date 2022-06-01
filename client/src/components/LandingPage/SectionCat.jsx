import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from 'nuka-carousel'
import BookCard from "../BookCard/BookCard";
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from "react-router-dom";
export default function SectionCat({ books, title }) {
    return(
        <>
        <h2>Top 10: {title}</h2>
        <Carousel 
         wrapAround={true}
         slidesToShow={3}
        
         >
             
            {
                books.map((b)=>{
                    return(
                    <Link to={`book/${b.id}`} key={b.id}>
                    <BookCard title={b.title} img={b.image} author={b.author} price={b.price} score={b.score} ></BookCard>
                    </Link>)
                })
            }
        </Carousel>
        </>
    )

}