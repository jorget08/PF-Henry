import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { confirmationMail } from '../../redux/actions';

export default function UserConfirmation() {
  
    const dispatch= useDispatch()
    const history= useHistory()
    const {id} = useParams()
    const redirect = () => {
        history.push("/home")
    }
    function handleClick(){
        dispatch(confirmationMail(id))
        setTimeout(() => redirect(), "1000")
    }
  
    return (
    <div>
        <button onClick={handleClick}>Confirm your Mail</button>
    </div>
  )
}
