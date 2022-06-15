import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, postUser } from '../../redux/actions';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";

import './styles.css'
export default function Register() {
    const dispatch = useDispatch()
    const captcha = useRef(null)
    const [captchaVal, setCaptchaVal] = useState(false)
    const history = useHistory()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const users = useSelector(state => state.users)
    console.log("usuarios", users)


    const redirect = () => {
        history.push("/home")
    }

    function onChange() {
        setCaptchaVal(true)
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
                    imgProfile: null,
                    captcha: ""
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
                    else if (users.find(e=>e.email.toLowerCase()===valores.email.toLowerCase())) {
                        errors.email = 'This mail is already registered';
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
                    if (captchaVal === false) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Please check the captcha box to register',
                        })
                    }
                    valores.email.toLowerCase()
                    if (valores.imgProfile === null) {
                        valores.imgProfile = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                    }
                    else {
                        dispatch(postUser(valores))
                        Swal.fire(
                            'You have been registered',
                            'Please confirm your email before logging in',
                            'success'
                        )
                        resetForm()
                        setTimeout(() => redirect(), "1000")
                    }
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
                        <ReCAPTCHA
                            ref={captcha}
                            sitekey="6Lc_RlkgAAAAAHm3lFu7iwKYTD3wu2owN56SxDdW"
                            onChange={onChange}
                            style={{ justifyContent: 'center', display: 'flex' }}

                        />
                        <div className='fieldReg'>
                            <button type="submit">Register</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
