import connectDB from '../../../utils/connectDB'
import Orders from '../../../models/orderModel'

import auth from '../../../middleware/auth'


connectDB()


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    switch(req.method) {
        case "PATCH":
            await paymentOrder(req, res)
            break;
    }
}

const paymentOrder = async(req, res) => {
    try {
        const result = await auth(req, res)
        const {id} = req.query

        await Orders.findOneAndUpdate({_id: id}, {
            paid: true, dateOfPayment: new Date().toISOString()
        })

        res.json({msg: 'Payment Success!'})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}