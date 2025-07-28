'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function StarshipsPage() {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStarships = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'starships'));
        const starshipsData = [];
        querySnapshot.forEach((doc) => {
          starshipsData.push({ id: doc.id, ...doc.data() });
        });
        setStarships(starshipsData);
      } catch (error) {
        console.error('Error fetching starships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStarships();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🚀</div>
          <p className="text-2xl text-amber-400 font-bold">Scanning Starship Registry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-black text-white">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
          GALACTIC STARSHIPS
        </h1>
        <p className="text-xl text-slate-300 text-center mb-16">
          Legendary vessels that shaped galactic history
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {starships.map((starship) => (
            <div key={starship.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden group hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="relative h-48 sm:h-56 md:h-64 bg-slate-700">
                <img 
                  src={starship.imageUrl || 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop&crop=center'} 
                  alt={starship.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h2 className="text-lg md:text-xl font-bold mb-1 text-white">{starship.name}</h2>
                  <p className="text-xs md:text-sm text-orange-400">{starship.class}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-slate-400 mb-3 space-y-1">
                  <p><span className="text-slate-300">Manufacturer:</span> {starship.manufacturer}</p>
                  <p><span className="text-slate-300">Length:</span> {starship.length}</p>
                  <p><span className="text-slate-300">Crew:</span> {starship.crew}</p>
                </div>
                <p className="text-xs md:text-sm text-slate-300 line-clamp-2">{starship.description}</p>
              </div>
            </div>
          ))}
        </div>

        {starships.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛸</div>
            <h3 className="text-2xl font-bold text-amber-400 mb-2">No Starships Found</h3>
            <p className="text-slate-400">The starship registry appears to be empty. Try uploading some data first.</p>
            <Link href="/admin" className="inline-block mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
              Go to Admin Panel
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}