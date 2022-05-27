import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {getDetail, clearDetail, getBooks} from "../../redux/actions";
import DetailCompra from '../DetailCompra/DetailCompra';
import "./BookDetail.css"

export default function BookDetail() {
  
  const dispatch= useDispatch()
  const {id}= useParams()


  useEffect(()=>{    
    dispatch(getDetail(id))
    return ()=>{
      dispatch(clearDetail())
    }
  },[dispatch, id])
  
  var bookDet = useSelector(state=>state.detail)
  console.log(bookDet.id)
  return (
    <div>
      <Link to="/home"><button>Volver a página principal</button></Link>
      <div className='Izq'>
      <img src={bookDet.image} alt=""/>
      <h3>{bookDet.score}</h3>
      <h4>Reseña: {bookDet.description}</h4>
      </div>
      <div className='Der'>
        <DetailCompra title={bookDet.title} author={bookDet.author} price={bookDet.price} categories={bookDet.categories} id={bookDet.id}></DetailCompra>
      </div>
    </div>
  )
}

