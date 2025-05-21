import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 6,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
          overflow: "hidden",
          position: "relative"
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ color: "white", position: "relative", zIndex: 2 }}>
              <Typography
                variant="h2"
                component="h1"
                fontWeight="bold"
                gutterBottom
                sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
              >
                E-Cart, Live Better
              </Typography>
              <Typography variant="h6" paragraph sx={{ mb: 4 }}>
                Discover the latest products at unbeatable prices. From electronics
                to fashion, find everything you need at Shop E-Cart Store
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Link to="products" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{
                      mr: 2,
                      mb: isMobile ? 2 : 0,
                      px: 4,
                      py: 1.5,
                      fontWeight: "bold",
                      boxShadow: theme.shadows[4]
                    }}
                  >
                    Shop Now
                  </Button>
                </Link>
                <Link to="categories" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 3,
                      py: 1.5,
                      backgroundColor: "rgba(255,255,255,0.9)",
                      borderColor: "white",
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "white",
                        borderColor: "white"
                      }
                    }}
                  >
                    Browse Categories
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: isMobile ? "none" : "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Box
                component="img"
                src="https://d1hdtc0tbqeghx.cloudfront.net/wp-content/uploads/2021/11/24122148/Featured.jpg"
                alt="E-Cart Promo"
                sx={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: 3,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  transform: "perspective(1000px) rotateY(-15deg)",
                  transition: "transform 0.5s",
                  "&:hover": {
                    transform: "perspective(1000px) rotateY(-5deg) scale(1.03)"
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Features Section */}
      <Typography
        variant="h4"
        component="h2"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
        sx={{ mb: 4 }}
      >
        Why Choose Us
      </Typography>
      <Grid container spacing={3} sx={{ mb: 8 }}>
        {[
          {
            icon: <CheckCircleOutlineOutlinedIcon fontSize="large" />,
            title: "Quality Products",
            description:
              "Carefully selected products that meet our high standards"
          },
          {
            icon: <MonetizationOnOutlinedIcon fontSize="large" />,
            title: "Competitive Prices",
            description: "Best deals to ensure you get value for your money"
          },
          {
            icon: <ElectricBoltIcon fontSize="large" />,
            title: "Fast Shipping",
            description: "Quick delivery to get your products to you faster"
          },
          {
            icon: <SupportAgentIcon fontSize="large" />,
            title: "24/7 Support",
            description: "Our customer service team is always here to help"
          }
        ].map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={2}
              sx={{
                height: "100%",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[8]
                }
              }}
            >
              <CardContent
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}
              >
                <Box
                  sx={{
                    borderRadius: "50%",
                    p: 2,
                    mb: 2,
                    color: theme.palette.primary.main,
                    background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}10)`
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Contact Us Section */}
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.secondary.light}40, ${theme.palette.secondary.main}10)`,
          mt: 4
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <ContactMailIcon color="secondary" fontSize="large" sx={{ mr: 1 }} />
              <Typography variant="h4" component="h2" fontWeight="bold">
                Contact Us
              </Typography>
            </Box>
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              If you have any questions or need support, feel free to reach out!
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <PhoneIcon color="secondary" sx={{ mr: 1 }} />
                  <Typography variant="body1">+94 77 123 4567</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <EmailIcon color="secondary" sx={{ mr: 1 }} />
                  <Typography variant="body1">support@ecart.com</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} sx={{ textAlign: "center" }}>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 2,
                  boxShadow: theme.shadows[4]
                }}
              >
                Get In Touch
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}