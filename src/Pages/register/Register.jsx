import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  Link,
  Fade,
  Grow,
  CircularProgress,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Alert
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  PersonAdd,
  Email,
  Lock,
  Person,
  Phone,
  LockOpen,
  CheckCircle,
  AccountCircle
} from '@mui/icons-material';
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
    background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpolygon points="50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40"/%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.4,
  },
}));

const AuthContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4, 5),
  borderRadius: theme.spacing(3),
  background: alpha(theme.palette.common.white, 0.95),
  backdropFilter: 'blur(20px)',
  boxShadow: `0 25px 50px ${alpha(theme.palette.common.black, 0.15)}`,
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  maxWidth: 500,
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
  width: 100,
  height: 100,
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:hover': {
    transform: 'scale(1.05) rotate(5deg)',
    boxShadow: `0 15px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
    borderRadius: '50%',
    zIndex: -1,
    opacity: 0.5,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(2),
    transition: 'all 0.3s ease',
    background: alpha(theme.palette.common.white, 0.8),
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.15)}`,
      background: alpha(theme.palette.common.white, 0.95),
    },
    '&.Mui-focused': {
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
      background: theme.palette.common.white,
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1.5, 2),
  },
}));

const RegisterButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1.8, 4),
  fontWeight: 700,
  fontSize: '1.1rem',
  textTransform: 'none',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(45deg, ${alpha(theme.palette.common.white, 0.2)}, transparent)`,
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(-1px)',
  },
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  background: alpha(theme.palette.primary.main, 0.05),
  borderRadius: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    // Simple progress tracking based on filled fields
    const filledFields = Object.values({
      ...formData,
      [e.target.name]: e.target.value
    }).filter(value => value.trim() !== '').length;
    setActiveStep(Math.min(filledFields, 5));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/register', {
        name: formData.name,
        email: formData.email,
        contact_no: formData.contactNo,
        password: formData.password
      });

      console.log(response.data);
      alert("Registration successful!");
      // You can redirect to login page here if needed
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = ['Name', 'Email', 'Phone', 'Password', 'Confirm'];

  return (
    <AuthWrapper>
      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <AuthContainer elevation={24}>
            <Box textAlign="center" mb={3}>
              <Grow in timeout={1200}>
                <LogoAvatar>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1WqAhsjbTEz_IxcDDdYmqQOeC1dd6sXd7nr52vBY0OmcAhavLE9olYW5SV8p2WDjVfU&usqp=CAU"
                    alt="Shop Smart Logo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </LogoAvatar>
              </Grow>
              
              <Typography 
                variant="h4" 
                fontWeight="700" 
                gutterBottom
                sx={{ 
                  background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 1
                }}
              >
                Create an Account
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Join E-Cart to start shopping
              </Typography>

              <Fade in timeout={1000} style={{ transitionDelay: '300ms' }}>
                <ProgressContainer>
                  <AccountCircle color="primary" />
                  <Box flexGrow={1}>
                    <Typography variant="body2" color="primary" fontWeight="600">
                      Registration Progress
                    </Typography>
                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 1 }}>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel 
                            sx={{
                              '& .MuiStepLabel-label': {
                                fontSize: '0.75rem',
                                fontWeight: 500
                              }
                            }}
                          >
                            {label}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                </ProgressContainer>
              </Fade>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    type="text"
                    name="name"
                    label="Full Name"
                    variant="outlined"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    type="email"
                    name="email"
                    label="Email Address"
                    variant="outlined"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    type="tel"
                    name="contactNo"
                    label="Contact Number"
                    variant="outlined"
                    required
                    value={formData.contactNo}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOpen color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <RegisterButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAdd />}
                sx={{ mt: 3, mb: 3 }}
              >
                {loading ? 'Creating Account...' : 'Register'}
              </RegisterButton>

              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link 
                    href="/" 
                    underline="hover"
                    sx={{ 
                      fontWeight: 600,
                      background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                      }
                    }}
                  >
                    Login
                  </Link>
                </Typography>
              </Box>

              {activeStep === 5 && (
                <Fade in timeout={500}>
                  <Alert 
                    severity="success" 
                    variant="filled"
                    icon={<CheckCircle />}
                    sx={{ 
                      mt: 2, 
                      borderRadius: 2,
                      '& .MuiAlert-message': {
                        fontWeight: 500
                      }
                    }}
                  >
                    All fields completed! Ready to register.
                  </Alert>
                </Fade>
              )}
            </Box>
          </AuthContainer>
        </Fade>
      </Container>
    </AuthWrapper>
  );
}