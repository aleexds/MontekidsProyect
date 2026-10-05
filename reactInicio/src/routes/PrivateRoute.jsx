import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export function PrivateRoute({ children }) {
  const { activeUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9fc] dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 flex justify-center items-center font-bold">
        Cargando...
      </div>
    );
  }

  if (!activeUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
