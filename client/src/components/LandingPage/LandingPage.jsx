import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./LandingPage.css"
import { IoLocationOutline } from 'react-icons/io5'
import { MdOutlineLocalShipping } from 'react-icons/md'
import { BsCashCoin } from "react-icons/bs"
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavBar from "../NavBar/NavBar";
import SectionCat from "./SectionCat";
import { getLandingTop, getLandingTopCat, getUser } from "../../redux/actions";
import LandingCarousel from "./LandingCarousel";
import Footer from "../Footer/Footer";
export default function LandingPage() {
    const dispatch = useDispatch()
    const bookCategories = useSelector(state => state.categoriesLand)
    const bookScore = useSelector(state => state.score)


    AOS.init();
    useEffect(() => {
        dispatch(getLandingTop())
        dispatch(getLandingTopCat())
        dispatch(getUser())
    }, [])



    return (
        <div>


            <NavBar />
            <div className="landing">

                <LandingCarousel />

                <div className="landInfo">
                    <div className="eachLandInfo">
                        <IoLocationOutline size={45} className="icon" />
                        <div className="landInfoText">
                            <p>Find books Arround the World</p>
                            <span> Recieve it at your place</span>
                        </div>
                    </div>
                    <div className="eachLandInfo">
                        <MdOutlineLocalShipping size={50} className="icon" />
                        <div className="landInfoText">
                            <p>Free Shipping</p>
                            <span>For your purchases above $50</span>
                        </div>
                    </div>
                    <div className="eachLandInfo">
                        <BsCashCoin size={45} className="icon" />
                        <div className="landInfoText">
                            <p>Look Out our Payments Method</p>
                            <span>All credit cards and Crypto</span>
                        </div>

                    </div>
                </div>

                <div className="dataLeft" data-aos='fade-right' data-aos-duration="2000" data-aos-offset="100">
                    <h1>Look out the most awesome books. If you want it, we have it!</h1>
                    <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZSUyMGxpYnJhcnl8ZW58MHx8MHx8&w=1000&q=80" alt="" />
                </div>
                <div className="dataRight" data-aos='fade-left' data-aos-duration="2000" data-aos-offset="100">
                    <img src="https://media.istockphoto.com/photos/close-up-of-hands-cargo-staff-are-delivering-cardboard-boxes-with-picture-id1174589920?k=20&m=1174589920&s=612x612&w=0&h=zC25oGoYo7RXTXRyvmxIjQgsHpG3RdTSn-fJm-_BcnA=" alt="" />
                    <h1>Recieve your favourites books at your house</h1>
                </div>
                <div data-aos='fade-up' data-aos-duration="2000" data-aos-offset="100">
                    <div className="dataUp">
                        <h1>We add Paypal and Cyrpto so you can buy your book!</h1>
                        <img src="https://cdn.blogtienao.com/wp-content/uploads/2021/11/bitcoin-xu-ly-nhieu-hon-paypal-62-tong-gia-tri-giao-dich-trong-nam-2021.jpg" alt="" />

                    </div>
                </div>
                <div className="sections" data-aos="zoom-in" data-aos-offset="100" data-aos-duration="2000">
                    <h1>Our Recommended Books</h1>
                    {bookScore.length &&
                        <SectionCat books={bookScore} />}
                    {bookCategories.Adventures &&
                        <SectionCat books={bookCategories.Adventures} title={'Adventure'} />}
                    {bookCategories.Thriller &&
                        <SectionCat books={bookCategories.Thriller} title={'Thriller'} />}
                    {bookCategories.Academic &&
                        <SectionCat books={bookCategories.Academic} title={'Academic'} />}
                </div>

                <br />
            </div>

            <Footer />
        </div>
    )
}