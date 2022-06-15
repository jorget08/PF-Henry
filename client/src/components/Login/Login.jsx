import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { logUser, logWithGoogle, getUsers, requestPassword } from '../../redux/actions'
import { GoogleLogin } from 'react-google-login'
import Swal from "sweetalert2";



export default function Login() {
  const clientId = '796413127660-tgktohi6gqfm0n183g1kqp6lqehl6ncq.apps.googleusercontent.com';
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers())
}, [dispatch])

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-start',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
const users = useSelector(state => state.users)
const user = useSelector(state => state.user)
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

  async function handleClick(){
    const { value: email } = await Swal.fire({
      title: 'Input your email address',
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address'
    })
    
    if (email) {
      if (!users.find(e=>e.email===email)) {
        Swal.fire('This mail is not registrated') ;
    }
    else{
      email.toLowerCase()
      dispatch(requestPassword(email))
      Swal.fire('An email has been sent to you to change your password')
    }
    }
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
          if(!users.find(e=>e.email===valores.email)){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'You´re not registered to Bookstore',
            })
          }
          else if(users.find(e=>e.email===valores.email).confirmation===false){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'You didn´t confirm your email',
            })
          }
          else{
          dispatch(logUser(valores))
          console.log("valores", valores)
          setTimeout( ()=>{if(localStorage.getItem("token")){Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
        }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Your password is incorrect',
            })
          }},1000)
          }
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
            {/* <Link to='/newPassword' className='signUp'> */}
              <span className='signUp spanpointer' onClick={handleClick}>Forgot password?</span>
            {/* </Link> */}
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

