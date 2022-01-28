/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import PaypalBtn from './paypalBtn'
import { patchData } from '../utils/fetchData'
import { updateItem } from '../store/Actions'


const OrderDetail = ({orderDetail, state, dispatch}) => {
    const { auth, orders } = state

    const handleShipped = (order) => {
        
        dispatch({type: 'NOTIFY', payload:{loading: true}})
        patchData(`order/shipped/${order._id}`, null, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload:{error: res.err}})

            const { paid, dateOfPayment, method, shipped } = res.result

            dispatch(updateItem(orders, order._id, {
                ...order, paid, dateOfPayment, method, shipped
            }, 'ADD_ORDERS'))

            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })

    }
    if(!auth.user) return null;
    
    return (
        <>
            {
                orderDetail.map(order => (
                    <div key={order._id} style={{margin: "20px auto"}} className='row justify-content-around'>
                        <div className='text-uppercase my-3' style={{maxWidth:'600px'}}>
                            <h4 className='text-break'>Order <em>{order._id}</em></h4>
                            <hr />
                            <div className='mt-4 text-secondary'>
                                <h4>Shipping</h4>
                                <h6>Name: {order.user.name}</h6>
                                <h6>Email: {order.user.email}</h6>
                                <h6>Address: {order.address}</h6>
                                <h6>Phone: {order.phone}</h6>
                            </div>
                            <hr />
                        <h4>Shipping Status</h4>
                        
                        <div className={`alert ${order.shipped ? 'alert-success' : 'alert-danger'} d-flex justify-content-between align-items-center`} role="alert" >
                            {
                                order.shipped ? `Shipped on ${new Date(order.updatedAt).toLocaleDateString()}` : 'Not Shipped'
                            }
                            {
                                auth.user.role === 'admin' && !order.shipped &&
                                <button className='btn btn-dark text-uppercase px-1 mx-1' onClick={() => {handleShipped(order)}}>
                                    Mark as shipped
                                </button>
                            }


                        </div>
                        <hr />
                        <h4>Payment Status</h4>
                        
                        {
                            order.method && <p>Method: <em>{order.method}</em></p>
                        }
                        {
                            order.paymentId && <p>PaymentId: <em>{order.paymentId}</em></p>}
                        <div className={`alert ${order.paid ? 'alert-success' : 'alert-danger'} d-flex justify-content-between align-items-center`} role="alert" >
                            {
                                order.paid ? `Paid on ${new Date(order.dateOfPayment).toLocaleDateString()}` : 'Payment Pending'
                            }
                        </div>
                        <div>
                            <hr />
                            <h4>Order Items</h4>
                            {
                                order.cart.map(item => (
                                    <div 
                                        className='row border-bottom mx-0 p-2 justify-content-between align-items-center' 
                                        key={item._id} 
                                        style={{maxWidth: '550px'}}>
                                            <img src={item.images[0].url} alt={item.images[0].url} style={{width: '50px', height: '45px', objectFit: 'cover'}} /> 
                                            <h5 className='flex-fill text-scondary px-3 m-0'>
                                                <Link href={`/product/${item._id}`} passHref>
                                                    <a>{item.name}</a>
                                                </Link>
                                            </h5>
                                            <span 
                                                className='text-info m-0'>{item.quantity} x ${item.price} = ${item.price * item.quantity}
                                            </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {
                        !order.paid && auth.user.role !== 'admin' &&
                        <div className='p-4'>
                            <h2 className='mb-4 text-uppercase'>Total: ${order.total}</h2>
                            <PaypalBtn order={order}  />
                        </div>
                    }

                    
                </div>
                        
                ))
            }
        </>
    )

}

export default OrderDetail