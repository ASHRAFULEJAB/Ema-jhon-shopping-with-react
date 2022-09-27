import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const[products,setProducts]=useState([])
    const[cart,setCart]=useState([])
    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]);

    useEffect(()=>{
         const sotredCard = getStoredCart();
         const savedCart = []
         for(const id in sotredCard){
           const addedProduct = products.find(product=> product.id === id)
           if(addedProduct){
           const quantity = sotredCard[id]
           addedProduct.quantity = quantity
           savedCart.push(addedProduct)
           console.log(addedProduct)
         }
        }
         setCart(savedCart)
    },[products])
    
    const handleAddToCart=(selectedProduct)=>{
    let newCart=[];
    const exists = products.find(product=> product.id === selectedProduct.id);
    if(!exists){
        selectedProduct.quantity=1;
        newCart =[...cart,selectedProduct];
    }
    else{
        const rest = cart.filter(product=> product.id !== selectedProduct.id);
            exists.quantity = exists.quantity+1;
            newCart=[...rest,exists];
        }
    
       setCart(newCart)
       addToDb(selectedProduct.id)

}
    return (
        <div className='shops-conatiner'>
            <div className="products-container">
                {
                    products.map(product => <Product 
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                    ></Product>)
                }
                </div>
            <div className="carts-container">
                <Cart cart={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;