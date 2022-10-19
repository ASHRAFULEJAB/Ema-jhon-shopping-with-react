import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/UserContext'
import './Signup.css'

const Signup = () => {
  const [error, setError] = useState()
  const { createUser } = useContext(AuthContext)

  const handleSignUp = (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value
    const confirm = form.confirm.value
    console.log(email, password, confirm)
    if (password.length < 8) {
      setError('Password must be 8 characters!!')
      return
    }
    if (password !== confirm) {
      setError("Your password doesn't match")
      return
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user
        console.log(user)
        form.reset()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='form-container'>
      <h1 className='form-title'>Sign Up</h1>
      <form onSubmit={handleSignUp}>
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
        <div className='form-control'>
          <label htmlFor='confirm'>Confirm Password</label>
          <input
            type='password'
            name='confirm'
            id=''
            placeholder='Enter your Confirm Password'
            required
          />
        </div>
        <input className='btn-submit' type='submit' value='Sign Up' />
        <p className='text-color'>{error?.error}</p>
        <p>
          Already Have An Account <Link to='/login'>Log In</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup
;<h1>sign up</h1>
