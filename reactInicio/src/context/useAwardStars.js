import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { addStarsToUser } from '../services/starsService';

/**
 * Hook que expone `awardStars(gameId, gameName, amount)`.
 * Lee el usuario activo del contexto de auth, llama al servicio
 * y actualiza el activeUser en el contexto con el nuevo total.
 *
 * Si no hay sesión iniciada, no hace nada (silencioso).
 */
export function useAwardStars() {
  const { activeUser, setActiveUser } = useAuth();

  const awardStars = useCallback(async (gameId, gameName, amount) => {
    if (!activeUser?.id) return; // Sin sesión, no hacer nada

    try {
      const { newTotal } = await addStarsToUser(
        activeUser.id,
        activeUser.estrellas ?? 0,
        gameId,
        gameName,
        amount
      );

      // Actualizar el contexto y localStorage con el nuevo total
      const updatedUser = { ...activeUser, estrellas: newTotal };
      setActiveUser(updatedUser);
      localStorage.setItem('activeUser', JSON.stringify(updatedUser));
    } catch (err) {
      console.warn('No se pudieron guardar las estrellas:', err);
    }
  }, [activeUser, setActiveUser]);

  return { awardStars, estrellas: activeUser?.estrellas ?? 0 };
}
