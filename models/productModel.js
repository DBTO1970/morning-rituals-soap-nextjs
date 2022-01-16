import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    inventory: {
        count: {
            type: Number,
            required: true,
            default: 0
        },
        batch: {
            created: {
                type: Date,
                required: true,

            },
            ready: {
                type: Date,
                required: true,
            }
        }
    }
}, {
    timestamps: true,
})

let Dataset = mongoose.models.product || mongoose.model('product', productSchema)
export default Dataset