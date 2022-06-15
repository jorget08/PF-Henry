import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'

import NavBar from "../../NavBar/NavBar";
import BookCard from "../../BookCard/BookCard";

import { getFavs } from "../../../redux/actions";

export function UserFavs() {
    const user=useSelector(state=>state.user)
    const token = localStorage.getItem("token")
    const favs = useSelector(state=>state.favs)


    const dispatch =useDispatch()


    useEffect(()=>{
        dispatch(getFavs(user.idUser))  
    },[])

    return (
        <>
            <NavBar />
            {token?
            <>
            <h2>My favorites</h2>
            <div className='catalogue'>
                {
                    favs.length !==0?
                     favs.map(b => {
                        return (
                                <BookCard title={b.title} img={b.image} author={b.author} price={b.price} score={b.score} id={b.id}></BookCard>
                        )
                    })
                    :
                    <h3>You have no favorites</h3>
                }
            </div>
            </>:
            <div  className="aviso">
            <h2>You need to be logged in to access here</h2>
            <Link to={`/home`}>
            <button className='minimize'>Back home</button>
            </Link>
            </div>}

        </>
    )
}