import React from 'react'
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useHistory, useParams } from "react-router-dom";
import { changePassword1 } from '../../redux/actions'

export default function NewPassword() {
  
    const {id} = useParams()
    const history= useHistory()
    const dispatch = useDispatch()
    const redirect = () => {
        history.push("/home")
    }
    return (
    <div><Formik
    initialValues={{
      password: '',
      password2: ""
    }}
    validate={(valores) => {
      let errors = {};

      if (valores.password !== valores.password2) {
        errors.password2 = "Passwords must match"
    }
      return errors;
    }}
    onSubmit={(valores, { resetForm }) => {
      dispatch(changePassword1(id, valores.password))
      setTimeout(() => redirect(), "1000")
      resetForm()
    }}>
    {({ touched, errors }) => (
      <Form className="LoginForm">
        <div className='fieldLog'>
          <label>New Password</label>
          <Field type="password" name="password" placeholder="New Password" />
          {touched.password && errors.password && <span>{errors.password}</span>}
        </div>
        <div className='fieldLog'>
          <label>Repeat New Password</label>
          <Field type="password" name="password2" placeholder="Repeat New Password" />
          {touched.password2 && errors.password2 && <span>{errors.password2}</span>}
        </div>
        

        <button type="submit">Confirm new password</button>

      </Form>
    )}
  </Formik></div>
  )
  
}
