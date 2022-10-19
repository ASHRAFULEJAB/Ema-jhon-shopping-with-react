import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb'
import Cart from '../Cart/Cart'
import ReviewItem from '../ReviewItem/ReviewItem'

const Orders = () => {
  const { products, previosCart } = useLoaderData()
  const [cart, setCart] = useState(previosCart)

  const handleRemoveItem = (id) => {
    const remaining = cart.filter((product) => product.id !== id)
    setCart(remaining)
    removeFromDb(id)
  }
  const handleDeleteAll = () => {
    setCart([])
    deleteShoppingCart()
  }
  return (
    <div className='shops-conatiner'>
      <div className='orders-container'>
        {cart.map((product) => (
          <ReviewItem
            key={product.id}
            product={product}
            handleRemoveItem={handleRemoveItem}
          ></ReviewItem>
        ))}
        {cart.length === 0 && (
          <h2>
            THis Cart is Empty..Please <Link to='/'>Shop More</Link>
          </h2>
        )}
      </div>
      <div className='carts-container'>
        <Cart cart={cart} handleDeleteAll={handleDeleteAll}>
          <Link to='/shipping'>
            <button>Shipping</button>
          </Link>
        </Cart>
      </div>
    </div>
  )
}

export default Orders
