import React, { useEffect, useRef } from 'react';
import { 
  Building, 
  Home, 
  FileCheck2, 
  Compass, 
  MapPin, 
  ShieldCheck, 
  CheckCircle,
  Clock
} from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../utils/animations';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const whyHeaderRef = useRef<HTMLDivElement>(null);
  const whyGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Services Header Reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          {
            y: 35,
            opacity: 0,
          },
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

      // 2. Services 4 Cards Staggered Reveal
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          {
            y: 45,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.14,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Why Choose Us Header Reveal
      if (whyHeaderRef.current) {
        gsap.fromTo(
          whyHeaderRef.current,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: whyHeaderRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 4. Why Choose Us 4 Points Staggered Reveal
      if (whyGridRef.current) {
        gsap.fromTo(
          whyGridRef.current.children,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: whyGridRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      id: 'residential-plots',
      title: 'Residential Plots',
      description:
        'Consultation and advisory for residential plots in Sector 37 and adjoining Faridabad localities. Assistance with understanding dimensions (160, 250, 350, 500 Gaj), road widths, and layout demarcations.',
      icon: <Building className="w-6 h-6 text-[#C8A45D]" />,
      actionText: 'Enquire for Plots',
    },
    {
      id: 'independent-houses',
      title: 'Independent Houses',
      description:
        'Guidance on standalone villas, multi-level duplexes, and modern stilt+lift builder floors. Helping clients evaluate space configurations, parking provisions, and structural layouts.',
      icon: <Home className="w-6 h-6 text-[#C8A45D]" />,
      actionText: 'Enquire for Houses',
    },
    {
      id: 'property-consultation',
      title: 'Property Consultation',
      description:
        'Objective real estate advisory regarding local pricing trends, legal checks, freehold registry conventions, and HSVP / municipal zoning norms in Faridabad.',
      icon: <FileCheck2 className="w-6 h-6 text-[#C8A45D]" />,
      actionText: 'Request Consultation',
    },
    {
      id: 'site-visit-assistance',
      title: 'Site Visit Assistance',
      description:
        'Structured in-person walkthroughs of plotted sectors and properties in Sector 37. On-ground verification of road connectivity, community parks, and neighborhood infrastructure.',
      icon: <Compass className="w-6 h-6 text-[#C8A45D]" />,
      actionText: 'Schedule Walkthrough',
    },
  ];

  const whyChoosePoints = [
    {
      title: 'Sector 37 Focused',
      description: 'Specialized focus on Sector 37, Faridabad, ensuring granular knowledge of blocks, roads, and civic facilities.',
      icon: <MapPin className="w-5 h-5 text-[#C8A45D]" />,
    },
    {
      title: 'Grounded Guidance',
      description: 'Direct, realistic consultations on land values and development potential without exaggerated projections.',
      icon: <ShieldCheck className="w-5 h-5 text-[#C8A45D]" />,
    },
    {
      title: 'Clear Title Orientation',
      description: 'Assistance in reviewing freehold documentation and registry prerequisites prior to any transaction step.',
      icon: <CheckCircle className="w-5 h-5 text-[#C8A45D]" />,
    },
    {
      title: 'Structured Appointments',
      description: 'Scheduled on-site inspections arranged at your convenience with dedicated time for all queries.',
      icon: <Clock className="w-5 h-5 text-[#C8A45D]" />,
    },
  ];

  return (
    <section ref={sectionRef} id="services" className="py-20 sm:py-28 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-semibold block mb-2">
            Our Core Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#071426] tracking-tight">
            Real Estate Services
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Professional property advisory and field assistance designed around the specific dynamics of Faridabad's residential sectors.
          </p>
        </div>

        {/* 4 Premium Service Cards */}
        <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#F7F7F5] rounded-sm p-7 border border-gray-200 hover:border-[#C8A45D] transition-all duration-300 flex flex-col justify-between group hover:shadow-lg hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-sm bg-[#071426] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#071426] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-200">
                <button
                  onClick={() => onSelectService(service.title)}
                  className="text-xs font-semibold uppercase tracking-wider text-[#071426] group-hover:text-[#C8A45D] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{service.actionText}</span>
                  <span className="text-[#C8A45D]">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us - Minimal Line Icons & Elegant Spacing */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <div ref={whyHeaderRef} className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-semibold block mb-2">
              Our Principles
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#071426]">
              Why Choose B.R. Homes
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-2 font-light">
              Straightforward and disciplined approach to property advisory in Haryana.
            </p>
          </div>

          <div ref={whyGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChoosePoints.map((point, index) => (
              <div key={index} className="text-center sm:text-left space-y-3 p-4 rounded-sm bg-[#F7F7F5]/50 border border-gray-100 hover:border-[#C8A45D]/40 transition-colors">
                <div className="w-10 h-10 rounded-sm bg-white border border-gray-200 flex items-center justify-center mx-auto sm:mx-0 shadow-xs">
                  {point.icon}
                </div>
                <h4 className="font-serif text-base font-bold text-[#071426]">
                  {point.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
