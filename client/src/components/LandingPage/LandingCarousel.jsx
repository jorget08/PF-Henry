import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks, getCategories, getCart } from '../../redux/actions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Carousel.css';
export default function LandingCarousel() {
    const categories = useSelector(state => state.categories);
    function renderImages() {
        let images = [];
        for (let i = 0; i <= 10; i++) {
            if (categories[i].img)
                images.push({ img: categories[i].img, name: categories[i].name })
        } console.log(images)
        return images
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBooks)
        dispatch(getCategories)

    }, [dispatch])
    return (
        <Carousel className='carousel' showThumbs={false} transitionTime={1000} autoPlay={true} infiniteLoop={true} interval={2800} emulateTouch={true} showArrows={true}>

            {categories.length &&
                renderImages()
                    .map(e =>
                        e ?
                            <div className='newSlide' key={e.name}>
                                {/* {console.log(books)} */}
                                <img src={e.img} alt={e.name} />
                                <p className="legend">Discover all About {e.name}</p>
                            </div >
                            : <p></p>
                    )
            }

        </Carousel >
    )
}
