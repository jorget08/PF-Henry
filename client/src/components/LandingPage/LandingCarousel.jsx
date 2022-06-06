import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks, getCategories, getCart } from '../../redux/actions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import './Carousel.css';
export default function LandingCarousel() {
    const categories = useSelector(state => state.categories);
    function renderImages() {
        let images = [];
        for (let i = 0; i <= 10; i++) {
            if (categories[i].img)
                images.push({ img: categories[i].img, name: categories[i].name })
        }
        return images
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBooks)
        dispatch(getCategories)

    }, [dispatch]);

    const legends = ['See Our Collection of the Best Adventures Books', "Are you Ready to Watch The world Like you've never Seen it?", "Catch Me if You can... Best Crime Fiction Books", "What was that?! Want to be Afraid of something?", 'At some point, we all Have to Learn Something!', 'Remember to Breath While Reading this books...']

    return (
        <Carousel className='carousel' showThumbs={false} transitionTime={1000} autoPlay={true} infiniteLoop={true} interval={2800} emulateTouch={true} showArrows={true}>
            {categories.length &&
                renderImages()
                    .map((e, i) =>
                        e &&
                        <Link to={`Home/${e.name}`}>
                            <div>

                                <div className='newSlide' key={e.name}>
                                    {/* {console.log(books)} */}
                                    <img src={e.img} alt={e.name} />
                                    <p className="legend" style={{ fontSize: '20px' }}>Discover all About {e.name}</p>
                                </div >
                                <div className="titles">
                                    <h1 >{legends[i]}</h1>
                                </div>
                            </div>
                        </Link>
                    )
            }

        </Carousel >
    )
}
