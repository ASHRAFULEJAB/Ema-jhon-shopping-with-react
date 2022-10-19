import React from 'react'
import './Cart.css'

const Cart = ({ cart, handleDeleteAll, children }) => {
  let total = 0
  let shipping = 0
  let quantity = 0
  for (const product of cart) {
    quantity = quantity + product.quantity
    total = total + product.price * product.quantity
    shipping = shipping + product.shipping
  }
  const tax = parseFloat((total * 0.1).toFixed(2))
  const grandtotal = total + shipping + tax
  return (
    <div className='cart-info'>
      <h1>Order history</h1>
      <h2>Selected Items: {quantity}</h2>
      <h3>Total Price:${total}</h3>
      <h3>Total Shipping:${shipping}</h3>
      <h3>Tax:${tax}</h3>
      <h3>Grand Total:${grandtotal.toFixed(2)}</h3>
      <button onClick={() => handleDeleteAll()}> Clear All Cart</button>
      {children}
    </div>
  )
}

export default Cart
