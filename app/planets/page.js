'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PlanetsPage() {
  const [loading, setLoading] = useState(true);

  const planets = [
    {
      id: 1,
      name: "Tatooine",
      region: "Outer Rim Territories",
      climate: "Arid desert",
      terrain: "Desert, canyons, mesas",
      description: "A harsh desert world orbiting twin suns in the galaxy's Outer Rim, Tatooine is a lawless place ruled by Hutt gangsters.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "Coruscant",
      region: "Core Worlds",
      climate: "Temperate",
      terrain: "Cityscape, urban",
      description: "The entire planet is one big city, and is the seat of galactic government and the location of the Jedi Temple.",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "Hoth",
      region: "Outer Rim Territories",
      climate: "Frozen",
      terrain: "Tundra, ice caves, mountain ranges",
      description: "A remote ice planet that served as the location for the Rebel Alliance's Echo Base.",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "Endor",
      region: "Outer Rim Territories",
      climate: "Temperate",
      terrain: "Forest, mountains",
      description: "A forest moon orbiting the gas giant Endor, home to the primitive but brave Ewoks.",
      imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 5,
      name: "Naboo",
      region: "Mid Rim",
      climate: "Temperate",
      terrain: "Grassy hills, swamps, forests, mountains",
      description: "A peaceful world known for its beautiful cities and the skilled pilots and warriors it produces.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=top"
    },
    {
      id: 6,
      name: "Dagobah",
      region: "Outer Rim Territories",
      climate: "Murky",
      terrain: "Swamp, jungles",
      description: "A remote swamp world where Jedi Master Yoda lived in exile during the dark times of the Empire.",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=top"
    },
    {
      id: 7,
      name: "Mustafar",
      region: "Outer Rim Territories",
      climate: "Hot",
      terrain: "Volcanoes, lava rivers, mining facilities",
      description: "A volcanic world where Anakin Skywalker was transformed into Darth Vader.",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=top"
    },
    {
      id: 8,
      name: "Kamino",
      region: "Wild Space",
      climate: "Temperate",
      terrain: "Ocean, cloning facilities",
      description: "An ocean world beyond the Outer Rim, home to the Kaminoans who created the clone army.",
      imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop&crop=top"
    },
    {
      id: 9,
      name: "Jakku",
      region: "Western Reaches",
      climate: "Arid",
      terrain: "Desert",
      description: "A remote desert world in the Western Reaches, site of the final battle between the New Republic and Empire.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=bottom"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🌍</div>
          <p className="text-2xl text-amber-400 font-bold">Scanning Galactic Systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-black text-white">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
          GALACTIC WORLDS
        </h1>
        <p className="text-xl text-slate-300 text-center mb-16">
          Explore the diverse planets across the galaxy
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {planets.map((planet) => (
            <div key={planet.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden group hover:border-emerald-500/50 transition-all duration-300 transform hover:scale-105">
              <img 
                src={planet.imageUrl} 
                alt={planet.name}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center';
                }}
              />
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-white">{planet.name}</h2>
                <p className="text-sm text-emerald-400 mb-2">{planet.region}</p>
                <div className="text-xs text-slate-400 mb-3">
                  <p>Climate: {planet.climate}</p>
                  <p>Terrain: {planet.terrain}</p>
                </div>
                <p className="text-sm text-slate-300 line-clamp-3">{planet.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}