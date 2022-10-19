import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
  const { name, img, price, seller, ratings } = props.product
  const { handleAddToCart } = props
  return (
    <div className='product'>
      <img src={img} alt='' />
      <h6 className='product-name'>{name}</h6>
      <div className='product-info'>
        <h3>
          <b>Price:</b>${price}
        </h3>
        <p>
          <b>Seller:</b>
          {seller}
        </p>
        <p>
          <b>Ratings:{ratings}Stars</b>
        </p>
      </div>
      <button
        onClick={() => handleAddToCart(props.product)}
        className='btn-cart'
      >
        <p className='btn-text'>Add To cart</p>
        <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
      </button>
    </div>
  )
}

export default Product
