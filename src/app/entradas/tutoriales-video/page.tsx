import React from 'react';
import Header from '@/components/landing/Header/Header';
import Footer from '@/components/landing/Footer/Footer';

const TutorialsVideoPage = () => {
  const videos = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: `Tutorial en video ${i + 1}`,
    thumb: '/images/landing/about-hero.webp',
    duration: '04:20',
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[220px] md:h-[260px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/landing/hero-bg-2.webp"
              alt="Tutoriales en video"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <h1 className="text-white text-3xl md:text-4xl font-bold">
                Tutoriales en video
              </h1>
              <p className="text-[#C5A028] mt-2">Aprende paso a paso</p>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((v) => (
                <article
                  key={v.id}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="relative aspect-video bg-gray-100">
                    <img
                      src={v.thumb}
                      alt={v.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                        <div className="w-0 h-0 border-l-8 border-t-6 border-b-6 border-l-[#72B059] border-t-transparent border-b-transparent ml-1" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 text-xs bg-black/60 text-white px-2 py-1 rounded">
                      {v.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-800 font-semibold">{v.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TutorialsVideoPage;
