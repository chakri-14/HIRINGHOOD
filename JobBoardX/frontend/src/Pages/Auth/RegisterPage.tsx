import React from 'react';
import { Box, Typography } from '@mui/material';
import SigninForm from './RegisterForm';

const SigninPage: React.FC = () => {
  return (
    <Box display="flex" height="100vh" width="100vw" bgcolor="#121212">
      <Box
        width="50%"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <SigninForm />
      </Box>
      <Box
        width="50%"
        sx={{
          backgroundColor: "#1e1e1e",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease-in-out",
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
            transform: "scale(1)",
            "&:hover": {
              transform: "scale(1.2)",
            },
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
            transform: "scale(1)",
            "&:hover": {
              transform: "scale(1.15)",
            },
          }}
        />
        <Box
          sx={{
            textAlign: "center",
            color: "#ffffff",
            zIndex: 1,
            padding: "20px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              letterSpacing: "-1px",
              mb: 2,
            }}
          >
            Join JobBoardX
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#a1a1aa",
              maxWidth: "400px",
              lineHeight: 1.6,
            }}
          >
            Create your account to explore job opportunities or recruit top talent. Get started today!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SigninPage;