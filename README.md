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

### 🎨 Frontend Technologies
| Technology | Version | Purpose | 
|------------|---------|---------|
| **React** | 18.x | Modern UI library with hooks |
| **Material-UI (MUI)** | 5.x | Professional UI components |
| **Socket.io Client** | 4.x | Real-time bidirectional communication |
| **React Router** | 6.x | Client-side routing and navigation |
| **WebRTC** | Native | Peer-to-peer video/audio communication |
| **Axios** | 1.x | HTTP client for API requests |
| **JavaScript ES6+** | - | Modern JavaScript features |

### ⚙️ Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18.x | JavaScript runtime environment |
| **Express.js** | 4.x | Fast, minimal web framework |
| **Socket.io** | 4.x | Real-time communication server |
| **MongoDB** | 6.x | NoSQL database (MongoDB Atlas) |
| **Mongoose** | 7.x | MongoDB object modeling |
| **bcrypt** | 5.x | Password hashing and security |
| **http-status** | 1.x | HTTP status code constants |
| **CORS** | 2.x | Cross-origin resource sharing |
| **dotenv** | 16.x | Environment variable management |

### 🔧 Development Tools
| Tool | Purpose |
|------|---------|
| **nodemon** | Backend development server with hot reload |
| **npm/yarn** | Package management |
| **Git** | Version control |
| **VS Code** | Development environment |
| **Chrome DevTools** | Debugging and testing |

### ☁️ Deployment & Services
| Service | Purpose |
|---------|---------|
| **MongoDB Atlas** | Cloud database hosting |
| **Render/Vercel** | Application hosting |
| **GitHub** | Code repository and CI/CD |
| **WebRTC** | Direct peer-to-peer communication |

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
├── 📁 backend/                          # Backend server
│   ├── 📁 src/
│   │   ├── 📄 app.js                    # Main Express server setup
│   │   ├── 📄 initializeDb.js           # Database initialization
│   │   ├── 📁 controllers/
│   │   │   ├── 📄 socketManager.js      # Socket.IO event handling & WebRTC signaling
│   │   │   └── 📄 user.controller.js    # User authentication & management
│   │   ├── 📁 models/
│   │   │   ├── 📄 meeting.model.js      # Meeting data schema
│   │   │   └── 📄 user.model.js         # User data schema
│   │   └── 📁 routes/
│   │       └── 📄 users.routes.js       # User API endpoints
│   ├── 📄 .env                          # Environment variables (local)
│   ├── 📄 .env.example                  # Environment template
│   ├── 📄 .gitignore                    # Git ignore rules
│   ├── 📄 package.json                  # Backend dependencies
│   └── 📄 package-lock.json             # Dependency lock file
│
├── 📁 frontend/                         # React frontend application
│   ├── 📁 public/
│   │   ├── 📄 index.html                # Main HTML template
│   │   ├── 📄 documentation.html        # Project documentation page
│   │   ├── 📄 _redirects                # Routing configuration for deployment
│   │   ├── 🖼️ background.png            # Landing page background
│   │   ├── 🖼️ logo192.png              # App logo (192x192)
│   │   ├── 🖼️ logo512.png              # App logo (512x512)
│   │   ├── 🖼️ logo3.png                # Additional logo variant
│   │   ├── 🖼️ mobile.png               # Mobile app icon
│   │   ├── 📄 manifest.json             # PWA manifest
│   │   ├── 📄 robots.txt                # SEO robots file
│   │   └── 🖼️ favicon.ico              # Browser tab icon
│   ├── 📁 src/
│   │   ├── 📄 App.js                    # Main React component
│   │   ├── 📄 App.css                   # Global application styles
│   │   ├── 📄 index.js                  # React DOM render entry point
│   │   ├── 📄 index.css                 # Global CSS styles
│   │   ├── 📄 environment.js            # Environment configuration & API URLs
│   │   ├── 📁 contexts/
│   │   │   ├── 📄 AuthContext.jsx       # Authentication state management
│   │   │   └── 📄 backend.code-workspace # VS Code workspace config
│   │   ├── 📁 pages/
│   │   │   ├── 📄 authentication.jsx    # Login/Register page
│   │   │   ├── 📄 auth.css              # Authentication page styles
│   │   │   ├── 📄 history.jsx           # Meeting history page
│   │   │   ├── 📄 home.jsx              # User dashboard/home page
│   │   │   ├── 📄 landing.jsx           # Landing page with hero section
│   │   │   ├── 📄 VideoMeet.jsx         # Main video meeting interface
│   │   │   └── 📄 VideoMeet_new.jsx     # Alternative video meeting component
│   │   ├── 📁 styles/
│   │   │   └── 📄 videoComponent.module.css # Video component specific styles
│   │   ├── 📁 utils/
│   │   │   └── 📄 withAuth.jsx          # Higher-order component for authentication
│   │   ├── 📄 logo.svg                  # React logo
│   │   ├── 📄 reportWebVitals.js        # Performance monitoring
│   │   ├── 📄 setupTests.js             # Test configuration
│   │   └── 📄 App.test.js               # App component tests
│   ├── 📄 .gitignore                    # Frontend Git ignore rules
│   ├── 📄 README.md                     # Frontend specific documentation
│   ├── 📄 package.json                  # Frontend dependencies & scripts
│   └── 📄 package-lock.json             # Frontend dependency lock file
│
├── 📄 .gitignore                        # Root level Git ignore
├── 📄 README.md                         # Main project documentation (this file)
├── 📄 FLOATING_VIDEO_FEATURE.md         # Floating video feature documentation
└── 📄 SCREEN_SHARING_FEATURES.md        # Screen sharing feature documentation
```

### 🏗️ Architecture Overview

#### **Frontend Architecture (React)**
```
┌─────────────────────┐
│   Landing Page      │ ← Entry point with hero section
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│  Authentication     │ ← Login/Register with form validation
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│   Home Dashboard    │ ← Meeting controls & history
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│  Video Meeting      │ ← WebRTC video calls with chat
└─────────────────────┘
```

#### **Backend Architecture (Node.js + Express)**
```
┌─────────────────────┐
│    Express App      │ ← HTTP server setup
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│   Socket.IO        │ ← Real-time communication
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│    Controllers      │ ← Business logic
└─────────┬───────────┘
          │
