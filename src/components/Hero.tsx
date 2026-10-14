import React, { useEffect, useRef } from 'react';
import { Search, MapPin, Home, ArrowRight, Calendar } from 'lucide-react';
import { SearchFilterState } from '../types/property';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../utils/animations';

interface HeroProps {
  filters: SearchFilterState;
  onFilterChange: (filters: Partial<SearchFilterState>) => void;
  onSearchSubmit: () => void;
  onExploreClick: () => void;
  onBookSiteVisit: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  filters,
  onFilterChange,
  onSearchSubmit,
  onExploreClick,
  onBookSiteVisit,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const searchCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Hero Load Entrance Animation Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (taglineRef.current) {
        tl.from(taglineRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.7,
        });
      }

      if (headingRef.current) {
        tl.from(
          headingRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.85,
          },
          '-=0.4'
        );
      }

      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.75,
          },
          '-=0.5'
        );
      }

      if (buttonsRef.current) {
        tl.from(
          buttonsRef.current.children,
          {
            y: 20,
            opacity: 0,
            duration: 0.65,
            stagger: 0.12,
          },
          '-=0.4'
        );
      }

      if (searchCardRef.current) {
        tl.from(
          searchCardRef.current,
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
            boxShadow: '0 0 0 rgba(0,0,0,0)',
          },
          '-=0.4'
        );
      }

      // 2. Parallax and Subtle Zoom Effect on Hero Background during Scroll
      if (bgImageRef.current && heroRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 20,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <section ref={heroRef} className="relative bg-[#071426] text-white overflow-hidden">
      {/* High-Resolution Architectural Background Image with Zoom & Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=88"
          alt="Luxury Architecture in Faridabad"
          className="w-full h-full object-cover object-center scale-105 will-change-transform"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80';
          }}
        />
        {/* Subtle, elegant dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#071426]/75 backdrop-brightness-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071426] via-transparent to-[#071426]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 sm:pt-28 sm:pb-36">
        {/* Brand Tagline */}
        <div ref={taglineRef} className="text-center mb-6">
          <span className="inline-block text-[#C8A45D] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase pb-1 border-b border-[#C8A45D]/40">
            B.R. HOMES PVT. LTD. • SECTOR 37, FARIDABAD
          </span>
        </div>

        {/* Main Heading & Supporting Text */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1
            ref={headingRef}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.12]"
          >
            Find Your Place in a <span className="italic font-serif text-[#C8A45D]">Better Future.</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
          >
            Explore residential plots and property opportunities across Faridabad.
          </p>

          {/* Two Elegant Buttons */}
          <div
            ref={buttonsRef}
            className="pt-4 pb-8 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={onExploreClick}
              className="px-8 py-3.5 rounded-sm bg-[#C8A45D] hover:bg-[#b8934d] text-[#071426] font-semibold text-xs sm:text-sm uppercase tracking-widest transition-all duration-200 shadow-md cursor-pointer flex items-center gap-2 hover:-translate-y-0.5"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onBookSiteVisit}
              className="px-8 py-3.5 rounded-sm bg-transparent hover:bg-white/10 text-white font-semibold text-xs sm:text-sm uppercase tracking-widest border border-white/40 hover:border-white transition-all duration-200 cursor-pointer flex items-center gap-2 hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-[#C8A45D]" />
              <span>Book a Site Visit</span>
            </button>
          </div>
        </div>

        {/* Redesigned Clean, Elegant White Search Card */}
        <div
          ref={searchCardRef}
          className="max-w-4xl mx-auto mt-6 bg-white rounded-lg p-5 sm:p-7 shadow-2xl border border-gray-100 transition-shadow duration-300"
        >
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-gray-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 font-sans">
              Filter Available Listings
            </span>
            <span className="text-[11px] font-medium tracking-wide text-gray-600 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
              Demo Catalog Preview
            </span>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
            {/* Location Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 tracking-wide uppercase block">
                Location
              </label>
              <div className="relative">
                <select
                  value={filters.location}
                  onChange={(e) => onFilterChange({ location: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-sm border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-[#C8A45D] focus:ring-1 focus:ring-[#C8A45D] transition-colors"
                >
                  <option value="all">All Locations (Faridabad)</option>
                  <option value="Sector 37">Sector 37, Faridabad</option>
                  <option value="Sector 37 Vicinity">Sector 37 Vicinity</option>
                </select>
              </div>
            </div>

            {/* Property Type Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 tracking-wide uppercase block">
                Property Type
              </label>
              <select
                value={filters.category}
                onChange={(e) => onFilterChange({ category: e.target.value })}
                className="w-full h-11 px-3.5 rounded-sm border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-[#C8A45D] focus:ring-1 focus:ring-[#C8A45D] transition-colors"
              >
                <option value="all">All Property Types</option>
                <option value="plot">Residential Plots</option>
                <option value="house">Independent Houses / Villas</option>
                <option value="builder-floor">Luxury Builder Floors</option>
                <option value="apartment">Apartments / High-Rise</option>
              </select>
            </div>

            {/* Budget Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700 tracking-wide uppercase block">
                Sample Budget
              </label>
              <select
                value={filters.budgetRange}
                onChange={(e) => onFilterChange({ budgetRange: e.target.value })}
                className="w-full h-11 px-3.5 rounded-sm border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:border-[#C8A45D] focus:ring-1 focus:ring-[#C8A45D] transition-colors"
              >
                <option value="all">Any Sample Budget</option>
                <option value="under-1.5cr">Under ₹1.5 Cr</option>
                <option value="1.5cr-2.5cr">₹1.5 Cr – ₹2.5 Cr</option>
                <option value="above-2.5cr">Above ₹2.5 Cr</option>
              </select>
            </div>

            {/* Search Action */}
            <div>
              <button
                type="submit"
                className="w-full h-11 px-6 rounded-sm bg-[#071426] hover:bg-[#111827] text-white font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-200"
              >
                <Search className="w-3.5 h-3.5 text-[#C8A45D]" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
