import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import NavBar from "../../NavBar/NavBar";
import BookCard from "../../BookCard/BookCard";

import { getFavs,changeFavs } from "../../../redux/actions";

export function UserFavs() {
    const user=useSelector(state=>state.user)
    const favs = useSelector(state=>state.favs)
    const changed= useSelector(state=>state.changed)
    const dispatch =useDispatch()


    useEffect(()=>{
        
        dispatch(getFavs(user.idUser))
         
     
    },[])
    return (
        <>
            <NavBar />
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

        </>
    )
}