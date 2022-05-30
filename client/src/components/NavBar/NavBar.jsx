import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { BsCart2 } from 'react-icons/bs';
import { IoMdContact } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';
import { MdContactSupport } from 'react-icons/md';
import { useSelector } from 'react-redux';
import "./styles.css"
export default function NavBar() {
    const bookCarts = useSelector(state => state.cart)
    return (
        <div className="navbar">
            <nav>
                <div className='logoBar'>
                    <div className='search'>
                        <Link to='/home'>
                            <h1>BookStore</h1>
                        </Link>
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
                            {bookCarts?.length}
                        </Link>
                        <Link to='/logIn'>
                            <div className='log'>
                                <span>Log In</span>
                                <IoMdContact size={30} />

                            </div>
                        </Link>
                        <Link to='/createbook'>
                            <span>Create a book</span>
                        </Link>

                    </div>

                </div>

            </nav>
        </div>
    )
}
