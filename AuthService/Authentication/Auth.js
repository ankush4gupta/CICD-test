const User = require("../models/user.model")
const send_rabbit = require("../Rabbitmq/Send")

const login = async(req,res)=>{
    try {
        let user =  await User.find({email : req.body.email});
        if(!user){
            return res.status(404).send("email not or password not match");
            
        }
        if(user.password!==req.body.password){
            return res.status(404).send("email not or password not match");
        }
        send_rabbit(user._id)
        return res.send(user)

    } catch (error) {
        return res.status(501).send(error.message)
    }
}

const register = async(req,res)=>{
    console.log("before going to db")
    try {
        let user =  await User.findOne({email:req.body.email}).lean().exec();
        console.log("after db")

        if(user){
            return res.status(201).send("user already exist !")
        }
        user = await User.create(req.body);
        send_rabbit(user._id)

        return res.status(201).send(user)
    } catch (error) {
        return res.status(501).send(error.message)
    }
}


module.exports = {login,register};
