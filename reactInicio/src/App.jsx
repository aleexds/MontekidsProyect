
import Routing from './routes/Routing';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <Routing />
    </LanguageProvider>
  );
}