// import Image from 'next/image'
import Link from 'next/link'

const ProductItem = ({product}) => {
    const userLink = () => {
        return(
            <>
                <Link href={`${product._id}`}>
                    <a className='btn btn-info' 
                        style={{marginRight: '5px', flex: 1}}>More Info</a>
                </Link>
                <button className='btn btn-success'
                    style={{marginLeft: '5px', flex: 1}}>
                    Add to Basket
                </button>

            </>
        )
    }
return (
    <div>
        <div className="card" >
            <img className="card-img-top" src={product.image} alt={product.name} style={{borderRadius: '10px'}} />
            <div className="card-body">
                <h5 className="card-title text-capitalize" title={product.name}>{product.name}</h5>
                <div className="row justify-content-between mx-0">
                    <h6 className="text-dark" >Price: ${product.price}</h6>
                    {
                        product.inStock > 0 ? 
                        <h6 className="text-danger">In Stock: {product.inStock} </h6> :
                        <div>
                        <h6 className="text-danger"> Out of Stock</h6>
                        {/* <h6 className="text-danger small"> This batch will be ready on {product.dateReady}</h6> */}
                        </div>
                        
                    }
                </div>
                <p className="card-text" title={product.description} >{product.description} </p><br />
                <div className="row justify-content-between mx-0">
                    {userLink()}
                   
                    {/* <a href="#" className="btn btn-info" style={{margin: '1rem'}}>More Info</a>
                    <a href="#" className="btn btn-success" style={{margin: '1rem'}} >Add to Basket</a> */}
                </div>
                
            </div>
        </div>
    </div>
)
}

export default ProductItem