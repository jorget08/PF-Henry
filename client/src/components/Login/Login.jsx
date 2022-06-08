import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { logUser, logWithGoogle } from '../../redux/actions'
import { GoogleLogin } from 'react-google-login'



export default function Login() {
  const clientId = '796413127660-tgktohi6gqfm0n183g1kqp6lqehl6ncq.apps.googleusercontent.com';
  const dispatch = useDispatch()

  const onSuccess = async (response) => {
    const objGoogle = {
      ...response.profileObj,
      tokenId: response.tokenId
    }
    dispatch(logWithGoogle(objGoogle))
  }

  const onFailure = (response) => {
    console.log('no sia malo', response)
  }

  return (
    <div>
      <h3 style={{
        textAlign: 'center',
        fontSize: '25px'
      }}>Welcome to BookStore!</h3>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validate={(valores) => {
          let errors = {};

          if (!valores.email) {
            errors.email = 'Email has been required!';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(valores.email)) {
            errors.email = 'Invalid email address';
          }
          if (!valores.password) {
            errors.password = 'Password has been required!'
          }
          return errors;
        }}
        onSubmit={(valores, { resetForm }) => {
          dispatch(logUser(valores))
          console.log("valores", valores)

          resetForm()
        }}>
        {({ touched, errors }) => (
          <Form className="LoginForm">
            <div className='fieldLog'>
              <Field type="text" name="email" placeholder="Email" />
              {touched.email && errors.email && <span>{errors.email}</span>}
            </div>
            <div className='fieldLog'>
              <Field type="password" name="password" placeholder="Password" />
              {touched.password && errors.password && <span>{errors.password}</span>}
            </div>
            <Link to='/newPassword' className='signUp'>
              <span>Forgot password?</span>
            </Link>
            <button type="submit">Log in</button>

          </Form>
        )}
      </Formik>
      <div className='register'>

        <Link to='/register' className='signUp'>
          <button>Sign Up</button>
        </Link>
        <GoogleLogin
          clientId={clientId}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          buttonText="Log In with Google!"
          style={{ margin: '0 auto', display: 'block' }}
          className="googleLog"
        />
      </div>
    </div >
  )
}

