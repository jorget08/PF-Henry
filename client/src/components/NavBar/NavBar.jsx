import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { BsCart2 } from 'react-icons/bs';
import { IoMdContact } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';
import { MdContactSupport } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import "./styles.css"
import { useModals } from '../Utils/useModals';
import Modal from '../Modal/Modal';
import Login from '../Login/Login';
import { unlogUser } from '../../redux/actions';



export default function NavBar() {
    const bookCarts = useSelector(state => state.cart)
    const [isOpenModal, openModal, closeModal] = useModals(false)
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const [isLogged, setIsLogged] = useState(false)

    function handleLogOut(e){
        e.preventDefault()
        setIsLogged(false)
        dispatch(unlogUser())
    }

    useEffect(() => {
      if(token){
          setIsLogged(true)
      }
      else{
          setIsLogged(false)
      }
    }, [token, isLogged])
    
    return (
        <div className="navbar">
            <nav>
                <div className='logoBar'>
                    <div className='search'>
                        <div className='logo'>
                            <Link to='/home'>
                                <img src="https://www.freeiconspng.com/thumbs/book-icon/book-stack-icon--icon-search-engine-16.png" alt="logo" />
                                <span>BookStore</span>
                            </Link>

                        </div>
                        <SearchBar />

                    </div>
                    <div className='links'>
                        <Link to='/home' className='link'>
                            <IoHomeOutline size={30} />
                        </Link>
                        <Link to='/support' className='link'>
                            <MdContactSupport size={32} />
                        </Link>
                        <Link to='/cart'>
                            <BsCart2 size={30} className="iconCart" />
                            <p> {bookCarts?.length}</p>
                        </Link>
                        {/*<Link to='/logIn'>
                             <div className='log'>
                                <span>Log In</span>
                                <IoMdContact size={30} />                                
                                </div> 
                            </Link>*/}

                        {isLogged?<div><Link to="userProfile"><button>View profile</button></Link><button onClick={(e)=>handleLogOut(e)}>Log out</button></div>:
                            <div className='log'>
                            <span onClick={openModal} >Log In</span>
                            <IoMdContact size={30} onClick={openModal} />

                            <Modal isOpen={isOpenModal} closeModal={closeModal}>
                                <Login />
                            </Modal>
                        </div>}
                        <Link to='/createbook'>
                            <span>Create a book</span>
                        </Link>

                    </div>

                </div>

            </nav>
        </div>
    )
}
