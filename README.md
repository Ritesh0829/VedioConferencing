# 📹 Video Conferencing Application

A full-stack real-time video conferencing web application built with React, Node.js, Socket.io, and WebRTC. This application provides seamless video calling, screen sharing, and chat functionality similar to Zoom.

## 🚀 Features

### 🎥 Video & Audio
- **Real-time video calling** with multiple participants
- **Audio communication** with mute/unmute functionality
- **Camera toggle** (on/off) during calls
- **High-quality video streaming** using WebRTC

### 🖥️ Screen Sharing
- **Screen sharing** capability for presentations
- **Easy toggle** between camera and screen share
- **Multiple participants** can share screens

### 💬 Chat System
- **Real-time chat** during video calls
- **Message history** preservation
- **User identification** in chat messages

### 👤 User Management
- **User authentication** system
- **Meeting history** tracking
- **User profile** management

### 🌐 Responsive Design
- **Mobile-friendly** interface
- **Material-UI** components for modern design
- **Cross-platform** compatibility

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Material-UI (MUI)** - UI component library
- **Socket.io Client** - Real-time communication
- **React Router** - Navigation
- **WebRTC** - Peer-to-peer communication
- **Axios** - HTTP client

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - Database (MongoDB Atlas)
- **Mongoose** - MongoDB object modeling
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 14 or higher)
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (or local MongoDB installation)
- **Modern web browser** with WebRTC support

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Ritesh0829/Vedio_Conferencing.git
cd Vedio_Conferencing
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
The backend server will start on `http://localhost:8000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend application will start on `http://localhost:3000`

### 4. Environment Configuration
Update the frontend environment configuration in `frontend/src/environment.js`:
```javascript
let IS_PROD = false; // Set to false for local development
```

## 📁 Project Structure

```
Vedio_Conferencing/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Main server file
│   │   ├── initializeDb.js        # Database initialization
│   │   ├── controllers/
│   │   │   ├── socketManager.js   # Socket.io event handling
│   │   │   └── user.controller.js # User management
│   │   ├── models/
│   │   │   ├── meeting.model.js   # Meeting data model
│   │   │   └── user.model.js      # User data model
│   │   └── routes/
│   │       └── users.routes.js    # User API routes
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js                 # Main React component
│   │   ├── environment.js         # Environment configuration
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx    # Authentication context
│   │   ├── pages/
│   │   │   ├── authentication.jsx # Login/Register page
│   │   │   ├── history.jsx        # Meeting history
│   │   │   ├── home.jsx           # Dashboard
│   │   │   ├── landing.jsx        # Landing page
│   │   │   └── VideoMeet.jsx      # Video meeting interface
│   │   ├── styles/
│   │   │   └── videoComponent.module.css
│   │   └── utils/
│   │       └── withAuth.jsx       # Authentication HOC
│   ├── public/
│   └── package.json
└── README.md
```

## 🎯 How to Use

### 1. **Register/Login**
- Navigate to the authentication page
- Create a new account or login with existing credentials

### 2. **Start a Meeting**
- Click on "Start Meeting" from the dashboard
- Share the meeting link with participants

### 3. **Join a Meeting**
- Use the meeting link or enter meeting ID
- Allow camera and microphone permissions

### 4. **During the Meeting**
- **Toggle Video**: Click the camera icon
- **Toggle Audio**: Click the microphone icon
- **Share Screen**: Click the screen share icon
- **Chat**: Click the chat icon to open messaging
- **End Call**: Click the red phone icon

## 🔧 API Endpoints

### User Management
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login
- `GET /api/v1/users/profile` - Get user profile

### Socket Events
- `join-call` - Join a video call
- `signal` - WebRTC signaling
- `chat-message` - Send chat message
- `user-left` - User leaves the call

## 🌐 Deployment

### Backend Deployment
The application can be deployed on platforms like:
- **Heroku**
- **Railway**
- **Render**
- **DigitalOcean**

### Frontend Deployment
- **Netlify**
- **Vercel**
- **GitHub Pages**

## 🔒 Security Features

- **Password hashing** with bcrypt
- **CORS protection** enabled
- **Input validation** and sanitization
- **Secure WebRTC** peer connections

## 🐛 Troubleshooting

### Common Issues
1. **Camera/Microphone not working**: Ensure browser permissions are granted
2. **Connection issues**: Check firewall and network settings
3. **Audio echo**: Use headphones or enable echo cancellation

### Browser Compatibility
- **Chrome** (recommended)
- **Firefox**
- **Safari**
- **Edge**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Ritesh0829** - *Initial work* - [GitHub Profile](https://github.com/Ritesh0829)

## 🙏 Acknowledgments

- **WebRTC** community for peer-to-peer communication
- **Socket.io** for real-time communication
- **Material-UI** for beautiful React components
- **MongoDB Atlas** for cloud database hosting

## 📞 Support

If you have any questions or need support, please:
- Open an issue on GitHub
- Contact the maintainer

---

⭐ **Star this repository if you found it helpful!**
