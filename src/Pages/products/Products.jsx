// import React, { useEffect, useState } from 'react';
// import "./products.css";
// import TextField from "@mui/material/TextField";
// import SearchIcon from "@mui/icons-material/Search";
// import InputAdornment from "@mui/material/InputAdornment";
// import ProductCard from "../../components/ProductCard";
// import FilterPanel from "../../components/FilterPanel";
// import axios from 'axios';

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState({});
//   const [priceRange, setPriceRange] = useState([1000, 100000]);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   // For storing product reactions (favorites/dislikes)
//   const [productReactions, setProductReactions] = useState({});
  
//   const [cart, setCart] = useState(() => {
//     const savedCart = localStorage.getItem("cartItems");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   // Function to get userId from localStorage
//   const getUserId = () => {
//     return localStorage.getItem('userId');
//   };

//   // Handle adding product to favorites
//   const handleFavorite = async (productId, isFavorited) => {
//     const userId = getUserId();
    
//     if (!userId) {
//       alert("Please login to add products to favorites");
//       return;
//     }
    
//     try {
//       await axios.post('http://localhost:3000/api/v1/ratings/userRatings', {
//         productId,
//         userId,
//         statusType: 'favorite',
//         status: isFavorited ? 1 : 0
//       });
      
//       // Update local state to reflect the change
//       setProductReactions(prev => ({
//         ...prev,
//         [productId]: {
//           ...prev[productId],
//           favorite: isFavorited
//         }
//       }));
      
//       console.log(`Product ${isFavorited ? 'added to' : 'removed from'} favorites`);
//     } catch (error) {
//       console.error('Error updating favorite status:', error);
//     }
//   };
  
//   // Handle disliking a product
//   const handleDislike = async (productId, isDisliked) => {
//     const userId = getUserId();
    
//     if (!userId) {
//       alert("Please login to dislike products");
//       return;
//     }
    
//     try {
//       await axios.post('http://localhost:3000/api/v1/ratings/userRatings', {
//         productId,
//         userId,
//         statusType: 'dislike',
//         status: isDisliked ? 1 : 0
//       });
      
//       // Update local state to reflect the change
//       setProductReactions(prev => ({
//         ...prev,
//         [productId]: {
//           ...prev[productId],
//           dislike: isDisliked
//         }
//       }));
      
//       console.log(`Product ${isDisliked ? 'disliked' : 'removed from dislikes'}`);
//     } catch (error) {
//       console.error('Error updating dislike status:', error);
//     }
//   };

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
//         const response = await axios.get('http://localhost:3000/api/v1/products/getAll');
//         setProducts(response.data);
//         setFilteredProducts(response.data);
        
//         // Initialize categories based on unique product categories
//         const uniqueCategories = {};
//         response.data.forEach(product => {
//           if (product.category) {
//             uniqueCategories[product.category] = false;
//           }
//         });
//         setCategories(uniqueCategories);
        
//         // Additionally, fetch user ratings if user is logged in
//         fetchUserRatings();
        
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
    
//     fetchProducts();
//   }, []);
  
//   // Fetch user's existing ratings for products
//   const fetchUserRatings = async () => {
//     const userId = getUserId();
//     if (!userId) return;
    
//     try {
//       // Fetch user ratings from backend
//       const response = await axios.get(`http://localhost:3000/api/v1/ratings/getUserRatings/${userId}`);
      
//       // Process the ratings and update state
//       const reactions = {};
//       response.data.forEach(rating => {
//         if (!reactions[rating.product_id]) {
//           reactions[rating.product_id] = {};
//         }
        
//         if (rating.status_type === 'favorite' && rating.status === 1) {
//           reactions[rating.product_id].favorite = true;
//         }
        
//         if (rating.status_type === 'dislike' && rating.status === 1) {
//           reactions[rating.product_id].dislike = true;
//         }
//       });
      
//       setProductReactions(reactions);
//     } catch (error) {
//       console.error('Error fetching user ratings:', error);
//     }
//   };

//   // Apply filters whenever filter criteria change
//   useEffect(() => {
//     applyFilters();
//   }, [searchTerm, categories, priceRange, products]);

//   const handleCategoryChange = (updatedCategories) => {
//     setCategories(updatedCategories);
//   };

//   const handlePriceRangeChange = (newPriceRange) => {
//     setPriceRange(newPriceRange);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value.toLowerCase());
//   };

//   const handleReset = () => {
//     const resetCategories = {};
//     Object.keys(categories).forEach(cat => {
//       resetCategories[cat] = false;
//     });
//     setCategories(resetCategories);
//     setPriceRange([1000, 100000]);
//     setSearchTerm('');
//     setFilteredProducts(products);
//   };

