/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import { useRouter } from 'next/router'
import CartItem from '../components/cart/CartItem'
import { getData } from '../utils/fetchData'
import PaypalBtn from './paypalBtn'

const Cart = () => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    const [total, setTotal] = useState(0)

    const [address, setAddress] = useState('')
    // const [city, setCity] = useState('')
    // const [stateUS, setUS] = useState('')
    // const [zipcode, setZipcode] = useState('')
    const [phone, setPhone] = useState('')
    const [payment, setPayment] = useState(false)
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
    }, [dispatch])

    const handlePayment = () => {
        if(!address || !phone)
        return dispatch({ type: 'NOTIFY', payload: {error: 'Please complete shipping information'}})
        setPayment(true)
    }


    if(cart.length === 0) return (
    <div style={{alignContent: 'center', justifyContent: 'center', margin: '2rem', paddingTop: '100px'}} >
        <h2>Your basket is empty</h2>
        <div>
            <Link href={'/products/'}>
                <button className='btn btn-info' 
                style={{}} onClick={() => router.back()}><i className="fas fa-arrow-left"></i> Keep Browsing </button>
            </Link>
        </div>
        
        <img className="img-responsive" style={{height: 'auto', width:'80%', borderRadius: '50px'}} src="/empty_basket.jpg" alt="empty_basket.jpg" />
            
    </div>)

    return (
        <div className='container' style={{alignContent: 'center', justifyContent: 'center', margin: '2rem', paddingTop: '100px'}} >
            <div className='row mx-auto item' style={{alignContent: 'center', justifyContent: 'center', margin: '2rem'}} >
            <Head>
                <title>Basket</title>
            </Head>
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
            <div className='col-md-4 my-3 text-right'>
                <form>
                    <h2>Shipping Details</h2>
                    <label htmlFor='address'> Address</label>
                    <input type="text" name="address" id="address" className="form-control mb-2" value={address} onChange={e => setAddress(e.target.value)} />
                    {/* <label htmlFor='city'> City</label>
                    <input type="text" name="city" id="city" className="form-control mb-2" value={city} onChange={e => setCity(e.target.value)}  />
                    <label htmlFor='US'> State</label>
                    <input type="text" name="US" id="US" className="form-control mb-2" value={stateUS} onChange={e => setUS(e.target.value)}  />
                    <label htmlFor='zipcode'> Zipcode</label>
                    <input type="text" name="zipcode" id="zipcode" className="form-control mb-2" value={zipcode} onChange={e => setZipcode(e.target.value)}  /> */}
                    <label htmlFor='phone'> Phone</label>
                    <input type="tel" name="phone" id="phone" className="form-control mb-2" value={phone} onChange={e => setPhone(e.target.value)}  />
                </form>
                <h3>Order Total: <span className='text-info'>${total}</span></h3>
                {
                    payment 
                    ? <PaypalBtn 
                        total={total} 
                        address={address} 
                        phone={phone} 
                        state={state} 
                        dispatch={dispatch}
                    />
                    : <Link href={auth.user ? '#!' : '/signin'}>
                        <a className='btn btn-dark my-2' onClick={handlePayment} >
                            Proceed with payment
                        </a>
                    </Link>
                }
                
            </div>
            
            </div>
        
     </div>
    )
}

export default Cart


