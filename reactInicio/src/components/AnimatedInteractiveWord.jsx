

export default function AnimatedInteractiveWord({ word, colorClass, extraClasses = '' }) {
  return (
    <span className={`inline-block ${colorClass} ${extraClasses}`}>
      {word.split('').map((letter, index) => (
        <span
          key={index}
          className="interactive-letter"
        >
          {letter}
        </span>
      ))}
    </span>
  );
}