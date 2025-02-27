const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    
    items : [
        {
            productId : { type : mongoose.Schema.Types.ObjectId, ref : 'Product'},
            quantity : { type : Number }
        }
    ]
});

module.exports = mongoose.model('Cart', cartSchema);