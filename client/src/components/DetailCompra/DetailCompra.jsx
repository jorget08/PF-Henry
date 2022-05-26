import React from 'react'
import { Link } from 'react-router-dom'

export default function Compra({title, author, price, categories}) {
  
  return (
    <div>
        <h1>{title}</h1>
        <h2>{author}</h2>
        <h3>Género:</h3>{categories.map(e=>{return <h3>{e}</h3>})}
        <h3>{price}</h3>
        <button>Agregar a carrito</button>
        <Link to={"Componente para realizar la compra"}><button>Comprar</button></Link>
    </div>
  )
}
