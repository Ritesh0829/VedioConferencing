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

    if (video !== undefined && audio !== undefined) {

        getUserMedia();
        console.log("SET STATE HAS ", video, audio);

    }

    useEffect(() => {

        console.log("VIDEOS ", videos2)

    }, [videos2])

    let getPermissions = async () => {
        try {
            const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoPermission) {
                setVideoAvailable(true);
                console.log('Video permission granted');
            } else {
                setVideoAvailable(false);
                console.log('Video permission denied');
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (audioPermission) {
                setAudioAvailable(true);
                console.log('Audio permission granted');
            } else {
                setAudioAvailable(false);
                console.log('Audio permission denied');
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            } else {
                setScreenAvailable(false);
            }

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable });
                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    if (localVideoref.current) {
                        localVideoref.current.srcObject = userMediaStream;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (video !== undefined && audio !== undefined) {
            getUserMedia();
            console.log("SET STATE HAS ", video, audio);

        }


    }, [video, audio])
    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();

    }




    let getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

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

    let getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((e) => console.log(e))
        } else {
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

        }
    }

    let getDisplayMediaSuccess = (stream) => {
        console.log(stream.getTracks())

        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false)

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            getUserMedia()
        })
    }

    let getDisplayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDisplayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e))
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

    let sendMessage = () => {
        console.log(socketRef.current);
        socketRef.current.emit('chat-message', message, username)
        setMessage("")
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
        setScreen(!screen);
    }

    let handleEndCall = () => {
        try {
            let tracks = localVideoref.current.srcObject.getTracks()
            tracks.forEach(track => track.stop())
        } catch (e) { }
        window.location.href = "/"
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
                            <IconButton onClick={handleScreen} style={{ color: "white" }}>
                                {screen === true ? <ScreenShareIcon /> : <StopScreenShareIcon />}
                            </IconButton> : null}

                        <Badge badgeContent={newMessages} max={999} color='error'>
                            <IconButton onClick={openChat} style={{ color: "white" }}>
                                <ChatIcon />
                            </IconButton>
                        </Badge>

                    </div>


                    <video className={styles.meetUserVideo} ref={localVideoref} autoPlay muted></video>

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
