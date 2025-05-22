import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Container,
  List,
  ListItem,
  Avatar,
  Chip,
  Fade,
  Paper
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Badge, { badgeClasses } from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import HistoryIcon from '@mui/icons-material/History';

import Home from '../home/Home';
import Products from '../products/Products';
import Categories from '../Categories/Categories';
import Cart from '../cart/Cart';
import OrderHistory from '../OrderHistory/OrderHistory';
import Footer from '../../components/Footer';
import Clothing from '../Categories/Clothing';
import Footwear from '../Categories/Footwear';
import HomeKitchen from '../Categories/HomeKitchen';
import Electronics from '../Categories/Electronics';
import Accessories from '../Categories/Accessories';

// Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  backdropFilter: 'blur(20px)',
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const LogoAvatar = styled(Avatar)(({ theme }) => ({
  width: 50,
  height: 50,
  background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
  boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'rotate(5deg)',
    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.8rem',
  background: `linear-gradient(45deg, ${theme.palette.common.white}, ${alpha(theme.palette.common.white, 0.8)})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  letterSpacing: '-0.5px',
  textShadow: `0 2px 4px ${alpha(theme.palette.common.black, 0.3)}`,
}));

const NavList = styled(List)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  margin: 0,
  padding: 0,
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 500,
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(3),
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(45deg, ${alpha(theme.palette.common.white, 0.2)}, ${alpha(theme.palette.common.white, 0.1)})`,
    transition: 'left 0.3s ease',
    borderRadius: theme.spacing(3),
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 15px ${alpha(theme.palette.common.black, 0.2)}`,
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    '&::before': {
      left: 0,
    },
  },
}));

const CartIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  borderRadius: '50%',
  padding: theme.spacing(1.5),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    transform: 'scale(1.05)',
  },
}));

const CartBadge = styled(Badge)(({ theme }) => ({
  [`& .${badgeClasses.badge}`]: {
    top: -12,
    right: -6,
    background: `linear-gradient(45deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
    color: theme.palette.common.white,
    fontWeight: 600,
    boxShadow: `0 2px 8px ${alpha(theme.palette.error.main, 0.3)}`,
    animation: 'pulse 2s infinite',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 500,
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(3),
  textTransform: 'none',
  border: `2px solid transparent`,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: alpha(theme.palette.error.main, 0.1),
    border: `2px solid ${alpha(theme.palette.error.main, 0.3)}`,
    transform: 'translateY(-1px)',
  },
}));

const MainContent = styled(Paper)(({ theme }) => ({
  minHeight: 'calc(100vh - 100px)',
  margin: theme.spacing(3),
  borderRadius: theme.spacing(2.5),
  background: alpha(theme.palette.common.white, 0.95),
  backdropFilter: 'blur(10px)',
  boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  overflow: 'hidden',
  position: 'relative',
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

const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  fontFamily: theme.typography.fontFamily,
}));

export default function Dashboard() {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/', { replace: true });
    window.location.reload(); // Force re-evaluate App routing based on localStorage
  };

  // Function to update the cart count from localStorage
  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const newCartCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
    setCartCount(newCartCount);
  };

  // This will be triggered each time localStorage is updated directly in this session
  useEffect(() => {
    // Initial load to get cart count
    updateCartCount();

    // Listen for changes in cart items stored in localStorage
    const interval = setInterval(() => {
      updateCartCount();  // Re-check cart count every 500ms
    }, 500);

    // Clean up the interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardContainer>
      <Fade in timeout={600}>
        <StyledAppBar position="sticky" elevation={0}>
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="home">
              <LogoContainer>
                <LogoAvatar>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt1WqAhsjbTEz_IxcDDdYmqQOeC1dd6sXd7nr52vBY0OmcAhavLE9olYW5SV8p2WDjVfU&usqp=CAU"
                    alt="Logo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </LogoAvatar>
                <LogoText variant="h4">E-Cart</LogoText>
              </LogoContainer>
            </Link>

            <NavList>
              <ListItem sx={{ p: 0 }}>
                <NavButton
                  component={Link}
                  to="/dashboard"
                  startIcon={<HomeIcon />}
                >
                  Home
                </NavButton>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <NavButton
                  component={Link}
                  to="/dashboard/products"
                  startIcon={<InventoryIcon />}
                >
                  Products
                </NavButton>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <NavButton
                  component={Link}
                  to="/dashboard/categories"
                  startIcon={<CategoryIcon />}
                >
                  Categories
                </NavButton>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <NavButton
                  component={Link}
                  to="/dashboard/orders"
                  startIcon={<HistoryIcon />}
                >
                  Orders
                </NavButton>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <CartIconButton
                  component={Link}
                  to="/dashboard/cart"
                  size="large"
                >
                  <CartBadge badgeContent={cartCount} color="primary" overlap="circular">
                    <ShoppingCartIcon sx={{ fontSize: '1.5rem' }} />
                  </CartBadge>
                </CartIconButton>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <LogoutButton
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                >
                  Logout
                </LogoutButton>
              </ListItem>
            </NavList>
          </Toolbar>
        </StyledAppBar>
      </Fade>

      <Fade in timeout={800} style={{ transitionDelay: '200ms' }}>
        <MainContent elevation={8}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="clothing" element={<Clothing />} />
            <Route path="footwear" element={<Footwear />} />
            <Route path="home-kitchen" element={<HomeKitchen />} />
            <Route path="electronics" element={<Electronics />} />
            <Route path="accessories" element={<Accessories />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </MainContent>
      </Fade>
      {/* <Footer/> */}
    </DashboardContainer>
  );
}