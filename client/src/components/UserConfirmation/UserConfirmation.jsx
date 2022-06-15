import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { confirmationMail } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import "./styles.css"
import { helpCall } from '../../helCall';

export default function UserConfirmation() {

    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const redirect = () => {
        history.push("/home")
    }

    const [userData, setUserData] = useState({})
    function handleClick() {
        dispatch(confirmationMail(id))
        setTimeout(() => redirect(), "1000")
    }
    useEffect(() => {
        helpCall(`/user/${id}`)
            .then(res => setUserData(res))
    }, [])

    return (
        <>
            {console.log('soy id', id)}
            
            <div className='containerGlobal'>
                <div className='conteinerConfirmation'>

                    <img src={userData.imgProfile} alt="" />
                    <div>
                        <h2>Thanks {userData.name} {userData.lastName} !!</h2>
                        <h3>You are joining BookStore!</h3>
                    </div>

                </div>
            </div>
            <div className="containerButton">
                    <h2>Please confirm your e-mail "{userData.email}"</h2>
                    <button className='pulse' onClick={handleClick}>Confirm e-mail</button>
                    <p>If you received this email by mistake, simply delete it. You won't be subcribed if tou don't click the confimation buttom</p>
                </div>

            <Footer />
        </>
    )
}
