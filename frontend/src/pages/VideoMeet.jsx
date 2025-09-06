import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import { Badge, IconButton, TextField, Avatar, Typography, Box } from '@mui/material';
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import styles from "../styles/videoComponent.module.css";
import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import ChatIcon from '@mui/icons-material/Chat'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture'
import { styled, keyframes } from '@mui/material/styles';
import server from '../environment';

const server_url = server;

// Chat Animations
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled Components for Chat
const ChatContainer = styled(Box)({
  position: 'absolute',
  height: '90vh',
  right: '20px',
  top: '5vh',
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 255, 0.95) 100%)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  width: '350px',
  padding: '0',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 80px rgba(102, 126, 234, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  animation: `${slideUp} 0.5s ease-out`,
});

const ChatHeader = styled(Box)({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
});

const ChatMessagesContainer = styled(Box)({
  flex: 1,
  padding: '20px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    borderRadius: '3px',
  },
});

const MessageBubble = styled(Box)(({ isOwn }) => ({
  maxWidth: '80%',
  padding: '12px 16px',
  borderRadius: isOwn ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
  background: isOwn 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  color: 'white',
  alignSelf: isOwn ? 'flex-end' : 'flex-start',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  animation: `${slideUp} 0.3s ease-out`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: 0,
    ...(isOwn ? {
      borderTop: '8px solid #764ba2',
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      bottom: '-8px',
      right: '10px',
    } : {
      borderTop: '8px solid #f5576c',
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      bottom: '-8px',
      left: '10px',
    }),
  },
}));

const MessageText = styled(Typography)({
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: 1.4,
  wordBreak: 'break-word',
});

const MessageSender = styled(Typography)({
  fontSize: '12px',
  fontWeight: 600,
  opacity: 0.9,
  marginBottom: '4px',
});

const MessageTime = styled(Typography)({
  fontSize: '11px',
  opacity: 0.7,
  marginTop: '4px',
  textAlign: 'right',
});

const ChatInputContainer = styled(Box)({
  padding: '20px',
  background: 'rgba(255, 255, 255, 0.8)',
  borderTop: '1px solid rgba(102, 126, 234, 0.1)',
  display: 'flex',
  gap: '10px',
  alignItems: 'flex-end',
});

const StyledChatInput = styled(TextField)({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: '25px',
    backgroundColor: 'white',
    paddingRight: '8px',
    '& fieldset': {
      borderColor: 'rgba(102, 126, 234, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(102, 126, 234, 0.6)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#667eea',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#667eea',
  },
});

const SendButton = styled(IconButton)({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
    animation: `${pulse} 0.6s ease`,
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
});

const CallTimer = styled(Typography)({
  fontSize: '14px',
  fontWeight: 500,
  color: 'rgba(255, 255, 255, 0.9)',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  '&::before': {
    content: '"📞"',
    fontSize: '12px',
  },
});

const OnlineIndicator = styled(Box)({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: '#4CAF50',
  position: 'absolute',
  bottom: '2px',
  right: '2px',
  border: '2px solid white',
  animation: `${pulse} 2s infinite`,
});

const ScreenShareIndicator = styled(Box)({
  position: 'absolute',
  top: '20px',
  left: '20px',
  background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '20px',
  fontSize: '14px',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  animation: `${fadeIn} 0.3s ease-in`,
  zIndex: 1000,
  '&::before': {
    content: '"📺"',
    fontSize: '16px',
  },
});

const ScreenShareButton = styled(IconButton)(({ isSharing }) => ({
  color: isSharing ? '#4CAF50' : 'white',
  background: isSharing ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: isSharing ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 255, 255, 0.1)',
    transform: 'scale(1.1)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
}));

const NotificationBar = styled(Box)({
  position: 'absolute',
  top: '70px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '25px',
  fontSize: '14px',
  fontWeight: 500,
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  animation: `${slideUp} 0.4s ease-out`,
  zIndex: 1001,
  maxWidth: '300px',
  textAlign: 'center',
});

