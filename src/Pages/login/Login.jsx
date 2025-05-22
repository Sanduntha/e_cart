import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  Alert,
  Divider,
  Link,
  Fade,
  Grow,
  CircularProgress,
  Stack
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InputAdornment from '@mui/material/InputAdornment';

// Styled Components
const AuthWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  padding: theme.spacing(2),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.3,
  },
}));

const AuthContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  background: alpha(theme.palette.common.white, 0.95),
  backdropFilter: 'blur(20px)',
  boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.1)}`,
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  maxWidth: 450,
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const LogoAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05) rotate(5deg)',
    boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(2),
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
    },
    '&.Mui-focused': {
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  fontSize: '1.1rem',
  textTransform: 'none',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

const TestButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1, 2),
  fontWeight: 500,
  textTransform: 'none',
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.1),
    transform: 'translateY(-1px)',
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
}));

const DebugAlert = styled(Alert)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  '& .MuiAlert-icon': {
    alignItems: 'center',
  },
}));

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDebugInfo('Processing login...');

    try {
      console.log('Sending login request with:', { email, password });

      const res = await axios.post('http://localhost:3000/api/v1/user/login', {
        email,
        password,
      });

      const { user, token } = res.data;

      console.log('Response data:', res.data);
      console.log('Role from response:', user.role); // ✅ Confirmed

      setDebugInfo(`Login successful! Role: ${user.role}`);

      localStorage.setItem('authToken', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('userId', user.id); 

      // Redirect based on role
   // In Login.jsx, after localStorage.setItem(...)
setTimeout(() => {
  if (user.role === 'admin') {
    console.log('Redirecting to admin dashboard...');
    navigate('/admin-dashboard', { replace: true });
    window.location.reload(); // 👈 Force re-evaluation
  } else {
    console.log('Redirecting to user dashboard...');
    navigate('/dashboard', { replace: true });
    window.location.reload(); // 👈 Force re-evaluation
  }
}, 1000);

    } catch (err) {
      console.error('Login error:', err);
      setDebugInfo(`Login failed: ${err.response?.data?.error || err.message}`);
      alert('Login failed. Check console for more info.');
    } finally {
      setLoading(false);
    }
  };

  // Test buttons (simulate local login without backend)
  const testUserNavigation = () => {
    localStorage.setItem('role', 'user');
    localStorage.setItem('authToken', 'test-token');
    setDebugInfo('Test: Set role to user, redirecting...');
    window.location.replace('/dashboard');
  };

  const testAdminNavigation = () => {
    localStorage.setItem('role', 'admin');
    localStorage.setItem('authToken', 'test-token');
    setDebugInfo('Test: Set role to admin, redirecting...');
    window.location.replace('/admin-dashboard');
  };

  return (
    <AuthWrapper>
      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <AuthContainer elevation={24}>
            <Box textAlign="center" mb={3}>
              <Grow in timeout={1000}>
                <LogoAvatar>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1WqAhsjbTEz_IxcDDdYmqQOeC1dd6sXd7nr52vBY0OmcAhavLE9olYW5SV8p2WDjVfU&usqp=CAU"
                    alt="Welcome"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </LogoAvatar>
              </Grow>
              
              <Typography 
                variant="h4" 
                fontWeight="700" 
                color="primary" 
                gutterBottom
                sx={{ 
                  background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Welcome Back
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Log in to your account to continue shopping
              </Typography>
            </Box>

            {debugInfo && (
              <Fade in timeout={300}>
                <DebugAlert 
                  severity={debugInfo.includes('successful') ? 'success' : debugInfo.includes('failed') ? 'error' : 'info'}
                  variant="filled"
                >
                  <Typography variant="body2">
                    <strong>Debug:</strong> {debugInfo}
                  </Typography>
                </DebugAlert>
              </Fade>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <StyledTextField
                fullWidth
                type="email"
                label="Email Address"
                variant="outlined"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <LoginButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                sx={{ mb: 3 }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </LoginButton>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Test Navigation
                </Typography>
              </Divider>

              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <TestButton
                  variant="outlined"
                  fullWidth
                  startIcon={<PersonIcon />}
                  onClick={testUserNavigation}
                >
                  Test User
                </TestButton>
                <TestButton
                  variant="outlined"
                  fullWidth
                  startIcon={<AdminPanelSettingsIcon />}
                  onClick={testAdminNavigation}
                >
                  Test Admin
                </TestButton>
              </Stack>

              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{' '}
                  <Link 
                    href="/register" 
                    underline="hover"
                    sx={{ 
                      fontWeight: 600,
                      background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Create one now
                  </Link>
                </Typography>
              </Box>
            </Box>
          </AuthContainer>
        </Fade>
      </Container>
    </AuthWrapper>
  );
}