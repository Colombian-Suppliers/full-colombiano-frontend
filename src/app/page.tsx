'use client';

import Header from '@/components/landing/Header/Header';
import Hero from '@/components/landing/Hero/Hero';
import AboutUs from '@/components/landing/AboutUs/AboutUs';
import Banner from '@/components/landing/Banner/Banner';
import Benefits from '@/components/landing/Benefits/Benefits';
import CategoriesCarousel from '@/components/landing/CategoriesCarousel/CategoriesCarousel';
import RegisterSection from '@/components/landing/RegisterSection/RegisterSection';
import FAQ from '@/components/landing/FAQ/FAQ';
import NewsletterCTA from '@/components/landing/NewsletterCTA/NewsletterCTA';
import Footer from '@/components/landing/Footer/Footer';

export default function HomePage() {
  return (
    <>
      {/* Header de navegación */}
      <Header />

      <main className="min-h-screen">
        {/* Hero Section con imagen de fondo */}
        <Hero />

        {/* Sección About Us */}
        <AboutUs />

        {/* Banner decorativo */}
        <Banner>Inspirados en nuestras raíces, creados para el mundo.</Banner>

        <Benefits />

        <CategoriesCarousel />

        <RegisterSection />

        <FAQ />

        <NewsletterCTA />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