const FloatingVideoContainer = styled(Box)(({ isDragging }) => ({
  position: 'fixed',
  width: '200px',
  height: '150px',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: isDragging ? '0 15px 50px rgba(0, 0, 0, 0.5)' : '0 8px 32px rgba(0, 0, 0, 0.3)',
  border: '3px solid #667eea',
  cursor: isDragging ? 'grabbing' : 'grab',
  zIndex: 1000,
  transition: isDragging ? 'none' : 'all 0.3s ease',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  '&:hover': {
    transform: isDragging ? 'none' : 'scale(1.05)',
    boxShadow: isDragging ? '0 15px 50px rgba(0, 0, 0, 0.5)' : '0 12px 40px rgba(0, 0, 0, 0.4)',
    borderColor: '#4CAF50',
  },
  '&:active': {
    transform: isDragging ? 'none' : 'scale(0.98)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isDragging ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
    transition: 'background 0.2s ease',
    pointerEvents: 'none',
  },
}));

const FloatingVideo = styled('video')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  pointerEvents: 'none',
});

const FloatingControls = styled(Box)({
  position: 'absolute',
  top: '5px',
  right: '5px',
  display: 'flex',
  gap: '5px',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  '.floating-container:hover &': {
    opacity: 1,
  },
});

const FloatingControlButton = styled(IconButton)({
  width: '25px',
  height: '25px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  fontSize: '12px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    transform: 'scale(1.1)',
  },
});

var connections = {};

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
}

