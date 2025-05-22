// import React, { useEffect, useState } from 'react';

// import TextField from "@mui/material/TextField";
// import SearchIcon from "@mui/icons-material/Search";
// import InputAdornment from "@mui/material/InputAdornment";
// import ProductCard from "../../components/ProductCard";
// import axios from 'axios';

// export default function HomeKitchen() {
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
//         const response = await axios.get('http://localhost:3000/api/v1/category/home-kitchen');
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
//         <h1>Home & Kitchen</h1>
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
import { Search, ShoppingCart, RefreshCw,Filter } from 'lucide-react';

const ProductCard = ({ image, category, title, description, price, onAddToCart }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }}
    onMouseEnter={(e) => {
      e.target.closest('div').style.transform = 'translateY(-8px)';
      e.target.closest('div').style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.target.closest('div').style.transform = 'translateY(0)';
      e.target.closest('div').style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }}>
    <div style={{ position: 'relative' }}>
      <img 
        src={image} 
        alt={title}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover'
        }}
      />
      <span style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {category}
      </span>
    </div>

    <div style={{
      padding: '20px',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1a202c',
        marginBottom: '8px',
        lineHeight: '1.3',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
      }}>
        {title}
      </h3>

      <p style={{
        color: '#4a5568',
        fontSize: '14px',
        marginBottom: '16px',
        flexGrow: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        lineHeight: '1.4'
      }}>
        {description}
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto'
      }}>
        <span style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1976d2'
        }}>
          ₹{price?.toLocaleString()}
        </span>

        <button
          onClick={onAddToCart}
          style={{
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#1565c0';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#1976d2';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

export default function HomeKitchen() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([1000, 100000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const mockData = [
          {
            id: 1,
            name: "Premium Non-Stick Cookware Set",
            description: "Complete 12-piece cookware set with ceramic non-stick coating",
            price: 15999,
            category: "Cookware",
            image: "../src/assets/image1.png"
          },
          {
            id: 2,
            name: "Smart Rice Cooker",
            description: "Automatic rice cooker with multiple cooking modes and timer",
            price: 8999,
            category: "Appliances",
            image: "../src/assets/image2.png"
          },
          {
            id: 3,
            name: "Stainless Steel Knife Set",
            description: "Professional grade chef knives with wooden block",
            price: 12499,
            category: "Cutlery",
            image: "../src/assets/image3.png"
          },
          {
            id: 4,
            name: "Glass Food Storage Containers",
            description: "Set of 10 airtight glass containers with lids",
            price: 3999,
            category: "Storage",
            image: "../src/assets/image4.png"
          },
          {
            id: 5,
            name: "Digital Kitchen Scale",
            description: "Precision kitchen scale with LCD display",
            price: 2499,
            category: "Tools",
            image: "../src/assets/image5.png"
          },
          {
            id: 6,
            name: "Blender & Food Processor",
            description: "2-in-1 high-speed blender with food processor attachment",
            price: 18999,
            category: "Appliances",
            image: "../src/assets/image6.png"
          }
        ];

        setTimeout(() => {
          setProducts(mockData);
          setFilteredProducts(mockData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const searchMatch = !searchTerm ||
        (product.name && product.name.toLowerCase().includes(searchTerm)) ||
        (product.description && product.description.toLowerCase().includes(searchTerm));

      return priceMatch && searchMatch;
    });

    setFilteredProducts(filtered);
  };


  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundAttachment: 'fixed'
    }}>
      {/* Header Section */}
      <div style={{
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '32px 16px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            alignItems: window.innerWidth < 768 ? 'stretch' : 'center',
            justifyContent: 'space-between',
            gap: '24px'
          }}>
            <div>
              <h1 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#1a202c',
                marginBottom: '8px',
                margin: 0
              }}>
                Home & Kitchen
              </h1>
              <p style={{
                fontSize: '18px',
                color: '#4a5568',
                margin: 0
              }}>
                Discover premium kitchen essentials and home appliances
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: window.innerWidth < 640 ? 'column' : 'row',
              gap: '16px',
              alignItems: 'stretch'
            }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }}>
                  <Search style={{ color: '#1976d2', size: 20 }} />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{
                    paddingLeft: '40px',
                    paddingRight: '16px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    width: window.innerWidth < 640 ? '100%' : '320px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '16px',
                    backgroundColor: '#f7fafc',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.borderColor = '#1976d2';
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = '#f7fafc';
                    e.target.style.borderColor = '#e2e8f0';
                  }}
                />
              </div>
              
              <button
                onClick={handleReset}
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#f7fafc',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#4a5568',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#edf2f7';
                  e.target.style.borderColor = '#cbd5e0';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f7fafc';
                  e.target.style.borderColor = '#e2e8f0';
                }}
              >
                <RefreshCw size={16} />
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div style={{
            marginTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            fontSize: '14px',
            color: '#4a5568'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#1976d2',
                borderRadius: '50%'
              }} />
              <span>{filteredProducts.length} Products Found</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#4caf50',
                borderRadius: '50%'
              }} />
              <span>{cart.length} Items in Cart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 16px'
      }}>
        {isLoading ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 0',
            color: 'white'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid rgba(255,255,255,0.3)',
              borderTop: '4px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '16px'
            }} />
            <h2 style={{ fontSize: '20px', margin: 0 }}>Loading amazing products...</h2>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '14px',
                marginBottom: '16px'
              }}>
                <Filter size={16} />
                <span>Showing {filteredProducts.length} of {products.length} products</span>
              </div>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image || ''}
                  category={product.category}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          </>
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '80px 0'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '48px',
              textAlign: 'center',
              maxWidth: '400px',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#f7fafc',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Search style={{ color: '#a0aec0', size: 32 }} />
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#1a202c'
              }}>
                No products found
              </h3>
              <p style={{
                color: '#4a5568',
                marginBottom: '24px',
                fontSize: '16px'
              }}>
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={handleReset}
                style={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
