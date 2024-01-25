import { useState } from "react";
import { Modal, Typography, Box, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";

const BlurredBackdrop = styled(Modal)(({ theme }) => ({
  backdropFilter: "blur(5px)",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
}));

const BetModal = ({ isOpen, onClose, onBetConfirm, maxCredits }) => {
  const [betAmount, setBetAmount] = useState(1); // Default bet amount

  const handleBetConfirm = () => {
    // Validate if the bet amount is valid (you can add more validation if needed)
    if (betAmount >= 1 && betAmount <= maxCredits) {
      onBetConfirm(betAmount);
      onClose();
    } else {
      // Handle invalid bet amount (show an error message, etc.)
      console.error("Invalid bet amount");
    }
  };

  return (
    <BlurredBackdrop
      open={isOpen}
      onClose={onClose}
      aria-labelledby="bet-modal-title"
      aria-describedby="bet-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexFlow: 'column',
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          backgroundColor: "#ffff",
          borderRadius: "8px",
          padding: "20px",
          color: "orange"
        }}
      >
        <Typography sx={{marginX:'9.1rem'}} variant="h6" component="h2">
          🎰 Set Bet Amount 🎰
        </Typography>
        <TextField
          label="Bet Amount"
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button onClick={handleBetConfirm} sx={{ mt: 2, color:"orange" }}>
          Confirm Bet
        </Button>
      </Box>
    </BlurredBackdrop>
  );
};

export default BetModal;
