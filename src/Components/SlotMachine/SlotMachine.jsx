import { Snackbar, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { Button, InfoModal, BetModal, GameOverModal } from "./../";
import "./slotMachine.css";

const SlotMachine = () => {
  // snackbar States
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  // main States
  const [reels, setReels] = useState(["🍒", "🍇", "🍊"]);
  const [credits, setCredits] = useState(100);
  const [bet, setBet] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinning, setSpinning] = useState(false);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [showBetModal, setShowBetModal] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const symbols = ["🍒", "🍇", "🍊", "🍋", "🍎", "🍓"];

  // Check for (GameOver) condition when credits drop to $0
  useEffect(() => {
    if (credits <= 0) {
      setShowGameOverModal(true);
    }
  }, [credits]);

  // Snackbar Definition
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
      setSnackbarMessage("");
      setSnackbarSeverity("info");
    }, 3000);
  };

  const spinReels = async () => {
    if (!isSpinning && credits >= bet) {
      setIsSpinning(true);

      await new Promise((resolve) => setTimeout(resolve, 500)); // Adjust the duration as needed

      const spins = 25; // Number of spins
      for (let i = 0; i < spins; i++) {
        await new Promise((resolve) => {
          const newReels = reels.map(() => getRandomSymbol());
          setReels(newReels);

          setTimeout(resolve, 150); // Adjust the duration between symbol changes
        });
      }

      setIsSpinning(false);

      const newReels = reels.map(() => getRandomSymbol());
      setReels(newReels);

      const payoutMultiplier = calculatePayout(newReels);
      const winnings = bet * payoutMultiplier;
      setCredits(credits + winnings - bet);

      if (payoutMultiplier > 0) {
        showSnackbar("Congratulations! You won!", "success");
      } else {
        showSnackbar("Oops! You lost. Better luck next time!", "error");
      }
    }
  };

  const getRandomSymbol = () => {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
  };

  // logic for demonstration
  const calculatePayout = (newReels) => {
    const joinedReels = newReels.join("");

    if (joinedReels === "🍒🍒🍒") {
      return 5; // Payout 5 times the bet
    } else if (joinedReels === "🍇🍇🍇") {
      return 7; // Payout 7 times the bet
    } else if (joinedReels.includes("🍒🍒") || joinedReels.includes("🍇🍇")) {
      return 3; // Payout 3 times the bet
    } else if (
      joinedReels.includes("🍊🍊🍊") ||
      joinedReels.includes("🍋🍋🍋")
    ) {
      return 10; // Payout 10 times the bet
    } else {
      return 0; // No payout
    }
  };

  const startSpin = async () => {
    setSpinning(true);
    setIsSpinning(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    spinReels();

    setIsSpinning(false);
    setSpinning(false);
  };

  // Set the bet amount to the maximum credits
  const handleMaxBet = () => {
    setBet(credits);
    showSnackbar("Max bet amount set successfully!", "info");
  };

  // Handler for Bet Confirmation & Alert
  const handleBetConfirm = (newBetAmount) => {
    setBet(newBetAmount);
    showSnackbar("Bet amount set successfully!", "info");
  };

  // Handler for opening the modal
  const handleInfoButtonClick = () => {
    setShowModal(true);
  };

  // Handler for closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handler for resetting the game after game over
  const handlePlayAgain = () => {
    setCredits(100);
    setShowGameOverModal(false);
  };

  return (
    <div className="mainContainer">
      <h1>Slot Machine Game</h1>
      <p className="credits">your credits: ${credits}</p>
      <div className="slot-machine">
        <div className="slotWrapper">
          {reels.map((symbol, index) => (
            <ul key={index} className={`reel ${spinning ? "spin" : ""}`}>
              <li>{symbol}</li>
            </ul>
          ))}
        </div>
        <img
          src="https://i.ibb.co/MfSZ71p/7670530.png"
          alt=""
          className="w-100"
        />

        {/* Spin Button | Machine Handler */}
        <button
          type="button"
          className={`slot-machine-btn ${spinning ? "clicked" : ""}`}
          onClick={startSpin}
        >
          <img
            src="https://i.ibb.co/0VTc2LZ/spin-btn.png"
            alt=""
            className="w-100"
          />
        </button>
      </div>

      {/* Buttons Section */}
      <div className="Buttons">
        <Button onClick={handleInfoButtonClick} disabled={spinning}>
          Info
        </Button>

        <InfoModal isOpen={showModal} onClose={handleCloseModal} />

        {/* Bet Modal */}
        <BetModal
          isOpen={showBetModal}
          onClose={() => setShowBetModal(false)}
          onBetConfirm={handleBetConfirm}
          maxCredits={credits}
        />

        <Button
          onClick={() => setShowBetModal(true)}
          disabled={isSpinning || credits <= 0}
        >
          Bet
        </Button>

        <Button onClick={handleMaxBet} disabled={isSpinning || credits <= 0}>
          Max Bet (${credits})
        </Button>
      </div>
      {/* Game Over Modal */}
      <GameOverModal isOpen={showGameOverModal} onPlayAgain={handlePlayAgain} />

      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          sx={{ color: "#fa9600", backgroundColor: "#ffff" }}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <footer>
      <p>
        © 2024 Slot Machine Game made by{" "}
        <a href="https://www.github.com/Draxsis">Mostafa Koolabadi (Draxsis)</a>
      </p>
    </footer>
    </div>
  );
};

export default SlotMachine;
