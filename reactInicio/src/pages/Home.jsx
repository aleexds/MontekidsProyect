import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LocationMap from '../components/LocationMap';
import AiDrawer from '../components/AiDrawer';

export default function Home() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div class="min-h-screen bg-background text-on-surface">
      <Navbar onOpenAi={() => setAiOpen(true)} />
      
      <main class="pt-20">
        <Hero />
        <LocationMap />
      </main>

      <AiDrawer isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}