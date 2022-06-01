import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import NavBar from "../NavBar/NavBar";
import SectionCat from "./SectionCat";
import { getLandingTop, getLandingTopCat } from "../../redux/actions";
import LandingCarousel from "./LandingCarousel";
export default function LandingPage() {
    const dispatch = useDispatch()
    const bookCategories = useSelector(state => state.categoriesLand)
    const bookScore = useSelector(state => state.score)



    useEffect(() => {
        dispatch(getLandingTop())
        dispatch(getLandingTopCat())
    }, [])



    return (
        <>

           
            <NavBar />
            <LandingCarousel />
            {bookScore.length &&
                <SectionCat books={bookScore} title={'Relevance'} />}
            { }
            {bookCategories.Adventures &&
                <SectionCat books={bookCategories.Adventures} title={'Adventure'} />}
            {bookCategories.Thriller &&
                <SectionCat books={bookCategories.Thriller} title={'Thriller'} />}
            {bookCategories.Academic &&
                <SectionCat books={bookCategories.Academic} title={'Academic'} />}


        </>
    )
}