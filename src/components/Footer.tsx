import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowUp, ShieldCheck, X } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-[#071426] text-gray-300 border-t border-[#C8A45D]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Column 1: Company Branding */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm border border-[#C8A45D] bg-[#071426] flex items-center justify-center">
                  <span className="font-serif font-bold text-[#C8A45D] text-lg">BR</span>
                </div>
                <div>
                  <span className="font-serif text-lg font-bold tracking-[0.1em] text-white uppercase block">
                    B.R. HOMES PVT. LTD.
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#C8A45D] font-medium block">
                    Sector 37, Faridabad, Haryana
                  </span>
                </div>
              </div>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
                Professional property guidance and advisory for residential plots, independent builder floors, and homes in Sector 37 and adjoining sectors of Faridabad, Haryana, India.
              </p>

              <div className="pt-2">
                <span className="text-xs text-gray-500 font-light block">
                  Official Web Portal • Designed for Responsive Browsing
                </span>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="lg:col-span-3 space-y-3">
              <span className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A45D] block">
                Navigation
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li>
                  <button
                    onClick={() => onNavigate('hero')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('properties')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Featured Properties
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('about')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    About The Company
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Our Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('tools')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Property Tools & Calculators
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Site Visit & Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Office Area & Contact Placeholders */}
            <div className="lg:col-span-4 space-y-3">
              <span className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A45D] block">
                Office & Contact
              </span>
              <div className="space-y-3 text-xs text-gray-400">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <strong className="text-white block font-medium">Head Office Area:</strong>
                    Sector 37, Faridabad, Haryana, India — 121003<br />
                    (Near Delhi-Badarpur Border corridor)
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#C8A45D] shrink-0" />
                  <span>
                    Phone: <span className="text-gray-300">+91 98765 43210</span> (Configurable)
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#C8A45D] shrink-0" />
                  <span>Email: contact@brhomes.example.com</span>
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#C8A45D] shrink-0" />
                  <span>Freehold Title & Plot Advisory</span>
                </div>
              </div>
            </div>
          </div>

          {/* Explicit Demo Disclaimer Box */}
          <div className="mt-12 bg-white/5 border border-white/10 rounded-sm p-4 sm:p-5 text-xs text-gray-400 leading-relaxed font-light">
            <strong className="text-gray-200">Demonstration Notice: </strong>
            This website represents the digital platform for <strong>B.R. HOMES PVT. LTD.</strong> (Sector 37, Faridabad, Haryana, India). All property photos, dimensions, specifications, and sample prices shown on this website are illustrative demo listings provided for interface demonstration. They do not constitute a formal commercial offer or guarantee of current plot availability. Contact B.R. Homes directly for genuine on-ground plot consultation.
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="border-t border-white/10 py-5 bg-[#050e1b]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div>
              © {new Date().getFullYear()} B.R. HOMES PVT. LTD. Sector 37, Faridabad, Haryana, India. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveModal('privacy')}
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveModal('terms')}
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                Terms of Use
              </button>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 text-gray-400 hover:text-[#C8A45D] transition-colors cursor-pointer ml-2"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy / Terms Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 rounded-sm max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-gray-200">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#071426] mb-3">
              {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Use'}
            </h3>

            <div className="text-xs text-gray-600 space-y-3 leading-relaxed max-h-80 overflow-y-auto pr-2">
              {activeModal === 'privacy' ? (
                <>
                  <p>
                    <strong>B.R. HOMES PVT. LTD.</strong> respects client confidentiality. When you provide contact information through our demo consultation or site visit forms, the details are treated with discretion.
                  </p>
                  <p>
                    In this preview website edition, forms operate locally in the user’s web browser and do not store or transmit sensitive financial or personal information to third-party ad networks.
                  </p>
                  <p>
                    For inquiries regarding our data handling or official business operations in Sector 37, Faridabad, you may reach out directly via our listed communication channels.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    By accessing the <strong>B.R. HOMES PVT. LTD.</strong> web portal, you acknowledge that all listings, plot sizes, and sample pricing are for preview demonstration.
                  </p>
                  <p>
                    Real estate transactions in Haryana are governed by applicable HSVP, town planning, and revenue registration laws. Formal property acquisitions require direct legal title verification, physical demarcation, and official registry documentation.
                  </p>
                  <p>
                    B.R. Homes Pvt. Ltd. provides consultancy services in Sector 37, Faridabad, Haryana, India.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-sm bg-[#071426] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
