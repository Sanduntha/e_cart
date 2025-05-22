// import React, { useEffect, useState } from 'react';

// import TextField from "@mui/material/TextField";
// import SearchIcon from "@mui/icons-material/Search";
// import InputAdornment from "@mui/material/InputAdornment";
// import ProductCard from "../../components/ProductCard";
// import axios from 'axios';

// export default function Clothing() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [priceRange, setPriceRange] = useState([1000, 100000]);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const [cart, setCart] = useState(() => {
//     const savedCart = localStorage.getItem("cartItems");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   const handleAddToCart = (product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find(item => item.id === product.id);
//       let updatedCart;
//       if (existingItem) {
//         updatedCart = prevCart.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         updatedCart = [...prevCart, { ...product, quantity: 1 }];
//       }
  
//       // Save updated cart to localStorage
//       localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };

//   // Fetch products once on component mount
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/v1/category/clothing');
//         setProducts(response.data);
//         setFilteredProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
    
//     fetchProducts();
//   }, []);

//   // Apply filters whenever filter criteria change
//   useEffect(() => {
//     applyFilters();
//   }, [searchTerm, priceRange, products]);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value.toLowerCase());
//   };

//   const handleReset = () => {
//     setPriceRange([1000, 100000]);
//     setSearchTerm('');
//     setFilteredProducts(products);
//   };

//   const applyFilters = () => {
//     const filtered = products.filter((product) => {
//       // Price range check
//       const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
//       // Search term check - search in name and description
//       const searchMatch = !searchTerm || 
//                          (product.name && product.name.toLowerCase().includes(searchTerm)) || 
//                          (product.description && product.description.toLowerCase().includes(searchTerm));
      
//       return priceMatch && searchMatch;
//     });
    
//     setFilteredProducts(filtered);
//   };

//   return (
//     <div className="pro-container">
//       <div className="pro-top">
//         <h1>Clothing</h1>
//         <TextField
//           id="outlined-basic"
//           placeholder="Search products..."
//           variant="outlined"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           sx={{
//             width: "300px",
//             backgroundColor: "#f5f5f5",
//             borderRadius: "8px",
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon style={{ color: "#1976d2" }} />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </div>

//       <div className="pro-content">
//         <div className="pro-middle">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 image={product.image || ''}
//                 category={product.category}
//                 title={product.name}
//                 description={product.description}
//                 price={product.price}
//                 onAddToCart={() => handleAddToCart(product)}
//               />
//             ))
//           ) : (
//             <p>No products found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ProductCard from "../../components/ProductCard";
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Slider,
  CircularProgress,
  Divider,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import RefreshIcon from '@mui/icons-material/Refresh';
import TuneIcon from '@mui/icons-material/Tune';