//   const applyFilters = () => {
//     const filtered = products.filter((product) => {
//       const selectedCategories = Object.entries(categories).filter(([_, isSelected]) => isSelected);
//       const categoryMatch = selectedCategories.length === 0 || 
//                            (product.category && categories[product.category] === true);
//       const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
//       const searchMatch = !searchTerm || 
//                          (product.name && product.name.toLowerCase().includes(searchTerm)) || 
//                          (product.description && product.description.toLowerCase().includes(searchTerm));
//       return categoryMatch && priceMatch && searchMatch;
//     });
//     setFilteredProducts(filtered);
//   };

//   return (
//     <div className="pro-container">
//       <div className="pro-top">
//         <h1>All Products</h1>
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
//         <div className="pro-sidebar">
//           <FilterPanel
//             categories={categories}
//             priceRange={priceRange}
//             onCategoryChange={handleCategoryChange}
//             onPriceRangeChange={handlePriceRangeChange}
//             onReset={handleReset}
//           />
//         </div>

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
//                 // Pass the handlers with the product ID and initial reaction state
//                 handleFavorite={(isFavorited) => handleFavorite(product.id, isFavorited)}
//                 handleDislike={(isDisliked) => handleDislike(product.id, isDisliked)}
//                 // Pass initial reaction state
//                 initialReaction={
//                   productReactions[product.id]?.favorite ? "favorite" : 
//                   productReactions[product.id]?.dislike ? "dislike" : null
//                 }
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
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Box, CircularProgress, IconButton, Collapse,
  Chip, Card, CardContent, Avatar, Fade, Grow, Divider, Badge
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { 
  KeyboardArrowDown, 
  KeyboardArrowUp,
  ShoppingBag,
  Receipt,
  CreditCard,
  LocalShipping,
  CalendarToday,
  AttachMoney,
  ShoppingCart
} from '@mui/icons-material';

// Styled Components
const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
  minHeight: '100vh',
}));

const HeaderCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.common.white,
  borderRadius: theme.spacing(2),
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: `0 12px 40px ${alpha(theme.palette.common.black, 0.1)}`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  background: alpha(theme.palette.common.white, 0.95),
  backdropFilter: 'blur(10px)',
  overflow: 'hidden',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  '& .MuiTableCell-head': {
    fontWeight: 700,
    fontSize: '0.95rem',
    color: theme.palette.primary.dark,
    borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    padding: theme.spacing(2),
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    transform: 'translateY(-1px)',
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
  },
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
    padding: theme.spacing(2),
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.2),
    transform: 'scale(1.1)',
  },
}));

const PaymentChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
  color: theme.palette.common.white,
  boxShadow: `0 2px 8px ${alpha(theme.palette.success.main, 0.3)}`,
}));

const PriceChip = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: '1.1rem',
}));

const ItemsTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  background: alpha(theme.palette.background.paper, 0.8),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  margin: theme.spacing(1, 0),
}));

const ItemsTableHead = styled(TableHead)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
  '& .MuiTableCell-head': {
    fontWeight: 600,
    fontSize: '0.9rem',
    color: theme.palette.secondary.dark,
  },
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  gap: theme.spacing(2),
}));

