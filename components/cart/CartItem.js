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
                    <Link href={`/product/${item._id}`}>
                    <a>{item.name}</a>
                    </Link>
                </h5>
                <h5>Item Total: ${item.quantity * item.price}</h5>
                <h6 className='text-danger'>In Basket: {item.quantity} bars @ ${item.price}</h6>
                {
                        item.inStock > 0 
                        ? <p className='mb-1 text-danger'>In Stock: {item.inStock}</p>
                        : <p className='mb-1 text-danger'>Out of Stock</p>
                    }
                
            </td>
            {/* <td>
                    
            </td> */}
            <td className='align-middle' style={{cursor: 'pointer'}} >
                    
            <i className="fas fa-plus-circle mt-2 text-success" 
                        onClick={() => dispatch(increase(cart, item._id)) } 
                        disabled={ item.quantity === item.inStock ? true : false } 
                        style={{fontSize: '1.5rem'}} 
                        ></i>
                    {/* <button className='btn btn-outline-success mt-2' style={{borderRadius: '40px'}} 
                        onClick={() => dispatch(increase(cart, item._id)) } 
                        disabled={ item.quantity === item.inStock ? true : false }
                    ></button> */}
                    <span className='text-info p-1 mx-2' style={{fontWeight: '700', fontSize: '1.5rem'}}>{item.quantity}</span>
                    {/* <button className='btn btn-outline-warning mb-2' style={{borderRadius: '40px'}} 
                        onClick={() => dispatch(decrease(cart, item._id)) } 
                        disabled={ item.quantity <= 1 ? true : false }
                        ></button> */}
                    <i className="fas fa-minus-circle mb-2 text-warning" 
                            onClick={() => dispatch(decrease(cart, item._id)) } 
                            style={{fontSize: '1.5rem'}} 
                            disabled={ item.quantity <= 1 ? true : false }
                            ></i>
            </td>
            <td className='align-middle' style={{ cursor: 'pointer' }} >
            <i className="fas fa-trash text-danger" 
                style={{fontSize: '1.5rem'}}
                onClick={() => dispatch(({
                type: 'ADD_MODAL',
                payload: { 
                    data: cart, 
                    id: item._id, 
                    title: item.name
                    }
                }))} 
                data-toggle="modal" data-target="#deleteItemModal" 

                ></i>
            {/* <button className='btn btn-outline-danger m-1' style={{borderRadius: '20%'}} 
                data-toggle="modal" data-target="#exampleModal" 
                onClick={() => dispatch(removeItem({
                    type: 'ADD_MODAL',
                    payload: { data: cart, id: item._id, title: item.name }
                }))}
                >
                
                
            </button> */}
            
            </td>
        </tr>
    )
}

export default CartItem