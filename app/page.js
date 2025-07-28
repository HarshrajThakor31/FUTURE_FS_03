'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const featuredContent = [
    {
      title: "THE MANDALORIAN",
      subtitle: "Season 3 Now Streaming",
      description: "Follow Din Djarin and Grogu as they navigate the galaxy's outer rim, encountering enemies and allies in their journey.",
      image: "/images/the mandalorian and grogu.png",
      cta: "Watch Now"
    },
    {
      title: "AHSOKA",
      subtitle: "The Force Awakens Again",
      description: "Former Jedi Knight Ahsoka Tano investigates an emerging threat to a vulnerable galaxy.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=top",
      cta: "Stream Series"
    },
    {
      title: "STAR WARS OUTLAWS",
      subtitle: "First Look at Gameplay",
      description: "Experience the first-ever open world Star Wars game. Explore distinct planets across the galaxy.",
      image: "/images/outlaws.png",
      cta: "Explore Game"
    }
  ];

  const latestNews = [
    {
      title: "The Mandalorian & Grogu Coming to Theaters",
      excerpt: "The beloved duo returns in an epic big-screen adventure set in the Star Wars universe.",
      category: "FILM ANNOUNCEMENT",
      date: "2 days ago",
      image: "/images/the mandalorian and grogu.png"
    },
    {
      title: "First Look at Star Wars Outlaws Gameplay",
      excerpt: "Discover the criminal underworld in this groundbreaking open-world Star Wars experience.",
      category: "GAMING",
      date: "1 week ago",
      image: "/images/outlaws.png"
    },
    {
      title: "The Acolyte Series Explores the Dark Side",
      excerpt: "Journey into the mysterious world of the Sith in this thrilling new series set in the High Republic era.",
      category: "SERIES",
      date: "2 weeks ago",
      image: "/images/acolyte.png"
    }
  ];

  const galaxyEras = [
    {
      title: "The High Republic",
      description: "The golden age of the Jedi Order",
      image: "/The High Republic The golden age of the Jedi Order.png"
    },
    {
      title: "Age of Rebellion",
      description: "The fight against Imperial tyranny",
      image: "/images/age of rebelian.png"
    },
    {
      title: "Age of Resistance",
      description: "The rise of the First Order",
      image: "/images/age of resistense.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredContent.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Hero Section with Custom Star Wars Background */}
      <section 
        className="relative h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(0, 0, 0, 0.7)), url('/images/backgrounds/image.png')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/90 z-10"></div>
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-amber-400/5 to-transparent z-10"></div>
        <div className="relative z-20 flex items-center justify-center h-full text-center p-4">
          <div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-widest mb-6 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-2xl">
              A GALAXY OF STORIES
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-200 leading-relaxed mb-12">
              Explore the definitive source for Star Wars, from the High Republic to the First Order.
            </p>
            <Link href="/databank" className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
              ENTER THE DATABANK
            </Link>
          </div>
        </div>
      </section>

      {/* Latest HoloNet News */}
      <section className="py-20 bg-gradient-to-b from-black/20 to-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
            Latest HoloNet News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((news, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden group hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105">
                <div className="relative h-48 bg-slate-700 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="absolute inset-0 w-full h-full object-contain bg-slate-800 group-hover:opacity-80 transition-opacity"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x300/1e293b/00bcd4?text=' + encodeURIComponent(news.title);
                    }}
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-amber-400 font-semibold mb-2">{news.category}</p>
                  <h3 className="text-xl font-bold mb-3 text-white">{news.title}</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">{news.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">{news.date}</span>
                    <Link href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm">
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicle */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
            Featured Vehicle
          </h2>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 border border-slate-700/50">
            <div>
              <p className="text-cyan-400 font-semibold text-lg mb-2">YT-1300 Light Freighter</p>
              <h3 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Millennium Falcon
              </h3>
              <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                Heavily modified by its various owners, the Millennium Falcon is a legendary starship despite its humble origins. It has played a role in some of the greatest victories of the Rebel Alliance and the New Republic.
              </p>
              <Link href="/starships" className="inline-block bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                View Schematics
              </Link>
            </div>
            <div>
              <img 
                src="/images/starships/millennium falcon.png" 
                alt="Millennium Falcon" 
                className="w-full rounded-xl shadow-2xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400/1e293b/f59e0b?text=Millennium+Falcon';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* This Day in Star Wars History */}
      <section className="py-20 bg-gradient-to-b from-black/20 to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
            This Day in Star Wars History
          </h2>
          <p className="text-3xl text-amber-400 mb-8 font-semibold">December 20, 2024</p>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <img 
                src="/images/This Day in Star Wars History December 20, 2024.png" 
                alt="This Day in Star Wars History - December 20, 2024" 
                className="rounded-xl shadow-2xl mx-auto max-w-2xl w-full h-auto object-contain"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600/1e293b/f59e0b?text=Holiday+Special';
                }}
              />
            </div>
            <h3 className="text-3xl font-bold mb-6 text-amber-400">The Star Wars Holiday Special</h3>
            <p className="text-xl text-slate-200 leading-relaxed mb-6">
              The infamous &quot;Star Wars Holiday Special&quot; aired for the first and only time on CBS, introducing audiences to the bounty hunter Boba Fett in an animated segment that would become legendary among fans.
            </p>
            <p className="text-lg text-slate-300">
              Despite being widely criticized, this television special holds a unique place in Star Wars history as the first appearance of Boba Fett and the introduction of Chewbacca&apos;s family on Kashyyyk.
            </p>
          </div>
        </div>
      </section>

      {/* Explore the Eras */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
            Explore the Eras
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galaxyEras.map((era, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 border border-slate-700/50 hover:border-amber-500/50">
                <div className="relative h-80 bg-slate-800">
                  <img 
                    src={era.image} 
                    alt={era.title} 
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x400/1e293b/10b981?text=' + encodeURIComponent(era.title);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-amber-400">{era.title}</h3>
                  <p className="text-slate-200 text-lg">{era.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galactic Databank */}
      <section className="py-20 bg-gradient-to-b from-black/20 to-slate-950">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
            Galactic Databank
          </h2>
          <p className="text-xl text-slate-300 text-center mb-16">
            An archive of the galaxy's most notable inhabitants.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/characters" className="group">
              <div className="bg-gradient-to-br from-blue-900/50 to-cyan-800/50 backdrop-blur-sm rounded-xl p-8 text-center transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl border border-blue-500/20">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-2xl font-bold mb-4 text-cyan-300">CHARACTERS</h3>
                <p className="text-slate-300">Meet heroes, villains, and everyone in between from across the galaxy</p>
              </div>
            </Link>
            <Link href="/starships" className="group">
              <div className="bg-gradient-to-br from-red-900/50 to-orange-800/50 backdrop-blur-sm rounded-xl p-8 text-center transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl border border-red-500/20">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-4 text-orange-300">STARSHIPS</h3>
                <p className="text-slate-300">Discover the most iconic vessels that shaped galactic history</p>
              </div>
            </Link>
            <Link href="/planets" className="group">
              <div className="bg-gradient-to-br from-green-900/50 to-emerald-800/50 backdrop-blur-sm rounded-xl p-8 text-center transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl border border-green-500/20">
                <div className="text-6xl mb-4">🌍</div>
                <h3 className="text-2xl font-bold mb-4 text-emerald-300">PLANETS</h3>
                <p className="text-slate-300">Journey to worlds across the known galaxy and beyond</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Movies & Series Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
            MOVIES & SERIES
          </h2>
          
          {/* Original Trilogy */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center text-blue-400">Original Trilogy</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300">
                <h4 className="text-xl font-bold mb-2 text-amber-400">A New Hope (1977)</h4>
                <p className="text-slate-300 mb-4">The Death Star plans are stolen. Luke Skywalker begins his journey to become a Jedi and joins the Rebel Alliance.</p>
                <div className="text-sm text-slate-400">
                  <p>Director: George Lucas</p>
                  <p>Runtime: 121 minutes</p>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300">
                <h4 className="text-xl font-bold mb-2 text-amber-400">The Empire Strikes Back (1980)</h4>
                <p className="text-slate-300 mb-4">The Empire strikes back at the Rebel Alliance. Luke learns the shocking truth about his father.</p>
                <div className="text-sm text-slate-400">
                  <p>Director: Irvin Kershner</p>
                  <p>Runtime: 124 minutes</p>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-300">
                <h4 className="text-xl font-bold mb-2 text-amber-400">Return of the Jedi (1983)</h4>
                <p className="text-slate-300 mb-4">The second Death Star is destroyed. Anakin Skywalker is redeemed and the Empire falls.</p>
                <div className="text-sm text-slate-400">
                  <p>Director: Richard Marquand</p>
                  <p>Runtime: 131 minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Prequel Trilogy */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center text-red-400">Prequel Trilogy</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-red-500/50 transition-all duration-300">
                <h4 className="text-xl font-bold mb-2 text-red-400">The Phantom Menace (1999)</h4>
                <p className="text-slate-300 mb-4">Young Anakin Skywalker is discovered on Tatooine. The Trade Federation blockades Naboo.</p>
                <div className="text-sm text-slate-400">
                  <p>Director: George Lucas</p>
                  <p>Runtime: 136 minutes</p>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-red-500/50 transition-all duration-300">
                <h4 className="text-xl font-bold mb-2 text-red-400">Attack of the Clones (2002)</h4>
                <p className="text-slate-300 mb-4">The Clone Wars begin as the Republic faces the Separatist Alliance. Anakin and Padmé fall in love.</p>
                <div className="text-sm text-slate-400">
                  <p>Director: George Lucas</p>
                  <p>Runtime: 142 minutes</p>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-red-500/50 transition-all duration-300">
                <h4 className="text-xl font-bold mb-2 text-red-400">Revenge of the Sith (2005)</h4>
                <p className="text-slate-300 mb-4">Anakin becomes Darth Vader. The Jedi Order is destroyed and the Empire rises to power.</p>
                <div className="text-sm text-slate-400">
                  <p>Director: George Lucas</p>
                  <p>Runtime: 140 minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sequel Trilogy */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center text-green-400">Sequel Trilogy</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-green-500/50 transition-all duration-300">
                <h4 className="text-xl font-bold mb-2 text-green-400">The Force Awakens (2015)</h4>
                <p className="text-slate-300 mb-4">The First Order rises from the Empire's ashes. Rey discovers her Force abilities and the Resistance fights back.</p>
                <div className="text-sm text-slate-400">
                  <p>Director: J.J. Abrams</p>
                  <p>Runtime: 138 minutes</p>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-green-500/50 transition-all duration-300">
                <h4 className="text-xl font-bold mb-2 text-green-400">The Last Jedi (2017)</h4>
                <p className="text-slate-300 mb-4">Rey trains with Luke Skywalker. The Resistance faces its darkest hour as the First Order closes in.</p>
                <div className="text-sm text-slate-400">
                  <p>Director: Rian Johnson</p>
                  <p>Runtime: 152 minutes</p>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-green-500/50 transition-all duration-300">
                <h4 className="text-xl font-bold mb-2 text-green-400">The Rise of Skywalker (2019)</h4>
                <p className="text-slate-300 mb-4">The final confrontation between Rey and Emperor Palpatine determines the fate of the galaxy.</p>
                <div className="text-sm text-slate-400">
                  <p>Director: J.J. Abrams</p>
                  <p>Runtime: 142 minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Disney+ Series */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center text-purple-400">Disney+ Series</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                <h4 className="text-lg font-bold mb-2 text-purple-400">The Mandalorian</h4>
                <p className="text-slate-300 text-sm mb-3">A lone bounty hunter protects a mysterious child in the outer rim territories.</p>
                <div className="text-xs text-slate-400">
                  <p>Seasons: 3</p>
                  <p>Episodes: 24</p>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                <h4 className="text-lg font-bold mb-2 text-purple-400">The Book of Boba Fett</h4>
                <p className="text-slate-300 text-sm mb-3">The legendary bounty hunter claims Jabba the Hutt's former territory on Tatooine.</p>
                <div className="text-xs text-slate-400">
                  <p>Seasons: 1</p>
                  <p>Episodes: 7</p>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                <h4 className="text-lg font-bold mb-2 text-purple-400">Obi-Wan Kenobi</h4>
                <p className="text-slate-300 text-sm mb-3">The Jedi Master watches over Luke Skywalker while confronting his past.</p>
                <div className="text-xs text-slate-400">
                  <p>Seasons: 1</p>
                  <p>Episodes: 6</p>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                <h4 className="text-lg font-bold mb-2 text-purple-400">Andor</h4>
                <p className="text-slate-300 text-sm mb-3">The story of the Rebel Alliance's formation and Cassian Andor's journey.</p>
                <div className="text-xs text-slate-400">
                  <p>Seasons: 2</p>
                  <p>Episodes: 12+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}