┌─────────▼───────────┐
│   MongoDB Models    │ ← Data persistence
└─────────────────────┘
```

### 🔄 Data Flow

1. **User Authentication**: Frontend → Backend API → MongoDB
2. **Video Signaling**: Frontend ↔ Socket.IO ↔ Backend ↔ Other Clients
3. **Chat Messages**: Frontend → Socket.IO → All Connected Clients
4. **WebRTC Connection**: Direct P2P between browser clients

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

## 🔧 API Endpoints & Socket Events

### 🌐 REST API Endpoints (Backend: `http://localhost:8000`)

#### **User Authentication**
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/v1/users/register` | User registration | `{ name, username, password }` |
| `POST` | `/api/v1/users/login` | User login | `{ username, password }` |
| `GET` | `/api/v1/users/get_all_activity` | Get user meeting history | `?token=<user_token>` |
| `POST` | `/api/v1/users/add_to_activity` | Add meeting to history | `{ token, meeting_code }` |

#### **Response Format**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "token": "<jwt_token>" // for login
}
```

### ⚡ Socket.IO Events (Real-time Communication)

#### **Connection Events**
| Event | Direction | Description | Payload |
|-------|-----------|-------------|---------|
| `connection` | Client → Server | User connects to socket | N/A |
| `disconnect` | Client → Server | User disconnects | N/A |

#### **Video Call Events**
| Event | Direction | Description | Payload |
|-------|-----------|-------------|---------|
| `join-call` | Client → Server | Join a video meeting | `{ meetingId, userInfo }` |
| `user-joined` | Server → Clients | Notify new user joined | `{ userId, userInfo }` |
| `signal` | Client ↔ Server | WebRTC signaling data | `{ signal, to, from, type }` |
| `user-left` | Server → Clients | User left the meeting | `{ userId }` |
| `call-ended` | Server → Clients | Meeting ended | `{ meetingId }` |