const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  gap: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openRows, setOpenRows] = useState({});

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/orders/user/${userId}`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setError('Failed to load orders. Please try again later.');
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    } else {
      setLoading(false);
      setError('User ID not found. Please log in again.');
    }
  }, [userId]);

  const formatCurrency = (value) => `Rs. ${parseFloat(value).toFixed(2)}`;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const toggleRow = (orderId) => {
    setOpenRows((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  if (loading) {
    return (
      <StyledContainer>
        <Fade in timeout={600}>
          <LoadingContainer>
            <CircularProgress 
              size={60} 
              thickness={4} 
              sx={{ 
                color: (theme) => theme.palette.primary.main,
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                }
              }} 
            />
            <Typography variant="h6" color="primary">
              Loading your orders...
            </Typography>
          </LoadingContainer>
        </Fade>
      </StyledContainer>
    );
  }

  if (error) {
    return (
      <StyledContainer>
        <Fade in timeout={600}>
          <Card sx={{ 
            maxWidth: 500, 
            mx: 'auto', 
            mt: 4, 
            p: 3, 
            textAlign: 'center',
            border: (theme) => `2px solid ${theme.palette.error.main}`,
            borderRadius: 3
          }}>
            <Avatar sx={{ 
              bgcolor: 'error.main', 
              mx: 'auto', 
              mb: 2,
              width: 60,
              height: 60 
            }}>
              <Receipt />
            </Avatar>
            <Typography variant="h6" color="error" gutterBottom>
              Oops! Something went wrong
            </Typography>
            <Typography color="text.secondary">
              {error}
            </Typography>
          </Card>
        </Fade>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Fade in timeout={800}>
        <div>
          <Grow in timeout={1000}>
            <HeaderCard>
              <CardContent sx={{ py: 3 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    width: 60, 
                    height: 60 
                  }}>
                    <ShoppingBag sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="700" gutterBottom>
                      Order History
                    </Typography>
                    <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                      Track all your purchases and order details
                    </Typography>
                  </Box>
                  <Box ml="auto">
                    <Badge 
                      badgeContent={orders.length} 
                      color="secondary"
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          color: (theme) => theme.palette.primary.main,
                          fontWeight: 700,
                          fontSize: '1rem',
                          minWidth: '32px',
                          height: '32px'
                        }
                      }}
                    >
                      <Receipt sx={{ fontSize: 40, opacity: 0.8 }} />
                    </Badge>
                  </Box>
                </Box>
              </CardContent>
            </HeaderCard>
          </Grow>

          {orders.length === 0 ? (
            <Fade in timeout={1000} style={{ transitionDelay: '300ms' }}>
              <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <EmptyStateContainer>
                  <Avatar sx={{ 
                    bgcolor: 'primary.main', 
                    width: 80, 
                    height: 80, 
                    mb: 2 
                  }}>
                    <ShoppingCart sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h5" fontWeight="600" gutterBottom>
                    No Orders Found
                  </Typography>
                  <Typography variant="body1" textAlign="center" sx={{ maxWidth: 400 }}>
                    You haven't placed any orders yet. Start shopping to see your order history here!
                  </Typography>
                </EmptyStateContainer>
              </Card>
            </Fade>
          ) : (
            <Fade in timeout={1000} style={{ transitionDelay: '300ms' }}>
              <StyledTableContainer component={Paper}>
                <Table>
                  <StyledTableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell><strong>No</strong></TableCell>
                      <TableCell><strong>Order ID</strong></TableCell>
                      <TableCell><strong>Payment</strong></TableCell>
                      <TableCell><strong>Card Last 4</strong></TableCell>
                      <TableCell><strong>Subtotal</strong></TableCell>
                      <TableCell><strong>Tax</strong></TableCell>
                      <TableCell><strong>Shipping</strong></TableCell>
                      <TableCell><strong>Total</strong></TableCell>
                      <TableCell><strong>Date</strong></TableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {orders.map((order, index) => (
                      <React.Fragment key={order.order_id}>
                        <StyledTableRow>
                          <TableCell>
                            <StyledIconButton size="small" onClick={() => toggleRow(order.order_id)}>
                              {openRows[order.order_id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </StyledIconButton>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={index + 1} 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Receipt fontSize="small" color="primary" />
                              <Typography variant="body2" fontWeight="600">
                                {order.order_id}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <PaymentChip 
                              icon={<CreditCard />} 
                              label={order.payment_method} 
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ 
                              fontFamily: 'monospace',
                              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.1),
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              display: 'inline-block'
                            }}>
                              {order.card_last4 || '-'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              <AttachMoney fontSize="small" color="success" />
                              <Typography variant="body2">
                                {formatCurrency(order.subtotal)}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {formatCurrency(order.tax)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              <LocalShipping fontSize="small" color="info" />
                              <Typography variant="body2">
                                {formatCurrency(order.shipping_fee)}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <PriceChip variant="h6">
                              {formatCurrency(order.total_amount)}
                            </PriceChip>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              <CalendarToday fontSize="small" color="action" />
                              <Typography variant="body2">
                                {formatDate(order.created_at)}
                              </Typography>
                            </Box>
                          </TableCell>
                        </StyledTableRow>

                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                            <Collapse in={openRows[order.order_id]} timeout="auto" unmountOnExit>
                              <Box margin={2}>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                  <ShoppingBag color="primary" />
                                  <Typography variant="h6" fontWeight="600" color="primary">
                                    Ordered Items
                                  </Typography>
                                  <Chip 
                                    label={`${order.items.length} items`} 
                                    size="small" 
                                    color="secondary" 
                                    variant="outlined"
                                  />
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <ItemsTableContainer>
                                  <Table size="small">
                                    <ItemsTableHead>
                                      <TableRow>
                                        <TableCell><strong>Product</strong></TableCell>
                                        <TableCell><strong>Price</strong></TableCell>
                                        <TableCell><strong>Qty</strong></TableCell>
                                        <TableCell><strong>Total</strong></TableCell>
                                      </TableRow>
                                    </ItemsTableHead>
                                    <TableBody>
                                      {order.items.map((item) => (
                                        <TableRow key={item.item_id} sx={{ 
                                          '&:hover': { 
                                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05) 
                                          } 
                                        }}>
                                          <TableCell>
                                            <Typography variant="body2" fontWeight="500">
                                              {item.product_name}
                                            </Typography>
                                          </TableCell>
                                          <TableCell>
                                            <Typography variant="body2">
                                              {formatCurrency(item.price)}
                                            </Typography>
                                          </TableCell>
                                          <TableCell>
                                            <Chip 
                                              label={item.quantity} 
                                              size="small" 
                                              color="primary" 
                                              variant="outlined"
                                            />
                                          </TableCell>
                                          <TableCell>
                                            <Typography variant="body2" fontWeight="600" color="primary">
                                              {formatCurrency(item.total_price)}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </ItemsTableContainer>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </Fade>
          )}
        </div>
      </Fade>
    </StyledContainer>
  );
}