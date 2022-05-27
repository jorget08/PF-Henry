import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { BsCart2 } from 'react-icons/bs';
import { IoMdContact } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';
import { MdContactSupport } from 'react-icons/md';
import "./styles.css"
export default function NavBar() {
    return (
        <div className="navbar">
            <nav>
                <div className='logoBar'>
                    <Link to='/home'>
                        <h1>BookStore</h1>
                    </Link>
                    <SearchBar />
                    <Link to='/home' className='link'>
                        <IoHomeOutline size={30} />
                    </Link>
                    <Link to='/support' className='link'>
                        <MdContactSupport size={32} />
                    </Link>
                    <Link to='/cart'>
                        <BsCart2 size={30} className="iconCart" />
                    </Link>
                    <Link>
                        <div className='log'>
                            <span>Log In</span>
                            <IoMdContact size={30} />

                        </div>
                    </Link>

                </div>

            </nav>
        </div>
    )
}
