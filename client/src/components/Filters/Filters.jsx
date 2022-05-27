import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {filterCategory, filterScore, filterPrice, ordenTitle} from "../../redux/actions"

export default function Filters({categories}) {
  
    const dispatch= useDispatch();
    const puntajes = [1,2,3,4,5]
    const [price1, setPrice1] = useState(0)
    const [price2, setPrice2] = useState(0)

    function handleFilterCategory(e){
        e.preventDefault();
        dispatch(filterCategory(e.target.value))
    }

    function handleFilterScore(e){
        e.preventDefault();
        dispatch(filterScore(e.target.value))
    }

    function handleChange1(e){
        e.preventDefault();
        setPrice1(e.target.value)
    }
    function handleChange2(e){
        e.preventDefault();
        setPrice2(e.target.value)
    }
    function handleClick(e){
        e.preventDefault();
        dispatch(filterPrice(price1,price2))
        setPrice1(0)
        setPrice2(0)
    }

    function handleOrdenTitle(e){
        e.preventDefault();
        dispatch(ordenTitle(e.target.value))
    }

    return (
    <div>
        <div>
            <span>Show by category </span>
            <select onChange={e=>handleFilterCategory(e)}>
                {categories.map(genero=>{
                    return(<option value={genero.name} key={genero.id}>{genero.name}</option>)
                })}
            </select>
        </div>
        <div>
            <span>Show by score </span>
            <select onChange={e=>handleFilterScore(e)}>
                {puntajes.map(puntaje=>{
                    return(<option value={puntaje} key={puntaje}>{puntaje}</option>)
                })}
            </select>
        </div>
        <div>
            <span>Price: </span>
            <label>Min: </label>
            <input type="number" onChange={(e)=>handleChange1(e)}/>
            <label>Max: </label>
            <input type="number" onChange={(e)=>handleChange2(e)}/>
            <button onClick={(e)=>handleClick(e)}>Apply</button>
        </div>
        <div>
            <span>Order by </span>
            <select onChange={e=>handleOrdenTitle(e)}>
                <option value="rel">relevance</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>
        </div>
    </div>
  )
}
