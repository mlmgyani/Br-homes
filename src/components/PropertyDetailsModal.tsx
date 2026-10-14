import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Ruler, 
  Compass, 
  ShieldCheck, 
  Bed, 
  CheckCircle2, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  Calculator, 
  AlertTriangle,
  CalendarCheck
} from 'lucide-react';
import { Property } from '../types/property';
import { calculateEmi, formatIndianCurrency } from '../utils/formatters';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenScheduleVisit: (property: Property) => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  onClose,
  isSaved,
  onToggleSave,
  onOpenScheduleVisit,
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [copiedLink, setCopiedLink] = useState(false);

  // EMI calculations
  const downPaymentAmount = Math.round((property.price * downPaymentPercent) / 100);
  const loanAmount = property.price - downPaymentAmount;
  const emiStats = calculateEmi(loanAmount, interestRate, loanTenureYears);

  const whatsappMessage = encodeURIComponent(
    `Hello B.R. Homes Pvt. Ltd., I am enquiring regarding the demo property: "${property.title}" (${property.id}) in ${property.location}. Please share consultation details.`
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 md:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-sm max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 flex flex-col relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-gray-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-[#071426] text-[#C8A45D] border border-[#C8A45D]/40 rounded-sm">
              DEMO LISTING
            </span>
            <span className="text-xs text-gray-500 hidden sm:inline">
              Ref ID: {property.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(property.id)}
              className={`p-2 rounded-sm border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-[#C8A45D] text-[#071426] border-[#C8A45D]'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-sm border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy link"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-sm bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-9 space-y-8">
          {/* Demo Disclaimer Alert */}
          <div className="bg-[#F7F7F5] border-l-2 border-[#C8A45D] p-4 text-xs sm:text-sm text-gray-700 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900">Demo Listing Notice: </strong>
              This is an illustrative sample property with an indicative sample price for preview purposes. It is not an active commercial commitment. For verified available inventory in Sector 37, Faridabad, please consult our office.
            </div>
          </div>

          {/* Photo Gallery with Thumbnail selector */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] max-h-[460px] w-full rounded-sm overflow-hidden bg-gray-950 border border-gray-200">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-sm backdrop-blur-sm">
                Photo {activeImageIndex + 1} of {property.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-sm overflow-hidden shrink-0 border transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#C8A45D] ring-1 ring-[#C8A45D]'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Title, Price, Location Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-sm text-xs font-medium bg-[#071426] text-[#C8A45D]">
                  {property.categoryLabel}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {property.possession}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#071426]">
                {property.title}
              </h2>
              <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-2">
                <MapPin className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <span className="font-medium text-gray-900">{property.location}</span>
                <span className="text-gray-400">•</span>
                <span>{property.subLocation}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#071426] text-white p-5 rounded-sm lg:text-right shrink-0 border border-[#C8A45D]/20">
              <span className="text-[10px] uppercase tracking-widest text-[#C8A45D] font-semibold block">
                Sample Price (Demo)
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
                {property.priceDisplay}
              </div>
              <span className="text-[11px] text-gray-300 block mt-1">
                Approx. {formatIndianCurrency(Math.round(property.price / (property.sqftEquivalent || 1)))} / Sq. Ft.
              </span>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#071426] mb-3">
              Property Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
              <div className="bg-[#F7F7F5] border border-gray-200 p-3.5 rounded-sm">
                <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block">Plot / Land Size</span>
                <div className="font-bold text-[#071426] text-sm sm:text-base mt-1">
                  {property.sizeValue} {property.sizeUnit}
                </div>
                <span className="text-[11px] text-gray-500 block">
                  ≈ {property.sqftEquivalent} Sq. Ft.
                </span>
              </div>

              {property.dimensions && (
                <div className="bg-[#F7F7F5] border border-gray-200 p-3.5 rounded-sm">
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block">Dimensions</span>
                  <div className="font-bold text-[#071426] text-sm sm:text-base mt-1">
                    {property.dimensions}
                  </div>
                </div>
              )}

              {property.facing && (
                <div className="bg-[#F7F7F5] border border-gray-200 p-3.5 rounded-sm">
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block">Facing Orientation</span>
                  <div className="font-bold text-[#071426] text-sm sm:text-base mt-1">
                    {property.facing}
                  </div>
                </div>
              )}

              {property.roadWidth && (
                <div className="bg-[#F7F7F5] border border-gray-200 p-3.5 rounded-sm">
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block">Road Width</span>
                  <div className="font-bold text-[#071426] text-sm sm:text-base mt-1">
                    {property.roadWidth}
                  </div>
                </div>
              )}

              <div className="bg-[#F7F7F5] border border-gray-200 p-3.5 rounded-sm">
                <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block">Title Type</span>
                <div className="font-bold text-[#071426] text-sm sm:text-base mt-1">
                  {property.ownershipType}
                </div>
              </div>

              <div className="bg-[#F7F7F5] border border-gray-200 p-3.5 rounded-sm">
                <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block">Possession</span>
                <div className="font-bold text-[#071426] text-sm sm:text-base mt-1">
                  {property.possession}
                </div>
              </div>

              {property.bedrooms && (
                <div className="bg-[#F7F7F5] border border-gray-200 p-3.5 rounded-sm">
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block">Configuration</span>
                  <div className="font-bold text-[#071426] text-sm sm:text-base mt-1">
                    {property.bedrooms} Beds / {property.bathrooms} Baths
                  </div>
                </div>
              )}

              {property.floors && (
                <div className="bg-[#F7F7F5] border border-gray-200 p-3.5 rounded-sm">
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block">Floor</span>
                  <div className="font-bold text-[#071426] text-sm sm:text-base mt-1">
                    {property.floors}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#071426]">
              About This Property
            </h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed bg-[#F7F7F5] p-5 rounded-sm border border-gray-200 font-light">
              {property.description}
            </p>
          </div>

          {/* Key Highlights */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#071426] mb-3">
              Key Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities & Infrastructure */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#071426] mb-3">
              Infrastructure & Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {property.amenities.map((item, idx) => (
                <div key={idx} className="bg-gray-100 px-3.5 py-2 rounded-sm text-xs text-gray-800 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Property EMI Estimator */}
          <div className="bg-[#071426] text-white p-6 sm:p-7 rounded-sm border border-[#C8A45D]/20 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Calculator className="w-5 h-5 text-[#C8A45D]" />
                <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                  Sample Loan EMI Estimator
                </h4>
              </div>
              <span className="text-[11px] text-[#C8A45D] bg-white/5 px-2.5 py-0.5 rounded-sm border border-[#C8A45D]/30">
                Sample Price: {formatIndianCurrency(property.price)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Downpayment Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Down Payment ({downPaymentPercent}%)</span>
                  <span className="font-bold text-white">{formatIndianCurrency(downPaymentAmount)}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#C8A45D] cursor-pointer"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Interest Rate</span>
                  <span className="font-bold text-white">{interestRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min="7.0"
                  max="12.0"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#C8A45D] cursor-pointer"
                />
              </div>

              {/* Loan Tenure */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Loan Tenure</span>
                  <span className="font-bold text-white">{loanTenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                  className="w-full accent-[#C8A45D] cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Results */}
            <div className="bg-white/5 p-4 rounded-sm grid grid-cols-2 sm:grid-cols-3 gap-4 text-center border border-white/10">
              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider block">Monthly EMI</span>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#C8A45D] mt-1">
                  {formatIndianCurrency(emiStats.monthlyEmi)} / mo
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider block">Principal</span>
                <div className="text-base sm:text-lg font-bold text-white mt-1">
                  {formatIndianCurrency(loanAmount)}
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider block">Total Interest</span>
                <div className="text-base sm:text-lg font-bold text-gray-300 mt-1">
                  {formatIndianCurrency(emiStats.totalInterest)}
                </div>
              </div>
            </div>
          </div>

          {/* Action Consultation Box */}
          <div className="bg-[#F7F7F5] border border-gray-200 rounded-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <div className="font-serif text-lg font-bold text-[#071426]">
                Interested in this property type in Sector 37?
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-light">
                Connect with B.R. HOMES PVT. LTD. for on-ground consultation and site visit coordination.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onOpenScheduleVisit(property);
                }}
                className="flex-1 sm:flex-none px-5 py-3 rounded-sm bg-[#071426] hover:bg-[#111827] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-[#C8A45D]" />
                <span>Book Site Visit</span>
              </button>

              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-5 py-3 rounded-sm bg-[#C8A45D] hover:bg-[#b8934d] text-[#071426] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
