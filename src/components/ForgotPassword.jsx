import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendEmail = async () => {
    try {
      await axios.post("http://localhost:8082/users/reset-password", {
        email: email,
      });

      setIsEmailSent(true);
    } catch (error) {
      console.error("Error sending reset email:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Paper elevation={3} style={{ padding: "20px", minWidth: "300px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Forgot Password
          </Typography>
          {isEmailSent ? (
            <Typography variant="body1" align="center">
              An email has been sent with instructions to reset your password.
            </Typography>
          ) : (
            <div>
              <Typography variant="body1" align="center" gutterBottom>
                Enter your email address to reset your password.
              </Typography>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSendEmail}
              >
                Send Reset Email
              </Button>
            </div>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
