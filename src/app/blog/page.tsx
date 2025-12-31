import React from 'react';
import Header from '@/components/landing/Header/Header';
import Footer from '@/components/landing/Footer/Footer';

const BlogPage = () => {
  const categories = [
    { label: 'Todos', value: 'all' },
    { label: 'Articulos', value: 'articles' },
    { label: 'Tutoriales', value: 'tutorials' },
    { label: 'Tutoriales en video', value: 'video' },
    { label: 'Historias de tiendas', value: 'stores' },
  ];

  const posts = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    title: `Titulo del articulo ${i + 1}`,
    excerpt:
      'Resumen breve del contenido para invitar a leer mas sobre temas de emprendimiento, productos y comunidad.',
    category: i % 3 === 0 ? 'articles' : i % 3 === 1 ? 'tutorials' : 'video',
    image: '/images/landing/about-hero.webp',
    date: '2025-01-01',
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="relative h-[220px] md:h-[260px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/landing/hero-bg.webp"
              alt="Blog"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <h1 className="text-white text-3xl md:text-4xl font-bold">Blog</h1>
              <p className="text-[#C5A028] mt-2">
                Comunidad, articulos y tutoriales
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-8">
              {categories.map((c) => (
                <button
                  key={c.value}
                  className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-[#72B059] hover:text-[#72B059] transition-colors"
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span className="uppercase tracking-wide">
                        {post.category}
                      </span>
                      <span>-</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-gray-800 font-semibold mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{post.excerpt}</p>
                    <div className="mt-4">
                      <button className="px-4 py-2 rounded-full bg-[#72B059] text-white text-sm hover:bg-[#5a9045] transition-colors">
                        Leer mas
                      </button>
                    </div>
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

export default BlogPage;
