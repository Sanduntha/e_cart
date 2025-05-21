// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// import Login from './Pages/login/Login';
// import Register from './Pages/register/Register';
// import Dashboard from './Pages/dashboard/Dashboard';
// import AdminDashboard from './AdminPages/AdminDashboard';

// const App = () => {
//   const location = useLocation();

//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
//   const [role, setRole] = useState(localStorage.getItem('role'));

//   useEffect(() => {
//     setIsAuthenticated(!!localStorage.getItem('authToken'));
//     setRole(localStorage.getItem('role'));
//   }, [location]);

//   const ProtectedRoute = ({ element, allowedRoles }) => {
//     if (!isAuthenticated) return <Navigate to="/" replace />;
//     if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;
//     return element;
//   };

//   const RedirectIfAuthenticated = ({ children }) => {
//     if (isAuthenticated) {
//       if (role === 'admin') {
//         return <Navigate to="/admin-dashboard" replace />;
//       } else if (role === 'user') {
//         return <Navigate to="/dashboard" replace />;
//       }
//     }
//     return children;
//   };

//   return (
//     <Routes>
//       {/* Public with redirect if already logged in */}
//       <Route
//         path="/"
//         element={
//           <RedirectIfAuthenticated>
//             <Login />
//           </RedirectIfAuthenticated>
//         }
//       />
//       <Route
//         path="/register"
//         element={
//           <RedirectIfAuthenticated>
//             <Register />
//           </RedirectIfAuthenticated>
//         }
//       />

//       {/* Protected */}
//       <Route
//         path="/dashboard/*"
//         element={
//           <ProtectedRoute
//             element={<Dashboard />}
//             allowedRoles={['user', 'admin']}
//           />
//         }
//       />
//       <Route
//         path="/admin-dashboard/*"
//         element={
//           <ProtectedRoute
//             element={<AdminDashboard />}
//             allowedRoles={['admin']}
//           />
//         }
//       />

//       {/* Catch-all */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Login from './Pages/login/Login';
import Register from './Pages/register/Register';
import Dashboard from './Pages/dashboard/Dashboard';
import AdminDashboard from './AdminPages/AdminDashboard';

// Create Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#0d47a1',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.15),0px 1px 1px 0px rgba(0,0,0,0.1)',
    '0px 3px 1px -2px rgba(0,0,0,0.15),0px 2px 2px 0px rgba(0,0,0,0.1)',
    '0px 3px 3px -2px rgba(0,0,0,0.15),0px 3px 4px 0px rgba(0,0,0,0.1)',
    '0px 2px 4px -1px rgba(0,0,0,0.15),0px 4px 5px 0px rgba(0,0,0,0.1)',
    '0px 3px 5px -1px rgba(0,0,0,0.15),0px 5px 8px 0px rgba(0,0,0,0.1)',
    '0px 3px 5px -1px rgba(0,0,0,0.15),0px 6px 10px 0px rgba(0,0,0,0.1)',
    '0px 4px 5px -2px rgba(0,0,0,0.15),0px 7px 10px 1px rgba(0,0,0,0.1)',
    '0px 5px 5px -3px rgba(0,0,0,0.15),0px 8px 10px 1px rgba(0,0,0,0.1)',
    '0px 5px 6px -3px rgba(0,0,0,0.15),0px 9px 12px 1px rgba(0,0,0,0.1)',
    '0px 6px 6px -3px rgba(0,0,0,0.15),0px 10px 14px 1px rgba(0,0,0,0.1)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        contained: {
          boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.15),0px 6px 10px 0px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
      },
    },
  },
});

const App = () => {
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('authToken'));
    setRole(localStorage.getItem('role'));
  }, [location]);

  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!isAuthenticated) return <Navigate to="/" replace />;
    if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;
    return element;
  };

  const RedirectIfAuthenticated = ({ children }) => {
    if (isAuthenticated) {
      if (role === 'admin') {
        return <Navigate to="/admin-dashboard" replace />;
      } else if (role === 'user') {
        return <Navigate to="/dashboard" replace />;
      }
    }
    return children;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Adds consistent baseline styles */}
      <Routes>
        {/* Public with redirect if already logged in */}
        <Route
          path="/"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfAuthenticated>
              <Register />
            </RedirectIfAuthenticated>
          }
        />

        {/* Protected */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute
              element={<Dashboard />}
              allowedRoles={['user', 'admin']}
            />
          }
        />
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              allowedRoles={['admin']}
            />
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;