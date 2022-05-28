import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterCategory, filterScore, filterPrice, ordenTitle } from "../../redux/actions"
import { IoSearchCircleOutline } from 'react-icons/io5'
import './styles.css'

export default function Filters({ books, categories, func }) {

    const dispatch = useDispatch();
    const puntajes = [1, 2, 3, 4, 5]
    const [price1, setPrice1] = useState(1)
    const [price2, setPrice2] = useState(30)

    function handleFilterCategory(e) {
        e.preventDefault();
        dispatch(filterCategory(e.target.value))
        func();
    }

    function handleFilterScore(e) {
        e.preventDefault();
        dispatch(filterScore(e.target.value))
        func();

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

    }

    function handleOrdenTitle(e) {
        e.preventDefault();
        dispatch(ordenTitle(e.target.value))
        func();

    }

    return (
        <div className='filters'>
            <div className='selects'>

                <div className='filter'>
                    <select defaultValue={'default'} onChange={e => handleFilterCategory(e)}>
                        <option value="default" hidden>Select a Category</option>
                        <option value="All">All</option>
                        {categories.map(genero => {
                            return (<option value={genero.name} key={genero.id}>{genero.name}</option>)
                        })}
                    </select>
                </div>
                <div className='filter'>
                    <select defaultValue={'default'} onChange={e => handleFilterScore(e)}>
                        <option value="default" hidden>Select a Score</option>
                        {puntajes.map(puntaje => {
                            return (<option value={puntaje} key={puntaje}>{puntaje}</option>)
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
                <input type="range" defaultValue={1} min="1" max="30" onChange={(e) => handleChange1(e)} />
                <p>${price1}, 00</p>
                <p>Max Price </p>
                <input type="range" defaultValue={30} min={"1"} max="30" onChange={(e) => handleChange2(e)} />
                <p>${price2}, 00</p>
                <IoSearchCircleOutline className='icon' size={30} onClick={(e) => handleClick(e)} />
            </div>
        </div>
    )
}
