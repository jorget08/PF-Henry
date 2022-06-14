import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, addAdress } from '../../redux/actions';
import { Formik, Form, Field } from 'formik';
import { useHistory, Link } from 'react-router-dom';
import Swal from "sweetalert2";

import './style.css'
export default function Register() {
    const dispatch = useDispatch()
    const history = useHistory()
    var user = useSelector(state => state.user)

    const redirect = () => {
        history.push("/userProfile")
    }

    return (
        <div>

            <Formik
                initialValues={{
                    name: user.name,
                    lastName: user.lastName,
                    imgProfile: user.imgProfile
                }}
                validate={(valores) => {
                    let errors = {};
                    if (/^\s/.test(valores.name)) {
                        errors.name = "Cant start with an empty space"
                    }
                    if (/^\s/.test(valores.lastName)) {
                        errors.lastName = "Cant start with an empty space"
                    }
                    return errors;
                }}
                onSubmit={(valores, { resetForm }) => {
                    dispatch(editProfile(valores, user.idUser))

                    Swal.fire({
                        title:'Done!',
                        text:'Your profile has been updated',
                        icon:'success',
                        showConfirmButton: false,
                        timer: 1500
            })
            resetForm()
            setTimeout(() => redirect(), "1000")
        }}>
            {({ touched, errors }) => (
                <Form className="LoginForm">
                    <h1>Modify your profile</h1>
                    <div className='fieldLog' >
                        <label>Name: </label>
                        <Field type="text" name="name" placeholder="Name" />
                        {touched.name && errors.name && <span>{errors.name}</span>}
                    </div>
                    <div className='fieldLog'>
                        <label>Last name: </label>
                        <Field type="text" name="lastName" placeholder="Last name" />
                        {touched.lastName && errors.lastName && <span>{errors.lastName}</span>}
                    </div>
                    <div className='fieldLog'>
                        <label>Profile picture: </label>
                        <Field type="text" name="imgProfile" placeholder="Profile picture" />
                    </div>
                    <div className='fieldLog'>
                        <button type="submit">Modify</button>
                    </div>
                </Form>
            )}
        </Formik>
        {/* <Formik
        initialValues={{
            country:"",
            state:"",
            city:"",
            street:"",
            number:"" 
        }}
        validate={(valores)=>{
            let errors = {};
            if (!valores.country) {
                errors.country = "Country required"}
            if (!valores.state) {
                 errors.state = "State required"}
            if (!valores.city) {
                errors.city = "City required"}
            if (!valores.street) {
                errors.street = "Street required"}
            if (!valores.number) {
                errors.number = "Number required"}
            return errors;
        }}
        onSubmit={(valores, {resetForm}) => {
            //? si adress null, crear una nueva [adress]
            //* [adress, ...adress]
            //? adress [{}] filtrar

            const adress = {
                idAdress: valores.number + valores.street,
                country:valores.country,
                state:valores.state,
                city:valores.city,
                street:valores.street,
                number:valores.number     
            }
            dispatch(addAdress(adress, user.idUser))
            Swal.fire(
                'Done!',
                'An adress have been added to your profile',
                'success'
              )
            resetForm()
        }}>
        {({touched, errors}) => (
        <Form classname="Adress">
        <h1>Add an adress</h1>
        <div>
            <label>Country: </label>
            <Field type="text" name="country" placeholder="Country"/>
            {touched.country && errors.country && <span>{errors.country}</span>}
        </div>
        <div>
            <label>State: </label>
            <Field type="text" name="state" placeholder="State"/>
            {touched.state && errors.state && <span>{errors.state}</span>}
        </div>
        <div>
            <label>City: </label>
            <Field type="text" name="city" placeholder="City"/>
            {touched.city && errors.city && <span>{errors.city}</span>}
        </div>
        <div>
            <label>Street: </label>
            <Field type="text" name="street" placeholder="Street"/>
            {touched.street && errors.street && <span>{errors.street}</span>}
        </div>
        <div>
            <label>Number: </label>
            <Field type="number" name="number" placeholder="Number"/>
            {touched.number && errors.number && <span>{errors.number}</span>}
        </div>
        <div>
        <button type="submit">Add an adress</button>
        </div>
        </Form>
        )}
        </Formik> */}
    </div >
  )
}
