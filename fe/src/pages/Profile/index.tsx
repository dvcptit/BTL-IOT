import React, {useEffect, useState} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import imageDuc from '../../assets/images/avatar-duc.jpg';
import axios from "axios";
interface User {
    userName: string
    email: string
    user:  string
    password:  string
     ten:  string
     masv:  string
     sdt:  string
    fb:  string
     insta:  string
    git:  string
  }
const Profile: React.FC = () => {
    const [data,setData] = useState<User | null>(null);
    const email = localStorage.getItem('email');
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/api/data/getUserByEmail?email=${email}`);
            console.log(response)
            setData(response.data.data)
          } catch (error) {
            console.error("Lỗi khi lấy dữ liệu người dùng:", error)
          }
        }
        fetchUsers()
      }, [email])
    // //    email:{type:String},
    // userName:{type:String},
    // user: {type: String},
    // password: {type: String},
    // ten: {type: String},
    // masv: {type: String},
    // sdt: {type: String},
    // fb: {type: String},
    // insta: {type: String},
    // git: {type: String}
    return (
        <div className="container-fluid">
            <div className="profile-cards">
                {/* Profile Card 1 */}
                <div className="profile-card">
                    <div className="d-flex flex-column align-items-center">

                        <img
                            src={imageDuc}
                            alt="Profile"
                            className="profile-img"
                        />
                        <h2 className="name">{data?.userName}</h2>
                        <p className="email">Email: <strong >{email}</strong></p>
                        <div className="info">
                            <p className="info-item"><strong>{data?.masv}</strong><br />Mã sinh viên</p>
                            <p className="info-item"><strong>{data?.sdt}</strong><br />Số điện thoại</p>
                        </div>
                        <div className="d-flex">
                            <a href={data?.fb} target="_blank" className="facebook" rel="noopener noreferrer" >
                                <i className="fas fa-file-word" style={{ fontSize: '40px', marginRight: '16px' }}></i>
                            </a>
                            <a href={data?.insta} target="_blank" className="instagram" rel="noopener noreferrer">
                                <i className="fas fa-file-code" style={{ fontSize: '40px', marginRight: '16px' }}></i>
                            </a>
                            <a href={data?.git} target="_blank" className="github" rel="noopener noreferrer">
                                <i className="fab fa-github" style={{ fontSize: '40px' }}></i>
                            </a>
</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;