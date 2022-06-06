import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from 'nuka-carousel'
import BookCard from "../BookCard/BookCard";
import './SectionCat.css'
import { Link } from "react-router-dom";
export default function SectionCat({ books, title }) {
    const buttonStyles = { backgroundColor: "white", color: "black", borderRadius: "50%", padding: "20px", fontSize: "20px", border: "1px solid gray" }
    return (
        <>
            <h2>{title ? `Recommended ${title} Books` : 'Top 10 Relevance'}</h2>
            <Carousel
                wrapAround={true}
                slidesToShow={3}
                className='slidesBooks'
                defaultControlsConfig={{ nextButtonText: ">>", prevButtonText: "<<", nextButtonStyle: buttonStyles, prevButtonStyle: buttonStyles, pagingDotsStyle: { display: "none" } }}
            >
                {
                    books.map((b) => {
                        return (
                            <div style={{ padding: '10px' }}>

                                <BookCard land={true} title={b.title} img={b.image} author={b.author} price={b.price} score={b.score} id={b.id}></BookCard>
                            </div>
                        )
                    })
                }
            </Carousel>
        </>
    )

}