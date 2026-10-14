import React, { useEffect, useRef } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../utils/animations';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const valuesGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Image Frame entrance animation
      if (imageFrameRef.current) {
        gsap.fromTo(
          imageFrameRef.current,
          {
            y: 50,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imageFrameRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Heading and text entrance animation
      if (textContentRef.current) {
        const textElements = textContentRef.current.querySelectorAll('.about-reveal-text');
        gsap.fromTo(
          textElements,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textContentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Values 4-grid staggered reveal
      if (valuesGridRef.current) {
        gsap.fromTo(
          valuesGridRef.current.children,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: valuesGridRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 sm:py-28 bg-[#F7F7F5] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Architectural Imagery with Refined Overlay Frame */}
          <div ref={imageFrameRef} className="lg:col-span-5 relative">
            <div className="relative rounded-sm overflow-hidden shadow-2xl bg-[#071426] aspect-[4/5] max-h-[550px]">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85"
                alt="B.R. Homes Pvt. Ltd. Sector 37 Faridabad"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/80 via-transparent to-transparent" />

              {/* Inset Refined Location Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-sm border-l-2 border-[#C8A45D] shadow-lg">
                <div className="font-serif font-bold text-[#071426] text-base tracking-wide">
                  B.R. HOMES PVT. LTD.
                </div>
                <div className="text-xs text-gray-600 flex items-center gap-1.5 mt-1 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A45D]" />
                  <span>Sector 37, Faridabad, Haryana, India</span>
                </div>
              </div>
            </div>

            {/* Subtle decorative gold accent line */}
            <div className="absolute -top-3 -right-3 w-24 h-24 border-t-2 border-r-2 border-[#C8A45D]/40 pointer-events-none" />
          </div>

          {/* Right Column: Editorial Text Introduction */}
          <div ref={textContentRef} className="lg:col-span-7 space-y-6">
            <div className="about-reveal-text">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-semibold block mb-2">
                About The Company
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#071426] tracking-tight leading-[1.2]">
                Guiding Your Property Decisions in <span className="italic font-serif text-[#071426]">Faridabad.</span>
              </h2>
            </div>

            <p className="about-reveal-text text-gray-700 text-base sm:text-lg leading-relaxed font-light">
              <strong>B.R. HOMES PVT. LTD.</strong> is a real estate advisory business based in Sector 37, Faridabad, Haryana. We assist home seekers, investors, and families in identifying residential plots, independent builder floors, and premium homes suited to their long-term requirements.
            </p>

            <p className="about-reveal-text text-gray-600 text-sm sm:text-base leading-relaxed">
              Operating with direct focus on Sector 37 and surrounding sectors of Faridabad, our approach centers on transparent local insights, verified sector layouts, freehold title checks, and personalized on-site guidance.
            </p>

            {/* Core Values / Principles Grid */}
            <div ref={valuesGridRef} className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-gray-200">
              <div className="space-y-1.5 p-3 rounded-sm bg-white/60 border border-gray-200/60 shadow-xs">
                <h4 className="font-serif text-base font-bold text-[#071426]">
                  Local Sector Expertise
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  In-depth understanding of Sector 37 road alignments, zoning regulations, and neighborhood infrastructure.
                </p>
              </div>

              <div className="space-y-1.5 p-3 rounded-sm bg-white/60 border border-gray-200/60 shadow-xs">
                <h4 className="font-serif text-base font-bold text-[#071426]">
                  Transparent Consultation
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Straightforward information on plot dimensions, municipal connections, and realistic market valuations.
                </p>
              </div>

              <div className="space-y-1.5 p-3 rounded-sm bg-white/60 border border-gray-200/60 shadow-xs">
                <h4 className="font-serif text-base font-bold text-[#071426]">
                  Documentation Guidance
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Support in understanding freehold title requirements, conveyance formalities, and registry procedures.
                </p>
              </div>

              <div className="space-y-1.5 p-3 rounded-sm bg-white/60 border border-gray-200/60 shadow-xs">
                <h4 className="font-serif text-base font-bold text-[#071426]">
                  Personalized Site Visits
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Dedicated in-person walkthroughs of plots, street frontages, and neighboring amenities.
                </p>
              </div>
            </div>

            <div className="about-reveal-text pt-2">
              <button
                onClick={onContactClick}
                className="px-7 py-3 rounded-sm bg-[#071426] hover:bg-[#111827] text-white text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer inline-flex items-center gap-2 hover:-translate-y-0.5"
              >
                <span>Connect With Our Team</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C8A45D]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
