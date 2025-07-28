'use client';

import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useState } from 'react';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [starshipData, setStarshipData] = useState([]);
  const [starshipLoading, setStarshipLoading] = useState(false);

  const starWarsStarships = [
    { name: "Millennium Falcon", class: "Light Freighter", manufacturer: "Corellian Engineering Corporation", length: "34.75 meters", crew: "2", description: "Han Solo's legendary ship, fastest hunk of junk in the galaxy that made the Kessel Run in less than 12 parsecs.", imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop&crop=center" },
    { name: "Imperial Star Destroyer", class: "Star Destroyer", manufacturer: "Kuat Drive Yards", length: "1,600 meters", crew: "37,085", description: "The backbone of the Imperial Navy, these massive warships projected Imperial power across the galaxy.", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center" },
    { name: "X-wing Starfighter", class: "Starfighter", manufacturer: "Incom Corporation", length: "12.5 meters", crew: "1 + astromech", description: "The Rebel Alliance's primary starfighter, known for its versatility and the distinctive S-foils that open in attack position.", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center" },
    { name: "TIE Fighter", class: "Starfighter", manufacturer: "Sienar Fleet Systems", length: "6.4 meters", crew: "1", description: "The Empire's mass-produced starfighter, fast and maneuverable but lacking shields and hyperdrive.", imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop&crop=top" },
    { name: "Death Star", class: "Space Station", manufacturer: "Imperial Department of Military Research", length: "120 km diameter", crew: "1,186,295", description: "The Empire's ultimate weapon, a moon-sized battle station capable of destroying entire planets.", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=top" },
    { name: "Slave I", class: "Patrol Craft", manufacturer: "Kuat Systems Engineering", length: "21.5 meters", crew: "1", description: "Boba Fett's personal starship, a heavily modified Firespray-class patrol craft with advanced weaponry.", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=top" },
    { name: "Naboo Royal Starship", class: "Royal Transport", manufacturer: "Theed Palace Space Vessel Engineering Corps", length: "76 meters", crew: "8", description: "Queen Amidala's elegant chrome-plated starship, representing Naboo's commitment to beauty and craftsmanship.", imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop&crop=bottom" },
    { name: "Jedi Starfighter", class: "Starfighter", manufacturer: "Kuat Systems Engineering", length: "8 meters", crew: "1 + astromech", description: "Sleek interceptor used by Jedi during the Clone Wars, designed for speed and agility in space combat.", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=bottom" },
    { name: "Super Star Destroyer", class: "Super Star Destroyer", manufacturer: "Kuat Drive Yards", length: "19,000 meters", crew: "279,144", description: "Darth Vader's flagship Executor, a massive dreadnought that served as the command ship for Death Squadron.", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=bottom" },
    { name: "Y-wing Starfighter", class: "Starfighter", manufacturer: "Koensayr Manufacturing", length: "16 meters", crew: "1-2", description: "A reliable workhorse of the Rebel fleet, used primarily for bombing runs and escort missions.", imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop&crop=left" },
    { name: "A-wing Starfighter", class: "Starfighter", manufacturer: "Alliance Underground Engineering", length: "9.6 meters", crew: "1", description: "The fastest starfighter in the Rebel fleet, designed for hit-and-run attacks and reconnaissance.", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=left" },
    { name: "B-wing Starfighter", class: "Heavy Assault Starfighter", manufacturer: "Slayn & Korpil", length: "16.9 meters", crew: "1", description: "A heavily armed assault starfighter designed to take on capital ships with its rotating cockpit design.", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=left" },
    { name: "Mon Calamari Cruiser", class: "Star Cruiser", manufacturer: "Mon Calamari Shipyards", length: "1,200 meters", crew: "5,402", description: "Converted from luxury liners, these ships became the backbone of the Rebel fleet's capital ship force.", imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop&crop=right" },
    { name: "Tantive IV", class: "Corvette", manufacturer: "Corellian Engineering Corporation", length: "150 meters", crew: "165", description: "Princess Leia's diplomatic vessel, the first ship seen in Star Wars carrying the stolen Death Star plans.", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=right" },
    { name: "Lambda Shuttle", class: "Shuttle", manufacturer: "Sienar Fleet Systems", length: "20 meters", crew: "6", description: "The Empire's standard personnel transport, featuring three wings and advanced shielding systems.", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=right" }
  ];

  const starWarsCharacters = [
    { name: "Luke Skywalker", affiliation: "Rebel Alliance, Jedi Order", description: "A Tatooine farmboy who became one of the greatest Jedi in galactic history, leading the Rebel Alliance to victory against the Empire.", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&crop=center" },
    { name: "Princess Leia Organa", affiliation: "Rebel Alliance, New Republic", description: "A fearless leader, diplomat, and warrior from Alderaan who dedicated her life to ending the tyranny of the Empire.", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=center" },
    { name: "Han Solo", affiliation: "Rebel Alliance", description: "A cynical smuggler from Corellia who, along with his co-pilot Chewbacca, became an unlikely hero in the fight for galactic freedom.", imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop&crop=center" },
    { name: "Darth Vader", affiliation: "Galactic Empire, Sith", description: "Once a heroic Jedi Knight named Anakin Skywalker, he was seduced by the dark side, becoming a feared Sith Lord and the Emperor's enforcer.", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&crop=top" },
    { name: "Yoda", affiliation: "Jedi Order", description: "The ancient and wise Grand Master of the Jedi Order. For centuries, he trained generations of Jedi and was unrivaled in his connection to the Force.", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=top" },
    { name: "Obi-Wan Kenobi", affiliation: "Jedi Order, Rebel Alliance", description: "A legendary Jedi Master who trained Anakin Skywalker and later Luke. Known for his wisdom, diplomacy, and mastery of lightsaber combat.", imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop&crop=top" },
    { name: "Chewbacca", affiliation: "Rebel Alliance", description: "A loyal Wookiee warrior and Han Solo's co-pilot. Known for his strength, mechanical skills, and unwavering loyalty to his friends.", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&crop=bottom" },
    { name: "Emperor Palpatine", affiliation: "Galactic Empire, Sith", description: "The Dark Lord of the Sith who manipulated the Republic's fall and ruled the galaxy with an iron fist as Emperor.", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=bottom" },
    { name: "Mace Windu", affiliation: "Jedi Order", description: "A senior member of the Jedi Council, known for his unique purple lightsaber and mastery of Form VII lightsaber combat.", imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop&crop=bottom" },
    { name: "Padmé Amidala", affiliation: "Galactic Republic", description: "Former Queen of Naboo and later Senator, who fought tirelessly for peace and democracy during the Clone Wars.", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&crop=left" },
    { name: "Qui-Gon Jinn", affiliation: "Jedi Order", description: "A maverick Jedi Master who discovered Anakin Skywalker and believed in following the will of the Force above all else.", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=left" },
    { name: "Darth Maul", affiliation: "Sith, Shadow Collective", description: "A Zabrak Sith Lord with a double-bladed lightsaber, driven by hatred and a thirst for revenge against the Jedi.", imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop&crop=left" },
    { name: "Count Dooku", affiliation: "Separatists, Sith", description: "A former Jedi Master who fell to the dark side and became Darth Tyranus, leading the Separatist movement during the Clone Wars.", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&crop=right" },
    { name: "General Grievous", affiliation: "Separatists", description: "A cyborg general who commanded the Separatist droid armies and collected lightsabers from fallen Jedi as trophies.", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=right" },
    { name: "Ahsoka Tano", affiliation: "Jedi Order, Rebel Alliance", description: "Anakin Skywalker's former Padawan who left the Jedi Order and later became a key figure in the early Rebellion.", imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop&crop=right" },
    { name: "Boba Fett", affiliation: "Bounty Hunters", description: "A legendary Mandalorian bounty hunter, clone of Jango Fett, known for his distinctive armor and ruthless efficiency.", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&crop=entropy" },
    { name: "Jango Fett", affiliation: "Separatists", description: "A Mandalorian bounty hunter who served as the genetic template for the Republic's clone army.", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=entropy" },
    { name: "Lando Calrissian", affiliation: "Rebel Alliance", description: "The smooth-talking administrator of Cloud City who became a general in the Rebel Alliance and helped destroy the second Death Star.", imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop&crop=entropy" },
    { name: "C-3PO", affiliation: "Rebel Alliance", description: "A protocol droid fluent in over six million forms of communication, loyal companion to the Skywalker family.", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&crop=faces" },
    { name: "R2-D2", affiliation: "Rebel Alliance", description: "A brave and resourceful astromech droid who played crucial roles in major galactic events alongside his companion C-3PO.", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=faces" },
    { name: "Rey", affiliation: "Resistance, Jedi Order", description: "A scavenger from Jakku who discovered her Force sensitivity and became the last hope for the Jedi Order.", imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop&crop=faces" },
    { name: "Kylo Ren", affiliation: "First Order, Knights of Ren", description: "Born Ben Solo, he was seduced by the dark side and became Supreme Leader of the First Order before his eventual redemption.", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&crop=focalpoint" },
    { name: "Finn", affiliation: "Resistance", description: "A former First Order stormtrooper who defected and became a hero of the Resistance, fighting for freedom across the galaxy.", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&crop=focalpoint" },
    { name: "Poe Dameron", affiliation: "Resistance", description: "The best pilot in the Resistance, known for his daring missions and leadership in the fight against the First Order.", imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop&crop=focalpoint" },
    { name: "Grand Admiral Thrawn", affiliation: "Galactic Empire", description: "A brilliant Chiss tactician who served the Empire with unmatched strategic genius and cultural analysis of his enemies.", imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop&crop=edges" }
  ];

  const uploadAllCharacters = async () => {
    setLoading(true);
    console.log('Starting character upload...');
    
    try {
      const testSnapshot = await getDocs(collection(db, "characters"));
      
      for (let i = 0; i < starWarsCharacters.length; i++) {
        const character = starWarsCharacters[i];
        console.log(`Uploading ${character.name}...`);
        
        try {
          await addDoc(collection(db, "characters"), character);
          console.log(`✓ Added ${character.name}`);
        } catch (charError) {
          console.error(`✗ Failed to add ${character.name}:`, charError);
        }
        
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      alert('Character upload complete!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error: ' + error.message);
    }
    
    setLoading(false);
  };

  const uploadAllStarships = async () => {
    setLoading(true);
    console.log('Starting starship upload...');
    
    try {
      const testSnapshot = await getDocs(collection(db, "starships"));
      
      let successCount = 0;
      let errorCount = 0;
      
      for (let i = 0; i < starWarsStarships.length; i++) {
        const starship = starWarsStarships[i];
        console.log(`[${i+1}/${starWarsStarships.length}] Uploading ${starship.name}...`);
        
        try {
          const docRef = await addDoc(collection(db, "starships"), starship);
          console.log(`✓ Added ${starship.name} with ID: ${docRef.id}`);
          successCount++;
        } catch (shipError) {
          console.error(`✗ Failed to add ${starship.name}:`, shipError);
          errorCount++;
        }
        
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      alert(`Starship upload complete! ${successCount} uploaded, ${errorCount} failed.`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error: ' + error.message);
    }
    
    setLoading(false);
  };



  const fetchApiData = async () => {
    setApiLoading(true);
    console.log('Starting API fetch...');
    
    try {
      console.log('Fetching from: https://akabab.github.io/starwars-api/api/all.json');
      
      const response = await fetch('https://akabab.github.io/starwars-api/api/all.json', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw data:', data);
      console.log('Data length:', data.length);
      
      if (Array.isArray(data) && data.length > 0) {
        setApiData(data);
        console.log(`Successfully fetched ${data.length} characters`);
        alert(`Successfully fetched ${data.length} characters from Star Wars API!`);
      } else {
        throw new Error('No data received or invalid format');
      }
      
    } catch (error) {
      console.error('API fetch error:', error);
      console.error('Error details:', error.message);
      
      // Fallback: Try alternative method
      try {
        console.log('Trying alternative fetch method...');
        const fallbackResponse = await fetch('https://cors-anywhere.herokuapp.com/https://akabab.github.io/starwars-api/api/all.json');
        const fallbackData = await fallbackResponse.json();
        
        if (Array.isArray(fallbackData) && fallbackData.length > 0) {
          setApiData(fallbackData);
          alert(`Fetched ${fallbackData.length} characters using fallback method!`);
        } else {
          throw new Error('Fallback also failed');
        }
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        alert('Error fetching API data. Please check console for details.');
      }
    }
    
    setApiLoading(false);
  };

  const fetchStarshipData = async () => {
    setStarshipLoading(true);
    console.log('Loading starship data...');
    
    try {
      // Fetch space images from Pexels API
      try {
        const pexelsResponse = await fetch('https://api.pexels.com/v1/search?query=space+spacecraft&per_page=10', {
          headers: {
            'Authorization': 'elIS5eey5UNEV8mTvLM4vvXogm5YY4dIFQk9dQXVm0rn54lIv3l9x9zl'
          }
        });
        
        const pexelsData = await pexelsResponse.json();
        const spaceImages = pexelsData.photos || [];
        
        // Use curated starship data with Pexels images
        const starships = [
          {
            name: "Millennium Falcon",
            model: "YT-1300 light freighter",
            manufacturer: "Corellian Engineering Corporation",
            length: "34.75 meters",
            crew: "2",
            description: "Han Solo's legendary ship, fastest hunk of junk in the galaxy that made the Kessel Run in less than 12 parsecs.",
            image: spaceImages[0]?.src?.medium || "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=600"
          },
          {
            name: "X-Wing Starfighter",
            model: "T-65B X-wing",
            manufacturer: "Incom Corporation",
            length: "12.5 meters",
            crew: "1 + astromech",
            description: "The Rebel Alliance's primary starfighter, known for its versatility and distinctive S-foils that open in attack position.",
            image: spaceImages[1]?.src?.medium || "https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=600"
          },
          {
            name: "TIE Fighter",
            model: "Twin Ion Engine Fighter",
            manufacturer: "Sienar Fleet Systems",
            length: "6.4 meters",
            crew: "1",
            description: "The Empire's mass-produced starfighter, fast and maneuverable but lacking shields and hyperdrive.",
            image: spaceImages[2]?.src?.medium || "https://images.pexels.com/photos/2166/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=600"
          },
          {
            name: "Imperial Star Destroyer",
            model: "Imperial I-class Star Destroyer",
            manufacturer: "Kuat Drive Yards",
            length: "1,600 meters",
            crew: "37,085",
            description: "The backbone of the Imperial Navy, these massive warships projected Imperial power across the galaxy.",
            image: spaceImages[3]?.src?.medium || "https://images.pexels.com/photos/73873/rocket-launch-rocket-take-off-nasa-73873.jpeg?auto=compress&cs=tinysrgb&w=600"
          },
          {
            name: "Slave I",
            model: "Firespray-31-class patrol craft",
            manufacturer: "Kuat Systems Engineering",
            length: "21.5 meters",
            crew: "1",
            description: "Boba Fett's personal starship, a heavily modified Firespray-class patrol craft with advanced weaponry.",
            image: spaceImages[4]?.src?.medium || "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=600"
          },
          {
            name: "Death Star",
            model: "DS-1 Orbital Battle Station",
            manufacturer: "Imperial Department of Military Research",
            length: "120 km diameter",
            crew: "1,186,295",
            description: "The Empire's ultimate weapon, a moon-sized battle station capable of destroying entire planets.",
            image: spaceImages[5]?.src?.medium || "https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=600"
          },
          {
            name: "Y-wing Starfighter",
            model: "BTL Y-wing",
            manufacturer: "Koensayr Manufacturing",
            length: "16 meters",
            crew: "1-2",
            description: "A reliable workhorse of the Rebel fleet, used primarily for bombing runs and escort missions.",
            image: spaceImages[6]?.src?.medium || "https://images.pexels.com/photos/2166/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=600"
          },
          {
            name: "A-wing Starfighter",
            model: "RZ-1 A-wing",
            manufacturer: "Alliance Underground Engineering",
            length: "9.6 meters",
            crew: "1",
            description: "The fastest starfighter in the Rebel fleet, designed for hit-and-run attacks and reconnaissance.",
            image: spaceImages[7]?.src?.medium || "https://images.pexels.com/photos/73873/rocket-launch-rocket-take-off-nasa-73873.jpeg?auto=compress&cs=tinysrgb&w=600"
          },
          {
            name: "Super Star Destroyer",
            model: "Executor-class Star Dreadnought",
            manufacturer: "Kuat Drive Yards",
            length: "19,000 meters",
            crew: "279,144",
            description: "Darth Vader's flagship Executor, a massive dreadnought that served as the command ship for Death Squadron.",
            image: spaceImages[8]?.src?.medium || "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=600"
          },
          {
            name: "Naboo Royal Starship",
            model: "J-type 327 Nubian",
            manufacturer: "Theed Palace Space Vessel Engineering Corps",
            length: "76 meters",
            crew: "8",
            description: "Queen Amidala's elegant chrome-plated starship, representing Naboo's commitment to beauty and craftsmanship.",
            image: spaceImages[9]?.src?.medium || "https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=600"
          }
        ];
        
        setStarshipData(starships);
        console.log(`Successfully loaded ${starships.length} starships with Pexels images`);
        alert(`Successfully loaded ${starships.length} starships with Pexels images!`);
        
      } catch (pexelsError) {
        console.error('Pexels API error:', pexelsError);
        // Fallback to basic space images
        const starships = [
          {
            name: "Millennium Falcon",
            model: "YT-1300 light freighter",
            manufacturer: "Corellian Engineering Corporation",
            length: "34.75 meters",
            crew: "2",
            description: "Han Solo's legendary ship, fastest hunk of junk in the galaxy that made the Kessel Run in less than 12 parsecs.",
            image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
        ];
        setStarshipData(starships);
        alert('Using fallback images due to API error');
      }
      

      
    } catch (error) {
      console.error('Starship data error:', error);
      alert('Error loading starship data: ' + error.message);
    }
    
    setStarshipLoading(false);
  };

  const uploadApiStarships = async () => {
    if (starshipData.length === 0) {
      alert('Please fetch starship data first!');
      return;
    }
    
    setLoading(true);
    console.log('Starting starship upload...');
    
    try {
      let successCount = 0;
      let errorCount = 0;
      
      for (let i = 0; i < starshipData.length; i++) {
        const ship = starshipData[i];
        const starship = {
          name: ship.name || 'Unknown Starship',
          class: ship.model || ship.class || 'Unknown Class',
          manufacturer: ship.manufacturer || 'Unknown Manufacturer',
          length: ship.length || 'Unknown',
          crew: ship.crew || 'Unknown',
          description: ship.description || `${ship.model || 'Starship'} manufactured by ${ship.manufacturer || 'unknown company'}`,
          imageUrl: ship.image || ship.imageUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop&crop=center'
        };
        
        try {
          // Upload to starships collection only
          await addDoc(collection(db, "starships"), starship);
          console.log(`✓ Added ${starship.name}`);
          successCount++;
        } catch (error) {
          console.error(`✗ Failed to add ${starship.name}:`, error);
          errorCount++;
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      alert(`Starship upload complete! ${successCount} uploaded to starships collection, ${errorCount} failed.`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error: ' + error.message);
    }
    
    setLoading(false);
  };

  const uploadApiCharacters = async () => {
    if (apiData.length === 0) {
      alert('Please fetch API data first!');
      return;
    }
    
    setLoading(true);
    console.log('Starting API characters upload...');
    
    try {
      let successCount = 0;
      let errorCount = 0;
      
      for (let i = 0; i < apiData.length; i++) {
        const char = apiData[i];
        const character = {
          name: char.name || 'Unknown',
          affiliation: char.affiliations && char.affiliations.length > 0 ? char.affiliations.join(', ') : 'Unknown',
          description: `${char.species || 'Unknown species'} from ${char.homeworld || 'Unknown world'}${char.height ? `. Height: ${char.height}cm` : ''}${char.mass ? `, Mass: ${char.mass}kg` : ''}`,
          imageUrl: char.image || 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop&crop=center',
          species: char.species || 'Unknown',
          gender: char.gender || 'Unknown',
          homeworld: char.homeworld || 'Unknown',
          height: char.height || 0,
          mass: char.mass || 0
        };
        
        try {
          // Clean the character object to remove any remaining undefined values
          const cleanCharacter = Object.fromEntries(
            Object.entries(character).filter(([_, value]) => value !== undefined && value !== null)
          );
          
          await addDoc(collection(db, "characters"), cleanCharacter);
          console.log(`✓ Added ${character.name}`);
          successCount++;
        } catch (error) {
          console.error(`✗ Failed to add ${character.name}:`, error);
          console.error('Character data:', character);
          errorCount++;
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      alert(`API characters upload complete! ${successCount} uploaded, ${errorCount} failed.`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error: ' + error.message);
    }
    
    setLoading(false);
  };

  const uploadAllData = async () => {
    setLoading(true);
    console.log('Starting complete data upload...');
    
    try {
      let totalSuccess = 0;
      let totalErrors = 0;
      
      // Upload Characters
      console.log('Uploading characters...');
      for (let i = 0; i < starWarsCharacters.length; i++) {
        const character = starWarsCharacters[i];
        try {
          await addDoc(collection(db, "characters"), character);
          totalSuccess++;
        } catch (error) {
          console.error(`Failed to add ${character.name}:`, error);
          totalErrors++;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Upload Starships
      console.log('Uploading starships...');
      for (let i = 0; i < starWarsStarships.length; i++) {
        const starship = starWarsStarships[i];
        try {
          await addDoc(collection(db, "starships"), starship);
          totalSuccess++;
        } catch (error) {
          console.error(`Failed to add ${starship.name}:`, error);
          totalErrors++;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      

      
      alert(`Complete upload finished! ${totalSuccess} items uploaded, ${totalErrors} failed.`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error: ' + error.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 glow-text">ADMIN PANEL</h1>
        
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">Star Wars API Integration</h2>
          <button
            onClick={() => window.open('https://akabab.github.io/starwars-api/api/all.json', '_blank')}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors mb-2"
          >
            🔗 Test API Link (Opens in New Tab)
          </button>
          
          <button
            onClick={fetchApiData}
            disabled={apiLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 mb-4"
          >
            {apiLoading ? 'Fetching...' : apiData.length > 0 ? `Fetch API Data (${apiData.length} loaded)` : 'Fetch API Data (0 loaded)'}
          </button>
          
          <button
            onClick={uploadApiCharacters}
            disabled={loading || apiData.length === 0}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 mb-4"
          >
            {loading ? 'Uploading...' : `Upload API Characters (${apiData.length})`}
          </button>
          
          <button
            onClick={fetchStarshipData}
            disabled={starshipLoading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 mb-4"
          >
            {starshipLoading ? 'Loading...' : `Load Starship Data (${starshipData.length} loaded)`}
          </button>
          
          <button
            onClick={uploadApiStarships}
            disabled={loading || starshipData.length === 0}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 mb-8"
          >
            {loading ? 'Uploading...' : `Upload API Starships (${starshipData.length})`}
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">Manual Upload</h2>
          <button
            onClick={uploadAllCharacters}
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 mb-4"
          >
            {loading ? 'Uploading...' : 'Upload Characters (25)'}
          </button>
          
          <button
            onClick={uploadAllStarships}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 mb-4"
          >
            {loading ? 'Uploading...' : 'Upload Starships (15)'}
          </button>
          

          
          <button
            onClick={uploadAllData}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 mb-4"
          >
            {loading ? 'Uploading...' : 'Upload All Data (55 items)'}
          </button>
          
          <button
            onClick={() => console.log('Firebase config:', { db })}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Test Firebase Connection
          </button>
          <p className="text-gray-400 text-sm text-center mt-4">
            Upload characters and starships to your Firebase database
          </p>
        </div>
      </div>
    </div>
  );
}