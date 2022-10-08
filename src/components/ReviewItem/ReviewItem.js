import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import './ReviewItem.css'

const ReviewItem = ({product,handleRemoveItem}) => {
    const{id,name,price,img,quantity,shipping}=product
    return (
        <div className='order-review'>
            <div className='review-img'>
                <img src={img} alt="" />
            </div>
            <div className="review-details">
            <div className="review-item-conatiner">
                <p>{name}</p>
                <p>Price:${price}</p>
                <p>Shipping:${shipping}</p>
                <p>Quantity:{quantity}</p>
            </div>
            <div className="delete-btn">
                <button onClick={()=>handleRemoveItem(id)} className='btn-delete'>
                    <FontAwesomeIcon className='icon-delete' icon={faTrashCan}></FontAwesomeIcon>
                </button>
            </div>
            </div>
            
        </div>
    );
};

export default ReviewItem;