import React, { useEffect, useRef } from 'react';
import { 
  MapPin, 
  Train, 
  Trees, 
  Compass, 
  ShieldCheck, 
  TrendingUp
} from 'lucide-react';
import { FARIDABAD_SECTOR_37_ADVANTAGES } from '../data/properties';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../utils/animations';

export const LocationAdvantage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (matrixRef.current) {
        gsap.fromTo(
          matrixRef.current,
          { y: 35, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: matrixRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    MapPin: <MapPin className="w-5 h-5 text-[#C8A45D]" />,
    Train: <Train className="w-5 h-5 text-[#C8A45D]" />,
    Compass: <Compass className="w-5 h-5 text-[#C8A45D]" />,
    Trees: <Trees className="w-5 h-5 text-[#C8A45D]" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#C8A45D]" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-[#C8A45D]" />,
  };

  return (
    <section ref={sectionRef} id="location-advantage" className="py-20 sm:py-28 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-semibold block mb-2">
              Strategic Geography
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#071426] tracking-tight">
              Why Sector 37, Faridabad
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-4 leading-relaxed font-light">
              Positioned at the Delhi-Faridabad gateway, Sector 37 offers seamless urban connectivity to South Delhi alongside spacious, established plotted infrastructure.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-sm bg-[#F7F7F5] border border-gray-200 text-xs text-gray-700">
              <span className="font-semibold text-[#071426]">Pincode:</span> 121003
            </div>
            <div className="px-4 py-2 rounded-sm bg-[#F7F7F5] border border-gray-200 text-xs text-gray-700">
              <span className="font-semibold text-[#071426]">District:</span> Faridabad, Haryana
            </div>
          </div>
        </div>

        {/* Advantage Cards */}
        <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FARIDABAD_SECTOR_37_ADVANTAGES.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-sm bg-[#F7F7F5] border border-gray-200 hover:border-[#C8A45D] transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-sm bg-[#071426] flex items-center justify-center mb-5 transition-colors">
                {iconMap[item.icon] || <MapPin className="w-5 h-5 text-[#C8A45D]" />}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#071426] group-hover:text-[#071426] transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-2.5 font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Connectivity Distance Matrix in Dark Midnight Navy */}
        <div ref={matrixRef} className="mt-14 bg-[#071426] text-white rounded-sm p-7 sm:p-10 border border-[#C8A45D]/20 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A45D] font-semibold block mb-1">
              Commute Benchmark
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Landmark Transit Times
            </h3>
            <p className="text-xs text-gray-400 mt-2 font-light">
              Direct arterial access to South Delhi and Central Faridabad
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-white/5 p-5 rounded-sm border border-white/10">
              <div className="text-[#C8A45D] font-serif text-2xl font-bold">5 - 8 Mins</div>
              <span className="text-xs text-gray-200 font-medium block mt-1">Badarpur Border (Delhi)</span>
              <span className="text-[10px] text-gray-400 font-light block">Direct NH-44 Mathura Road</span>
            </div>

            <div className="bg-white/5 p-5 rounded-sm border border-white/10">
              <div className="text-[#C8A45D] font-serif text-2xl font-bold">4 Mins</div>
              <span className="text-xs text-gray-200 font-medium block mt-1">Sarai & NHPC Metro</span>
              <span className="text-[10px] text-gray-400 font-light block">Violet Line direct to Delhi</span>
            </div>

            <div className="bg-white/5 p-5 rounded-sm border border-white/10">
              <div className="text-[#C8A45D] font-serif text-2xl font-bold">12 Mins</div>
              <span className="text-xs text-gray-200 font-medium block mt-1">Surajkund Green Belt</span>
              <span className="text-[10px] text-gray-400 font-light block">Aravalli Ridges</span>
            </div>

            <div className="bg-white/5 p-5 rounded-sm border border-white/10">
              <div className="text-[#C8A45D] font-serif text-2xl font-bold">15 Mins</div>
              <span className="text-xs text-gray-200 font-medium block mt-1">Mohan Co-op / Jasola</span>
              <span className="text-[10px] text-gray-400 font-light block">South Delhi Business Zone</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
