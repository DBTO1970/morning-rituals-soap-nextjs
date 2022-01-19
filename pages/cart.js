import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import CartItem from '../components/cart/CartItem'
import { getData } from '../utils/fetchData'

const Cart = () => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state

    const [total, setTotal] = useState(0)

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
        const cartLocal = JSON.parse(localStorage.getItem('__next__cart01__jerry'))
        if(cartLocal && cartLocal.length > 0) {
            let newArr = []
            const updateCart = async () => {
                for (const item of cartLocal) {
                    const res = await getData(`product/${item._id}`)
                    const { _id, name, images, price, inStock } = res.product 
                    if(inStock > 0) {
                        newArr.push({ 
                            _id, name, images, price, inStock, 
                            quantity: item.quantity > inStock ? 1 : item.quantity 
                        })
                    }
                }

                dispatch({type: "ADD_CART", payload: newArr })
            }
            updateCart()
        }
    }, [])


    if(cart.length === 0) return <div className='container' style={{alignContent: 'center', justifyContent: 'center', margin: '2rem', paddingTop: '100px'}} >
        <h2>Your basket is empty</h2>
        <img className="img-responsive" style={{height: 'auto', width:'100%', borderRadius: '50px'}} src="/empty_basket.jpg" alt="empty_basket.jpg" />
    </div>

    return (
        <div className='container' style={{alignContent: 'center', justifyContent: 'center', margin: '2rem', paddingTop: '100px'}} >
            <div className='row mx-auto item' style={{alignContent: 'center', justifyContent: 'center', margin: '2rem', paddingTop: '100px'}} >
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
            <div className='col-md-4 my-3 text-right item'>
                <form>
                    <h2>Shipping Details</h2>
                    <label htmlFor='address'> Address</label>
                    <input type="text" name="address" id="address" className="form-control mb-2" />
                    <label htmlFor='address'> City</label>
                    <input type="text" name="city" id="city" className="form-control mb-2" />
                    <label htmlFor='address'> State</label>
                    <input type="text" name="state" id="state" className="form-control mb-2" />
                    <label htmlFor='address'> Zipcode</label>
                    <input type="text" name="zipcode" id="zipcode" className="form-control mb-2" />
                    <label htmlFor='address'> Phone</label>
                    <input type="tel" name="phone" id="phone" className="form-control mb-2" />
                </form>
                <h3>Order Total: <span className='text-info'>${total}</span></h3>
                <Link href={auth.user ? '#' : '/signin'}>
                    <a className='btn btn-dark'>Proceed to checkout</a>
                </Link>
            </div>
            
            </div>
        
     </div>
    )
}

export default Cart


