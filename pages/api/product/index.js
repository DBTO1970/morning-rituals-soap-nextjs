import connectDB from '../../../utils/connectDB'
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'

connectDB()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getProducts(req, res)
            break;
        case "POST":
            await createProducts(req, res)
            break;
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Products.find()
        res.json({
            status: 'success',
            result: products.length,
            products
        })
    } catch(err) {
        return res.status(500).json({err: err.message})
    }
}

const createProducts = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin') return res.status(500).json({err: 'Authentication is not valid'})

        const {name, price, inStock, description, ingredients, category, images} = req.body

        if(!name || !price || !inStock || !description || !ingredients || category === 'all', images.length === 0 )
        return res.status(400).json({err: 'Please add all the required fields'})

        
        
        const newProduct = new Products ({name: name.toLowerCase(), price, inStock, description, ingredients, category, images})

        await newProduct.save()

        res.json({msg: 'Success! New product created.'})

    } catch(err) {
        return res.status(500).json({err: err.message})
    }
}