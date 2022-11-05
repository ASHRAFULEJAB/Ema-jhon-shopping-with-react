import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import {
  addToDb,
  deleteShoppingCart,
  getStoredCart,
} from '../../utilities/fakedb'
import Cart from '../Cart/Cart'
import Product from '../Product/Product'
import './Shop.css'

const Shop = () => {
  // const {products,count} = useLoaderData()
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [cart, setCart] = useState([])
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)

  const pages = Math.ceil(count / size)

  useEffect(() => {
    const url = `http://localhost:5000/products?page=${page}&size=${size}`
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count)
        setProducts(data.products)
      })
  }, [page, size])

  const handleDeleteAll = () => {
    setCart([])
    deleteShoppingCart()
  }

  useEffect(() => {
    const sotredCard = getStoredCart()
    const savedCart = []
    const ids = Object.keys(sotredCard)
    fetch('http://localhost:5000/productsIds', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        for (const id in sotredCard) {
          const addedProduct = data.find((product) => product._id === id)
          if (addedProduct) {
            const quantity = sotredCard[id]
            addedProduct.quantity = quantity
            savedCart.push(addedProduct)
          }
        }
        setCart(savedCart)
      })

  }, [products])

  const handleAddToCart = (selectedProduct) => {
    let newCart = []
    const exists = products.find(
      (product) => product._id === selectedProduct._id
    )
    if (!exists) {
      selectedProduct.quantity = 1
      newCart = [...cart, selectedProduct]
    } else {
      const rest = cart.filter((product) => product._id !== selectedProduct._id)
      exists.quantity = exists.quantity + 1
      newCart = [...rest, exists]
    }

    setCart(newCart)
    addToDb(selectedProduct._id)
  }
  return (
    <div className='shops-conatiner'>
      <div className='products-container'>
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className='carts-container'>
        <Cart cart={cart} handleDeleteAll={handleDeleteAll}>
          <Link to='/orders'>
            <button>Review Item</button>{' '}
          </Link>
        </Cart>
      </div>
      <div className='pagination'>
        <p className='info'>Currently Selected pages:{page}</p>
        {[...Array(pages).keys()].map((number) => (
          <button
            key={number}
            className={page === number && 'selected'}
            onClick={() => setPage(number)}
          >
            {number + 1}
          </button>
        ))}
        <select onChange={(e) => setSize(e.target.value)}>
          <option value='5'>5</option>
          <option value='10' selected>
            10
          </option>
          <option value='15'>15</option>
          <option value='20'>20</option>
        </select>
      </div>
    </div>
  )
}

export default Shop
