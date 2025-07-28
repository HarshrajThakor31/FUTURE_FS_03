'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'characters'));
        const charactersData = [];
        querySnapshot.forEach((doc) => {
          charactersData.push({ id: doc.id, ...doc.data() });
        });
        setCharacters(charactersData);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">⚡</div>
          <p className="text-2xl text-amber-400 font-bold">Accessing Jedi Archives...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-black text-white">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
          GALACTIC CHARACTERS
        </h1>
        <p className="text-xl text-slate-300 text-center mb-16">
          Heroes, villains, and legends from across the galaxy
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {characters.map((character) => (
            <div key={character.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden group hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="relative h-64 sm:h-72 md:h-80">
                <img 
                  src={character.imageUrl} 
                  alt={character.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=center';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="p-3 md:p-4">
                <h2 className="text-lg md:text-xl font-bold mb-1 text-white">{character.name}</h2>
                <p className="text-xs md:text-sm text-cyan-400 mb-2">{character.affiliation}</p>
                <p className="text-xs md:text-sm text-slate-300 line-clamp-2">{character.description}</p>
              </div>
            </div>
          ))}
        </div>

        {characters.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold text-amber-400 mb-2">No Characters Found</h3>
            <p className="text-slate-400">The archives appear to be empty. Try uploading some data first.</p>
            <Link href="/admin" className="inline-block mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
              Go to Admin Panel
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}