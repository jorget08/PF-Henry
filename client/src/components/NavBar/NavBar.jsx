import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export default function NavBar() {
    return (
        <div>
            <nav className="navbar">
                <Link to='/home'>
                    <h1>BookStore</h1>
                </Link>
                <div className='links'>
                    <Link to='/home' className='link'>
                        <span >HOME</span>
                    </Link>
                    <Link to='/aboutUs' className='link'>
                        <span >ABOUT US</span>
                    </Link>
                </div>
            </nav>
            <SearchBar />
        </div>
    )
}
