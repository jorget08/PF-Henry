import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik'
import Footer from '../Footer/Footer';
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import NavBar from '../NavBar/NavBar';


export default function SupportAdmin () {
    
    const dispatch = useDispatch()
    const captcha = useRef(null)
    const [captchaVal, setCaptchaVal]=useState(false)
    const token = localStorage.getItem("token");
    const [isLogged, setIsLogged] = useState(false);


    useEffect(() => {
        token ? setIsLogged(true) : setIsLogged(false);
      }, [token, isLogged]);

    function onChange(){
        setCaptchaVal(true)
    }

    return (
        <>
            <NavBar/>
            <div>
                <Formik
                                initialValues={{
                                    comment: ""
                                }}
                                validate={(valores) => {

                                    let errors = {};

                                    if (!valores.comment) {
                                        errors.comment = 'At least your question must be longer than 100 characters!'
                                    }
                                    return errors;

                                }}

                                onSubmit={(valores, { resetForm }) => {
                                    if(captchaVal===false){
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Please check the captcha box to send your question',
                                          })
                                    }
                                    //else{dispatch(postSupport(valores))
                                    alert("Query sent!")
                                    resetForm()
                                }}>

                                {({ touched, errors }) => (
                                    <div className='formContainer'>
                                        <Form>
                                            <div className='contactInfo'>

                                                <div className='description'>
                                                    <label>What you want to tell us?</label>
                                                    <p>If you want to ask about a purchase, dont forget to detail the ID!</p>
                                                </div>
                                                <div className='description'>
                                                    <Field type="text" name="comment" className="descriptionArea" as="textarea" placeholder="Write your question here!" />
                                                </div>
                                                {touched.comment && errors.comment && <span className="error">{errors.comment}</span>}
                                                <div>
                                                <ReCAPTCHA
                                                    ref={captcha}
                                                    sitekey="6Lc_RlkgAAAAAHm3lFu7iwKYTD3wu2owN56SxDdW"
                                                    onChange={onChange}
                                                />
                                                </div>
                                                <button className="minimize" type="submit">Send!</button>

                                            </div>
                                        </Form>
                                    </div>
                                )}
                            </Formik>
            </div>
            <Footer/>
        </>
    )

}