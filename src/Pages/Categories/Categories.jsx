// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./categories.css";

// const categories = [
//   {
//     title: "Clothing",
//     image: "https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg?semt=ais_hybrid&w=740",
//     link: "/dashboard/clothing",
//   },
//   {
//     title: "Electronics",
//     image: "https://media.istockphoto.com/id/1211554164/photo/3d-render-of-home-appliances-collection-set.jpg?s=612x612&w=0&k=20&c=blm3IyPyZo5ElWLOjI-hFMG-NrKQ0G76JpWGyNttF8s=",
//     link: "/dashboard/electronics",
//   },
//   {
//     title: "Home & Kitchen",
//     image: "https://gembah.com/wp-content/uploads/2022/07/home-kitchen-gadgets-scaled-1.jpeg",
//     link: "/dashboard/home-kitchen",
//   },
//   {
//     title: "Footwear",
//     image: "https://media.istockphoto.com/id/1152527286/photo/boutique-shoes-in-a-store.jpg?s=612x612&w=0&k=20&c=-_8nvBm9UrJW65mZxROh7Nz6BfZEk7APnffzrNRwgkQ=",
//     link: "/dashboard/footwear",
//   },
//   {
//     title: "Accessories",
//     image: "https://images.unsplash.com/3/www.madebyvadim.com.jpg?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D",
//     link: "/dashboard/accessories",
//   },
// ];

// export default function Categories() {
//   const navigate = useNavigate();

//   const handleNavigate = (link) => {
//     navigate(link);
//   };
//   return (
//     <div className="cat-container">
//       {categories.map((category, index) => (
//         <div
//           key={index}
//           className="cat-card"
//           onClick={() => handleNavigate(category.link)}
//         >
//           <img src={category.image} alt={category.title} className="cat-img" />
//           <div className="cat-title">{category.title}</div>
//         </div>
//       ))}
//     </div>
//   );
// }


import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Clothing",
    image: "https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg?semt=ais_hybrid&w=740",
    link: "/dashboard/clothing",
    color: "rgba(219, 39, 119, 0.8)" // Pink shade
  },
  {
    title: "Electronics",
    image: "https://media.istockphoto.com/id/1211554164/photo/3d-render-of-home-appliances-collection-set.jpg?s=612x612&w=0&k=20&c=blm3IyPyZo5ElWLOjI-hFMG-NrKQ0G76JpWGyNttF8s=",
    link: "/dashboard/electronics",
    color: "rgba(6, 182, 212, 0.8)" // Cyan shade
  },
  {
    title: "Home & Kitchen",
    image: "https://gembah.com/wp-content/uploads/2022/07/home-kitchen-gadgets-scaled-1.jpeg",
    link: "/dashboard/home-kitchen",
    color: "rgba(245, 158, 11, 0.8)" // Amber shade
  },
  {
    title: "Footwear",
    image: "https://media.istockphoto.com/id/1152527286/photo/boutique-shoes-in-a-store.jpg?s=612x612&w=0&k=20&c=-_8nvBm9UrJW65mZxROh7Nz6BfZEk7APnffzrNRwgkQ=",
    link: "/dashboard/footwear",
    color: "rgba(16, 185, 129, 0.8)" // Green shade
  },
  {
    title: "Accessories",
    image: "https://images.unsplash.com/3/www.madebyvadim.com.jpg?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D",
    link: "/dashboard/accessories",
    color: "rgba(124, 58, 237, 0.8)" // Purple shade
  },
];

// Add this CSS code to your categories.css file
const categoriesCss = `
  .cat-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    padding: 40px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .cat-card {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    height: 300px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .cat-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }

  .cat-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .cat-card:hover .cat-img {
    transform: scale(1.1);
  }

  .cat-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
    padding: 80px 20px 20px;
    display: flex;
    flex-direction: column;
  }
  
  .cat-title {
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 4px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .cat-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    background-color: white;
    color: #333;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .cat-button {
    background-color: white;
    color: #333;
    border: none;
    border-radius: 20px;
    padding: 6px 12px;
    font-weight: 600;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    width: fit-content;
    margin-top: 8px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .cat-button svg {
    margin-left: 4px;
    width: 16px;
    height: 16px;
  }
  
  .cat-card:hover .cat-button {
    opacity: 1;
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    .cat-container {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      padding: 20px;
    }
    
    .cat-card {
      height: 240px;
    }
  }
`;

export default function Categories() {
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    navigate(link);
  };

  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <>
      {/* Inline style tag for the CSS */}
      <style>{categoriesCss}</style>
      
      <motion.div 
        className="cat-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="cat-card"
            onClick={() => handleNavigate(category.link)}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src={category.image} alt={category.title} className="cat-img" />
            <div className="cat-overlay" style={{ background: `linear-gradient(to top, ${category.color} 0%, transparent 100%)` }}>
              <div className="cat-title">{category.title}</div>
              <button className="cat-button">
                Browse Now
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="cat-badge">Featured</div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}