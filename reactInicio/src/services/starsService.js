const API = 'http://localhost:3000';

/**
 * Suma estrellas al usuario en db.json y registra la partida en gameHistory.
 *
 * @param {string} userId       - ID del usuario autenticado
 * @param {number} currentStars - Estrellas actuales del usuario
 * @param {string} gameId       - Identificador del juego (ej: "granja-patitos")
 * @param {string} gameName     - Nombre legible del juego (ej: "La Granja de Patitos")
 * @param {number} amount       - Cantidad de estrellas a sumar
 * @param {string} [gameIcon]   - Emoji/ícono del juego (ej: "🐥") — opcional
 * @returns {Promise<{newTotal: number}>}
 */
export async function addStarsToUser(userId, currentStars, gameId, gameName, amount, gameIcon = '', errorsCount = 0) {
  const newTotal = (currentStars ?? 0) + amount;

  // 1. PATCH al usuario para actualizar el total de estrellas
  await fetch(`${API}/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estrellas: newTotal }),
  });

  // 2. POST al historial de juegos
  await fetch(`${API}/gameHistory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      gameId,
      gameName,
      gameIcon,
      starsEarned: amount,
      errorsCount,
      flawless: errorsCount === 0,
      totalAfter: newTotal,
      playedAt: new Date().toISOString(),
    }),
  });

  return { newTotal };
}
