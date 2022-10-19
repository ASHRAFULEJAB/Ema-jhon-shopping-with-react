import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/Logo.svg'
import { AuthContext } from '../contexts/UserContext'
import './Header.css'

const Header = () => {
  const { user, logOut } = useContext(AuthContext)

  return (
    <nav className='header'>
      <img src={logo} alt='' />
      <p>{user?.email}</p>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/inventory'>Inventory</Link>
        <Link to='/orders'>Orders</Link>
        <Link to='/about'>About</Link>
        {user?.uid ? (
          <button onClick={logOut} className='btn-signOut'>
            Sign Out
          </button>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Header
