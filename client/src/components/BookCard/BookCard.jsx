import React from 'react'
import styles from './styles.css'

export default function BookCard({ title, author, img, price, score }) {
    title = title.split(':')[0];
    return (
        <div className='card'>

            <img src={img} alt={title} />
            <div className='info'>

                <h3>{title}</h3>

                <h5>{author}</h5>
                <div className='price'>
                    <h4>${price}</h4>
                    <h4>Stars: {score}</h4>
                </div>

            </div>

        </div>
    )
}