export default function Clothing() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([1000, 100000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }
  
      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Fetch products once on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/v1/category/clothing');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, priceRange, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleReset = () => {
    setPriceRange([1000, 100000]);
    setSearchTerm('');
    setFilteredProducts(products);
  };

  const applyFilters = () => {
    const filtered = products.filter((product) => {
      // Price range check
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      // Search term check - search in name and description
      const searchMatch = !searchTerm || 
                         (product.name && product.name.toLowerCase().includes(searchTerm)) || 
                         (product.description && product.description.toLowerCase().includes(searchTerm));
      
      return priceMatch && searchMatch;
    });
    
    setFilteredProducts(filtered);
  };

  const formatPrice = (value) => {
    return `₹${value.toLocaleString()}`;
  };

  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Filter panel content
  const filterPanel = (
    <Box sx={{ p: 3, width: isMobile ? '100%' : 320 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3
      }}>
        <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
          <TuneIcon sx={{ mr: 1 }} /> Filters
        </Typography>
        {isMobile && (
          <IconButton onClick={toggleFilterDrawer}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="subtitle1" fontWeight="600" gutterBottom>
        Price Range
      </Typography>
      <Box sx={{ px: 2, mb: 4 }}>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={1000}
          max={100000}
          step={1000}
          valueLabelFormat={formatPrice}
          sx={{
            color: '#6366f1',
            '& .MuiSlider-thumb': {
              height: 18,
              width: 18,
              '&:focus, &:hover, &.Mui-active': {
                boxShadow: '0 0 0 8px rgba(99, 102, 241, 0.16)',
              },
            },
          }}
        />
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mt: 1
        }}>
          <Typography variant="body2" color="text.secondary">
            {formatPrice(priceRange[0])}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatPrice(priceRange[1])}
          </Typography>
        </Box>
      </Box>

      <Typography variant="subtitle1" fontWeight="600" gutterBottom>
        Active Filters
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {searchTerm && (
          <Chip
            label={`Search: ${searchTerm}`}
            onDelete={() => setSearchTerm('')}
            sx={{ 
              bgcolor: 'rgba(99, 102, 241, 0.1)', 
              color: '#6366f1',
              '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.2)' },
            }}
          />
        )}
        <Chip
          label={`Price: ${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}`}
          sx={{ 
            bgcolor: 'rgba(99, 102, 241, 0.1)', 
            color: '#6366f1',
            '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.2)' },
          }}
        />
      </Box>

      <Button
        variant="outlined"
        startIcon={<RefreshIcon />}
        onClick={handleReset}
        fullWidth
        sx={{
          borderColor: '#6366f1',
          color: '#6366f1',
          '&:hover': {
            borderColor: '#4f46e5',
            bgcolor: 'rgba(99, 102, 241, 0.04)',
          },
          py: 1,
        }}
      >
        Reset All Filters
      </Button>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          mb: 5,
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.2,
            backgroundImage: 'url("https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=1200&q=60")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box sx={{ position: 'relative', textAlign: 'center', p: 3 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              color: 'white',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              mb: 1,
            }}
          >
            Clothing Collection
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Discover our premium selection of the latest fashion trends
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Filter Panel (Desktop) */}
        {!isMobile && (
          <Grid item xs={12} md={3} lg={2.5}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.08)',
              }}
            >
              {filterPanel}
            </Paper>
          </Grid>
        )}

        {/* Main Content */}
        <Grid item xs={12} md={isMobile ? 12 : 9} lg={isMobile ? 12 : 9.5}>
          {/* Search and Actions Bar */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 2,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' },
              justifyContent: 'space-between',
              gap: 2,
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <TextField
              placeholder="Search clothing..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              fullWidth
              sx={{
                maxWidth: { xs: '100%', sm: 400 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'rgba(0,0,0,0.02)',
                  '&:hover fieldset': {
                    borderColor: '#6366f1',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6366f1',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#6366f1' }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', gap: 1 }}>
              {isMobile && (
                <Button
                  variant="outlined"
                  startIcon={<FilterAltIcon />}
                  onClick={toggleFilterDrawer}
                  sx={{
                    borderColor: '#6366f1',
                    color: '#6366f1',
                    '&:hover': {
                      borderColor: '#4f46e5',
                      bgcolor: 'rgba(99, 102, 241, 0.04)',
                    },
                    whiteSpace: 'nowrap',
                  }}
                >
                  Filters
                </Button>
              )}

              <Button
                variant="contained"
                startIcon={<SortIcon />}
                sx={{
                  bgcolor: '#6366f1',
                  '&:hover': {
                    bgcolor: '#4f46e5',
                  },
                  whiteSpace: 'nowrap',
                }}
              >
                Sort By
              </Button>
            </Box>
          </Paper>

          {/* Results Count */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3 
          }}>
            <Typography variant="h6" fontWeight="medium">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'}
            </Typography>
            
            <Chip 
              icon={<LocalMallIcon />} 
              label={`${cart.length} items in cart`}
              sx={{ 
                bgcolor: 'rgba(99, 102, 241, 0.1)', 
                color: '#6366f1',
                fontWeight: 500,
              }}
            />
          </Box>

          {/* Products Grid */}
          {loading ? (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                height: 400 
              }}
            >
              <CircularProgress sx={{ color: '#6366f1' }} />
            </Box>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Grid container spacing={3}>
                    {filteredProducts.map((product) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <motion.div variants={itemVariants}>
                          <ProductCard
                            image={product.image || ''}
                            category={product.category}
                            title={product.name}
                            description={product.description}
                            price={product.price}
                            onAddToCart={() => handleAddToCart(product)}
                          />
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              ) : (
                <Paper
                  elevation={0}
                  sx={{
                    p: 5,
                    textAlign: 'center',
                    borderRadius: 2,
                    border: '1px solid rgba(0,0,0,0.08)',
                    bgcolor: 'rgba(99, 102, 241, 0.02)',
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <SearchIcon sx={{ fontSize: 48, color: '#6366f1', opacity: 0.5 }} />
                  </Box>
                  <Typography variant="h5" fontWeight="medium" gutterBottom>
                    No products found
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    We couldn't find any items matching your current filters.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleReset}
                    sx={{
                      bgcolor: '#6366f1',
                      '&:hover': {
                        bgcolor: '#4f46e5',
                      },
                    }}
                  >
                    Clear Filters
                  </Button>
                </Paper>
              )}
            </>
          )}
        </Grid>
      </Grid>

      {/* Filter Drawer (Mobile) */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen && isMobile}
        onClose={toggleFilterDrawer}
      >
        {filterPanel}
      </Drawer>
    </Container>
  );
}