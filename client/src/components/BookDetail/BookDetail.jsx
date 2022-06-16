import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getDetail, clearDetail, deleteBook, addComment, showComments, getBooks, reportReview, updateReview, deleteReview, changeImg } from "../../redux/actions";
import DetailCompra from '../DetailCompra/DetailCompra';
import { FaRegTrashAlt } from 'react-icons/fa'
import Stars from '../Stars/Stars';
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer';
import "./styles.css";
import { AiFillEdit } from 'react-icons/ai';
import { MdWarning } from 'react-icons/md'
import {FiEdit3} from 'react-icons/fi'
import {AiTwotoneDelete} from 'react-icons/ai'
// import { helpCallPut, helpCallUpdate } from '../../helCall';
import Swal from 'sweetalert2'

export default function BookDetail() {


  const user = useSelector(state => state.user)
  const history = useHistory()
  const token = localStorage.getItem("token")
  const [comment, setComment] = useState({ title: 'default', description: '', id: '' })
  const [errors, setErrors] = useState({})
  const [news, setNews] = useState(false)

  console.log("hystory", history)
  var bookDet = useSelector(state => state.detail)

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
    Swal.fire({
      title: "Are you sure you want to delete this book?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete book'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBook(bookDet.id))
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: "The book has been deleted successfully!"
        })
      dispatch(getBooks)
      redirect()
      }
    })

  }

  async function reportComment(element) {

    const { value: report } = await Swal.fire({
      title: 'Why do you report this Comment',
      input: 'select',
      inputOptions: {

        'It is inappropriate': 'It is inappropriate',
        'Can be discriminatory': 'Can be discriminatory',
        'It is offensive': 'It is offensive',
        'Has inappropriate language': 'Has inappropriate language'

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
        title: 'This comment has been reported',
        showConfirmButton: false,
        timer: 1500
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

    Swal.fire({
      title: 'Do you want to delete this comment?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: 'This comment has been deleted',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        dispatch(deleteReview(bookDet.id, element.id))
      }
    })


  }
  function validate(coment) {
    let errors = {};


    if (coment.title === 'default') errors.title = "Please select an option before sending your opinion";
    if (coment.description === '') errors.description = "Please write something before sending your opinion";

    if (coment.description.length > 500) errors.description = "You cannot exceed 500 characters";

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

  const handleImage = (e) => {
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('img', image)

    dispatch(changeImg(bookDet.id, 'book', formData))
    setNews(news ? false : true)
  }
  return (
    <div className='all'>
      <NavBar />
      {bookDet.title &&
        <div className='container'>
          <div className='container__info'>
            <div className='image'>
              <img src={bookDet.image} alt="" />
              {user.rols?.name === "admin" ?
              <form className='admin'>

                <input type="file"  onChange={handleImage} name="file" id="" />
              </form>:""}
              <DetailCompra title={bookDet.title} author={bookDet.author} price={bookDet.price} categories={bookDet.categories} id={bookDet.id} stock={bookDet.stock}></DetailCompra>
            </div>
            <div className='info'>
              <h1>{bookDet.title}</h1>
              {
                bookDet.score &&
                <Stars score={bookDet.score} />
              }
              <p style={{ marginTop: '0', fontSize: '14px', font: 'italic', color: 'gray', cursor: 'default' }}><em>Rated by our experts</em></p>

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
                    <button type="button" className='buttonAdmin'>Modify book <FiEdit3  className='icons' size={20}   />  </button>
                  </Link>
                  <button type="button"  className='buttonAdmin' onClick={(e) => delet(e)}>Delete Book <AiTwotoneDelete className='icons' size={20} /></button>
                </>
                : ""}
            </div>
          </div>
        </div>

      }
      <div className='commentTitle'>
        <h3>Have you already read the book? {!comments.length && <span>(Be the first to comment this book)</span>}</h3>
      </div>

      {token ? <div>




        <form className='' onSubmit={onSubmit}>
          <div className='formReview'>
            <select name="title" id="" defaultValue='default' placeholder="How much did you like it?" value={comment.title} onChange={handleOnChange} >
              <option value="default" hidden>How much did you like it?</option>

              <option value="I Loved it">I Loved it</option>
              <option value="I liked it">I liked it</option>
              <option value="I didn't like it that much">I didn't like it that much</option>
              <option value="I hated it">I hated it</option>
            </select>

            {errors.title && <span className='spanSelect'>{errors.title}</span>}
            <label>Tell us your opinion about this book</label>
            {errors.description && <span className='spanSelect'>{errors.description}</span>}
            <textarea name="description" id="" cols="30" rows="10" value={comment.description} onChange={handleOnChange}>
            </textarea>


            <button type="submit">Send review</button>
          </div>

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

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                {
                  e.userIdUser === user.idUser ?
                    <>
                      <AiFillEdit className='iconEdit' style={{ marginRight: '10px', cursor: 'pointer' }} size={30} onClick={() => editComment(e)} />
                      <FaRegTrashAlt className='icon delete' size={30} style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => deleteComment(e)} />
                    </>
                    :
                    <button className='report' onClick={() => reportComment(e)}>Report <MdWarning style={{ marginBottom: '-2px' }} /></button>
                }
              </div>

            </div>
          </>
        )
      })}
      <Footer />
    </div>
  )
}