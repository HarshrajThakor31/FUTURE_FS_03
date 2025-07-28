'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const linkClass = (path) => 
    `hover:text-blue-400 transition-all duration-300 pb-1 border-b-2 font-medium ${
      pathname === path ? 'border-blue-400 text-blue-400 glow-text' : 'border-transparent'
    }`;

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/databank', label: 'DATABANK' },
    { href: '/timeline', label: 'TIMELINE' }
  ];

  return (
    <header className="bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-blue-400/20">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl md:text-3xl font-bold text-blue-400 tracking-widest glow-text">
            STAR WARS
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-blue-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-blue-400/20">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={`${linkClass(item.href)} text-center py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}