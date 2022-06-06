import React ,{ useEffect }from 'react'
import NavBar from '../NavBar/NavBar'
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {getShoppingHistory} from "../../redux/actions";



function ShoppingHistory() {
    
    const user = useSelector(state => state.user)
    const x = useSelector(state => state.ShoppingHistory)
    let id=user.idUser
    console.log(x)

    
    const dispatch=useDispatch()
    console.log('id',id)

useEffect(() => {
    dispatch(getShoppingHistory(id))
  }, [dispatch])

  return (
      <>
      <NavBar></NavBar>
    <div>ShoppingHistory</div>
    </>
  )
}

export default ShoppingHistory