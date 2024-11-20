import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom"; // Thêm useNavigate từ react-router-dom
import "./style.css";

interface ErrorMessages {
  name: string
  message: string
}

interface User {
  email: string
  password: string
}

const Login: React.FC = () => {
  // React States
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    name: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [database, setDatabase] = useState<User[]>([]) // Dữ liệu từ API

  const errors = {
    uname: "Tên đăng nhập không hợp lệ",
    pass: "Mật khẩu không đúng",
  };

  // Sử dụng useNavigate để điều hướng
  const navigate = useNavigate()

  // Gọi API để lấy danh sách user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/data/getAllUser");
        setDatabase(response.data.data); // Cập nhật state với dữ liệu từ API
        console.log(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error)
      }
    }

    fetchUsers()
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent page reload
    event.preventDefault()

    const { uname, pass } = document.forms[0] // Lấy giá trị từ form

    // Tìm thông tin người dùng trong database
    const userData = database.find((user) => user.email === uname.value);

    // Kiểm tra thông tin đăng nhập
    if (userData) {
      if (userData.password !== pass.value) {
        // Sai mật khẩu
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        // Đăng nhập thành công
        setIsSubmitted(true);
        navigate("/") // Chuyển hướng với thông báo
        localStorage.setItem('email', uname.value);
      }
    } else {
      // Không tìm thấy tên đăng nhập
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  }

  const renderErrorMessage = (name: string) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    )

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Tên đăng nhập </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Mật khẩu </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
        <div>
            <Link className="btn-regis" to="/register">Chưa có tài khoản? Đăng ký</Link>
        </div>
</form>
    </div>
  )

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Đăng nhập</div>
        {isSubmitted ? <div>Đăng nhập thành công</div> : renderForm}
      </div>
    </div>
  )
}

export default Login;