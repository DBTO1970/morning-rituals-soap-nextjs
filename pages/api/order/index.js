import connectDB from '../../../utils/connectDB'
import Orders from '../../../models/orderModel'
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'


connectDB()


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch(req.method) {
        case "POST":
            await createOrder(req, res)
            break;
    }
}

const createOrder = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { address, phone, cart, total } = req.body

        const newOrder = new Orders({
            user: result.id, address, phone, cart, total
        })
        console.log(cart)
        cart.filter(item => {
            return sold(item._id, item.quantity, item.InStock, item.sold)
        })
        
        await newOrder.save()
        res.json({
            msg: 'Payment successful!  We will send shipping confirmation to email provided',
            newOrder
        })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const sold = async (id, quantity, oldInStock, oldSold) => {
    
    await Products.findOneAndUpdate({__id: id}, {
        inStock: oldInStock - quantity,
        sold: quantity + oldSold
    })
}

