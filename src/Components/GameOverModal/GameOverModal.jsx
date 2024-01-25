import { Modal, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/system";

const BlurredBackdrop = styled(Modal)(({ theme }) => ({
  backdropFilter: "blur(5px)",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
}));

const GameOverModal = ({ isOpen, onPlayAgain }) => {
  return (
    <BlurredBackdrop
      open={isOpen}
      aria-labelledby="game-over-modal-title"
      aria-describedby="game-over-modal-description"
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
        <Typography sx={{marginX: '10rem'}} variant="h6" component="h2">
          🎰 Game Over 🎰
        </Typography>
        <Typography sx={{ mt: 2, marginX: "1.4rem" }}>
          Sorry, your credits have run out. Would you like to play again?
        </Typography>
        <Button onClick={onPlayAgain} sx={{ mt: 2, color:"orange" }}>
          Play Again
        </Button>
      </Box>
    </BlurredBackdrop>
  );
};

export default GameOverModal;
