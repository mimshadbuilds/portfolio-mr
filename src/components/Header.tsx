import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white sticky top-1 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#" className="text-xl font-bold">Mimshad</a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#home" className="hover:text-blue-400">Home</a>
          <a href="#projects" className="hover:text-blue-400">Projects</a>
          <a href="#blogs" className="hover:text-blue-400">Blogs</a>
          <a href="#about" className="hover:text-blue-400">About Me</a>
          <a href="/resume.pdf" className="bg-blue-50 px-4 py-2 rounded hover:bg-blue-500 hover:text-white" style={{color: 'black'}}>Resume</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4">
          <a href="#home" className="block py-2 hover:text-blue-400">Home</a>
          <a href="#projects" className="block py-2 hover:text-blue-400">Projects</a>
          <a href="#blogs" className="block py-2 hover:text-blue-400">Blogs</a>
          <a href="#about" className="block py-2 hover:text-blue-400">About Me</a>
          <a href="/resume.pdf" className="bg-blue block py-2 text-blue-800">Resume</a>
        </div>
      )}
    </nav>
  );
}