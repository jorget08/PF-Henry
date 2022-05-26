import React from 'react'

export default function Item({ id, title, img, author, price, stock }) {
    const [cant, setCant] = useState(1);
    function handlePrice(e) {
        e.preventDefault();
        let newCant = e.target.id === '+' ? cant + 1 : cant - 1
        newCant <= stock ? setCant() : alert("No hay stock")
    }
    return (
        <div>
            <div>
                <h4>{title}</h4>
                <h5>{author}</h5>
                <img src={img} alt="" />
            </div>
            <div>
                <h5>{price}</h5>
                <button id='-' onClick={handlePrice}>-</button>
                <input type="number" value={cant} name="" id="" />
                <button id='+' onClick={handlePrice}>+</button>
            </div>
        </div>
    )
}
