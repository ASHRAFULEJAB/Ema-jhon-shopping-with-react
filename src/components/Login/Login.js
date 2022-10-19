import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/UserContext'
import './Login.css'
const Login = () => {
  const { signIn } = useContext(AuthContext)
  const naviagte = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleLogIn = (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value
    signIn(email, password)
      .then((result) => {
        const user = result.user
        console.log(user)
        form.reset()
        naviagte(from, { replace: true })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='form-container'>
      <h1 className='form-title'>Login</h1>
      <form onSubmit={handleLogIn}>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id=''
            placeholder='Enter your email'
            required
          />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id=''
            placeholder='Enter your password'
            required
          />
        </div>
        <input className='btn-submit' type='submit' value='Log In' />
        <p>
          New to Ema John <Link to='/signup'>Create A new Account</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
