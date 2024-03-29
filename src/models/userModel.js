import mongoose from "mongoose"


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        firstname: {
            type: String,
            required: true
        },   
        lastname: {
            type: String,
            required: true
        },
        college:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: Number,
            required: true
        },
        birthday:{
            type: Date,
            required: true
        },
        password:{
            type: String,
            required:true
        },
 
   
    },
    {
        timestamp: true,
    })

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default  User;