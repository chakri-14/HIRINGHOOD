import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#121212",
          boxShadow: "none",
          borderBottom: "1px solid #1e1e1e",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", padding: "0 40px" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 800, color: "#ffffff" }}
          >
            JobBoardX
          </Typography>
          <Box>
            <Button
              sx={{
                color: "#ffffff",
                textTransform: "none",
                fontWeight: 600,
                mr: 2,
                "&:hover": { backgroundColor: "#7c3aed", color: "#ffffff" },
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
            <Button
              sx={{
                color: "#ffffff",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#7c3aed", color: "#ffffff" },
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          backgroundColor: "#121212",
          padding: { xs: "2rem 1rem", md: "4rem 2rem" },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-50px",
            left: "-50px",
            width: "200px",
            height: "200px",
            backgroundColor: "#7c3aed",
            borderRadius: "50%",
            opacity: 0.2,
            transition: "transform 0.5s ease",
            "&:hover": { transform: "scale(1.2)" },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-70px",
            right: "-70px",
            width: "250px",
            height: "250px",
            backgroundColor: "#a78bfa",
            borderRadius: "50%",
            opacity: 0.15,
            transition: "transform 0.5s ease",
            "&:hover": { transform: "scale(1.15)" },
          }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            letterSpacing: "-1px",
            color: "#ffffff",
            mb: 2,
            zIndex: 1,
          }}
        >
          Welcome to JobBoardX
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#a1a1aa",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6,
            zIndex: 1,
          }}
        >
          Bridging the gap between talent and opportunity. Find your dream job or the perfect candidate with ease.
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#1e1e1e",
          padding: { xs: "2rem 1rem", md: "4rem 2rem" },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#ffffff", mb: 2 }}
          >
            About Our Platform
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#a1a1aa", lineHeight: 1.6 }}
          >
            JobBoardX is a modern job marketplace designed to connect skilled professionals with leading employers across industries.
            Whether you're seeking your next big opportunity or hiring top talent, our platform simplifies the process.
          </Typography>
        </Container>
      </Box>

      <Box
        sx={{
          backgroundColor: "#121212",
          padding: { xs: "2rem 1rem", md: "4rem 2rem" },
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#ffffff", mb: 2 }}
          >
            Get in Touch
          </Typography>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            sx={{
              "& .MuiInputBase-input": { color: "#ffffff" },
              "& .MuiInputLabel-root": { color: "#a1a1aa" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#a1a1aa" },
                "&:hover fieldset": { borderColor: "#7c3aed" },
                "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
              },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            sx={{
              "& .MuiInputBase-input": { color: "#ffffff" },
              "& .MuiInputLabel-root": { color: "#a1a1aa" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#a1a1aa" },
                "&:hover fieldset": { borderColor: "#7c3aed" },
                "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
              },
            }}
          />
          <TextField
            fullWidth
            label="Message"
            margin="normal"
            multiline
            rows={4}
            sx={{
              "& .MuiInputBase-input": { color: "#ffffff" },
              "& .MuiInputLabel-root": { color: "#a1a1aa" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#a1a1aa" },
                "&:hover fieldset": { borderColor: "#7c3aed" },
                "&.Mui-focused fieldset": { borderColor: "#7c3aed" },
              },
            }}
          />
          <Box mt={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#7c3aed",
                color: "#ffffff",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#a78bfa" },
              }}
            >
              Send Message
            </Button>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          backgroundColor: "#121212",
          color: "#ffffff",
          padding: { xs: "1rem", md: "2rem" },
          textAlign: "center",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          © 2025 JobBoardX. All rights reserved.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#a1a1aa", mt: 1 }}
        >
          Your trusted partner in career growth and hiring success.
        </Typography>
      </Box>
    </>
  );
};

export default LandingPage;