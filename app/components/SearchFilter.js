'use client';

import { useState } from 'react';

export default function SearchFilter({ characters, onFilter }) {
  const [search, setSearch] = useState('');
  const [affiliation, setAffiliation] = useState('');

  const affiliations = [...new Set(characters.map(char => char.affiliation))].filter(Boolean);

  const handleFilter = () => {
    const filtered = characters.filter(char => {
      const matchesSearch = char.name.toLowerCase().includes(search.toLowerCase()) ||
                           char.description?.toLowerCase().includes(search.toLowerCase());
      const matchesAffiliation = !affiliation || char.affiliation === affiliation;
      return matchesSearch && matchesAffiliation;
    });
    onFilter(filtered);
  };

  const handleReset = () => {
    setSearch('');
    setAffiliation('');
    onFilter(characters);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search characters..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setTimeout(handleFilter, 300);
            }}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
          />
        </div>
        <div>
          <select
            value={affiliation}
            onChange={(e) => {
              setAffiliation(e.target.value);
              setTimeout(handleFilter, 100);
            }}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
          >
            <option value="">All Affiliations</option>
            {affiliations.map(aff => (
              <option key={aff} value={aff}>{aff}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={handleReset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}