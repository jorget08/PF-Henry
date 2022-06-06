import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { editProfile } from '../../redux/actions';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';

export default function Register() {
    const dispatch = useDispatch()
    const history = useHistory()
    var user = useSelector(state => state.user)

const redirect = ()=>{
    history.push("/home")
}
  
    return (
    <div>
        <Formik
        initialValues={{
            name:user.name,
            lastName:user.lastName,
            imgProfile: user.imgProfile   
        }}
        validate={(valores)=>{
            let errors = {};
            if (/^\s/.test(valores.name)) {
                errors.name = "Cant start whit an empty space"}
            if (/^\s/.test(valores.lastName)) {
                errors.lastName = "Cant start whit an empty space"}
            return errors;
        }}
        onSubmit={(valores, {resetForm}) => {
            dispatch(editProfile(valores, user.idUser))
            alert("Your profile has been updated")
            resetForm()
            setTimeout(() => redirect(), "1000")
        }}>
        {({touched, errors}) => (
        <Form classname="RegisterForm">
        <h1>Complete the register form</h1>
        <div>
            <label>Name: </label>
            <Field type="text" name="name" placeholder="Name"/>
            {touched.name && errors.name && <span>{errors.name}</span>}
        </div>
        <div>
            <label>Last name: </label>
            <Field type="text" name="lastName" placeholder="Last name"/>
            {touched.lastName && errors.lastName && <span>{errors.lastName}</span>}
        </div>
        <div>
            <label>Profile picture (optional): </label>
            <Field type="text" name="imgProfile" placeholder="Profile picture"/>
        </div>
        <div>
        <button type="submit">Modify</button>
        </div>
        </Form>
        )}
        </Formik>
    </div>
  )
}
