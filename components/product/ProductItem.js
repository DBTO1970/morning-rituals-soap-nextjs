/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const ProductItem = ({product, handleCheck}) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state
    
   
    const userLink = () => {
        return(
            <div className='text-center mb-2'>
                
                <a className='btn btn-success text-center' 
                    style={{width: '150px', 
                    margin: '1px 2px 1px 2px'}} 
                    disabled={product.inStock === 0 ? true : false }
                    onClick={() => dispatch(addToCart(product, cart))} >
                    <i className="fas fa-shopping-basket" style={{margin: '0 5px'}} aria-hidden="true" ></i>  
                    Add to Basket
                </a>

            </div>
        )
    }

    const adminLink = () => {

        return(
            <div className='text-center mb-2'>
                <Link href={`create/${product._id}`} passHref >
                    <a className='btn btn-info text-center my-2' style={{width: '150px', margin: '1px 2px 1px 2px'}}>
                        <i className="fas fa-info-circle" ></i>
                        &nbsp;Edit
                    </a>
                </Link>
                <button className='btn btn-danger text-center' 
                    style={{width: '150px', 
                    margin: '1px 2px 1px 2px'}} 
                    data-toggle="modal" data-target="#exampleModal" 
                    onClick={() => dispatch(({
                        type: 'ADD_MODAL', 
                        payload: [{ 
                            data: '', 
                            id: product._id, 
                            title: product.name, 
                            type: 'DELETE_PRODUCT'
                            }]
                        }))} >
                    <i className="fas fa-shopping-basket" style={{margin: '0 5px'}} aria-hidden="true" ></i>  
                    Delete
                </button>

            </div>
        )
    }
    
    
    return (
        
            <div className="card" style={{width: '18rem'}}>
                {
                    auth.user && auth.user.role === 'admin' && 
                    <input 
                        type="checkbox" 
                        checked={product.checked} 
                        className='position-absolute' 
                        style={{height: '20px', width: '20px'}} 
                        onChange={()=> handleCheck(product._id)}
                        />
                } 
                <img className="card-img-top" src={product.images[0].url} alt={product.name} style={{borderRadius: '10px'}} />
                <div className="card-body">
                    <h5 className="card-title text-capitalize" title={product.name}>{product.name}</h5>
                    <div className="row justify-content-between mx-0">
                        <h6 className="text-dark" >Price: ${product.price} US</h6>
                        {
                            product.inStock > 0 ? 
                            <h6 className="text-danger">In Stock: {product.inStock} </h6> : 
                            <h6 className="text-danger"> Out of Stock</h6>
                            
                        }
                    </div>
                    <p className="card-text" title={product.description} >{product.description} </p><span><Link href={`product/${product._id}`}> more...</Link></span><br />
                    
                    
                </div>
                    <div className='text-center'>
                        {!auth.user || auth.user.role !== 'admin' ? userLink() : adminLink() }
                    </div>
            </div>
    )
}

export default ProductItem