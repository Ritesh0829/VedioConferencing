import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import './auth.css'; // We'll create this CSS file

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 20%, 60%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  80% {
    transform: translateY(-10px);
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

// Styled Components
const GradientBackground = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
  backgroundSize: '400% 400%',
  animation: `
    gradient 15s ease infinite
  `,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    animation: 'float 20s ease-in-out infinite',
  }
});

const LoginCard = styled(Box)({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  padding: '40px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 80px rgba(255, 255, 255, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  maxWidth: '400px',
  width: '100%',
  animation: `${fadeIn} 0.8s ease-out`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '20px',
    padding: '2px',
    background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)',
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    maskComposite: 'exclude',
    zIndex: -1,
  }
});

const FloatingLogo = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '30px',
  '& .logo-icon': {
    fontSize: '60px',
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `${bounce} 2s infinite`,
    filter: 'drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3))',
  }
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
    },
    '&.Mui-focused': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.25)',
    },
    '& fieldset': {
      borderColor: 'rgba(102, 126, 234, 0.3)',
      transition: 'all 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(102, 126, 234, 0.6)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#667eea',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#667eea',
    fontWeight: 500,
  },
  '& .MuiInputAdornment-root': {
    color: '#667eea',
  }
});

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  borderRadius: '12px',
  color: 'white',
  fontWeight: 600,
  fontSize: '16px',
  textTransform: 'none',
  padding: '12px 24px',
  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
    animation: `${pulse} 0.6s ease`,
  },
  '&:active': {
    transform: 'translateY(-1px)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover::before': {
    left: '100%',
  }
});

const ToggleButton = styled(Button)({
  borderRadius: '20px',
  textTransform: 'none',
  fontWeight: 600,
  padding: '8px 20px',
  margin: '0 5px',
  transition: 'all 0.3s ease',
  '&.active': {
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    color: 'white',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)',
  },
  '&:not(.active)': {
    color: '#667eea',
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(102, 126, 234, 0.2)',
      transform: 'translateY(-2px)',
    }
  }
});

const defaultTheme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {
            console.log(err);
            // Improved error handling
            let errorMessage = 'An error occurred. Please try again.';
            
            if (err?.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err?.message) {
                errorMessage = err.message;
            } else if (typeof err === 'string') {
                errorMessage = err;
            }
            
            setError(errorMessage);
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <GradientBackground>
                <LoginCard>
                    <FloatingLogo>
                        <VideocamIcon className="logo-icon" />
                    </FloatingLogo>
                    
                    <Typography 
                        variant="h4" 
                        align="center" 
                        sx={{ 
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '10px',
                            animation: `${fadeIn} 1s ease-out 0.2s both`
                        }}
                    >
                        {formState === 0 ? 'Welcome Back!' : 'Join Us!'}
                    </Typography>
                    
                    <Typography 
                        variant="body1" 
                        align="center" 
                        sx={{ 
                            color: '#666',
                            marginBottom: '30px',
                            animation: `${fadeIn} 1s ease-out 0.4s both`
                        }}
                    >
                        {formState === 0 ? 'Sign in to continue your video meetings' : 'Create your account to get started'}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                        <ToggleButton 
                            className={formState === 0 ? 'active' : ''} 
                            onClick={() => setFormState(0)}
                        >
                            Sign In
                        </ToggleButton>
                        <ToggleButton 
                            className={formState === 1 ? 'active' : ''} 
                            onClick={() => setFormState(1)}
                        >
                            Sign Up
                        </ToggleButton>
                    </Box>

                    <Box component="form" noValidate>
                        {formState === 1 && (
                            <StyledTextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                InputProps={{
                                    startAdornment: <PersonIcon sx={{ mr: 1, color: '#667eea' }} />
                                }}
                                sx={{ 
                                    marginBottom: '20px',
                                    animation: `${fadeIn} 0.6s ease-out`
                                }}
                            />
                        )}

                        <StyledTextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Email or Username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            InputProps={{
                                startAdornment: <PersonIcon sx={{ mr: 1, color: '#667eea' }} />
                            }}
                            sx={{ 
                                marginBottom: '20px',
                                animation: `${fadeIn} 0.6s ease-out 0.1s both`
                            }}
                        />

                        <StyledTextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            InputProps={{
                                startAdornment: <LockIcon sx={{ mr: 1, color: '#667eea' }} />
                            }}
                            sx={{ 
                                marginBottom: '10px',
                                animation: `${fadeIn} 0.6s ease-out 0.2s both`
                            }}
                        />

                        {formState === 0 && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                <Link 
                                    href="#" 
                                    variant="body2" 
                                    sx={{ 
                                        color: '#667eea',
                                        textDecoration: 'none',
                                        fontWeight: 500,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            color: '#764ba2',
                                            textDecoration: 'underline',
                                        }
                                    }}
                                >
                                    Forgot Password?
                                </Link>
                            </Box>
                        )}

                        {error && (
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: '#f5576c', 
                                    textAlign: 'center', 
                                    marginBottom: '20px',
                                    fontWeight: 500,
                                    animation: `${fadeIn} 0.5s ease-out`
                                }}
                            >
                                {error}
                            </Typography>
                        )}

                        <GradientButton
                            type="button"
                            fullWidth
                            onClick={handleAuth}
                            sx={{ 
                                marginTop: '10px',
                                animation: `${fadeIn} 0.6s ease-out 0.3s both`
                            }}
                        >
                            {formState === 0 ? "Sign In" : "Create Account"}
                        </GradientButton>
                    </Box>
                </LoginCard>
            </GradientBackground>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}
            />
        </ThemeProvider>
    );
}