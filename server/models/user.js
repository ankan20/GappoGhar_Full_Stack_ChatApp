import mongoose,{ Schema, model } from "mongoose";
import { hash } from "bcrypt";

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    username :{
        type:String,
        required:true,
        unique: true,
    },
    password :{
        type:String,
        required:true,
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url :{
            type:String,
            required:true,
        }
    }
},{ timestamps: true});

userSchema.pre("save",async function(next){

    if(!this.isModified("password")) next();

    this.password = await hash(this.password ,10);

})



export const User  =mongoose.models.User || model("User", userSchema);

