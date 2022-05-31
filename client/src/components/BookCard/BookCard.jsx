import React from 'react'
import './styles.css'
import Stars from '../Stars/Stars';

export default function BookCard({ title, author, img, price, score }) {
    title = title.split(':')[0];
    return (
        <div className='card'>

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