export default function VideoMeetComponent() {

    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoref = useRef();
    let floatingVideoref = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState([]);

    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();

    let [showModal, setModal] = useState(true);

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([])

    let [message, setMessage] = useState("");

    let [newMessages, setNewMessages] = useState(0);

    let [askForUsername, setAskForUsername] = useState(true);

    let [username, setUsername] = useState("");

    const [callStartTime, setCallStartTime] = useState(null);
    const [callDuration, setCallDuration] = useState("00:00");
    const [notification, setNotification] = useState('');
    
    // Floating video states
    const [isFloating, setIsFloating] = useState(false);
    const [videoPosition, setVideoPosition] = useState({ x: 20, y: 20 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    let videos = [];

    let [videos2, setVideos] = useState([]);

    // Call timer effect
    useEffect(() => {
        let interval;
        if (callStartTime) {
            interval = setInterval(() => {
                const now = new Date();
                const duration = Math.floor((now - callStartTime) / 1000);
                const minutes = Math.floor(duration / 60);
                const seconds = duration % 60;
                setCallDuration(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [callStartTime]);

    // Initialize screen sharing availability on component mount
    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
            setScreenAvailable(true);
        } else {
            setScreenAvailable(false);
        }
    }, []);

    // Cleanup chat history when component unmounts
    useEffect(() => {
        // Handle browser close/refresh to clear chat history
        const handleBeforeUnload = () => {
            setMessages([]);
            setMessage("");
            setNewMessages(0);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            // Clear chat history when component unmounts (browser close, navigation away, etc.)
            setMessages([]);
            setMessage("");
            setNewMessages(0);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Get current time for message timestamps
    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    // Utility function to check if message is from current user
    const isOwnMessage = (sender) => {
        return sender === username;
    };

    // Define getUserMediaSuccess before getUserMedia
    const getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        
        // Set stream to both video elements initially
        if (localVideoref.current) {
            localVideoref.current.srcObject = stream;
        }
        if (floatingVideoref.current) {
            floatingVideoref.current.srcObject = stream;
        }

        // Force update the currently visible video element after a short delay
        setTimeout(() => {
            if (isFloating && floatingVideoref.current) {
                floatingVideoref.current.srcObject = stream;
                console.log('Camera stream set to floating video');
            } else if (!isFloating && localVideoref.current) {
                localVideoref.current.srcObject = stream;
                console.log('Camera stream set to fixed video');
            }
        }, 100);

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                console.log(description)
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setVideo(false);
            setAudio(false);

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            for (let id in connections) {
                connections[id].addStream(window.localStream)

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                        })
                        .catch(e => console.log(e))
                })
            }
        })
    }

    // Move getUserMedia function definition before its usage
    const getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((e) => console.log(e))
        } else {
            try {
                if (localVideoref.current && localVideoref.current.srcObject) {
                    let tracks = localVideoref.current.srcObject.getTracks()
                    tracks.forEach(track => track.stop())
                }
                if (floatingVideoref.current && floatingVideoref.current.srcObject) {
                    let tracks = floatingVideoref.current.srcObject.getTracks()
                    tracks.forEach(track => track.stop())
                }
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            
            // Set black/silence stream to both video elements
            if (localVideoref.current) {
                localVideoref.current.srcObject = window.localStream;
            }
            if (floatingVideoref.current) {
                floatingVideoref.current.srcObject = window.localStream;
            }

            // Force update the currently visible video element
            setTimeout(() => {
                if (isFloating && floatingVideoref.current) {
                    floatingVideoref.current.srcObject = window.localStream;
                } else if (!isFloating && localVideoref.current) {
                    localVideoref.current.srcObject = window.localStream;
                }
            }, 50);

            for (let id in connections) {
                connections[id].addStream(window.localStream)

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                        })
                        .catch(e => console.log(e))
                })
            }
        }
    }

    useEffect(() => {
        console.log("VIDEOS ", videos2)
    }, [videos2])

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
            console.log("SET STATE HAS ", video, audio);
        }
    }, [video, audio, videoAvailable, audioAvailable]) // Added missing dependencies
    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();

    }

    let getDisplayMediaSuccess = (stream) => {
        console.log('Screen sharing started successfully', stream.getTracks())
        
        setNotification('Screen sharing active!');
        setTimeout(() => setNotification(''), 3000);

        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { 
            console.log('Error stopping previous stream:', e) 
        }

        window.localStream = stream
        
        // Set screen share stream to both video elements
        if (localVideoref.current) {
            localVideoref.current.srcObject = stream;
        }
        if (floatingVideoref.current) {
            floatingVideoref.current.srcObject = stream;
        }

        // Force update the currently visible video element
        setTimeout(() => {
            if (isFloating && floatingVideoref.current) {
                floatingVideoref.current.srcObject = stream;
                console.log('Screen share set to floating video');
            } else if (!isFloating && localVideoref.current) {
                localVideoref.current.srcObject = stream;
                console.log('Screen share set to fixed video');
            }
        }, 100);

        // Update peer connections with screen share
        for (let id in connections) {
            if (id === socketIdRef.current) continue

            // Remove old stream
            const sender = connections[id].getSenders().find(s => 
                s.track && s.track.kind === 'video'
            );
            
            if (sender) {
                sender.replaceTrack(stream.getVideoTracks()[0]);
            } else {
                connections[id].addStream(window.localStream)
            }

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log('Error setting local description:', e))
            })
        }

        // Handle screen share end
        stream.getTracks().forEach(track => {
            track.onended = () => {
                console.log('Screen sharing ended')
                setScreen(false)
                setNotification('Screen sharing ended');
                setTimeout(() => setNotification(''), 3000);

                try {
                    let tracks = localVideoref.current.srcObject.getTracks()
                    tracks.forEach(track => track.stop())
                } catch (e) { 
                    console.log('Error stopping tracks:', e) 
                }

                // Return to camera
                getUserMedia()
            }
        })
    }

    let getDisplayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ 
                    video: {
                        cursor: 'always',
                        displaySurface: 'monitor'
                    }, 
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100
                    }
                })
                    .then(getDisplayMediaSuccess)
                    .catch((e) => {
                        console.log('Screen sharing error:', e);
                        setScreen(false); // Reset screen state if user cancels or error occurs
                        setNotification('Screen sharing was cancelled or failed');
                        setTimeout(() => setNotification(''), 3000);
                    })
            } else {
                setScreen(false);
                setNotification('Screen sharing is not supported by your browser');
                setTimeout(() => setNotification(''), 4000);
            }
        }
    }

    let connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, { secure: false })

        socketRef.current.on('signal', gotMessageFromServer)

        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-call', window.location.href)
            socketIdRef.current = socketRef.current.id

            socketRef.current.on('chat-message', addMessage)

            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id))
            })

            socketRef.current.on('user-joined', (id, clients) => {
                clients.forEach((socketListId) => {

                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
                    // Wait for their ice candidate       
                    connections[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
                        }
                    }

                    // Wait for their video stream
                    connections[socketListId].onaddstream = (event) => {
                        console.log("BEFORE ", videos)
                        console.log("FINDING ID ", socketListId)

                        let videoExists = videos.find(video => video.socketId === socketListId)

                        if (videoExists) {
                            console.log("FOUND EXISTING")

                            // Update the stream of the existing video
                            setVideos(videos => {
                                const updatedVideos = videos.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );
                                console.log("UPDATED VIDEOS ", updatedVideos)
                                return updatedVideos;
                            });
                        } else {
                            // Create a new video
                            console.log("CREATING NEW")
                            let newVideo = {
                                socketId: socketListId,
                                stream: event.stream,
                                autoplay: true,
                                playsinline: true
                            }

                            setVideos(videos => {
                                const updatedVideos = [...videos, newVideo];
                                console.log("UPDATED VIDEOS ", updatedVideos)
                                return updatedVideos;
                            });
                        }
                    }

                    // Add the local video stream
                    if (window.localStream !== undefined && window.localStream !== null) {
                        connections[socketListId].addStream(window.localStream)
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()])
                        window.localStream = blackSilence()
                        connections[socketListId].addStream(window.localStream)
                    }
                })

                if (id === socketIdRef.current) {
                    console.log("You")
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue

                        try {
                            connections[id2].addStream(window.localStream)
                        } catch (e) { }

                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
                                })
                                .catch(e => console.log(e))
                        })
                    }
                } else {
                    console.log("Other")
                }
            })
        })

        socketRef.current.on('disconnect', () => {
            console.log("Disconnected")
        })
    }

    let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message)

        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
                            }).catch(e => console.log(e))
                        }).catch(e => console.log(e))
                    }
                }).catch(e => console.log(e))
            }

            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            }
        }
    }

    let addMessage = (data, sender, socketIdSender) => {
        setMessages(prevMessages => [...prevMessages, { sender: sender, data: data }])
        setNewMessages(prevNewMessages => prevNewMessages + 1)
    }

    let connect = () => {
        setAskForUsername(false);
        setCallStartTime(new Date()); // Start the call timer
        getMedia();
    }

    let handleVideo = () => {
        setVideo(!video);
    }
    let handleAudio = () => {
        setAudio(!audio);
    }

    let handleScreen = () => {
        if (screen) {
            // Stop screen sharing and return to camera
            try {
                if (localVideoref.current && localVideoref.current.srcObject) {
                    let tracks = localVideoref.current.srcObject.getTracks()
                    tracks.forEach(track => track.stop())
                }
                if (floatingVideoref.current && floatingVideoref.current.srcObject) {
                    let tracks = floatingVideoref.current.srcObject.getTracks()
                    tracks.forEach(track => track.stop())
                }
            } catch (e) { 
                console.log('Error stopping screen share:', e) 
            }
            setScreen(false);
            setNotification('Screen sharing stopped - returning to camera');
            setTimeout(() => setNotification(''), 3000);
            
            // Force return to camera with proper stream sync
            setTimeout(() => {
                getUserMedia();
            }, 100);
        } else {
            // Start screen sharing
            setScreen(true);
            setNotification('Starting screen share...');
            setTimeout(() => setNotification(''), 3000);
        }
    }

    // Floating video controls
    const toggleFloatingMode = () => {
        setIsFloating(!isFloating);
        setNotification(isFloating ? 'Fixed video mode' : 'Floating video mode');
        setTimeout(() => setNotification(''), 2000);
    };

    const handleMouseDown = (e) => {
        if (!isFloating) return;
        setIsDragging(true);
        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    // Touch support for mobile devices
    const handleTouchStart = (e) => {
        if (!isFloating) return;
        setIsDragging(true);
        const touch = e.touches[0];
        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !isFloating) return;
        
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        // Keep video within screen bounds
        const maxX = window.innerWidth - 200; // 200px is video width
        const maxY = window.innerHeight - 150; // 150px is video height
        
        setVideoPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY))
        });
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !isFloating) return;
        
        const touch = e.touches[0];
        const newX = touch.clientX - dragOffset.x;
        const newY = touch.clientY - dragOffset.y;
        
        // Keep video within screen bounds
        const maxX = window.innerWidth - 200;
        const maxY = window.innerHeight - 150;
        
        setVideoPosition({
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY))
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // Double click to toggle floating mode
    const handleDoubleClick = () => {
        toggleFloatingMode();
    };

    // Add global mouse and touch event listeners for dragging
    useEffect(() => {
        if (isDragging) {
            const handleMove = (e) => {
                if (e.type === 'mousemove') {
                    handleMouseMove(e);
                } else if (e.type === 'touchmove') {
                    handleTouchMove(e);
                }
            };

            const handleEnd = () => {
                setIsDragging(false);
            };

            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleEnd);
            document.addEventListener('touchmove', handleMove);
            document.addEventListener('touchend', handleEnd);
            
            return () => {
                document.removeEventListener('mousemove', handleMove);
                document.removeEventListener('mouseup', handleEnd);
                document.removeEventListener('touchmove', handleMove);
                document.removeEventListener('touchend', handleEnd);
            };
        }
    }, [isDragging, dragOffset]);

    // Sync video streams when switching between floating and fixed modes
    useEffect(() => {
        if (window.localStream) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                if (isFloating && floatingVideoref.current) {
                    floatingVideoref.current.srcObject = window.localStream;
                    console.log('Stream synced to floating video');
                } else if (!isFloating && localVideoref.current) {
                    localVideoref.current.srcObject = window.localStream;
                    console.log('Stream synced to fixed video');
                }
            }, 50);
        }
    }, [isFloating]);

    // Sync video streams when screen sharing state changes
    useEffect(() => {
        if (window.localStream) {
            setTimeout(() => {
                if (isFloating && floatingVideoref.current) {
                    floatingVideoref.current.srcObject = window.localStream;
                    console.log('Stream synced to floating video after screen change');
                } else if (!isFloating && localVideoref.current) {
                    localVideoref.current.srcObject = window.localStream;
                    console.log('Stream synced to fixed video after screen change');
                }
            }, 100);
        }
    }, [screen, isFloating]);

    let handleEndCall = () => {
        try {
            // Stop tracks from both video elements
            if (localVideoref.current && localVideoref.current.srcObject) {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            }
            if (floatingVideoref.current && floatingVideoref.current.srcObject) {
                let tracks = floatingVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            }
        } catch (e) { }
        
        // Clear chat history when ending the call
        setMessages([]);
        setMessage("");
        setNewMessages(0);
        
        // Show notification that chat history has been cleared
        setNotification('Call ended. Chat history cleared.');
        
        // Brief delay to show notification, then redirect
        setTimeout(() => {
            window.location.href = "/"
        }, 1500);
    }

    let openChat = () => {
        setModal(!showModal);
        setNewMessages(0);
    }

    useEffect(() => {
        if (screen !== undefined) {
            getDisplayMedia();
        }
    }, [screen])

    let silence = () => {
        let ctx = new AudioContext()
        let oscillator = ctx.createOscillator()
        let dst = oscillator.connect(ctx.createMediaStreamDestination())
        oscillator.start()
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
    }
    let black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height })
        canvas.getContext('2d').fillRect(0, 0, width, height)
        let stream = canvas.captureStream()
        return Object.assign(stream.getVideoTracks()[0], { enabled: false })
    }

    // Enhanced send message function
    const handleSendMessage = () => {
        if (message.trim()) {
            console.log(socketRef.current);
            socketRef.current.emit('chat-message', message, username)
            setMessage("")
        }
    }

    // Handle Enter key press in chat input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    }

    return (

        <div>

            {askForUsername === true ?

                <div>


                    <h2>Enter into Lobby </h2>
                    <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
                    <Button variant="contained" onClick={connect}>Connect</Button>


                    <div>
                        <video ref={localVideoref} autoPlay muted></video>
                    </div>

                </div> :


                <div className={styles.meetVideoContainer}>

                    {showModal ? 
                        <ChatContainer>
                            <ChatHeader>
                                <Box sx={{ position: 'relative' }}>
                                    <Avatar 
                                        sx={{ 
                                            width: 40, 
                                            height: 40,
                                            background: 'linear-gradient(45deg, #f093fb, #f5576c)'
                                        }}
                                    >
                                        {username.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <OnlineIndicator />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Video Chat
                                    </Typography>
                                    <CallTimer>
                                        {callDuration}
                                    </CallTimer>
                                </Box>
                            </ChatHeader>

                            <ChatMessagesContainer>
                                {messages.length !== 0 ? messages.map((item, index) => (
                                    <MessageBubble key={index} isOwn={isOwnMessage(item.sender)}>
                                        {!isOwnMessage(item.sender) && (
                                            <MessageSender>{item.sender}</MessageSender>
                                        )}
                                        <MessageText>{item.data}</MessageText>
                                        <MessageTime>{getCurrentTime()}</MessageTime>
                                    </MessageBubble>
                                )) : (
                                    <Box sx={{ 
                                        textAlign: 'center', 
                                        color: '#666',
                                        marginTop: '40px',
                                        fontStyle: 'italic'
                                    }}>
                                        <Typography>No messages yet. Start the conversation! 💬</Typography>
                                    </Box>
                                )}
                            </ChatMessagesContainer>

                            <ChatInputContainer>
                                <StyledChatInput
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    variant="outlined"
                                    size="small"
                                    multiline
                                    maxRows={3}
                                />
                                <SendButton onClick={handleSendMessage}>
                                    <SendIcon />
                                </SendButton>
                            </ChatInputContainer>
                        </ChatContainer>
                    : null}


                    <div className={styles.buttonContainers}>
                        <IconButton onClick={handleVideo} style={{ color: "white" }}>
                            {(video === true) ? <VideocamIcon /> : <VideocamOffIcon />}
                        </IconButton>
                        <IconButton onClick={handleEndCall} style={{ color: "red" }}>
                            <CallEndIcon  />
                        </IconButton>
                        <IconButton onClick={handleAudio} style={{ color: "white" }}>
                            {audio === true ? <MicIcon /> : <MicOffIcon />}
                        </IconButton>

                        {screenAvailable === true ?
                            <ScreenShareButton onClick={handleScreen} isSharing={screen}>
                                {screen === true ? <StopScreenShareIcon /> : <ScreenShareIcon />}
                            </ScreenShareButton> : null}

                        <IconButton 
                            onClick={toggleFloatingMode} 
                            style={{ 
                                color: isFloating ? "#4CAF50" : "white",
                                backgroundColor: isFloating ? 'rgba(76, 175, 80, 0.1)' : 'transparent'
                            }}
                            title={isFloating ? "Switch to fixed video" : "Switch to floating video"}
                        >
                            <PictureInPictureIcon />
                        </IconButton>

                        <Badge badgeContent={newMessages} max={999} color='error'>
                            <IconButton onClick={openChat} style={{ color: "white" }}>
                                <ChatIcon />
                            </IconButton>
                        </Badge>

                    </div>

                    {screen && (
                        <ScreenShareIndicator>
                            Screen Sharing Active
                        </ScreenShareIndicator>
                    )}

                    {notification && (
                        <NotificationBar>
                            {notification}
                        </NotificationBar>
                    )}

                    {/* Main video - only show when not floating */}
                    {!isFloating && (
                        <video className={styles.meetUserVideo} ref={localVideoref} autoPlay muted></video>
                    )}

                    {/* Floating video */}
                    {isFloating && (
                        <FloatingVideoContainer
                            className="floating-container"
                            isDragging={isDragging}
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleTouchStart}
                            onDoubleClick={handleDoubleClick}
                            style={{
                                left: `${videoPosition.x}px`,
                                top: `${videoPosition.y}px`,
                            }}
                        >
                            <FloatingVideo ref={floatingVideoref} autoPlay muted />
                            <FloatingControls>
                                <FloatingControlButton
                                    onClick={toggleFloatingMode}
                                    title="Switch to fixed video"
                                    size="small"
                                >
                                    <CloseIcon fontSize="inherit" />
                                </FloatingControlButton>
                            </FloatingControls>
                        </FloatingVideoContainer>
                    )}

                    <div className={styles.conferenceView}>
                        {videos2.map((video) => (
                            <div key={video.socketId}>
                                <video

                                    data-socket={video.socketId}
                                    ref={ref => {
                                        if (ref && video.stream) {
                                            ref.srcObject = video.stream;
                                        }
                                    }}
                                    autoPlay
                                >
                                </video>
                            </div>

                        ))}

                    </div>

                </div>

            }

        </div>
    )
}
