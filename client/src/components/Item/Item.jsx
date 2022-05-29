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
        if (cant+1 > stock && e === "sum"){
            alert('No hay stock')
        } else if (cant-1 < 1 && e === "men") {
            
        } else {
            e === 'sum' ? setCant(cant + 1) : setCant(cant - 1)            
        }
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
                <p>${price}, 00</p>
                <div className='priceChange'>
                    <button className='icon' id='men' onClick={e => handlePrice("men")}>
                        <AiOutlineMinus size={20} />
                    </button>
                    <input type="number" value={cant} readOnly id="" />
                    <button className='icon' id='sum' onClick={e => handlePrice("sum")}>
                        <MdOutlineAdd size={20} />
                    </button>
                </div>
                <p>${price * (cant ? cant : 1)}, 00</p>
                <button className='icon delete' onClick={handleDelete}>
                    <FaRegTrashAlt size={30} />
                </button>
            </div>
        </div>
    )
}
