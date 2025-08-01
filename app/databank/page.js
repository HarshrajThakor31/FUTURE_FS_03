'use client';

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import SearchFilter from "@/app/components/SearchFilter";
import { CharacterCardSkeleton } from "@/app/components/LoadingSkeleton";
import { useState, useEffect } from 'react';

export default function DatabankPage() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoadedStatus, setImageLoadedStatus] = useState({});
  const [failedImages, setFailedImages] = useState(new Set());

  useEffect(() => {
    const getCharacters = async () => {

      
      try {
        const querySnapshot = await getDocs(collection(db, "characters"));
        const chars = [];
        querySnapshot.forEach((doc) => {
          chars.push({ id: doc.id, ...doc.data() });
        });
        
        // Filter characters with real images and remove duplicates
        const filteredChars = chars.filter(char => 
          char.imageUrl && 
          !char.imageUrl.includes('unsplash.com') && 
          !char.imageUrl.includes('placeholder') &&
          !char.imageUrl.includes('picsum.photos') &&
          !char.imageUrl.includes('via.placeholder')
        );
        
        // Remove duplicates by name
        const uniqueChars = filteredChars.filter((char, index, self) => 
          index === self.findIndex(c => c.name === char.name)
        );
        
        const finalChars = uniqueChars.length > 0 ? uniqueChars : [];
        setCharacters(finalChars);
        setFilteredCharacters(finalChars);
        
        // Initialize image loading status
        const initialStatus = {};
        finalChars.forEach(char => {
          initialStatus[char.id] = false;
        });
        setImageLoadedStatus(initialStatus);
      } catch (error) {
        console.error("Firebase error:", error);
        setCharacters([]);
        setFilteredCharacters([]);
        setImageLoadedStatus({});
      }
      setLoading(false);
    };
    getCharacters();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 glow-text">GALACTIC DATABANK</h1>
            <p className="text-xl opacity-80">Loading characters...</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => <CharacterCardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 glow-text">GALACTIC DATABANK</h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">An archive of the galaxy&apos;s most notable inhabitants and their legendary stories.</p>
        </div>
        <SearchFilter characters={characters} onFilter={setFilteredCharacters} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredCharacters
            .filter(char => !failedImages.has(char.id))
            .sort((a, b) => {
              const aLoaded = imageLoadedStatus[a.id] || false;
              const bLoaded = imageLoadedStatus[b.id] || false;
              if (aLoaded && !bLoaded) return -1;
              if (!aLoaded && bLoaded) return 1;
              return 0;
            })
            .map((char) => (
            <Link href={`/databank/${char.id}`} key={char.id} className="group">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden group hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105">
                <div className="relative h-64 sm:h-72 md:h-80">
                  <img
                    src={char.imageUrl}
                    alt={char.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    onLoad={() => {
                      setImageLoadedStatus(prev => ({ ...prev, [char.id]: true }));
                    }}
                    onError={(e) => {
                      setFailedImages(prev => new Set([...prev, char.id]));
                      setImageLoadedStatus(prev => ({ ...prev, [char.id]: false }));
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-lg md:text-xl font-bold mb-1 text-white">{char.name}</h2>
                    <p className="text-cyan-400 text-xs md:text-sm font-medium">{char.affiliation}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}