import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { notFound } from "next/navigation";
import OptimizedImage from "@/app/components/OptimizedImage";

async function getCharacterById(id) {
  const docRef = doc(db, "characters", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
}

export default async function CharacterDetailPage({ params }) {
  const character = await getCharacterById(params.id);
  if (!character) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6 py-16">
        <Link href="/databank" className="inline-flex items-center text-blue-400 hover:text-white transition-colors mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Databank
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative">
            <div className="aspect-[3/4] relative overflow-hidden rounded-2xl">
              <OptimizedImage
                src={character.imageUrl}
                alt={character.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-2">{character.affiliation}</p>
              <h1 className="text-4xl md:text-6xl font-bold glow-text mb-4">{character.name}</h1>
              <div className="w-32 h-1 bg-blue-400 rounded-full mb-6"></div>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed opacity-90">{character.description}</p>
            </div>
            
            {character.species && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-blue-400 font-bold mb-2">Species</h3>
                <p>{character.species}</p>
              </div>
            )}
            
            {character.homeworld && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-blue-400 font-bold mb-2">Homeworld</h3>
                <p>{character.homeworld}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}