import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterCategory, filterScore, filterPrice, ordenTitle } from "../../redux/actions"
import { IoSearchCircleOutline } from 'react-icons/io5'
import Stars from '../Stars/Stars';
import { helpCall } from '../../helCall';
import { setPage } from '../../redux/actions'
import './styles.css'

export default function Filters({ categories, func, category, isCategory }) {

    const dispatch = useDispatch();
    const scores = [1, 2, 3, 4, 5]
    const [price1, setPrice1] = useState(1)
    const [price2, setPrice2] = useState()
    const [maxnum, setMaxnum] = useState(100000000)


    useEffect(() => {
        if (isCategory) dispatch(filterCategory(category))
        helpCall('/books/maxnum')
            .then(res => {
                setMaxnum(res['max'])
                setPrice2(res['max'])
            })


    }, [])
    function handleFilterCategory(e) {
        e.preventDefault();
        dispatch(filterCategory(e.target.value))
        func();
        dispatch(setPage(1));
    }

    function handleFilterScore(e) {
        e.preventDefault();
        dispatch(filterScore(e.target.value))
        func();
        dispatch(setPage(1));
    }

    function handleChange1(e) {
        e.preventDefault();
        setPrice1(e.target.value)
    }
    function handleChange2(e) {
        e.preventDefault();
        setPrice2(e.target.value)

    }
    function handleClick(e) {
        e.preventDefault();
        dispatch(filterPrice(price1, price2))
        func();
        dispatch(setPage(1));
    }

    function handleOrdenTitle(e) {
        e.preventDefault();
        dispatch(ordenTitle(e.target.value))
        func();
        dispatch(setPage(1));
    }

    return (
        <div className='filters'>
            <div className='selects'>
                <button className='showAll' onClick={() => dispatch(filterCategory("All"))}> Show all Books</button>
                <div className='filter'>
                    <select defaultValue={isCategory ? category : 'default'} onChange={e => handleFilterCategory(e)}>
                        <option value="default" hidden>Select a Category</option>
                        <option value="All">All</option>
                        {categories.map(genre => {
                            return (<option value={genre.name} key={genre.id}>{genre.name}</option>)
                        })}
                    </select>
                </div>
                <div className='filter'>
                    <select defaultValue={'default'} onChange={e => handleFilterScore(e)}>
                        <option value="default" hidden>Select a Score</option>
                        <option value="All">All</option>
                        {scores.map(score => {
                            return (<option value={score} key={score}>{score}</option>)
                        })}
                    </select>
                </div>
                <div className='filter'>
                    <select defaultValue={'default'} onChange={e => handleOrdenTitle(e)}>
                        <option value="default" hidden>Order Alphabetically</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>
            </div>
            <div className='range'>
                <p>Min Price </p>
                <input type="range" defaultValue={1} min="1" max={maxnum} onChange={(e) => handleChange1(e)} />
                <p>${price1}, 00</p>
                <p>Max Price </p>
                {console.log(maxnum)}
                <input type="range" defaultValue={maxnum} min={"1"} max={maxnum} onChange={(e) => handleChange2(e)} />
                <p>${price2}, 00</p>
                <IoSearchCircleOutline className='icon' size={30} onClick={(e) => handleClick(e)} />
            </div>

        </div>
    )
}
