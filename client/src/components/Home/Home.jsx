import React from 'react'
import ShowBooks from '../ShowBooks/ShowBooks'
import NavBar from '../NavBar/NavBar'
import Filters from '../Filters/Filters';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks, getCategories } from '../../redux/actions';
import styles from "./styles.css"

export default function Home() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBooks)
        dispatch(getCategories)
    }, [dispatch])

    var books = useSelector(state => state.books)
    var categories = useSelector(state => state.categories)

    console.log(books)
    console.log(categories)

    return (
        <div>
            <NavBar />
            <Filters categories={categories}/>
            {books.length ?
                <ShowBooks books={books} />
                :
                <div className='loading'>
                </div>
            }
        </div>
    )
}
