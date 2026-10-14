import React from 'react';
import { MapPin, Ruler, Bed, Compass, Bookmark, ArrowRight, MessageSquare } from 'lucide-react';
import { Property } from '../types/property';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onViewDetails: (property: Property) => void;
  onOpenScheduleVisit: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved,
  onToggleSave,
  onViewDetails,
  onOpenScheduleVisit,
}) => {
  const whatsappText = encodeURIComponent(
    `Hello B.R. Homes Pvt. Ltd., I am enquiring regarding the demo property: "${property.title}" (${property.id}) in ${property.location}.`
  );

  return (
    <div className="property-card-item bg-white rounded-sm overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full hover:-translate-y-1">
      {/* Property Image Container with smooth scale effect */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out will-change-transform"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
          }}
        />

        {/* Subtle Gradient Shade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/75 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase bg-[#071426]/90 text-[#C8A45D] border border-[#C8A45D]/40 backdrop-blur-sm rounded-sm">
            DEMO LISTING
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(property.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer ${
              isSaved
                ? 'bg-[#C8A45D] text-[#071426]'
                : 'bg-black/40 text-white hover:bg-black/70'
            }`}
            title={isSaved ? 'Saved to bookmarks' : 'Save property'}
            aria-label="Save property"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Category Pill on Image Bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
          <span className="text-white font-medium bg-[#071426]/80 px-2.5 py-1 rounded-sm backdrop-blur-sm">
            {property.categoryLabel}
          </span>
          <span className="text-gray-200 text-[11px] bg-black/40 px-2 py-0.5 rounded-sm backdrop-blur-sm">
            {property.possession}
          </span>
        </div>
      </div>

      {/* Card Content with Consistent Spacing */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Price Header */}
          <div>
            <div className="text-2xl font-serif font-bold text-[#071426] tracking-tight">
              {property.priceDisplay}
            </div>
            <div className="text-[10px] text-gray-500 font-sans tracking-wide">
              * Sample price for demo preview
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onViewDetails(property)}
            className="font-serif text-lg font-bold text-gray-900 group-hover:text-[#C8A45D] transition-colors cursor-pointer line-clamp-1"
          >
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <MapPin className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Specifications Bar */}
          <div className="pt-3 pb-3 border-t border-b border-gray-100 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-[#C8A45D] shrink-0" />
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Plot / Size</span>
                <span className="font-semibold text-gray-900">{property.sizeValue} {property.sizeUnit}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {property.bedrooms ? (
                <>
                  <Bed className="w-4 h-4 text-[#C8A45D] shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Bedrooms</span>
                    <span className="font-semibold text-gray-900">{property.bedrooms} BHK</span>
                  </div>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4 text-[#C8A45D] shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Road Width</span>
                    <span className="font-semibold text-gray-900 truncate">{property.roadWidth || '40 ft wide'}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 mt-2 flex items-center gap-2.5">
          <button
            onClick={() => onViewDetails(property)}
            className="flex-1 h-10 px-4 rounded-sm bg-[#071426] hover:bg-[#111827] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-sm"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C8A45D]" />
          </button>

          <a
            href={`https://wa.me/919876543210?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3.5 rounded-sm border border-gray-300 hover:border-[#C8A45D] hover:text-[#C8A45D] text-gray-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            title="Enquire on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Enquire</span>
          </a>
        </div>
      </div>
    </div>
  );
};
