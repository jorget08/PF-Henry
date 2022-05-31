import {React, useEffect,useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import AliceCarousel from 'react-alice-carousel';
import { filterCategory, filterScore } from "../../redux/actions";
import BookCard from "../BookCard/BookCard";
import 'react-alice-carousel/lib/alice-carousel.css';
export default function SectionCat() {
    const dispatch=useDispatch()
    const booksRelevants=useSelector(state=>state.relevants)
    useEffect(() => {
      dispatch(filterScore(5))

    }, [dispatch])
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };
    

    return(
        <div>

            <h2></h2>

            { <AliceCarousel
            responsive={responsive}
            mouseTracking items={booksRelevants.map((b)=>{ return <BookCard title={b.title} img={b.image} author={b.author} price={b.price} score={b.score} ></BookCard>}) } /> }
        </div>
    )
    
}