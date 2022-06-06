import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';
export default function UserProfile() {
  var user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    console.log(user)
  }, [])


  return (
    <div>
      <NavBar />
      <h1>{user.name} {user.lastName}</h1>
      <img src={user.imgProfile} alt="" />
      <h2>Mail: {user.email}</h2>
      {/* <ul>
            {user.favoritos.map(e=>{
                return <li key={e}>{e}</li>})}
        </ul> */}
      <Link to='/editProfile'>
        <button>Edit profile</button>
      </Link>
      <button>Change password</button>

    </div>
  )
}
