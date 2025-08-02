//import mongoose
const mongoose = require ('mongoose')


//2 declare schema (table structure)

const VocabSchema = mongoose.Schema({
    //conlumn name + data structure + validation
    english:{
        type: String,
        require: true

    },
    german:{
        type: String,
        require: true,
        minLength: 3,
        maxLenght: 20
    },
    vietnamese:{
        type: String,
        require: true,
        minLength: 3,
        maxLenght: 20
    }
},

    {
        versionKey: false,
        timestamps: true

    }
    
)

//3) export model
const Vocab = mongoose.model("vocabs", VocabSchema)
module.exports= Vocab