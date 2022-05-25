import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {getDetail, clear} from "../../redux/actions";

export default function BookDetail() {
  
  const dispatch= useDispatch()
  const {id}= useParams()

  useEffect(()=>{
    dispatch(getDetail(id))
    return ()=>{
      dispatch(clear())
    }
  },[dispatch, id])
  
  var bookDet = useSelector(state=>state.detail)

  return (
    <div>
      <Link to="/home"><button>Volver a página principal</button></Link>
      <h1>{bookDet.title}</h1>
      <h2>{bookDet.author}</h2>
      <h3>{bookDet.genre}</h3>
      <img src={bookDet.imgUrl} alt=""/>
      <h3>{bookDet.price}</h3>
      <h3>{bookDet.review}</h3>
      <h4>Reseña: {bookDet.description}</h4>
      <button>Agregar a carrito</button>
    </div>
  )
}

