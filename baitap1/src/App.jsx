import './App.css'
import avatar from './assets/avatar.jpg'   // 👉 import ảnh vào

function App() {
  return (
    <div className="container">
      <img src={avatar} alt="Avatar" className="avatar" />
      <h1>Xin chào 👋</h1>
      <h2>Tôi là Nguyễn Lý Hùng</h2>
      <p><strong>Ngành học:</strong> Công nghệ Thông tin</p>
      <p><strong>Email:</strong> lyhung10nctlop95@gmail.com</p>
      <p><strong>Sở thích:</strong> Chơi game đọc sách, thể thao</p>
    </div>
  )
}

export default App
