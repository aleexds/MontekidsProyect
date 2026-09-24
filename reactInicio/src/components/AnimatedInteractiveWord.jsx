import { useRef } from 'react';

// Paleta de colores vivos para la selección aleatoria
const RANDOM_COLORS = [
  '#FF1744', '#FF5252', '#FF4081', '#E040FB', 
  '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', 
  '#1DE9B6', '#00E676', '#76FF03', '#FFEA00', 
  '#FFC400', '#FF9100', '#FF3D00'
];

// Función helper pura fuera del ciclo de vida del componente
const getRandomColor = () => {
  const index = Math.floor(Math.random() * RANDOM_COLORS.length);
  return RANDOM_COLORS[index];
};

export default function AnimatedInteractiveWord({ word, baseColorClass, extraClasses = '' }) {
  // Guardamos las referencias de los temporizadores para limpiar si se vuelve a pasar el mouse rápidamente
  const timeoutsRef = useRef({});

  const handleMouseEnter = (e, index) => {
    // Cancelamos el temporizador de retorno si estaba activo
    if (timeoutsRef.current[index]) {
      clearTimeout(timeoutsRef.current[index]);
    }

    // Llamamos a la función fuera del scope del render
    const randomColor = getRandomColor();
    e.currentTarget.style.color = randomColor;
  };

  const handleMouseLeave = (e, index) => {
    const target = e.currentTarget;

    // Mantenemos el color por 1.5 segundos antes de volver al original
    timeoutsRef.current[index] = setTimeout(() => {
      target.style.color = '';
    }, 1500);
  };

  return (
    <span className={`inline-block ${extraClasses}`}>
      {word.split('').map((letter, index) => (
        <span
          key={index}
          className={`interactive-letter ${baseColorClass}`}
          onMouseEnter={(e) => handleMouseEnter(e, index)}
          onMouseLeave={(e) => handleMouseLeave(e, index)}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}