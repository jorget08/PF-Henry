import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../../redux/actions';
import { useSelector } from 'react-redux';

export default function Compra({title, author, price, categories, id}) {

  const dispatch = useDispatch();
  const carrito = useSelector(state => state.cart)

  function handleClick (){
    dispatch(addToCart(id))
    console.log("SOY EL CARRO", carrito)
  }
  
  return (
    <div>
        <h1>{title}</h1>
        <h2>{author}</h2>
        <h3>Género:</h3>{categories?.map(e=>{return <h3>{e.name}</h3>})}
        <h3>{price}</h3>
        <button onClick={handleClick}>Agregar a carrito</button>
        <Link to={"Componente para realizar la compra"}><button>Comprar</button></Link>
    </div>
  )
}
