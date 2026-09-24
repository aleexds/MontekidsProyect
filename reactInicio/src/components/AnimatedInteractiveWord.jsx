

// Paleta cromática oficial e infantil para Montekids
const COLOR_PALETTE = [
  { base: 'text-[#00C2D1]', hover: 'hover:text-[#FFB703]' }, // Turquesa -> Amarillo
  { base: 'text-[#FFB703]', hover: 'hover:text-[#E63946]' }, // Amarillo -> Rojo/Rosa
  { base: 'text-[#E63946]', hover: 'hover:text-[#8338EC]' }, // Rojo -> Morado
  { base: 'text-[#8338EC]', hover: 'hover:text-[#3A86FF]' }, // Morado -> Azul
  { base: 'text-[#3A86FF]', hover: 'hover:text-[#06D6A0]' }, // Azul -> Verde
  { base: 'text-[#06D6A0]', hover: 'hover:text-[#FF006E]' }, // Verde -> Magenta
  { base: 'text-[#FF006E]', hover: 'hover:text-[#00C2D1]' }, // Magenta -> Turquesa
];

export default function AnimatedInteractiveWord({ word, extraClasses = '', startIndex = 0 }) {
  return (
    <span className={`inline-block ${extraClasses}`}>
      {word.split('').map((letter, index) => {
        // Seleccionamos un color secuencial de la paleta para cada letra
        const colorConfig = COLOR_PALETTE[(index + startIndex) % COLOR_PALETTE.length];

        return (
          <span
            key={index}
            className={`interactive-letter ${colorConfig.base} ${colorConfig.hover}`}
          >
            {letter}
          </span>
        );
      })}
    </span>
  );
}