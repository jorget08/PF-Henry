import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBooks, getReviews, getSales, getSupport, getUsers } from '../../redux/actions';
import Card from './Cards/Card';
import CardU from './Cards/CardU';
import CardB from './Cards/CardB';
import CardR from './Cards/CardR'
import CardS from './Cards/CardS'
import s from './Container.module.css';

export default function Container() {

  const dispatch = useDispatch()
  const allBooks = useSelector(state => state.books)
  const allUsers = useSelector(state => state.users)
  const allSales = useSelector(state => state.sales)
  const allReports = useSelector(state => state.reviews)
  const allSuports = useSelector(state => state.support)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getBooks)
    dispatch(getSales())
    dispatch(getReviews())
    dispatch(getSupport())
  }, [dispatch])

  return (
    <><div>
    {user.rols?.name === "admin" ?
    <div>
      <h1 className={s.h1}>Welcome, this is your god mode!</h1>
      <div className={s.Container}>
        <Card books={allBooks} />
        <CardU users={allUsers} />
        <CardB sales={allSales} />
        <CardR reports={allReports}/>
        <CardS supports={allSuports}/>
      </div>
      </div>:
      <div className="aviso">
      <h2>You don't have access here, please go back home</h2>
      <Link to={`/home`}>
      <button className='minimize'>Back home</button>
      </Link>
      </div>}
      </div>
    </>
  )
}