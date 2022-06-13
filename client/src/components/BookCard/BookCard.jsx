import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';


import {  helpCall, } from '../../helCall';
import { deleteFavs, postFavs } from '../../redux/actions';

import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import './styles.css'   
import Stars from '../Stars/Stars';

import { useSelector,useDispatch } from 'react-redux';
import Swal from "sweetalert2";


export default function BookCard({ land, title, author, img, price, score, id,stock }) {
    const styles = { alignSelf: "flex-end", padding: "10px", color: "#bf3030" };
  
    const user = useSelector(state => state.user);
    const dispatch=useDispatch()
    const [logueado, setLogueado] = useState(false)
    const [isFav, setIsFav] = useState(false)
   
    const obj = {
        user: user.idUser,
        favs: id
    }


    useEffect(() => { 
        if (Object.keys(user).length !== 0) {
            setLogueado(true)

            helpCall(`/favourites/fav?book=${id}&user=${user.idUser}`)
                .then(res => setIsFav(res))
            

        }
        if(Object.keys(user).length === 0) return setLogueado(false)
    }, [ id,user])


    function handleFav() {
        if (isFav == false) {
            
            
            if (logueado) {
                dispatch(postFavs(obj))


                setIsFav(true)

                    
                
            } else Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You must login first to do this!',
              })

        }
        if (isFav == true) {
            

            dispatch(deleteFavs(user.idUser, id))
            setIsFav(false)

        }
    }

    return (
        <div className='card' id={land ? 'nonBox' : ''}>
<Link className='linkCard' to={`/book/${id}`}>
            <img src={img} alt={title} />
            
                <div className='info'>

                    <h3>{(title.length>60)? (title.slice(0,60) + "...") : title}</h3>

                    <h5>Author: {(author.length>30)? (author.slice(0,30) + "...") : author}</h5>
                    <div className='price'>
                        <Stars score={score} className="icon" />
                        <span>${price}, 00</span>
                    </div>

                </div>
            </Link>

            <div style={{justifySelf: "flex-end"}}>
                {isFav ?
                    <AiFillHeart size={35} style={styles} onClick={handleFav} />
                    :
                    <AiOutlineHeart size={35} style={styles} onClick={handleFav} />
                }
            </div>

        </div>
    )
}