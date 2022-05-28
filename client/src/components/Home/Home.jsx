import React, { useState } from 'react'
import ShowBooks from '../ShowBooks/ShowBooks'
import NavBar from '../NavBar/NavBar'
import Filters from '../Filters/Filters';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks, getCategories } from '../../redux/actions';
import styles from "./styles.css"

export default function Home() {

    const dispatch = useDispatch()
    const [newBooks, setNewBooks] = useState(false)
    useEffect(() => {
        dispatch(getBooks)
        dispatch(getCategories)
    }, [dispatch])

    var books = useSelector(state => state.books)
    var categories = useSelector(state => state.categories)

    console.log(books)
    console.log(categories)
    function renderBooks() {
        setNewBooks(newBooks ? false : true)
    }
    return (
        <div>
            <NavBar />

            <Filters books={books} func={renderBooks} categories={categories} />
            {books.length ?
                <ShowBooks books={books} />
                :
                <div className='loading'>
                </div>
            }
        </div>
    )
}
