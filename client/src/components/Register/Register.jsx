import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUser } from '../../redux/actions';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import Swal from "sweetalert2";
import './styles.css'
export default function Register() {
    const dispatch = useDispatch()
    const history = useHistory()

    /* const [newUser, setNewUser]=useState({
      name:"",
      lastName:"",
      password:"",
      password2:"",
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
  } */

    const redirect = () => {
        history.push("/home")
    }

    return (
        <div className='containerRegister'>
            <Formik
                initialValues={{
                    name: "",
                    lastName: "",
                    password: "",
                    password2: "",
                    email: "",
                    imgProfile: ""
                }}
                validate={(valores) => {
                    let errors = {};
                    if (!valores.name) {
                        errors.name = "Name required"
                    } else if (/^\s/.test(valores.name)) {
                        errors.name = "Cant start whit an empty space"
                    }
                    if (!valores.lastName) {
                        errors.lastName = "Last name required"
                    } else if (/^\s/.test(valores.lastName)) {
                        errors.lastName = "Cant start whit an empty space"
                    }
                    if (!valores.email) {
                        errors.email = 'E-mail required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(valores.email)) {
                        errors.email = 'Invalid e-mail address';
                    }
                    if (!valores.password) {
                        errors.password = 'Password required'
                    }
                    if (valores.password !== valores.password2) {
                        errors.password2 = "Passwords must match"
                    }
                    return errors;
                }}
                onSubmit={(valores, { resetForm }) => {
                    dispatch(postUser(valores))
                    Swal.fire(
                        'You have been registered',
                        'Welcome to bookstore c:',
                        'success'
                      )
                    resetForm()
                    setTimeout(() => redirect(), "1000")
                }}>
                {({ touched, errors }) => (
                    <Form classname="registerForm">
                        <h1>Complete the Register Form</h1>
                        <div className='fieldReg'>
                            <label>Name: </label>
                            <Field type="text" name="name" placeholder="Name" />
                            {touched.name && errors.name && <span>{errors.name}</span>}
                        </div>
                        <div className='fieldReg'>
                            <label>Last name: </label>
                            <Field type="text" name="lastName" placeholder="Last name" />
                            {touched.lastName && errors.lastName && <span>{errors.lastName}</span>}
                        </div>
                        <div className='fieldReg'>
                            <label>E mail: </label>
                            <Field type="text" name="email" placeholder="E-mail" />
                            {touched.email && errors.email && <span>{errors.email}</span>}
                        </div>
                        <div className='fieldReg'>
                            <label>Password: </label>
                            <Field type="password" name="password" placeholder="Password" />
                            {touched.password && errors.password && <span>{errors.password}</span>}
                        </div>
                        <div className='fieldReg'>
                            <label>Repeat Password: </label>
                            <Field type="password" name="password2" placeholder="Repeat password" />
                            {touched.password2 && errors.password2 && <span>{errors.password2}</span>}
                        </div>
                        <div className='fieldReg'>
                            <label>Profile picture (optional): </label>
                            <Field type="text" name="imgProfile" placeholder="Profile picture" />
                        </div>
                        <div className='fieldReg'>
                            <button type="submit">Register</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
