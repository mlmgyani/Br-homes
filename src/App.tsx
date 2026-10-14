/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Building2, 
  Search, 
  RotateCcw,
  CalendarCheck,
  AlertCircle
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailsModal } from './components/PropertyDetailsModal';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { LocationAdvantage } from './components/LocationAdvantage';
import { CalculatorsSection } from './components/CalculatorsSection';
import { ContactSection } from './components/ContactSection';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { SavedPropertiesDrawer } from './components/SavedPropertiesDrawer';
import { Footer } from './components/Footer';
import { SAMPLE_PROPERTIES } from './data/properties';
import { Property, SearchFilterState } from './types/property';
import { gsap, ScrollTrigger, prefersReducedMotion, refreshScrollTriggers } from './utils/animations';

const INITIAL_FILTERS: SearchFilterState = {
  keyword: '',
  category: 'all',
  location: 'all',
  budgetRange: 'all',
  sizeRange: 'all',
  sortBy: 'recommended',
};

export default function App() {
  const [filters, setFilters] = useState<SearchFilterState>(INITIAL_FILTERS);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [scheduleVisitProperty, setScheduleVisitProperty] = useState<Property | null>(null);
  const [isScheduleVisitOpen, setIsScheduleVisitOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedServiceForEnquiry, setSelectedServiceForEnquiry] = useState<string>('');

  // Refs for Scroll Animations
  const propertiesSectionRef = useRef<HTMLElement>(null);
  const propertiesHeaderRef = useRef<HTMLDivElement>(null);
  const propertiesNoticeRef = useRef<HTMLDivElement>(null);
  const propertiesFilterBarRef = useRef<HTMLDivElement>(null);
  const propertiesGridRef = useRef<HTMLDivElement>(null);

  // Saved properties persisted in localStorage
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('brhomes_saved_props');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('brhomes_saved_props', JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds]);

  // Recalculate ScrollTrigger on full page load
  useEffect(() => {
    const handleLoad = () => {
      refreshScrollTriggers();
    };
    if (document.readyState === 'complete') {
      refreshScrollTriggers();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const clearAllSaved = () => {
    setSavedIds([]);
  };

  const handleFilterChange = (updated: Partial<SearchFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return SAMPLE_PROPERTIES.filter((prop) => {
      // Keyword
      if (filters.keyword.trim()) {
        const kw = filters.keyword.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(kw);
        const matchesLoc = prop.location.toLowerCase().includes(kw) || prop.subLocation.toLowerCase().includes(kw);
        const matchesDesc = prop.description.toLowerCase().includes(kw);
        if (!matchesTitle && !matchesLoc && !matchesDesc) return false;
      }

      // Category
      if (filters.category !== 'all' && prop.category !== filters.category) {
        return false;
      }

      // Location
      if (filters.location !== 'all' && !prop.location.includes(filters.location)) {
        return false;
      }

      // Budget
      if (filters.budgetRange !== 'all') {
        if (filters.budgetRange === 'under-1.5cr' && prop.price >= 15000000) return false;
        if (
          filters.budgetRange === '1.5cr-2.5cr' &&
          (prop.price < 15000000 || prop.price > 25000000)
        )
          return false;
        if (filters.budgetRange === 'above-2.5cr' && prop.price <= 25000000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'size-desc') return (b.sqftEquivalent || 0) - (a.sqftEquivalent || 0);
      return 0; // recommended order
    });
  }, [filters]);

  // Scroll Reveal Animations for Properties Header & Notice
  useEffect(() => {
    if (prefersReducedMotion() || !propertiesSectionRef.current) return;

    const ctx = gsap.context(() => {
      if (propertiesHeaderRef.current) {
        gsap.fromTo(
          propertiesHeaderRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: propertiesHeaderRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (propertiesNoticeRef.current) {
        gsap.fromTo(
          propertiesNoticeRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: propertiesNoticeRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (propertiesFilterBarRef.current) {
        gsap.fromTo(
          propertiesFilterBarRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: propertiesFilterBarRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, propertiesSectionRef);

    return () => ctx.revert();
  }, []);

  // Staggered Scroll Reveal for Property Cards (Re-triggers smoothly when filter changes)
  useEffect(() => {
    if (prefersReducedMotion() || !propertiesGridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = propertiesGridRef.current?.querySelectorAll('.property-card-item');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            y: 45,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: propertiesGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
      ScrollTrigger.refresh();
    }, propertiesGridRef);

    return () => ctx.revert();
  }, [filteredProperties]);

  const savedPropertiesList = useMemo(() => {
    return SAMPLE_PROPERTIES.filter((p) => savedIds.includes(p.id));
  }, [savedIds]);

  const openScheduleVisit = (property: Property | null = null) => {
    setScheduleVisitProperty(property);
    setIsScheduleVisitOpen(true);
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForEnquiry(serviceName);
    scrollToSection('contact');
  };

  const categoryTabs: { label: string; value: string }[] = [
    { label: 'All Properties', value: 'all' },
    { label: 'Residential Plots', value: 'plot' },
    { label: 'Independent Houses / Villas', value: 'house' },
    { label: 'Luxury Builder Floors', value: 'builder-floor' },
    { label: 'Apartments', value: 'apartment' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col text-[#111827] font-sans selection:bg-[#C8A45D]/30 selection:text-[#071426] w-full overflow-x-hidden">
      {/* Sleek, Professional Navigation Bar */}
      <Navbar
        savedCount={savedIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenEnquire={() => scrollToSection('contact')}
      />

      <main className="flex-1 w-full">
        {/* Hero Section with Zoom & Parallax */}
        <div id="hero">
          <Hero
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearchSubmit={() => scrollToSection('properties')}
            onExploreClick={() => scrollToSection('properties')}
            onBookSiteVisit={() => openScheduleVisit(null)}
          />
        </div>

        {/* Featured Properties Section */}
        <section
          ref={propertiesSectionRef}
          id="properties"
          className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Section Header */}
          <div
            ref={propertiesHeaderRef}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-semibold block mb-2">
                Curated Opportunities
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#071426] tracking-tight">
                Featured Properties
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-3 max-w-2xl font-light">
                Explore residential plots, independent villas, and luxury builder floors in Sector 37 and Greater Faridabad.
              </p>
            </div>

            <button
              onClick={() => openScheduleVisit(null)}
              className="px-6 py-3 rounded-sm bg-[#071426] hover:bg-[#111827] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer shadow-sm hover:-translate-y-0.5"
            >
              <CalendarCheck className="w-4 h-4 text-[#C8A45D]" />
              <span>Book a Site Visit</span>
            </button>
          </div>

          {/* Transparent Demo Notice */}
          <div
            ref={propertiesNoticeRef}
            className="mb-10 bg-white border-l-2 border-[#C8A45D] p-4 text-xs sm:text-sm text-gray-700 shadow-sm leading-relaxed"
          >
            <strong className="text-gray-900">Clearly Labelled Demo Listings & Sample Prices: </strong>
            All properties displayed below are fictional demo listings with sample prices created for website demonstration. They do not represent currently available inventory. Please connect with our team for active consultations in Sector 37, Faridabad.
          </div>

          {/* Category Tabs & Quick Filter Controls */}
          <div ref={propertiesFilterBarRef} className="space-y-4 mb-10">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleFilterChange({ category: tab.value })}
                  className={`px-5 py-2.5 rounded-sm text-xs font-medium tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                    filters.category === tab.value
                      ? 'bg-[#071426] text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Keyword Search & Sort Controls Bar */}
            <div className="bg-white p-4 rounded-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={filters.keyword}
                  onChange={(e) => handleFilterChange({ keyword: e.target.value })}
                  placeholder="Search by plot size, road, block..."
                  className="w-full h-10 pl-9 pr-3 rounded-sm border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-xs font-light text-gray-500">
                  Showing <strong>{filteredProperties.length}</strong> demo listings
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 hidden sm:inline">Sort:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                    className="h-10 px-3 rounded-sm border border-gray-200 text-xs text-gray-700 bg-white focus:outline-none focus:border-[#C8A45D]"
                  >
                    <option value="recommended">Featured / Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="size-desc">Plot Size: Largest First</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Grid with Staggered Scroll Reveal */}
          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-sm p-12 text-center border border-gray-200 space-y-4 my-8">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#071426]">
                No Properties Found
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto font-light">
                No demo properties match your selected criteria. Reset filters to view all available sample listings.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-sm bg-[#071426] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#111827] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            <div
              ref={propertiesGridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8"
            >
              {filteredProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  isSaved={savedIds.includes(prop.id)}
                  onToggleSave={toggleSave}
                  onViewDetails={setSelectedProperty}
                  onOpenScheduleVisit={openScheduleVisit}
                />
              ))}
            </div>
          )}
        </section>

        {/* About The Company Section */}
        <AboutSection onContactClick={() => scrollToSection('contact')} />

        {/* Services & Why Choose Us Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Sector 37 Advantage Section */}
        <LocationAdvantage />

        {/* Advisory Calculators (EMI & Haryana Land Unit Converter) */}
        <CalculatorsSection />

        {/* Site Visit and Enquiry Booking Section */}
        <ContactSection prefilledService={selectedServiceForEnquiry} />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Property Details Modal */}
      <PropertyDetailsModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isSaved={selectedProperty ? savedIds.includes(selectedProperty.id) : false}
        onToggleSave={toggleSave}
        onOpenScheduleVisit={openScheduleVisit}
      />

      {/* Site Visit Booking Modal */}
      <ScheduleVisitModal
        property={scheduleVisitProperty}
        isOpen={isScheduleVisitOpen}
        onClose={() => setIsScheduleVisitOpen(false)}
      />

      {/* Saved Properties Drawer */}
      <SavedPropertiesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedProperties={savedPropertiesList}
        onRemoveSaved={toggleSave}
        onViewDetails={setSelectedProperty}
        onClearAll={clearAllSaved}
      />
    </div>
  );
}
