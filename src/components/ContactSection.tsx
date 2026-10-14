import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../utils/animations';

interface ContactSectionProps {
  prefilledService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledService }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal
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

      // 2. Left Office Card Reveal
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          {
            x: -40,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Right Form Card Reveal
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          {
            x: 40,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rightColRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Configurable WhatsApp & Phone variables
  const placeholderWhatsAppNumber = '919876543210'; // Configurable business contact
  const whatsappUrl = `https://wa.me/${placeholderWhatsAppNumber}?text=${encodeURIComponent(
    'Hello B.R. HOMES PVT. LTD., I would like to enquire about residential plots and site visits in Sector 37, Faridabad.'
  )}`;

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    preferredLocation: 'Sector 37, Faridabad',
    message: prefilledService ? `Enquiring regarding ${prefilledService}.` : '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter a valid full name';
    }

    const cleanPhone = formData.phoneNumber.replace(/\D/g, '');
    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required';
    } else if (cleanPhone.length < 10) {
      errs.phoneNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.preferredLocation.trim()) {
      errs.preferredLocation = 'Preferred location is required';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide details of your property enquiry or preferred visit date';
    } else if (formData.message.trim().length < 5) {
      errs.message = 'Message must be at least 5 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate client-side demo submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 sm:py-28 bg-[#F7F7F5] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-semibold block mb-2">
            Connect With B.R. Homes
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#071426] tracking-tight">
            Site Visit & Enquiry
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Plan an in-person site visit or request comprehensive guidance regarding residential plots in Sector 37, Faridabad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Office & WhatsApp Cards */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            {/* Primary Navy Office Card */}
            <div className="bg-[#071426] text-white p-7 sm:p-9 rounded-sm shadow-xl space-y-7 border border-[#C8A45D]/20">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C8A45D] font-semibold block">
                  Office Location
                </span>
                <h3 className="font-serif text-2xl font-normal tracking-wide text-white mt-1">
                  B.R. HOMES PVT. LTD.
                </h3>
              </div>

              <div className="space-y-5 text-sm">
                {/* Office Area */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#C8A45D]" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs uppercase tracking-wider block">Address</span>
                    <p className="text-gray-100 font-light mt-0.5 leading-snug">
                      Sector 37, Faridabad, Haryana, India — 121003
                    </p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      Near Delhi-Badarpur Border corridor & NH-44
                    </span>
                  </div>
                </div>

                {/* Office Helpline Placeholder */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#C8A45D]" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs uppercase tracking-wider block">Office Phone</span>
                    <p className="text-gray-100 font-light mt-0.5">
                      +91 98765 43210 <span className="text-xs text-gray-400">(Configurable placeholder)</span>
                    </p>
                  </div>
                </div>

                {/* Email Placeholder */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-[#C8A45D]" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs uppercase tracking-wider block">Email</span>
                    <p className="text-gray-100 font-light mt-0.5">
                      contact@brhomes.example.com
                    </p>
                  </div>
                </div>

                {/* Office Timings */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-[#C8A45D]" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs uppercase tracking-wider block">Hours</span>
                    <p className="text-gray-100 font-light mt-0.5">
                      Monday to Saturday: 9:30 AM – 7:30 PM
                    </p>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      Sunday: By Appointment for Site Walkthroughs
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Contact Button */}
              <div className="pt-5 border-t border-white/10">
                <span className="text-xs text-gray-300 block mb-3 font-light">
                  Need quick assistance on plot locations?
                </span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-sm bg-[#C8A45D] hover:bg-[#b8934d] text-[#071426] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70" />
                </a>
                <span className="text-[10px] text-gray-400 block mt-2 text-center">
                  * Opens WhatsApp with business enquiry draft
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Site Visit & Enquiry Booking Form */}
          <div ref={rightColRef} className="lg:col-span-7 bg-white rounded-sm p-7 sm:p-10 shadow-lg border border-gray-200">
            <div className="mb-6 pb-4 border-b border-gray-100">
              <span className="text-xs uppercase tracking-widest text-[#C8A45D] font-semibold block mb-1">
                Consultation Request
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#071426]">
                Book a Site Visit or Send Enquiry
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Share your requirements to coordinate an appointment in Sector 37.
              </p>
            </div>

            {/* Clearly indicate demo form submission */}
            <div className="mb-6 bg-gray-50 border-l-2 border-[#C8A45D] p-3.5 text-xs text-gray-600 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900">Demo Website Notice: </strong>
                This is a demonstration form. Inquiries submitted here are acknowledged locally in the browser and do not transmit data to an external server.
              </div>
            </div>

            {submitted ? (
              <div className="bg-[#F7F7F5] border border-gray-200 rounded-sm p-8 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 bg-[#071426] text-[#C8A45D] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#071426]">
                  Enquiry Recorded
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your enquiry for <strong>{formData.preferredLocation}</strong> has been logged in this demo session.
                </p>
                <div className="bg-white p-4 rounded-sm text-xs text-gray-700 text-left max-w-sm mx-auto space-y-1 border border-gray-200">
                  <div><strong>Phone:</strong> {formData.phoneNumber}</div>
                  <div><strong>Location:</strong> {formData.preferredLocation}</div>
                  <div><strong>Requirement:</strong> {formData.message}</div>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      phoneNumber: '',
                      preferredLocation: 'Sector 37, Faridabad',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded-sm bg-[#071426] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#111827] transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="font-medium text-gray-700 uppercase tracking-wide text-xs block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Chandra"
                    className={`w-full h-11 px-3.5 rounded-sm border text-sm text-gray-900 focus:outline-none focus:border-[#C8A45D] ${
                      errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-gray-200 bg-white'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-red-600 block">{errors.fullName}</span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="font-medium text-gray-700 uppercase tracking-wide text-xs block">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-xs font-medium text-gray-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="98XXXXXXXX"
                      maxLength={14}
                      className={`w-full h-11 pl-11 pr-3.5 rounded-sm border text-sm text-gray-900 focus:outline-none focus:border-[#C8A45D] ${
                        errors.phoneNumber ? 'border-red-400 bg-red-50/20' : 'border-gray-200 bg-white'
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <span className="text-[11px] text-red-600 block">{errors.phoneNumber}</span>
                  )}
                </div>

                {/* Preferred Location */}
                <div className="space-y-1.5">
                  <label className="font-medium text-gray-700 uppercase tracking-wide text-xs block">
                    Preferred Location <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-sm border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:border-[#C8A45D]"
                  >
                    <option value="Sector 37, Faridabad">Sector 37, Faridabad</option>
                    <option value="Sector 37 Vicinity (Greenfields / Ashoka Enclave)">Sector 37 Vicinity (Greenfields / Ashoka Enclave)</option>
                    <option value="Delhi-Mathura Road (NH-44) Corridor">Delhi-Mathura Road (NH-44) Corridor</option>
                    <option value="Other Plotted Sector in Faridabad">Other Plotted Sector in Faridabad</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="font-medium text-gray-700 uppercase tracking-wide text-xs block">
                    Message / Requirement Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify your preferred plot size (e.g. 250 Gaj), budget range, preferred day for site visit, or questions..."
                    className={`w-full p-3.5 rounded-sm border text-sm text-gray-900 focus:outline-none focus:border-[#C8A45D] ${
                      errors.message ? 'border-red-400 bg-red-50/20' : 'border-gray-200 bg-white'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] text-red-600 block">{errors.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 rounded-sm bg-[#071426] hover:bg-[#111827] text-white font-semibold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow disabled:opacity-60 hover:-translate-y-0.5"
                  >
                    <Send className="w-3.5 h-3.5 text-[#C8A45D]" />
                    <span>{submitting ? 'Submitting Request...' : 'Submit Site Visit Request'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
