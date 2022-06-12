import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getDetail, clearDetail, deleteBook, addComment, showComments, getBooks, reportReview, updateReview, deleteReview } from "../../redux/actions";
import DetailCompra from '../DetailCompra/DetailCompra';
import { Formik, Form, Field } from 'formik'
import Stars from '../Stars/Stars';
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer';
import "./styles.css"
import { helpCallPut, helpCallUpdate } from '../../helCall';
import Swal from 'sweetalert2'

export default function BookDetail() {

  const [isAdmin, setIsAdmin] = useState(false)
  const user = useSelector(state => state.user)
  const history = useHistory()
  const token = localStorage.getItem("token")
  const [comment, setComment] = useState({ title: 'default', description: '', id: '' })
  const [errors, setErrors] = useState({})

  console.log("hystory", history)
  var bookDet = useSelector(state => state.detail)
  var stars = [false, false, false, false, false];

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



  function delet(e) {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete this book: ${bookDet.title}?`)) {
      dispatch(deleteBook(bookDet.id))
      alert("The book has been deleted successfully!")
      dispatch(getBooks)
      redirect()
    }
  }
  async function reportComment(element) {

    const { value: report } = await Swal.fire({
      title: 'Why do you report this Comment',
      input: 'select',
      inputOptions: {

        type1: 'Dice algo malo',
        type2: 'no me gusta',
        type3: 'xd',
        type4: 'Ogatitoranges'

      },
      inputPlaceholder: 'Select why',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to choose something!'
        }
      }
    })

    if (report) {
      Swal.fire({
        icon: 'success',
        title: 'Se report xd',
      })
    }
    const obj = {
      report: report
    }
    dispatch(reportReview(element.id, bookDet.id, obj))
  }
  function editComment(element) {

    setComment({
      title: element.title,
      description: element.description,
      id: element.id
    })

  }
  function deleteComment(element) {
    dispatch(deleteReview(user.idUser, bookDet.id,element.id))
  }
  function validate(coment) {
    let errors = {};

    if (coment.title === 'default') errors.title = "You need to select an option";
    if (coment.description === '') errors.description = "You need to write something";
    if (coment.description.length >500) errors.description = "You cannot exceed 500 characters";
    
    setErrors(errors)
    return errors;
  }
  
  async function onSubmit(event) {
    event.preventDefault()
      
    
    if (Object.keys(validate(comment)).length === 0) {
      if (comment.id !== '') {
        const review = {
          title: comment.title,
          description: comment.description
        }

        dispatch(updateReview(comment.id, bookDet.id, review))
        return setComment({
          title: 'default',
          description: '',
          id: ''
        })
      } else {
        
        var rev = {
          review: {
            title: comment.title,
            description: comment.description
          },
          book: bookDet.id,
          user: user.idUser
        }
        setComment({
          title: 'default',
          description: ''
        })
      }
      return dispatch(addComment(rev))
    } 

  }
  
  function handleOnChange(e) {
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    })
    validate(
      {
        ...comment,
      [e.target.name]: e.target.value
      })
    
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
      <div className='commentTitle'>
        <h3>Have you already read the book? {!comments.length && <span>(Be the first to comment this book)</span>}</h3>
        <p>Leave a comment about it below!</p>

      </div>

      {token ? <div>




        <form className='' onSubmit={onSubmit}>
          <div>
            <label>How much did you like this book?</label>
            <select name="title" id=""  placeholder="How much did you like it?"  value={comment.title} onChange={handleOnChange} >
              <option value="default">How much did you like it?</option>
              <option value="I Loved it">I Loved it</option>
              <option value="I liked it">I liked it</option>
              <option value="I didn't like it that much">I didn't like it that much</option>
              <option value="I hated it">I hated it</option>
            </select>
           
            {errors.title && <span className='errorMsg'>{errors.title}</span>}
          </div>
          <label>Tell us your opinion about this book</label>
          <div>
            <textarea name="description" id="" cols="30" rows="10" value={comment.description} onChange={handleOnChange}></textarea>

            {errors.description && <span className='errorMsg'>{errors.description}</span>}

          </div>

          <button type="submit">Send review</button>
        </form>


      </div> : <p>Log in to comment</p>}
      {comments.length != 0 && comments.map(e => {
        return (e.report == null && e.id !== comment.id &&
          <>


            <div className='comments'>
              <img src={e.user.imgProfile} alt="" width='30' height='30' />

              <h4>{e.user.name} {e.user.lastName}</h4>
              <h5>{e.title}</h5>
              <p>{e.description}</p>
              <button onClick={() => reportComment(e)}>Report</button>
              {
                e.userIdUser === user.idUser &&
                <>
                <button onClick={() => editComment(e)}>Edit</button>
                <button onClick={() => deleteComment(e)}>Delete</button>
                </>
              }
            </div>
          </>
        )
      })}
      <Footer />
    </div>
  )
}