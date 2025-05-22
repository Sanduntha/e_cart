// import React, { useEffect, useState } from 'react';

// import TextField from "@mui/material/TextField";
// import SearchIcon from "@mui/icons-material/Search";
// import InputAdornment from "@mui/material/InputAdornment";
// import ProductCard from "../../components/ProductCard";
// import axios from 'axios';

// export default function Electronics() {
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
//         const response = await axios.get('http://localhost:3000/api/v1/category/electronics');
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
//         <h1>Electronics</h1>
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
import axios from 'axios';
// If you don't have icons available, you can remove these imports

// Product card component with inline styles
const ProductCard = ({ image, category, title, description, price, onAddToCart }) => {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '8px', 
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      transition: 'transform 0.3s, box-shadow 0.3s',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.02)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }}
    >
      <div style={{ 
        height: '180px', 
        backgroundColor: '#f0f0f0', 
        overflow: 'hidden',
      }}>
        {image ? (
          <img 
            src={image} 
            alt={title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <img 
            src="https://cdn.pixabay.com/photo/2019/04/26/21/05/product-4158044_960_720.jpg" 
            alt="Default product" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
      <div style={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{ 
          fontSize: '12px', 
          fontWeight: '600', 
          color: '#3b82f6', 
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {category}
        </span>
        <h3 style={{ 
          marginTop: '4px', 
          fontSize: '18px', 
          fontWeight: '500', 
          color: '#1f2937',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {title}
        </h3>
        <p style={{ 
          marginTop: '4px', 
          fontSize: '14px', 
          color: '#6b7280',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flexGrow: 1
        }}>
          {description}
        </p>
        <div style={{ 
          marginTop: '12px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>
            ₹{price.toLocaleString()}
          </span>
          <button
            onClick={onAddToCart}
            style={{ 
              backgroundColor: '#2563eb', 
              color: 'white', 
              border: 'none',
              borderRadius: '9999px', 
              padding: '8px 12px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
          >
            <img 
              src="https://cdn-icons-png.flaticon.com/512/263/263142.png" 
              alt="Cart" 
              style={{ width: '16px', height: '16px', marginRight: '4px' }} 
            />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

// Price range slider component with inline styles
const PriceSlider = ({ priceRange, setPriceRange }) => {
  const [minValue, setMinValue] = useState(priceRange[0]);
  const [maxValue, setMaxValue] = useState(priceRange[1]);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxValue) {
      setMinValue(value);
      setPriceRange([value, maxValue]);
    }
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= minValue) {
      setMaxValue(value);
      setPriceRange([minValue, value]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#4b5563' }}>
        <span>₹{minValue.toLocaleString()}</span>
        <span>₹{maxValue.toLocaleString()}</span>
      </div>
      <input
        type="range"
        min="1000"
        max="100000"
        value={minValue}
        onChange={handleMinChange}
        style={{ width: '100%' }}
      />
      <input
        type="range"
        min="1000"
        max="100000"
        value={maxValue}
        onChange={handleMaxChange}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default function Electronics() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([1000, 100000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(true); // Set to true to show filter by default
  
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
      try {
        const response = await axios.get('http://localhost:3000/api/v1/category/electronics');
        
        // Add placeholder images to products if they don't have images
        const productsWithImages = response.data.map(product => {
          if (!product.image) {
            // Assign placeholder image based on category
            let placeholderImage = '';
            switch(product.category?.toLowerCase()) {
              case 'phones':
                placeholderImage = 'https://cdn.pixabay.com/photo/2016/11/29/05/08/apple-1867461_960_720.jpg';
                break;
              case 'tvs':
                placeholderImage = 'https://cdn.pixabay.com/photo/2015/02/07/20/58/tv-627876_960_720.jpg';
                break;
              case 'audio':
                placeholderImage = 'https://cdn.pixabay.com/photo/2020/04/08/15/50/headphone-5017187_960_720.jpg';
                break;
              case 'computers':
                placeholderImage = 'https://cdn.pixabay.com/photo/2016/03/27/07/12/apple-1282241_960_720.jpg';
                break;
              case 'wearables':
                placeholderImage = 'https://cdn.pixabay.com/photo/2015/06/25/17/21/smart-watch-821557_960_720.jpg';
                break;
              default:
                placeholderImage = 'https://cdn.pixabay.com/photo/2019/04/26/21/05/product-4158044_960_720.jpg';
            }
            return { ...product, image: placeholderImage };
          }
          return product;
        });
        
        setProducts(productsWithImages);
        setFilteredProducts(productsWithImages);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Set some default products for demonstration
        const demoProducts = [
          {
            id: 1,
            name: "Premium Smartphone",
            description: "Latest model with advanced camera and long battery life",
            price: 49999,
            category: "Phones",
            image: "https://cdn.pixabay.com/photo/2016/11/29/05/08/apple-1867461_960_720.jpg"
          },
          {
            id: 2,
            name: "Ultra HD Smart TV",
            description: "4K resolution with smart features and voice control",
            price: 35000,
            category: "TVs",
            image: "https://cdn.pixabay.com/photo/2015/02/07/20/58/tv-627876_960_720.jpg"
          },
          {
            id: 3,
            name: "Wireless Earbuds",
            description: "True wireless with noise cancellation technology",
            price: 8999,
            category: "Audio",
            image: "https://cdn.pixabay.com/photo/2020/04/08/15/50/headphone-5017187_960_720.jpg"
          },
          {
            id: 4,
            name: "Gaming Laptop",
            description: "High-performance with dedicated graphics and RGB keyboard",
            price: 85000,
            category: "Computers",
            image: "https://cdn.pixabay.com/photo/2016/03/27/07/12/apple-1282241_960_720.jpg"
          },
          {
            id: 5,
            name: "Smartwatch",
            description: "Fitness tracking, notifications and long battery life",
            price: 12500,
            category: "Wearables",
            image: "https://cdn.pixabay.com/photo/2015/06/25/17/21/smart-watch-821557_960_720.jpg"
          },
          {
            id: 6,
            name: "Bluetooth Speaker",
            description: "Portable with waterproof design and 360° sound",
            price: 4999,
            category: "Audio",
            image: "https://cdn.pixabay.com/photo/2018/01/03/13/34/audio-3058387_960_720.jpg"
          }
        ];
        setProducts(demoProducts);
        setFilteredProducts(demoProducts);
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

  // Container styles
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 16px'
  };

  // Header styles
  const headerStyle = {
    display: 'flex',
    flexDirection: window.innerWidth < 768 ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: window.innerWidth < 768 ? 'flex-start' : 'center',
    marginBottom: '32px',
    gap: '16px'
  };

  const headerTitleStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111827'
  };

  const searchContainerStyle = {
    display: 'flex',
    gap: '16px',
    width: '100%'
  };

  const searchInputStyle = {
    flexGrow: 1,
    padding: '8px 12px',
    paddingLeft: '36px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '16px',
    position: 'relative'
  };

  const searchIconStyle = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: '#9ca3af'
  }

  const filterToggleStyle = {
    padding: '8px 12px',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // Content layout styles
  const contentContainerStyle = {
    display: 'flex',
    gap: '24px',
    flexDirection: window.innerWidth < 768 ? 'column' : 'row'
  };

  // Filter panel styles
  const filterPanelStyle = {
    width: window.innerWidth < 768 ? '100%' : '250px',
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: isFilterOpen ? 'block' : 'none',
    height: 'fit-content'
  };

  const filterHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  };

  const filterTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827'
  };

  const resetButtonStyle = {
    fontSize: '14px',
    color: '#2563eb',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer'
  };

  // Products grid styles
  const productsContainerStyle = {
    flexGrow: 1
  };

  const productsGridStyle = {
    display: 'grid',
    gridTemplateColumns: window.innerWidth < 640 ? '1fr' : 
                         window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 
                         'repeat(3, 1fr)',
    gap: '24px'
  };

  // Empty state styles
  const emptyStateStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      {/* Header Section with search */}
      <div style={headerStyle}>
        <h1 style={headerTitleStyle}>Electronics</h1>
        <div style={searchContainerStyle}>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={searchInputStyle}
            />
            <div style={searchIconStyle}>
              <img 
                src="https://cdn-icons-png.flaticon.com/512/54/54481.png" 
                alt="Search" 
                style={{ width: '16px', height: '16px', opacity: '0.5' }} 
              />
            </div>
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            style={filterToggleStyle}
          >
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3839/3839020.png" 
              alt="Filter" 
              style={{ width: '18px', height: '18px', marginRight: '4px' }} 
            />
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div style={contentContainerStyle}>
        {/* Filter Panel */}
        <div style={filterPanelStyle}>
          <div style={filterHeaderStyle}>
            <h3 style={filterTitleStyle}>Filters</h3>
            <button 
              onClick={handleReset}
              style={resetButtonStyle}
            >
              Reset
            </button>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Price Range</h4>
            <PriceSlider priceRange={priceRange} setPriceRange={setPriceRange} />
          </div>
        </div>
        
        {/* Products Grid */}
        <div style={productsContainerStyle}>
          {filteredProducts.length > 0 ? (
            <div style={productsGridStyle}>
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
          ) : (
            <div style={emptyStateStyle}>
              <div style={{ color: '#9ca3af', marginBottom: '16px' }}>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/94/94120.png" 
                  alt="No results" 
                  style={{ width: '64px', height: '64px', opacity: '0.6' }} 
                />
              </div>
              <p style={{ fontSize: '20px', fontWeight: '500', color: '#374151' }}>No products found.</p>
              <p style={{ color: '#6b7280', marginTop: '8px' }}>Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}