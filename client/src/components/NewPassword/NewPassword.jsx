import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useHistory, useParams } from "react-router-dom";
import { changePassword1 } from '../../redux/actions'
import Swal from "sweetalert2";
import NavBar from '../NavBar/NavBar';
import './styles.css'
import { helpCall } from '../../helCall';
import Footer from '../Footer/Footer';

export default function NewPassword() {

  const { id } = useParams()
  const [userData, setUserData] = useState({})
  const history = useHistory()
  const dispatch = useDispatch()
  const redirect = () => {
    history.push("/home")
  }
  useEffect(() => {
    helpCall(`/user/${id}`)
        .then(res => setUserData(res))
}, [])
  return (
    <>
      <div>
      <div className='containerGlobal'>
                <div className='conteinerConfirmation'>

                    <img src={userData.imgProfile} alt="" />
                    <div>
                        <h2>Attention {userData.name} {userData.lastName} !!</h2>
                        <h3>You are changing your password!</h3>
                    </div>

                </div>
            </div>
            <div className="containerButton">
        <Formik
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
          Swal.fire({
            icon: 'success',
            title: 'Done',
            text: 'Your password has been changed',
          })
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


            <button  className='pulse' type="submit">Confirm new password</button>

          </Form>
        )}
      </Formik>
      <p>If you received this email by mistake, simply delete it. You won't change the password if you don't click the confimation buttom</p>
      </div>
      </div>
      
       
                  
                    
                

            <Footer />
    </>
  )

}
