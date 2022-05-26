import React from 'react'
import ShowBooks from '../ShowBooks/ShowBooks'
import NavBar from '../NavBar/NavBar'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks } from '../../redux/actions';

export default function Home() {

    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(getBooks)
    },[dispatch])

    var books = useSelector(state=>state.books)

    return (
        <div>
            <NavBar />
            <ShowBooks books={books}/>
        </div>
    )
}
