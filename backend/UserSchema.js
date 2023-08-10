const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    activeplan: {
        type: String
    },
    purchasedate: {
        type: String
    },
    expirationdate: {
        type: String
    }

});
module.exports = mongoose.model('User', userSchema);