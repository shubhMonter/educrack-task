const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RentScehma = Schema({
    user:{
        type:mongoose.Types.ObjectId,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    rentPrice:{
        type:Number,
        require:true,
    },
    manufactureDate:{
        type:Date,
        require:true
    },
    actualCost:{
        type:Number,
        require:true
    },
    Taken:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const Rent = mongoose.model('rentdetail',RentScehma);

module.exports = Rent;