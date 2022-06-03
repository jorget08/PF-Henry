import { React, useState } from 'react'
import { removeOneFromCart } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { AiOutlineMinus } from 'react-icons/ai'
import { MdOutlineAdd } from 'react-icons/md'
import { FaRegTrashAlt } from 'react-icons/fa'
import './styles.css'
import Swal from 'sweetalert2'

export default function Item({ id, title, img, author, price, stock, handleItem, newDel }) {
    const dispatch = useDispatch()
    let book = JSON.parse(localStorage.getItem("carrito")).filter(e => e.id === id)
    let cantidad = book[0].cant
    const [cant, setCant] = useState(cantidad);
    console.log(cantidad)
    console.log(stock)

    function handlePrice(e, op) {
        if (cant + 1 > stock && op === "sum") {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'error',
                title: `No more stock available!
                         "${title}"`,
              })
        
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
