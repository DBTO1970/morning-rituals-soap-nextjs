import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        
    },
    role: {
        type: String,
        default: 'user',
        
    },
    root: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        default: 'https://drive.google.com/file/d/17mylrnYwOZ9xDmuYbGGBNpFNa-Q1KKsy/view?usp=sharing'
    }
}, {
    timestamps: true,
})

let Dataset = mongoose.models.user || mongoose.model('user', userSchema)
export default Dataset