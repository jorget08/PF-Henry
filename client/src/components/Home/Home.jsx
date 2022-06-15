import React, { useState } from 'react'
import ShowBooks from '../ShowBooks/ShowBooks'
import NavBar from '../NavBar/NavBar'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks, getCategories, getCart, getUser } from '../../redux/actions';
import styles from "./styles.css"
import Filters from '../Filters/Filters';
import { useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Home() {
    const { search } = useParams()
    console.log(search)
    const dispatch = useDispatch()
    const [page, setPage] = useState(0)
    const [newBooks, setNewBooks] = useState(false)
    var books = useSelector(state => state.books)
    var categories = useSelector(state => state.categories)
    useEffect(() => {
        if (!books.length) dispatch(getBooks)
        dispatch(getCategories)
        dispatch(getCart())
        dispatch(getUser())
    }, [dispatch])


    let searchCat = categories.filter(e => e.name === search);
    console.log(searchCat)
    function renderBooks() {
        setNewBooks(newBooks ? false : true)
    }
    return (
        <div>
            <NavBar />
            {!books.length?<div className="filters">

            <Filters books={books} func={renderBooks} categories={categories} isCategory={searchCat.length} category={search}/>
            </div>:""}
            {books?.length ?
                <ShowBooks books={books} search={searchCat.length} func={renderBooks} categories={categories} isCategory={searchCat.length} category={search}/>
                :
                <div className='loading'>
                </div>
            }
            <Footer />
        </div>
    )
}
