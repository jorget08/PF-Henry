import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, requestPassword } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';
import Swal from "sweetalert2";
export default function UserProfile() {
  var user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    console.log(user)
  }, [])

  function handleClick(){
    Swal.fire({
      title: 'Do you want to change your password?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Change',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('An email has been sent to you to change your password')
        dispatch(requestPassword(user.email))
      } 
    })
  }

  return (
    <div>
      <NavBar />
      <h1>{user.name} {user.lastName}</h1>
      <img src={user.imgProfile} alt="" />
      <h2>Mail: {user.email}</h2>
      <h3>Adresses: </h3>
      {/* {<ul>
            {user.adress.map(e=>{
                return <div><li key={e}>{e.street} {e.number}, {e.city}, {e.state}, {e.country}</li>
                <button>Delete this adress</button></div>})}
        </ul>} */}
      <Link to='/editProfile'>
        <button>Edit profile</button>
      </Link>
      <button onClick={handleClick}>Change password</button>

    </div>
  )
}
