import { Modal, Typography, Backdrop } from "@mui/material";
import { Button } from "./../";
import { styled } from "@mui/system";

const BlurredBackdrop = styled(Backdrop)(({ theme }) => ({
  backdropFilter: "blur(5px)",
  backgroundColor: "rgba(255, 255, 255, 0.2)", // Adjust the alpha value for transparency
}));

const InfoModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      BackdropComponent={BlurredBackdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          backgroundColor: "#ffff",
          borderRadius: "8px",
          padding: "20px",
          color: "orange",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          🎰 Game Instructions 🎰
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <p>Welcome to the Slot Machine Game! </p>
          <p>Rules:</p>
          <ul>
            <li>Match three identical symbols to win. 🌟</li>
            <li>Winning odds are based on the combination of symbols. 🎲</li>
            <li>Bet at least $1 to play a round. You can also place a Max Bet.</li>
          </ul>
          <p>Winning Odds:</p>
          <ul>
            <li>3 cherries: 5x payout 🍒🍒🍒</li>
            <li>3 grapes: 7x payout 🍇🍇🍇</li>
            <li>2 cherries or 2 grapes: 3x payout 🍒🍒 | 🍇🍇</li>
            <li>3 oranges or 3 lemons: 10x payout 🍊🍊🍊 | 🍋🍋🍋</li>
            <li>No match: 0 payout ❌💔</li>
          </ul>
        </Typography>
        <Button onClick={onClose}>Got it!</Button>
      </div>
    </Modal>
  );
};

export default InfoModal;
