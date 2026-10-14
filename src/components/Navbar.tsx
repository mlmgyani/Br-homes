import React, { useState, useEffect } from 'react';
import { Menu, X, Bookmark } from 'lucide-react';

interface NavbarProps {
  savedCount: number;
  onOpenSaved: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenEnquire: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedCount,
  onOpenSaved,
  activeSection,
  onNavigate,
  onOpenEnquire,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#071426]/98 backdrop-blur-md shadow-xl py-3 border-b border-[#C8A45D]/20'
          : 'bg-[#071426] py-4 sm:py-5 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Refined Brand Logo */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3.5 text-left group focus:outline-none cursor-pointer"
          >
            {/* Elegant Monogram */}
            <div className="w-10 h-10 rounded-sm border border-[#C8A45D] bg-[#071426] flex items-center justify-center transition-all duration-300 group-hover:border-white shadow-sm">
              <span className="font-serif text-lg tracking-wider text-[#C8A45D] font-bold">
                BR
              </span>
            </div>
            <div>
              <div className="font-serif text-base sm:text-lg tracking-[0.12em] font-bold text-white uppercase">
                B.R. HOMES <span className="text-xs font-sans tracking-[0.2em] text-[#C8A45D] font-medium">PVT. LTD.</span>
              </div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-gray-400 font-sans">
                Sector 37, Faridabad
              </div>
            </div>
          </button>

          {/* Clean Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm tracking-wide transition-colors cursor-pointer relative py-1 ${
                  activeSection === link.id
                    ? 'text-[#C8A45D] font-medium'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C8A45D]" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action: Saved Properties + Prominent "Enquire Now" Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenSaved}
              className="relative p-2 text-gray-300 hover:text-[#C8A45D] transition-colors cursor-pointer"
              title="Saved Properties"
              aria-label="View Saved Properties"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8A45D] text-[#071426] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenEnquire}
              className="px-6 py-2.5 rounded-sm bg-[#C8A45D] hover:bg-[#b8934d] text-[#071426] text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onOpenSaved}
              className="relative p-2 text-gray-300 hover:text-[#C8A45D] cursor-pointer"
              aria-label="Saved Properties"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8A45D] text-[#071426] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 top-[73px] bg-black/60 backdrop-blur-xs z-40 md:hidden"
          />
          <div className="relative z-50 md:hidden bg-[#071426] border-t border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
            <div className="space-y-3 pb-4 border-b border-white/10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full text-left py-2.5 text-base tracking-wide transition-colors cursor-pointer ${
                    activeSection === link.id
                      ? 'text-[#C8A45D] font-semibold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquire();
                }}
                className="w-full py-3.5 rounded-sm bg-[#C8A45D] text-[#071426] text-xs font-semibold uppercase tracking-widest text-center shadow cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
