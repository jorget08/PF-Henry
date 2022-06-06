import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getDetail, clearDetail, deleteBook, addComment, showComments } from "../../redux/actions";
import DetailCompra from '../DetailCompra/DetailCompra';
import { Formik, Form, Field } from 'formik'
import Stars from '../Stars/Stars';
import NavBar from '../NavBar/NavBar'
import "./styles.css"

export default function BookDetail() {

  const [isAdmin, setIsAdmin] = useState(false)
  const user = useSelector(state => state.user)
  const history = useHistory()
  const token = localStorage.getItem("token")
  const [comment, setComment] = useState("")

  console.log("hystory", history)

  const redirect = () => {
    history.push("/home")
  }

  const dispatch = useDispatch()
  const { id } = useParams()
  var comments = useSelector(state => state.comments)
  useEffect(() => {
    dispatch(getDetail(id))
    dispatch(showComments(id))
    return () => {
      dispatch(clearDetail())
    }
  }, [dispatch, id])

  var bookDet = useSelector(state => state.detail)
  var stars = [false, false, false, false, false];

  function delet(e) {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete this book: ${bookDet.title}?`)) {
      dispatch(deleteBook(bookDet.id))
      alert("The book has been deleted successfully!")
      redirect()
    }
  }

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
                <Stars score={bookDet.score} />

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
              {user.rols?.name === "admin" ?
                <>
                  <Link to={{
                    pathname: '/createbook',
                    state: {
                      detail: { ...bookDet }
                    }
                  }}>
                    <button type="button">Modify book</button>
                  </Link>
                  <button type="button" onClick={(e) => delet(e)}>Delete Book</button>
                </>
                : ""}
            </div>
          </div>
        </div>

      }
      <div>
        <h3>Comments:</h3>
        {comments.length ? comments.map(e => {
          return (<div>
            <h4>{e.title}</h4>
            <p>{e.description}</p>
          </div>
          )
        }) :
          <p>Be the first to comment this book</p>}
      </div>
      {token ? <div>
        <h3>Add a comment:</h3>
        <Formik
          initialValues={{
            title: "",
            description: ""
          }}
          validate={(valores) => {
            let errors = {};
            if (valores.title > 50) {
              errors.title = "The title of the review cannot have more than 50 characters";
            }
            if (valores.description > 1000) {
              errors.description = "The review cannot have more than 1000 characters";
            }
            return errors;
          }}
          onSubmit={(valores, { resetForm }) => {
            var rev = {
              review: {
                title: valores.title,
                description: valores.description
              },
              book: bookDet.id,
              user: user.idUser
            }
            dispatch(addComment(rev))
            resetForm()
          }}>
          {({ touched, errors }) => (
            <Form>
              <div>
                <label>Title</label>
                <Field type="text" name="title" placeholder="Title" />
                {touched.title && errors.title && <span>{errors.title}</span>}
              </div>
              <div>
                <label>Review</label>
                <Field type="text" name="description" placeholder="Review" />
                {touched.review && errors.review && <span>{errors.review}</span>}
              </div>
              <button type="submit">Send review</button>
            </Form>
          )}
        </Formik>
      </div> : <p>Log in to comment</p>}
    </div>
  )
}

