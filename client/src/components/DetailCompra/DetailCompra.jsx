import React from 'react'
import { Link } from 'react-router-dom'

export default function Compra({title, author, price, categories, stock}) {
  var cantidad=[]
  for(let i=1;i<=stock;i++){
    cantidad.push(i)
  }
  return (
    <div>
        <h1>{title}</h1>
        <h2>{author}</h2>
        <h3>Género:</h3>{categories.map(e=>{return <h3>{e}</h3>})}
        <h3>{price}</h3>
        <h4>Cantidad: </h4> <select>{cantidad.map(e=><option value={e}>{e}</option>)}</select>
        <button>Agregar a carrito</button>
        <Link to={"Componente para realizar la compra"}><button>Comprar</button></Link>
    </div>
  )
}
