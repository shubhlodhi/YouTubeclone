import Joi from "joi"
// signup validation form middleware : using joi 
export const signupvalidaion = (req ,res ,next) =>{
    const schema = Joi.object({
        username:Joi.string().min(4).max(200).required(),
        email:Joi.string().email().required(),
        passocde:Joi.string().min(4).max(10).required()
    })
    const {err} = schema.validate(req.body)
    if (err){
        return res.json({message:"error ocuured field is required"})
    }
next()

    
}