import React , {useEffect} from 'react'
import { Formik, Form, Field } from 'formik'
import { useSelector, useDispatch } from 'react-redux';
import { requestPassword, getUsers } from '../../redux/actions'

export default function RequestNewPassword() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const users = useSelector(state => state.users)
    return (
    <div><Formik
    initialValues={{
      email: '',
    }}
    validate={(valores) => {
      let errors = {};

      if (!users.find(e=>e.email===valores.email)) {
        errors.email = 'This mail is not registrated';
    }
      return errors;
    }}
    onSubmit={(valores, { resetForm }) => {
      dispatch(requestPassword(valores.email))
      console.log("valores", valores)

      resetForm()
    }}>
    {({ touched, errors }) => (
      <Form className="LoginForm">
        <div className='fieldLog'>
          <label>E-mail</label>
          <Field type="text" name="email" placeholder="Email" />
          {touched.email && errors.email && <span>{errors.email}</span>}
        </div>
        

        <button type="submit">Request new password</button>

      </Form>
    )}
  </Formik></div>
  )
}
