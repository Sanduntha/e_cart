// import React, { useEffect, useState } from 'react';

// import TextField from "@mui/material/TextField";
// import SearchIcon from "@mui/icons-material/Search";
// import InputAdornment from "@mui/material/InputAdornment";
// import ProductCard from "../../components/ProductCard";
// import axios from 'axios';

// export default function Accessories() {
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
//         const response = await axios.get('http://localhost:3000/api/v1/category/accessories');
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
//         <h1>Accessories</h1>
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
import { Typography, Container, Grid, Box, Button, Slider, Chip, Divider, CircularProgress } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Accessories() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([1000, 100000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
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
        const response = await axios.get('http://localhost:3000/api/v1/category/accessories');
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

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
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

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ 
        mb: 4, 
        borderRadius: 2, 
        bgcolor: '#f8f9fa', 
        p: 3, 
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        backgroundImage: 'linear-gradient(120deg, #f3f4f6 0%, #e6e9f0 100%)'
      }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 700, 
                background: 'linear-gradient(to right, #4f46e5, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
            >
              Accessories
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
              Discover our collection of premium accessories
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' }, gap: 2 }}>
              <TextField
                id="search-accessories"
                placeholder="Search accessories..."
                variant="outlined"
                fullWidth
                size="medium"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{
                  maxWidth: 350,
                  bgcolor: 'white',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#e0e7ff'
                    },
                    '&:hover fieldset': {
                      borderColor: '#818cf8'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4f46e5'
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#4f46e5' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
                sx={{
                  bgcolor: '#4f46e5',
                  '&:hover': {
                    bgcolor: '#4338ca'
                  }
                }}
              >
                Filters
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Filters Section */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box sx={{ 
            mb: 4, 
            p: 3, 
            borderRadius: 2, 
            bgcolor: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                  Price Range
                </Typography>
                <Box sx={{ px: 2, py: 1 }}>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={1000}
                    max={100000}
                    step={1000}
                    valueLabelFormat={formatPrice}
                    sx={{
                      color: '#4f46e5',
                      '& .MuiSlider-thumb': {
                        '&:hover, &.Mui-active': {
                          boxShadow: '0 0 0 8px rgba(79, 70, 229, 0.16)'
                        }
                      }
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {formatPrice(priceRange[0])}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatPrice(priceRange[1])}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Active Filters
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<RefreshIcon />}
                      onClick={handleReset}
                      sx={{
                        borderColor: '#4f46e5',
                        color: '#4f46e5',
                        '&:hover': {
                          borderColor: '#4338ca',
                          bgcolor: 'rgba(79, 70, 229, 0.04)'
                        }
                      }}
                    >
                      Reset All
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {searchTerm && (
                      <Chip 
                        label={`Search: ${searchTerm}`} 
                        onDelete={() => setSearchTerm('')}
                        sx={{ bgcolor: '#e0e7ff', color: '#4338ca' }}
                      />
                    )}
                    <Chip 
                      label={`Price: ${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}`}
                      sx={{ bgcolor: '#e0e7ff', color: '#4338ca' }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      )}

      {/* Results Section */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="h2">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SortIcon sx={{ mr: 1, color: '#6b7280' }} />
          <Typography variant="body2" color="text.secondary">
            Sort by: <Box component="span" sx={{ fontWeight: 600, color: '#4f46e5' }}>Newest First</Box>
          </Typography>
        </Box>
      </Box>

      {/* Products Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress sx={{ color: '#4f46e5' }} />
        </Box>
      ) : (
        <>
          {filteredProducts.length > 0 ? (
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard
                      key={product.id}
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
          ) : (
            <Box 
              sx={{ 
                py: 8, 
                textAlign: 'center',
                bgcolor: '#f8f9fa',
                borderRadius: 2,
                p: 4
              }}
            >
              <Typography variant="h6" gutterBottom>No products found</Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search criteria or reset filters
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleReset}
                sx={{ 
                  mt: 2,
                  bgcolor: '#4f46e5',
                  '&:hover': {
                    bgcolor: '#4338ca'
                  }
                }}
              >
                Reset Filters
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}