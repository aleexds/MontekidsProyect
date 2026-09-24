import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Philosophy from '../components/Philosophy';
import Programs from '../components/Programs';
import Testimonials from '../components/Testimonials';
import LocationMap from '../components/LocationMap';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
import AiDrawer from '../components/AiDrawer';

export default function Home() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div class="min-h-screen bg-background text-on-surface">
      <Navbar onOpenAi={() => setAiOpen(true)} />
      
      <main class="pt-20">
        <Hero />
        <Philosophy />
        <Programs />
        <Testimonials />
        <LocationMap />
        <CtaBanner />
      </main>

      <Footer />
      <AiDrawer isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}