import React from 'react'
import './styles.css'
import Stars from '../Stars/Stars';

export default function BookCard({ land, title, author, img, price, score }) {
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

        </div>
    )
}
