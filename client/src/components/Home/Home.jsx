import React from 'react'
import ShowBooks from '../ShowBooks/ShowBooks'
import NavBar from '../NavBar/NavBar'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks } from '../../redux/actions';
import styles from "./styles.css"

export default function Home() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBooks)
    }, [dispatch])

    var books = useSelector(state => state.books)
    console.log(books)
    return (
        <div>
            <NavBar />
            {books.length ?
                <ShowBooks books={books} />
                :
                <div className='loading'>
                </div>
            }
        </div>
    )
}
