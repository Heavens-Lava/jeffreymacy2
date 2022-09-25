import "./index.scss";

const AnimatedLetters = ({ letterClass, strArray, idx }) => {
  return (
    // is span so it can inline a div
    <span>
      {/* map through the letters */}
      {strArray.map((char, i) => (
        <span key={char + i} className={`${letterClass} _${i + idx}`}>
          {char}
        </span>
      ))}
    </span>
  );
};

export default AnimatedLetters;
