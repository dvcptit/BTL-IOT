
const user = require('../models/user')
const registerService = ({ email, password }) =>
    new Promise(async (resolve, reject) => {
    //   console.log(email, password);
      try {
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await user.findOne({ email });
        if (existingUser) {
          resolve({
            err: 1,
            mess: "Tài khoản đã tồn tại",
          });
        } else {
          // Hash password và tạo người dùng mới
          const hashedPassword = hasPassword(password);
          const newUser = new user({
            email,
            password: password,
          });
          await newUser.save();
  
          resolve({
            err: 0,
            mess: "Đăng ký thành công",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  

 const loginService = ({email,password})=> new Promise(async(resolve,reject)=> {
    try {
        console.log(email)
        const response = await user.findOne({ email })
        const isChecked = response && (password==response.password)
        resolve({
            err: isChecked ? 0 : 1,
            mess: isChecked ? "đăng nhập thành công" : response ? "sai mật khẩu" : "sai email",
        })
    } catch (error) {
        reject(error)
    }
})
 const getAllUserService = () => (new Promise(async(resolve,reject)=> {
    try{
        const response = await user.find()
        resolve({
            err: response ? 0 : 1,
            mess: response ?'láy tất cả người dùng thành công' : 'lấy tất cả người dùng thất bại',
            data: response
        })
    }catch(err){
        reject(err)
    }
}))

const getUserByEmailService = (email) => (new Promise(async(resolve,reject)=> {
  try{
    console.log(email)
      const response = await user.findOne({email})
      resolve({
          err: response ? 0 : 1,
          mess: response ?'láy thông tin người dùng thành công' : 'lấy thông tin người dùng thất bại',
          data: response
      })
  }catch(err){
      reject(err)
  }
}))
module.exports = {
    loginService,
    registerService,
    getAllUserService,
    getUserByEmailService
}