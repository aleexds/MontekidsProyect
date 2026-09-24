

// Paleta de colores vibrantes para la interacción hover
const HOVER_COLORS = [
  'hover:text-[#00C2D1]', // Turquesa
  'hover:text-[#FFB703]', // Amarillo
  'hover:text-[#E63946]', // Rojo
  'hover:text-[#8338EC]', // Morado
  'hover:text-[#3A86FF]', // Azul
  'hover:text-[#06D6A0]', // Verde
  'hover:text-[#FF006E]', // Magenta
];

export default function AnimatedInteractiveWord({ word, extraClasses = '', startIndex = 0 }) {
  return (
    <span className={`inline-block ${extraClasses}`}>
      {word.split('').map((letter, index) => {
        // Seleccionamos un color hover diferente para cada letra
        const hoverColorClass = HOVER_COLORS[(index + startIndex) % HOVER_COLORS.length];

        return (
          <span
            key={index}
            className={`interactive-letter text-on-surface ${hoverColorClass}`}
          >
            {letter}
          </span>
        );
      })}
    </span>
  );
}