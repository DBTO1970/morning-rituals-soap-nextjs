// import Image from 'next/image'

const ProductItem = ({product}) => {
    
return (
    <div>
        <div className="card" >
            <img className="card-img-top" src={product.image} alt={product.name} style={{borderRadius: '10px'}} />
            <div className="card-body">
                <h5 className="card-title" title={product.name}>{product.name}</h5>
                <div>
                    <h6 className="text-danger" >${product.price}</h6>
                    {
                        product.inStock > 0 ? 
                        <h6 className="text-danger">In Stock: {product.inStock} </h6> :
                        <h6 className="text-danger"> This batch will be ready on {product.dateReady}</h6>
                    }
                </div>
                <p className="card-text" title={product.description} >{product.description} </p><br />
                <div>
                    <a href="#" className="btn btn-primary" style={{margin: '1rem'}}>More Info</a>
                    <a href="#" className="btn btn-primary" style={{margin: '1rem'}} >Add to Basket</a>
                </div>
                
            </div>
        </div>
    </div>
)
}

export default ProductItem