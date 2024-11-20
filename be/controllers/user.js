
const { loginService,registerService,getAllUserService,getUserByEmailService } = require('../services/user')
 const login = async(req,res) => {
    try {
        const {password,email} = req.body
        if(!email || !password) return res.status(400).json({
            err:1,
            mess: "Missing payload"
        })
        const response = await loginService(req.body)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: 1,
            mess: error
          })
    }
}
 const register = async(req,res)=> {
    try {
        console.log(req.body)
        const response = await registerService(req.body)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: 1,
            mess: error
          })
    }
}
const getAllUSer = async(req,res)=> {
    try {
        const response = await getAllUserService()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: 1,
            mess: error
          })
    }
}
const getUserByEmail = async(req,res)=> {
    try {
        // console.log(req.query)
        const response = await getUserByEmailService(req.query.email)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            err: 1,
            mess: error
          })
    }
}
module.exports = {
    register,
    login,
    getAllUSer,
    getUserByEmail
  };