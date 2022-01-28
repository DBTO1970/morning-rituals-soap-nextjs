/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import { useRouter } from 'next/router'
import CartItem from '../components/cart/CartItem'
import { getData, postData } from '../utils/fetchData'

const Cart = () => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth, orders } = state

    const [total, setTotal] = useState(0)
    
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [stateUS, setUS] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [phone, setPhone] = useState('')


    const [callback, setCallback] = useState(false)
    const router = useRouter()
    
    

    useEffect(()=>{
        const getTotal = () => {
            const res = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(res)
        }

        getTotal()
    }, [cart])

    
    useEffect(() => {
        const cartLocal = JSON.parse(localStorage.getItem('__morningrs__cart01__user01'))
        if(cartLocal && cartLocal.length > 0) {
            let newArr = []
            const updateCart = async () => {
                for (const item of cartLocal) {
                    const res = await getData(`product/${item._id}`)
                    const { _id, name, images, price, inStock, sold } = res.product 
                    if(inStock > 0) {
                        
                        newArr.push({ 
                            _id, name, images, price, inStock, sold, 
                            quantity: item.quantity > inStock ? 1 : item.quantity 
                        })
                    }
                }

                dispatch({type: "ADD_CART", payload: newArr })
            }
            updateCart()
        }
    }, [callback])

    const handlePayment = async () => {
        
        if(!address || !phone)
        return dispatch({ type: 'NOTIFY', payload: {error: 'Please complete shipping information.'}})

        let newCart = [];
        for(const item of cart) {
            const res = await getData(`product/${item._id}`)
            if(res.product.inStock - item.quantity >= 0) {
                newCart.push(item)
            }
        }
        
        
        if(newCart.length < cart.length) {
            setCallback(!callback)
            return dispatch({ type: 'NOTIFY', payload: {error: 'The product is out of stock or limited in quantity.'}})
        }

        dispatch({ type: 'NOTIFY', payload: {loading: true}})
        
        postData('order', { address, phone, cart, total }, auth.token)
        .then(res => {
            if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err}})

            dispatch({ type: 'ADD_CART', payload: [] })

            const newOrder = {
                ...res.newOrder,
                user: auth.user
            }
            dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] })
            dispatch({ type: 'NOTIFY', payload: {success: res.msg}})

            return router.push(`/order/${res.newOrder._id}`)
        })
        

    } 

    if(cart.length === 0) 
        return (
            <div className='container' >
            <Link href={'/products/'} passHref >
                        <button className='btn btn-dark my-3' onClick={() => router.push('/products/')}><i className="fas fa-arrow-left" aria-hidden="true" ></i> Keep Browsing </button>
                    </Link>
                <div  className='text-center' >
                    <h2>Your basket is empty</h2>
                    <img className="img-responsive mx-auto" style={{height: 'auto', width:'80%', borderRadius: '50px'}} src="/empty_basket.jpg" alt="empty_basket.jpg" />
                </div>
            </div>
        )

        return (
            <div className='row mx-auto' >
                <Head>
                    <title>Basket</title>
                </Head>
                <div className='col-md-12'>
                    <Link href={'/products/'} passHref >
                        <button className='btn btn-dark mx-auto my-2' onClick={() => router.push('/products/')}><i className="fas fa-arrow-left" aria-hidden="true" ></i> Keep Browsing </button>
                    </Link>
                </div>
                
                <div className='col-md-8 text-secondary table-responsive my-3'>
                    
                    <h1>Your Shopping Basket</h1>
                    <table className='table my-3'>
                        <tbody>
                            {
                                cart.map(item => (
                                    <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                                    ))
                            }
                        
                        </tbody>
                    </table>
                </div>
                <div className='col-md-4 my-3 text-right text-secondary'>
                    <form>
                        <h2>Shipping Details</h2>
                        <label htmlFor='address'> Street Address</label>
                        <input 
                            type="text" 
                            name="address" 
                            id="address" 
                            className="form-control mb-2" 
                            value={address} 
                            onChange={e => setAddress(e.target.value)} 
                        />
                        <label htmlFor='city'> City</label>
                        <input type="text" name="city" id="city" className="form-control mb-2" value={city} onChange={e => setCity(e.target.value)}  />
                        <label htmlFor='US'> State</label>
                        <input type="text" name="US" id="US" className="form-control mb-2" value={stateUS} onChange={e => setUS(e.target.value)}  />
                        <label htmlFor='zipcode'> Zipcode</label>
                        <input type="text" name="zipcode" id="zipcode" className="form-control mb-2" value={zipcode} onChange={e => setZipcode(e.target.value)}  />
                        <label htmlFor='phone'> Phone</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            id="phone" 
                            className="form-control mb-2" 
                            value={phone} 
                            onChange={e => setPhone(e.target.value)} 
                        />
                        
                    </form>
                    <h3>Order Total: <span className='text-info'>${total}</span></h3>
                    <Link href={auth.user ? '#!' : '/signin'} passHref >
                        <a className='btn btn-dark my-2' onClick={handlePayment} >
                            Proceed with payment
                        </a>
                    </Link>
                </div>
            </div>
        )
}

export default Cart


