import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    id: {type: String, required: true},
    username:{type: String, required: true, unique: true},
    image: String,
    bio: String,
    email: {type: String, required: true, unique: true},
    phone_number:{type:Number},
    user_Info:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'UserInfo'
    },
    onboarded:{
        type: Boolean,
        default: false
    }

})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User;