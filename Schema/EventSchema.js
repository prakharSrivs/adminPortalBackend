const mongoose= require('mongoose');

const eventSchema =  mongoose.Schema({
    heading:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
        require:true,
    },
    time:{
        type:String,
        require:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId, ref:"User",
        require:true
    },
    location:{
        type:String,
        require:true,
    },
    imageURL:{
        type:String,
        require:true,
    },
    link:{
        type:String,
    }
    },
    {timestamps:true}
)

const Event = mongoose.model("Event",eventSchema);

module.exports = Event;