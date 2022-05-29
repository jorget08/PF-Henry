import { React, useState } from 'react'
import { removeOneFromCart } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { AiOutlineMinus } from 'react-icons/ai'
import { MdOutlineAdd } from 'react-icons/md'
import { FaRegTrashAlt } from 'react-icons/fa'
import './styles.css'
export default function Item({ id, title, img, author, price, stock }) {
    const [cant, setCant] = useState(1);
    const dispatch = useDispatch()

    function handlePrice(e) {
        e.preventDefault();
        let newCant = e.target.id === '+' ? cant + 1 : cant - 1
        newCant <= stock ? setCant() : alert("No hay stock")
    }

    function handleDelete(e) {
        e.preventDefault()
        dispatch(removeOneFromCart(id))
    }
    return (
        <div className='itemContainer'>
            <div className='itemBook'>
                <img src={img} alt={title} />
                <div>
                    <h4>{title}</h4>
                    <p>{author}</p>

                </div>
            </div>
            <div className='prices'>
                <h5>{price}</h5>
                <div className='priceChange'>
                    <button id='-' onClick={handlePrice}>
                        <AiOutlineMinus size={20} />
                    </button>
                    <input type="number" value={cant} readOnly id="" />
                    <button id='+' onClick={handlePrice}>
                        <MdOutlineAdd size={20} />
                    </button>
                </div>
                <button onClick={handleDelete}>
                    <FaRegTrashAlt size={30} />
                </button>
            </div>
        </div>
    )
}
