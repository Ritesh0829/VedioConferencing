// Automatically detect if we're in production
const IS_PROD = process.env.NODE_ENV === 'production' || window.location.hostname !== 'localhost';

const server = IS_PROD ?
    "https://vedioconferencing.onrender.com" :
    "http://localhost:8000"

// Debug logging
console.log('Environment Debug:', {
    NODE_ENV: process.env.NODE_ENV,
    hostname: window.location.hostname,
    IS_PROD: IS_PROD,
    server: server
});

export default server;