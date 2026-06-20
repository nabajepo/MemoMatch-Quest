import { useEffect, useState } from "react";
import Card from "./Card";
import ResultScreen from "./ResultScreen";
import { cardThemes, levels } from "../data/cardThemes";

const matchSound = new Audio("/sounds/ding.mp3");
const victorySound = new Audio("/sounds/success.mp3");

function GameBoard({ playerName, selectedLevel, selectedTheme, onReturnToMenu }) {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [victoryPlayed, setVictoryPlayed] = useState(false);

  const totalPairs = levels[selectedLevel].pairs;
  const matchedPairs = cards.filter((card) => card.isMatched).length / 2;
  const hasWon = cards.length > 0 && matchedPairs === totalPairs;

  useEffect(() => {
    createCards();
  }, []);

  useEffect(() => {
    if (hasWon) return;

    const timer = setInterval(() => {
      setSeconds((previousSeconds) => previousSeconds + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [hasWon]);

  useEffect(() => {
    if (hasWon && !victoryPlayed) {
      victorySound.currentTime = 0;
      victorySound.play();
      setVictoryPlayed(true);
    }
  }, [hasWon, victoryPlayed]);

  const createCards = () => {
    const level = levels[selectedLevel];
    const theme = cardThemes[selectedTheme];

    const selectedIcons = theme.icons.slice(0, level.pairs);

    const cardPairs = selectedIcons.flatMap((icon, index) => [
      {
        id: `${index}-a`,
        pairId: index,
        icon,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: `${index}-b`,
        pairId: index,
        icon,
        isFlipped: false,
        isMatched: false,
      },
    ]);

    setCards(cardPairs.sort(() => Math.random() - 0.5));
    setSelectedCards([]);
    setMoves(0);
    setSeconds(0);
    setVictoryPlayed(false);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const calculateScore = () => {
    const score = 1000 - moves * 5 - seconds;
    return score < 0 ? 0 : score;
  };

  const handleCardClick = (clickedCard) => {
    if (selectedCards.length === 2 || hasWon) return;

    setCards((currentCards) =>
      currentCards.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
    );

    const newSelectedCards = [...selectedCards, clickedCard];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      setMoves((previousMoves) => previousMoves + 1);

      const [firstCard, secondCard] = newSelectedCards;

      if (firstCard.pairId === secondCard.pairId) {
        matchSound.currentTime = 0;
        matchSound.play();

        setCards((currentCards) =>
          currentCards.map((card) =>
            card.pairId === firstCard.pairId
              ? { ...card, isMatched: true }
              : card
          )
        );

        setSelectedCards([]);
      } else {
        setTimeout(() => {
          setCards((currentCards) =>
            currentCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );

          setSelectedCards([]);
        }, 800);
      }
    }
  };

  if (hasWon) {
    return (
      <ResultScreen
        playerName={playerName}
        moves={moves}
        time={formatTime(seconds)}
        matchedPairs={matchedPairs}
        totalPairs={totalPairs}
        selectedLevelLabel={levels[selectedLevel].label}
        selectedThemeLabel={cardThemes[selectedTheme].label}
        score={calculateScore()}
        onPlayAgain={createCards}
        onReturnToMenu={onReturnToMenu}
      />
    );
  }

  return (
    <section className="game-screen">
      <h1 className="game-title">🧠 MemoMatch Quest ✨</h1>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-icon">👤</span>
          <div>
            <p>Player</p>
            <strong>{playerName}</strong>
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-icon">👣</span>
          <div>
            <p>Moves</p>
            <strong>{moves}</strong>
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-icon">✅</span>
          <div>
            <p>Matches</p>
            <strong>
              {matchedPairs} / {totalPairs}
            </strong>
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-icon">⏱️</span>
          <div>
            <p>Time</p>
            <strong>{formatTime(seconds)}</strong>
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-icon">🎯</span>
          <div>
            <p>Level</p>
            <strong>{levels[selectedLevel].label}</strong>
          </div>
        </div>

        <div className="stat-item">
          <span className="stat-icon">🎨</span>
          <div>
            <p>Theme</p>
            <strong>{cardThemes[selectedTheme].label}</strong>
          </div>
        </div>
      </div>

      <div className="board-wrapper">
        <div
          className="game-board"
          style={{
            gridTemplateColumns: `repeat(${levels[selectedLevel].columns}, 88px)`,
          }}
        >
          {cards.map((card) => (
            <Card key={card.id} card={card} onCardClick={handleCardClick} />
          ))}
        </div>
      </div>

      <p className="help-text">💡 Find all matching pairs to win!</p>
    </section>
  );
}

export default GameBoard;