import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { editProfile } from '../../redux/actions';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import Swal from "sweetalert2";

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
            Swal.fire(
                'Done!',
                'Your profile has been updated',
                'success'
              )
            resetForm()
            setTimeout(() => redirect(), "1000")
        }}>
        {({touched, errors}) => (
        <Form classname="RegisterForm">
        <h1>Modify your profile</h1>
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
        <Formik
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
                errors.name = "Country required"}
            if (!valores.state) {
                 errors.name = "State required"}
            if (!valores.city) {
                errors.name = "City required"}
            if (!valores.street) {
                errors.name = "Street required"}
            if (!valores.number) {
                errors.name = "Number required"}
            return errors;
        }}
        onSubmit={(valores, {resetForm}) => {
            const adress = {
                country:valores.country,
                state:valores.state,
                city:valores.city,
                street:valores.street,
                number:valores.number     
            }
            dispatch(editProfile(adress, user.idUser))
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
        </Formik>
    </div>
  )
}
