/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import PaypalBtn from './paypalBtn'

const OrderDetail = ({orderDetail}) => {

    return (
        <>
            {
                orderDetail.map(order => (
                    <div key={order._id} style={{margin: "20px auto"}} className='row justify-content-around'>
                        <div className='text-uppercase my-3' style={{maxWidth:'600px'}}>
                            <h4 className='text-break'>Order {order._id}</h4>
                            <div className='mt-4 text-secondary'>
                                <h4>Shipping</h4>
                                <h6>Name: {order.user.name}</h6>
                                <h6>Email: {order.user.email}</h6>
                                <h6>Address: {order.address}</h6>
                                <h6>Phone: {order.phone}</h6>
                            </div>
                        <h4>Delivery Status</h4>
                        <div className={`alert ${order.delivered ? 'alert-success' : 'alert-danger'} d-flex justify-content-between align-items-center`} role="alert" >
                            {
                                order.delivered ? `Delivered on ${new Date(order.updatedAt).toLocaleDateString()}` : 'Not Delivered'
                            }


                        </div>
                        <h4>Payment Status</h4>
                        <div className={`alert ${order.paid ? 'alert-success' : 'alert-danger'} d-flex justify-content-between align-items-center`} role="alert" >
                            {
                                order.paid ? `Paid on ${new Date(order.dateOfPayment).toLocaleDateString()}` : 'Payment Pending'
                            }
                        </div>
                        <div>
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
                                            <span className='text-info m-0'>{item.quantity} x ${item.price} = ${item.price * item.quantity}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {
                        !order.paid && 
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