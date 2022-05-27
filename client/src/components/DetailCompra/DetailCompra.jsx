import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../../redux/actions';

export default function Compra({title, author, price, categories, id}) {

  const dispatch = useDispatch();

  function handleClick (){
    dispatch(addToCart(id))
  }
  
  return (
    <div>
        <h1>{title}</h1>
        <h2>{author}</h2>
        <h3>Género:</h3>{categories.map(e=>{return <h3>{e}</h3>})}
        <h3>{price}</h3>
        <button onClick={handleClick}>Agregar a carrito</button>
        <Link to={"Componente para realizar la compra"}><button>Comprar</button></Link>
    </div>
  )
}
