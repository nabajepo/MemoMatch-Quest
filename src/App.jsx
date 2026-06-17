import { useState } from "react";
import "./App.css";

import StartScreen from "./components/StartScreen";
import GameBoard from "./components/GameBoard";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("beginner");
  const [selectedTheme, setSelectedTheme] = useState("animals");
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    if (playerName.trim() === "") {
      alert("Please enter your name.");
      return;
    }

    setGameStarted(true);
  };

  const returnToMenu = () => {
    setGameStarted(false);
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <StartScreen
          playerName={playerName}
          setPlayerName={setPlayerName}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          onStartGame={startGame}
        />
      ) : (
        <GameBoard
          playerName={playerName}
          selectedLevel={selectedLevel}
          selectedTheme={selectedTheme}
          onReturnToMenu={returnToMenu}
        />
      )}
    </div>
  );
}

export default App;