import {Schema, model, models} from 'mongoose'


const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Customer = models.Customer || model("Customer", CustomerSchema)
export default Customer