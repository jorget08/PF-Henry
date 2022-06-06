import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

import { helpCallPut, helpCall, helpCallDelete } from '../../helCall';
import { changeFavs } from '../../redux/actions';
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import './styles.css'
import Stars from '../Stars/Stars';
import { useSelector,useDispatch } from 'react-redux';

export default function BookCard({ land, title, author, img, price, score, id }) {
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
                helpCallPut('/favourites', obj)
                    .then(res => setIsFav(true))

            } else alert('logueate pliss')
        }
        if (isFav == true) {
            
            dispatch(changeFavs(true))

            
            helpCallDelete(`/favourites?user=${user.idUser}&favs=${id}`)
                .then(res => setIsFav(false))
        }
    }

    return (
        <div className='card' id={land ? 'nonBox' : ''}>
<Link className='linkCard' to={`/book/${id}`}>
            <img src={img} alt={title} />
            
                <div className='info'>

                    <h3>{title}</h3>

                    <h5>Author: {author}</h5>
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