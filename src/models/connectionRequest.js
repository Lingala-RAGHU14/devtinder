const mongoose = require("mongoose")


const connectionRequestSchema = new mongoose.Schema(
   { 
    fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User", // reference to the user collecetion
        required: true
    },
    toUserId : {
        type  : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    status : {
        type: String,
        enum : {
        values : ["ignored", "interested", "accepted","rejected"],
        message: `{VALUE} is incorrect status  type `,
        },
        
    },
},
{timestamps : true}
);
connectionRequestSchema.pre("save", function () {
    const connectionRequest  = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("cannot send connection request to yourself")
    }
    
})

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = ConnectionRequestModel;
