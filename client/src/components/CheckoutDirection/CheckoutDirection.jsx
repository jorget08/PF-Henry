import React , { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';
import Swal from "sweetalert2";
import { Formik, Form, Field } from 'formik';
import { editProfile } from '../../redux/actions';




export default function CheckoutDirection() {
    const dispatch = useDispatch()
    let user = useSelector(state => state.user)
  
  
  return (
<>


<h2>Choose an address to send your order! :) <br></br>or add a new one!
</h2>
    {
        <ul>
            { user.adress && 
              user.adress.map(e=>{
                return <div><h3>{e.street +' ' + e.number}</h3> 
                 <h4>{e.city}, {e.state}, {e.country}</h4>
                </div>}
              )
            }
        </ul>
      }

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




  </>
    )
}

