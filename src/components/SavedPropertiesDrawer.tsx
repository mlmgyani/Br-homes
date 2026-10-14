import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { Property } from '../types/property';

interface SavedPropertiesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProperties: Property[];
  onRemoveSaved: (id: string) => void;
  onViewDetails: (property: Property) => void;
  onClearAll: () => void;
}

export const SavedPropertiesDrawer: React.FC<SavedPropertiesDrawerProps> = ({
  isOpen,
  onClose,
  savedProperties,
  onRemoveSaved,
  onViewDetails,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-gray-200">
          {/* Header */}
          <div className="px-6 py-5 bg-[#071426] text-white flex items-center justify-between border-b border-[#C8A45D]/20">
            <div className="flex items-center gap-3">
              <Bookmark className="w-5 h-5 text-[#C8A45D] fill-current" />
              <div>
                <h3 className="font-serif text-lg font-bold">Saved Properties</h3>
                <p className="text-xs text-gray-400 font-light">
                  {savedProperties.length} demo {savedProperties.length === 1 ? 'listing' : 'listings'} saved
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedProperties.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-3 py-16">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-gray-800">No Saved Properties</h4>
                <p className="text-xs text-gray-500 max-w-xs font-light">
                  Click the bookmark icon on any demo property card to save and compare them here.
                </p>
              </div>
            ) : (
              savedProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-[#F7F7F5] border border-gray-200 rounded-sm p-3.5 flex gap-3.5 group relative hover:border-[#C8A45D] transition-all"
                >
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-20 h-20 rounded-sm object-cover shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[9px] font-bold tracking-wider uppercase text-[#071426] bg-white px-2 py-0.5 rounded-sm border border-gray-200">
                          {prop.categoryLabel}
                        </span>
                        <button
                          onClick={() => onRemoveSaved(prop.id)}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-serif font-bold text-gray-900 text-xs truncate mt-1">
                        {prop.title}
                      </h4>
                      <div className="text-xs text-[#071426] font-extrabold mt-0.5">
                        {prop.priceDisplay}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <span className="text-gray-500">{prop.sizeValue} {prop.sizeUnit}</span>
                      <button
                        onClick={() => {
                          onViewDetails(prop);
                          onClose();
                        }}
                        className="text-[#071426] hover:text-[#C8A45D] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {savedProperties.length > 0 && (
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3">
              <button
                onClick={onClearAll}
                className="text-xs text-red-600 hover:underline font-medium cursor-pointer"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-sm bg-[#071426] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#111827] cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
