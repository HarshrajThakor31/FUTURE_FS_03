const timelineEvents = [
  { year: "25,000 BBY", title: "Dawn of the Jedi", description: "The first Force-sensitive beings discover the Force on Tython." },
  { year: "5,000 BBY", title: "Great Hyperspace War", description: "The ancient Sith Empire clashes with the Galactic Republic." },
  { year: "1,000 BBY", title: "Rule of Two", description: "Darth Bane establishes the Sith Rule of Two after the destruction of the Brotherhood of Darkness." },
  { year: "32 BBY", title: "The Phantom Menace", description: "Young Anakin Skywalker is discovered on Tatooine. The Trade Federation blockades Naboo." },
  { year: "22 BBY", title: "Attack of the Clones", description: "The Clone Wars begin as the Republic faces the Separatist Alliance." },
  { year: "19 BBY", title: "Revenge of the Sith", description: "Anakin becomes Darth Vader. The Jedi Order is destroyed. The Empire rises." },
  { year: "0 BBY", title: "A New Hope", description: "The Death Star plans are stolen. Luke Skywalker begins his journey." },
  { year: "3 ABY", title: "The Empire Strikes Back", description: "The Empire strikes back at the Rebel Alliance. Luke learns the truth about his father." },
  { year: "4 ABY", title: "Return of the Jedi", description: "The second Death Star is destroyed. Anakin Skywalker is redeemed." },
  { year: "34 ABY", title: "The Force Awakens", description: "The First Order rises from the ashes of the Empire. Rey discovers her Force abilities." }
];

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 glow-text">TIMELINE</h1>
          <p className="text-xl opacity-80">The complete chronological saga</p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-400 h-full"></div>
          
          {timelineEvents.map((event, index) => (
            <div key={index} className={`relative flex items-center mb-12 ${
              index % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}>
              <div className={`w-5/12 ${
                index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
              }`}>
                <div className="bg-gray-800 rounded-lg p-6 card-hover">
                  <div className="text-blue-400 font-bold text-sm mb-2">{event.year}</div>
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              </div>
              
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full border-4 border-gray-900"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}