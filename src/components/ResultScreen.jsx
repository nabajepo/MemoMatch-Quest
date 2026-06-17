function ResultScreen({
  playerName,
  moves,
  time,
  matchedPairs,
  totalPairs,
  selectedLevelLabel,
  selectedThemeLabel,
  score,
  onPlayAgain,
  onReturnToMenu,
}) {
  return (
    <section className="result-screen">
      <div className="result-card">
        <h1>🧠 MemoMatch Quest ✨</h1>

        <h2>🏆 Congratulations, {playerName}!</h2>

        <p className="result-message">
          You found all matching pairs and completed the memory challenge.
        </p>

        <div className="result-stats">
          <div>
            <span>⏱️</span>
            <p>Time</p>
            <strong>{time}</strong>
          </div>

          <div>
            <span>👣</span>
            <p>Moves</p>
            <strong>{moves}</strong>
          </div>

          <div>
            <span>✅</span>
            <p>Matches</p>
            <strong>
              {matchedPairs} / {totalPairs}
            </strong>
          </div>

          <div>
            <span>🎯</span>
            <p>Level</p>
            <strong>{selectedLevelLabel}</strong>
          </div>

          <div>
            <span>🎨</span>
            <p>Theme</p>
            <strong>{selectedThemeLabel}</strong>
          </div>

          <div>
            <span>⭐</span>
            <p>Score</p>
            <strong>{score}</strong>
          </div>
        </div>

        <div className="result-actions">
          <button className="primary-button" onClick={onPlayAgain}>
            Play Again
          </button>

          <button className="secondary-button" onClick={onReturnToMenu}>
            Return to Menu
          </button>
        </div>
      </div>
    </section>
  );
}

export default ResultScreen;