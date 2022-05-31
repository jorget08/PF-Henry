import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks, getCategories, getCart } from '../../redux/actions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Carousel.css';
export default function LandingCarousel() {
    const books = useSelector(state => state.allBook);
    function renderImages() {
        let images = [];
        for (let i = 0; i <= 10; i++) {
            images.push({ img: books[i].image, title: books[i].title, author: books[i].author, categories: books[i].categories })
        }
        return images
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBooks)
        dispatch(getCategories)

    }, [dispatch])
    return (
        <Carousel>

            {books.length &&
                renderImages().map(e =>
                    e ?
                        <div className='newSlide'>
                            {console.log(books)}
                            <img src={e.img} />
                            <p className="legend">By {e.author}... {e.categories}</p>
                        </div>
                        : <p></p>
                )
            }

        </Carousel>
    )
}
