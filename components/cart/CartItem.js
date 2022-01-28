/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { increase, decrease } from '../../store/Actions'

const CartItem = ({item, dispatch, cart}) => {
    return (
        <tr>
            <td style={{width: '100px', overflow: 'hidden'}} >
                <img 
                    src={item.images[0].url} 
                    alt={item.images[0].url} 
                    className="img-thumbnail w-100" 
                    style={{minWidth: '80px', minHeight: '50px'}}
                />
            </td>
            <td style={{width: '200px'}} className='w-50 align-middle'>
                <h5 className='text-secondary'>
                    <Link href={`/product/${item._id}`} passHref >
                        <a>{item.name}</a>
                    </Link>
                </h5>
                
                <h6 className='text-danger'>
                    In Basket: {item.quantity} bars @ ${item.price} = ${item.quantity * item.price}
                </h6>
                {
                        item.inStock > 0 
                        ? <p className='mb-1 text-danger'>In Stock: {item.inStock}</p>
                        : <p className='mb-1 text-danger'>Out of Stock</p>
                    }
                
            </td>
          
            <td className='align-middle' style={{cursor: 'pointer'}} >
                    
                <button 
                    className='btn btn-outline-success' 
                    style={{borderRadius: '40px'}} 
                    onClick={() => dispatch(increase(cart, item._id)) } 
                    disabled={ item.quantity === item.inStock ? true : false } >
                    <i className="fas fa-plus-circle" aria-hidden ></i>
                </button>
                <span 
                    className='text-info align-middle mx-2 px-2' 
                    style={{fontWeight: '700'}}
                    >
                        {item.quantity}
                </span>
                <button 
                    className='btn btn-outline-warning' 
                    style={{borderRadius: '40px'}} 
                    onClick={() => dispatch(decrease(cart, item._id)) } 
                    disabled={ item.quantity <= 1 ? true : false }
                    > 
                    <i className="fas fa-minus-circle" aria-hidden ></i>
                </button>
            </td>
            <td className='align-middle' style={{ cursor: 'pointer', }} >
            <i className="fas fa-trash text-danger" 
                style={{fontSize: '1.5rem'}}
                onClick={() => dispatch(({
                type: 'ADD_MODAL',
                payload: { 
                    data: cart, 
                    id: item._id, 
                    title: item.name,
                    type: 'ADD_CART'
                    }
                }))} 
                data-toggle="modal" data-target="#deleteItemModal" 
                aria-hidden
                ></i>
            </td>
        </tr>
    )
}

export default CartItem