#### **Chat Events**
| Event | Direction | Description | Payload |
|-------|-----------|-------------|---------|
| `chat-message` | Client → Server | Send chat message | `{ message, userId, meetingId, timestamp }` |
| `receive-message` | Server → Clients | Broadcast message | `{ message, userId, username, timestamp }` |

#### **Screen Sharing Events**
| Event | Direction | Description | Payload |
|-------|-----------|-------------|---------|
| `screen-share-started` | Client → Server | User started screen sharing | `{ userId, meetingId }` |
| `screen-share-stopped` | Client → Server | User stopped screen sharing | `{ userId, meetingId }` |
| `screen-share-update` | Server → Clients | Notify screen share status | `{ userId, isSharing }` |

### 🔐 Authentication Flow
```
1. User Registration/Login → JWT Token Generated
2. Token stored in localStorage
3. Token sent with API requests for authentication
4. Socket connection includes token for user identification
```

## 🌐 Deployment

### 🚀 Live Application
- **Frontend**: [Your Frontend URL]
- **Backend**: [Your Backend URL]
- **Documentation**: [Frontend URL]/documentation.html

### 📋 Deployment Platforms

#### **Backend Deployment Options**
| Platform | Free Tier | Auto Deploy | Database | Recommended |
|----------|-----------|-------------|----------|-------------|
| **Render** | ✅ 750 hours/month | ✅ GitHub integration | ✅ MongoDB Atlas | ⭐ **Recommended** |
| **Railway** | ✅ $5 credit/month | ✅ GitHub integration | ✅ Built-in databases | ⭐ Good option |
| **Heroku** | ❌ No free tier | ✅ GitHub integration | ✅ Add-ons available | 💰 Paid only |

#### **Frontend Deployment Options**
| Platform | Free Tier | Custom Domain | CDN | Recommended |
|----------|-----------|---------------|-----|-------------|
| **Vercel** | ✅ Unlimited | ✅ Free custom domains | ✅ Global CDN | ⭐ **Recommended** |
| **Netlify** | ✅ 100GB/month | ✅ Free custom domains | ✅ Global CDN | ⭐ Great option |
| **Render** | ✅ Static sites | ✅ Custom domains | ✅ Global CDN | ⭐ Good option |

### ⚙️ Environment Configuration

#### **Backend Environment Variables (.env)**
```env
# Server Configuration
NODE_ENV=production
PORT=8000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-domain.com
```

#### **Frontend Environment Detection**
The application automatically detects the environment:
```javascript
// frontend/src/environment.js
const IS_PROD = process.env.NODE_ENV === 'production' || 
                window.location.hostname !== 'localhost';

const server = IS_PROD ?
    "https://your-backend-url.com" :    // Production backend
    "http://localhost:8000"             // Local development
```

### 🔧 Deployment Steps

#### **Option 1: Render (Both Frontend & Backend)**

**Backend Deployment:**
1. Create account on [render.com](https://render.com)
2. Connect GitHub repository
3. Create "Web Service"
4. Configure:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`
5. Add environment variables
6. Deploy

**Frontend Deployment:**
1. Create "Static Site" on Render
2. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Root Directory**: `frontend`
3. Deploy

#### **Option 2: Vercel (Frontend) + Render (Backend)**

**Backend:** Follow Render steps above

**Frontend:**
1. Install Vercel CLI: `npm i -g vercel`
2. In frontend directory: `vercel`
3. Follow prompts and deploy

### 📊 Performance Optimizations

- **Frontend**: Build optimization with React's production build
- **Backend**: Express.js with compression middleware
- **Database**: MongoDB indexes for faster queries
- **CDN**: Static assets served via global CDN
- **WebRTC**: Direct peer-to-peer connections for video/audio

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
