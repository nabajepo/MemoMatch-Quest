function Card({ card, onCardClick }) {
  return (
    <button
      className={`memory-card ${card.isFlipped || card.isMatched ? "flipped" : ""}`}
      onClick={() => onCardClick(card)}
      disabled={card.isFlipped || card.isMatched}
    >
      <span className="card-front">{card.icon}</span>
      <span className="card-back">?</span>
    </button>
  );
}

export default Card;