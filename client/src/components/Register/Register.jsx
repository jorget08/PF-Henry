import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { postUser } from '../../redux/actions';

export default function Register() {
    const dispatch = useDispatch()

  const [newUser, setNewUser]=useState({
    name:"",
    lastName:"",
    password:"",
    email:"",
    imgProfile: ""   
  })

  function handleChange(e){
    e.preventDefault();
    setNewUser({
        ...newUser,
        [e.target.name] : e.target.value
    })
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(postUser(newUser))
    alert("Te has registrado")
    console.log("SOY EL USER PAPA", newUser)
    setNewUser({
        name:"",
        lastName:"",
        password:"",
        email:"",
        imgProfile: ""        
    })
}
  
    return (
    <div>
        <h1>Complete the register form</h1>
        <div>
            <label>Name: </label>
            <input type="text" value={newUser.name} name="name" onChange={(e)=>handleChange(e)}/>
        </div>
        <div>
            <label>Last name: </label>
            <input type="text" value={newUser.lastName} name="lastName" onChange={(e)=>handleChange(e)}/>
        </div>
        <div>
            <label>E mail: </label>
            <input type="text" value={newUser.email} name="email" onChange={(e)=>handleChange(e)}/>
        </div>
        <div>
            <label>Password: </label>
            <input type="text" value={newUser.password} name="password" onChange={(e)=>handleChange(e)}/>
        </div>
        <div>
            <label>Repeat Password: </label>
            <input type="text"/>
        </div>
        <div>
            <label>Profile picture: </label>
            <input type="text" value={newUser.image} name="image" onChange={(e)=>handleChange(e)}/>
        </div>
        <div>
            <button type="submit" onClick={(e)=>handleSubmit(e)} >Submit</button>
        </div>
    </div>
  )
}
