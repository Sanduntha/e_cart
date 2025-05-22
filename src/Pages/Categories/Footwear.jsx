// import React, { useEffect, useState } from 'react';

// import TextField from "@mui/material/TextField";
// import SearchIcon from "@mui/icons-material/Search";
// import InputAdornment from "@mui/material/InputAdornment";
// import ProductCard from "../../components/ProductCard";
// import axios from 'axios';

// export default function Footwear() {
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
//         const response = await axios.get('http://localhost:3000/api/v1/category/footwear');
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
//         <h1>Footwear</h1>
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
import { Search, Filter, RotateCcw, ShoppingCart } from 'lucide-react';

// Mock ProductCard component with enhanced image styling
const ProductCard = ({ image, category, title, description, price, onAddToCart }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
    <div className="relative overflow-hidden bg-gray-100">
      <img 
        src={image || "/api/placeholder/350/250"} 
        alt={title}
        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-3 left-3">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
          {category}
        </span>
      </div>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-2 shadow-lg">
          <Search size={16} className="text-gray-600" />
        </div>
      </div>
    </div>
    <div className="p-5">
      <h3 className="font-semibold text-gray-900 mb-2 text-lg leading-tight">{title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{description}</p>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            ₹{price?.toLocaleString()}
          </span>
        </div>
        <button
          onClick={onAddToCart}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

export default function Footwear() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([1000, 100000]);
  const [searchTerm, setSearchTerm] = useState('');
  
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

  // Mock data for demonstration since API isn't available
  const mockProducts = [
    {
      id: 1,
      name: "Nike Air Max 270",
      description: "Comfortable running shoes with excellent cushioning and modern design",
      price: 8999,
      category: "Running",
      image: "/api/placeholder/350/250"
    },
    {
      id: 2,
      name: "Adidas Ultraboost 22",
      description: "Premium running shoes with responsive boost midsole technology",
      price: 12999,
      category: "Running",
      image: "/api/placeholder/350/250"
    },
    {
      id: 3,
      name: "Puma RS-X3",
      description: "Retro-inspired sneakers with bold colors and chunky silhouette",
      price: 7499,
      category: "Lifestyle",
      image: "/api/placeholder/350/250"
    },
    {
      id: 4,
      name: "Reebok Classic Leather",
      description: "Timeless leather sneakers with vintage appeal and all-day comfort",
      price: 5999,
      category: "Classic",
      image: "/api/placeholder/350/250"
    },
    {
      id: 5,
      name: "New Balance 574",
      description: "Iconic lifestyle sneaker combining comfort and versatile style",
      price: 6799,
      category: "Lifestyle",
      image: "/api/placeholder/350/250"
    },
    {
      id: 6,
      name: "Converse Chuck Taylor",
      description: "Classic canvas high-top sneakers, a timeless fashion statement",
      price: 3999,
      category: "Classic",
      image: "/api/placeholder/350/250"
    },
    {
      id: 7,
      name: "Jordan Air Force 1",
      description: "Iconic basketball shoes with premium leather and classic design",
      price: 9999,
      category: "Basketball",
      image: "/api/placeholder/350/250"
    },
    {
      id: 8,
      name: "Vans Old Skool",
      description: "Skateboarding shoes with durable canvas and signature side stripe",
      price: 4499,
      category: "Skate",
      image: "/api/placeholder/350/250"
    },
    {
      id: 9,
      name: "Asics Gel-Kayano 29",
      description: "Professional running shoes with advanced gel cushioning system",
      price: 11999,
      category: "Running",
      image: "/api/placeholder/350/250"
    },
    {
      id: 10,
      name: "Dr. Martens 1460",
      description: "Classic leather boots with distinctive yellow stitching and air-cushioned sole",
      price: 13999,
      category: "Boots",
      image: "/api/placeholder/350/250"
    },
    {
      id: 11,
      name: "Timberland 6-Inch Premium",
      description: "Waterproof leather boots perfect for outdoor adventures",
      price: 15999,
      category: "Boots",
      image: "/api/placeholder/350/250"
    },
    {
      id: 12,
      name: "Allbirds Tree Runners",
      description: "Sustainable running shoes made from eucalyptus tree fiber",
      price: 8499,
      category: "Eco-Friendly",
      image: "/api/placeholder/350/250"
    }
  ];

  // Fetch products once on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate API call with mock data
        setTimeout(() => {
          setProducts(mockProducts);
          setFilteredProducts(mockProducts);
        }, 500);
        
        // Original API call (commented out since localhost isn't available)
        // const response = await axios.get('http://localhost:3000/api/v1/category/footwear');
        // setProducts(response.data);
        // setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to mock data
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
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

  const handlePriceRangeChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === 'min') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Footwear Collection</h1>
              <p className="text-gray-600">Discover premium shoes for every occasion</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="500"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(e, 'min')}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <span className="text-sm text-blue-600 font-medium">₹{priceRange[0].toLocaleString()}</span>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(e, 'max')}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <span className="text-sm text-blue-600 font-medium">₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} />
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="text-center py-16">
                <div className="mb-4">
                  <Search className="mx-auto h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={handleReset}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}