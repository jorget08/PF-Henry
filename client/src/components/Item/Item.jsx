import { React, useState } from 'react'
import { removeOneFromCart } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { AiOutlineMinus } from 'react-icons/ai'
import { MdOutlineAdd } from 'react-icons/md'
import { FaRegTrashAlt } from 'react-icons/fa'
import './styles.css'
export default function Item({ id, title, img, author, price, stock, handleItem, newDel }) {
    const [cant, setCant] = useState(1);
    const dispatch = useDispatch()

    function handlePrice(e, op) {
        if (cant + 1 > stock && op === "sum") {
            alert('No hay stock')
        } else if (cant - 1 < 1 && op === "men") {

        } else {
            let newCant = op === 'sum' ? cant + 1 : cant - 1;
            setCant(newCant)
            handleItem(title, price, newCant)
        }
    }

    function handleDelete(e) {
        e.preventDefault()
        dispatch(removeOneFromCart(id))
        newDel()
    }

    let book=JSON.parse(localStorage.getItem("carrito")).filter(e=>e.id===id)
    let cantidad= book.map(e=>e.cant)
  



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
                <p>${price}, 00</p>
                <div className='priceChange'>
                    <button className='icon' id='men' onClick={e => handlePrice(e, "men")}>
                        <AiOutlineMinus size={20} />
                    </button>
                    <input type="number" value={cantidad} readOnly id="" />
                    <button className='icon' id={price} onClick={e => handlePrice(e, "sum")}>
                        <MdOutlineAdd size={20} />
                    </button>
                </div>
                <p>${price * (cantidad ? cantidad : 1)}, 00</p>
                <button className='icon delete' onClick={handleDelete}>
                    <FaRegTrashAlt size={30} />
                </button>
            </div>
        </div>
    )
}
