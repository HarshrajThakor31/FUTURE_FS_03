import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-blue-400/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 glow-text mb-4">STAR WARS</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              A long time ago in a galaxy far, far away... Explore the complete saga and discover the stories that shaped the galaxy.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">SW</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-blue-400 font-bold mb-4">EXPLORE</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/databank" className="hover:text-blue-400 transition-colors">Characters</Link></li>
              <li><Link href="/vehicles" className="hover:text-blue-400 transition-colors">Vehicles</Link></li>
              <li><Link href="/timeline" className="hover:text-blue-400 transition-colors">Timeline</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-blue-400 font-bold mb-4">GALAXY</h4>
            <ul className="space-y-2 text-gray-400">
              <li><span className="hover:text-blue-400 transition-colors cursor-pointer">Jedi Order</span></li>
              <li><span className="hover:text-blue-400 transition-colors cursor-pointer">Sith Empire</span></li>
              <li><span className="hover:text-blue-400 transition-colors cursor-pointer">Rebel Alliance</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            &copy; 2024 Star Wars: Legacy Evolved. May the Force be with you, always.
          </p>
        </div>
      </div>
    </footer>
  );
}