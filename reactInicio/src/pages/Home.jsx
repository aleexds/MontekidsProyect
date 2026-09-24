import Hero from '../components/Hero';
import Philosophy from '../components/Philosophy';
import Programs from '../components/Programs';
import Testimonials from '../components/Testimonials';
import LocationMap from '../components/LocationMap';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ScrollReveal from '../components/ScrollReveal';

export default function Home() {
  return (
    <main>

        {/* 0. Navbar: Siempre visible*/}
        <Navbar />

      {/* 1. Hero: Rebote inicial de una vez */}
      <Hero />

      {/* 2. Filosofía: Oculto hasta hacer scroll -> Desliza hacia arriba suave */}
      <ScrollReveal delay={100}>
        <Philosophy />
      </ScrollReveal>

      {/* 3. Aulas / Programas: Oculto hasta hacer scroll -> Desliza hacia arriba suave */}
      <ScrollReveal delay={500}>
        <Programs />
      </ScrollReveal>

      {/* 4. Testimonios: Oculto hasta hacer scroll -> Desliza hacia arriba suave */}
      <ScrollReveal delay={100}>
        <Testimonials />
      </ScrollReveal>

      {/* 5. Ubicación: Oculto hasta hacer scroll -> Desliza hacia arriba suave */}
      <ScrollReveal delay={100}>
        <LocationMap />
      </ScrollReveal>

      {/* 5. Ubicación: Oculto hasta hacer scroll -> Desliza hacia arriba suave */}
      <ScrollReveal delay={100}>
        <CtaBanner />
      </ScrollReveal>


        <Footer />

    </main>
  );
}