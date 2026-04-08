const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    
   
    amount: {
        type: Number,
        required: true,
        trim: true,
        min:0
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    note: {
        type: String,
        trim: true
    },
    //relation the id of the user with the expense 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserMOodel",
        required: true
    }
},
 {timestamps: true}
)

module.exports = mongoose.model("Expense", ExpenseSchema)