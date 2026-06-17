import { levels, cardThemes } from "../data/cardThemes";

function StartScreen({
  playerName,
  setPlayerName,
  selectedLevel,
  setSelectedLevel,
  selectedTheme,
  setSelectedTheme,
  onStartGame,
}) {
  return (
    <section className="start-screen">
      <div className="start-card">
        <h1>🧠 MemoMatch Quest ✨</h1>
        <p className="intro-text">
          Train your memory by finding all matching card pairs.
        </p>

        <div className="form-group">
          <label>Player name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Difficulty level</label>
          <select
            value={selectedLevel}
            onChange={(event) => setSelectedLevel(event.target.value)}
          >
            {Object.entries(levels).map(([key, level]) => (
              <option key={key} value={key}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Card theme</label>
          <select
            value={selectedTheme}
            onChange={(event) => setSelectedTheme(event.target.value)}
          >
            {Object.entries(cardThemes).map(([key, theme]) => (
              <option key={key} value={key}>
                {theme.label}
              </option>
            ))}
          </select>
        </div>

        <button className="primary-button" onClick={onStartGame}>
          Start Game
        </button>
      </div>
    </section>
  );
}

export default StartScreen;