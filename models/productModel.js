import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        trim: true,
        required: true,
        default: 'Saponified Olive & Coconut Oils, Sunflower Oil, Avocado Oil, Castor Oil and 100% phthalate-free Fragrance Oil'
    },
    weight: {
        type: Number,
        default: 4
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        default: 6
    },
    image: {
        type: String,
        required: true,
        default: 'https://res.cloudinary.com/morning-rituals-soap/image/upload/v1642426899/IMG_0006_b6lgjc.jpg'
    },
    dateMade: {
        type: Date,
        required: true
    },
    dateReady: {
        type: Date,
        required: true,
    },
    checked: {
        type: Boolean,
        default: false
    },
    inStock: {
        type: Number,
        default: 10
    },
    sold: {
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})

let Dataset = mongoose.models.product || mongoose.model('product', productSchema)
export default Dataset