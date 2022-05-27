import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetail, clearDetail, getBooks } from "../../redux/actions";
import DetailCompra from '../DetailCompra/DetailCompra';
import NavBar from '../NavBar/NavBar'
import { AiFillStar } from "react-icons/ai"
import { AiOutlineStar } from "react-icons/ai"

import "./styles.css"

export default function BookDetail() {

  const dispatch = useDispatch()
  const { id } = useParams()
  useEffect(() => {
    dispatch(getDetail(id))
    return () => {
      dispatch(clearDetail())
    }
  }, [dispatch, id])

  var bookDet = useSelector(state => state.detail)
  var stars = [false, false, false, false, false];
  return (
    <div className='all'>
      <NavBar />
      {bookDet.title &&
        <div className='container'>
          <div className='container__info'>
            <div className='image'>
              <img src={bookDet.image} alt="" />
              <DetailCompra title={bookDet.title} author={bookDet.author} price={bookDet.price} categories={bookDet.categories} id={bookDet.id}></DetailCompra>
            </div>
            <div className='info'>
              <h1>{bookDet.title}</h1>
              {
                bookDet.score &&
                <div>
                  {stars.forEach((e, i) => {
                    if (i <= bookDet.score - 1) stars.splice(i, 1, true)
                  })}
                  {stars.map(e => e ? <AiFillStar /> : <AiOutlineStar />)}
                </div>

              }

              <div className=''>
                <p>Author: <strong>{bookDet.author}</strong></p>
                <p>{bookDet.description}</p>
                <p>Literary Genres:</p>
                <ul className='genres'>
                  {bookDet.categories?.map(e => {
                    return (
                      <li className='genre'>{e.name}</li>
                    )
                  })}

                </ul>

              </div>
            </div>

          </div>
        </div>

      }
    </div>
  )
}

