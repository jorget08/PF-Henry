import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./LandingPage.css"
import { IoLocationOutline } from 'react-icons/io5'
import { MdOutlineLocalShipping } from 'react-icons/md'
import { BsCashCoin } from "react-icons/bs"

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
        <div>


            <NavBar />
            <div className="landing">

                <LandingCarousel />

                <div className="landInfo">
                    <div className="eachLandInfo">
                        <IoLocationOutline size={45} className="icon" />
                        <div className="textInfo">
                            <p>Find books Arround the World</p>
                            <span> Recieve it at your place</span>
                        </div>
                    </div>
                    <div className="eachLandInfo">
                        <MdOutlineLocalShipping size={50} className="icon" />
                        <div className="textInfo">
                            <p>Free Shipping</p>
                            <span>For your purchases above $50</span>
                        </div>
                    </div>
                    <div className="eachLandInfo">
                        <BsCashCoin size={45} className="icon" />
                        <div className="textInfo">
                            <p>Look Out our Payments Method</p>
                            <span>All credit cards and Crypto</span>
                        </div>

                    </div>
                </div>

                {bookScore.length &&
                    <SectionCat books={bookScore} />}
                {bookCategories.Adventures &&
                    <SectionCat books={bookCategories.Adventures} title={'Adventure'} />}
                {bookCategories.Thriller &&
                    <SectionCat books={bookCategories.Thriller} title={'Thriller'} />}
                {bookCategories.Academic &&
                    <SectionCat books={bookCategories.Academic} title={'Academic'} />}


            </div>
        </div>
    )
}