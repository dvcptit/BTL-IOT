import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom"; // Thêm useNavigate từ react-router-dom
import "./style.css"; // Chắc chắn rằng bạn đã import đúng CSS

interface ErrorMessages {
  name: string
  message: string
}

interface User {
  email: string
  password: string
}

const Register: React.FC = () => {
    // React States
    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
      name: "",
      message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [password, setPassword] = useState(""); // Để theo dõi giá trị mật khẩu
    const [repassword, setRePassword] = useState("") // Để theo dõi giá trị nhập lại mật khẩu
  
    // Các thông báo lỗi
    const errors = {
      pass: "Mật khẩu không đúng",
      repass: "Mật khẩu nhập lại không khớp",
    };
  
    // Sử dụng useNavigate để điều hướng
    const navigate = useNavigate()
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPassword(value)
        // Kiểm tra nếu cả password và repassword đều có giá trị
        if (repassword && repassword !== value) {
          setErrorMessages({ name: "repass", message: errors.repass })
        } else {
          setErrorMessages({ name: "", message: "" })
        }
      };
      
      const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setRePassword(value)
        // Kiểm tra nếu cả password và repassword đều có giá trị
        if (password && password !== value) {
          setErrorMessages({ name: "repass", message: errors.repass })
        } else {
          setErrorMessages({ name: "", message: "" })
        }
      }
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
  
      // Kiểm tra nếu mật khẩu nhập lại khớp hay không
      if (password !== repassword) {
        setErrorMessages({ name: "repass", message: errors.repass });
        return
      }
  
      // Gửi thông tin đăng ký đến API
      try {
        const { uname } = document.forms[0] // Lấy email từ form
        const response = await axios.post("http://localhost:3001/api/data/register", {
          email: uname.value,
          password: password,
        });
  
        console.log(response.data); // Kiểm tra dữ liệu trả về từ API
  
        // Kiểm tra kết quả trả về từ API
        if (response.data.err === 0) {
          setIsSubmitted(true)
          // Nếu đăng ký thành công, điều hướng tới trang đăng nhập
          navigate("/login"); // Điều hướng tới trang đăng nhập
        } else {
          // Nếu có lỗi, hiển thị thông báo lỗi từ API dưới trường email
setErrorMessages({ name: "uname", message: response.data.mess })
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi đăng ký", error)
        setErrorMessages({ name: "uname", message: "Lỗi trong quá trình đăng ký" })
      }
    }
  
    const renderForm = (
      <div className="form" style={{backgroundColor:'white',  padding: '2rem',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email</label>
            <input type="text" name="uname" required />
            {/* Hiển thị thông báo lỗi dưới trường email */}
            {errorMessages.name === "uname" && (
              <div className="error">{errorMessages.message}</div> 
            )}
          </div>
          <div className="input-container">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="pass"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="input-container">
            <label>Nhập lại mật khẩu</label>
            <input
              type="password"
              name="repass"
              value={repassword}
              onChange={handleRePasswordChange}
              required
            />
            {/* Hiển thị thông báo lỗi dưới trường nhập lại mật khẩu */}
            {errorMessages.name === "repass" && (
              <div className="error">{errorMessages.message}</div> 
            )}
          </div>
          <div className="button-container">
            <input type="submit" value="Đăng ký" />
          </div>
          <div>
            <Link className="btn-regis" to="/login">Đã có tài khoản? Đăng nhập</Link>
        </div>
        </form>
      </div>
    )
  
    return (
      <div className="app">
        <div className="register-form">
          <div className="title">Đăng ký tài khoản</div>
          {isSubmitted ? (
            <div>Đăng ký thành công, bạn có thể đăng nhập ngay.</div>
          ) : (
            renderForm
          )}
        </div>
      </div>
    )
  }
  

export default Register;