const mongoose =  require('mongoose');

const Schema = mongoose.Schema

const theftSchema = new Schema({
    customer_name:{
        type:String
    },

    carrier_name:{
        type:String
    },

    transporation_mode:{
        type:String
    },

    origin_name:{
        type:String
    },

    origin_city:{
        type:String
    },

    origin_state:{
        type:String
    },

    origin_zipCode:{
        type:Number
    },

    destination_name:{
        type:String
    },

    destination_city:{
        type:String
    },

    destination_state:{
        type:String
    },

    destination_zipCode:{
        type:Number
    },

    total_pieces:{
        type:Number
    },

    total_weight:{
        type:Number
    },

    commodity_description:{
        type:String
    },
})

const theftData = mongoose.model('Theft',theftSchema);
module.exports = theftData;