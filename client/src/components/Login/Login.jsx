import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
  return (
      <div>
            <form className="LoginForm"> 
                <label>User</label>
                <input type="text" />
                <label>Password</label>
                <input type="password" />
                <input type="submit" />
            </form>
            <hr />
            <br />
            <p>ó</p>
            <Link to='/register'>
                <button>Register</button>
            </Link>
    </div>
  )
}

