import React, { useEffect } from 'react'
import './styles.css'
import Stars from '../Stars/Stars';
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { getFavs } from '../../redux/actions';
import { helpCallPut, helpCall } from '../../helCall';

export default function BookCard({ land, title, author, img, price, score, id }) {
    const styles = { alignSelf: "flex-end", padding: "10px", color: "#bf3030" };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFavs());
    }, [])
    // const favsFilterd = favs.filter(e => e.bookId === id)
    // const user = useSelector(state => state.user);
    // let isFav = favsFilterd.length
    // const favs = useSelector(state => state.favs);
    // const fav = {
    //     user: user.idUser,
    //     favs: id,
    // }

    // function handleFav() {
    //     helpCallPut("/favourites", fav)
    //     dispatch(getFavs());
    // }
    return (
        <div className='card' id={land ? 'nonBox' : ''}>

            <img src={img} alt={title} />
            <div className='info'>
                <h3>{title}</h3>
                <h5>Author: {author}</h5>
                <div className='price'>
                    <Stars score={score} className="icon" />
                    <span>${price}, 00</span>
                </div>

            </div>
            {/* <div>
                {isFav ?
                    <AiOutlineHeart size={35} style={styles} pnClick={handleFav} />
                    :
                    <AiFillHeart size={35} style={styles} pnClick={handleFav} />
                }
            </div> */}

        </div>
    )
}
