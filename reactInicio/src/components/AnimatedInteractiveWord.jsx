

export default function AnimatedInteractiveWord({ word, baseColorClass, hoverColorClass, extraClasses = '' }) {
  return (
    <span className={`inline-block ${baseColorClass} ${extraClasses}`}>
      {word.split('').map((letter, index) => (
        <span
          key={index}
          className={`interactive-letter ${hoverColorClass}`}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}