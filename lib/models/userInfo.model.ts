import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
    skill:[
        {
            type: String,
        }
    ],
    certificate:[
        {
            type: String
        }
    ],
    experience:[
        {
            type: String
        }
    ],
    Education:[
        {
            type: String
        }
    ]
})

const UserInfo = mongoose.models.UserInfo || mongoose.model('UserInfo', userInfoSchema)

export default UserInfo;