import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle,
  Calendar
} from 'lucide-react';
import { Property } from '../types/property';

interface ScheduleVisitModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredLocation, setPreferredLocation] = useState(
    property ? property.location : 'Sector 37, Faridabad'
  );
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Full Name is required';
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit number';
    }
    if (!preferredLocation.trim()) errs.preferredLocation = 'Preferred Location is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div 
        className="bg-white rounded-sm max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-sm bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A45D] block mb-1">
          B.R. HOMES PVT. LTD. • SECTOR 37
        </span>

        <h3 className="font-serif text-2xl font-bold text-[#071426]">
          Book a Site Visit
        </h3>

        {property ? (
          <div className="mt-3 p-3 rounded-sm bg-[#F7F7F5] border border-gray-200 text-xs text-gray-700 flex items-center gap-3">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-12 h-12 rounded-sm object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
              }}
            />
            <div className="truncate">
              <span className="font-bold text-gray-900 truncate block">{property.title}</span>
              <span className="text-gray-500 truncate block">{property.location}</span>
              <span className="text-[#071426] font-semibold">{property.priceDisplay}</span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-500 mt-1 font-light">
            Coordinate an in-person walkthrough of residential plots and homes in Sector 37 with our team.
          </p>
        )}

        <div className="mt-3 bg-gray-50 border-l-2 border-[#C8A45D] p-2.5 text-[11px] text-gray-600 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
          <span>Demo Booking Tool: Simulated request for demonstration.</span>
        </div>

        {submitted ? (
          <div className="mt-6 py-6 text-center space-y-3">
            <div className="w-12 h-12 bg-[#071426] text-[#C8A45D] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#071426]">
              Site Visit Logged
            </h4>
            <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>! Your demo visit request for <strong>{preferredLocation}</strong> on <strong>{date || 'Next Available Date'}</strong> has been recorded.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-sm bg-[#071426] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 text-xs">
            <div>
              <label className="font-medium text-gray-700 uppercase tracking-wide block mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alok Sharma"
                className="w-full h-10 px-3 rounded-sm border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#C8A45D]"
              />
              {errors.name && <span className="text-[11px] text-red-600">{errors.name}</span>}
            </div>

            <div>
              <label className="font-medium text-gray-700 uppercase tracking-wide block mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-gray-400 font-medium">+91</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  maxLength={14}
                  className="w-full h-10 pl-10 pr-3 rounded-sm border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#C8A45D]"
                />
              </div>
              {errors.phone && <span className="text-[11px] text-red-600">{errors.phone}</span>}
            </div>

            <div>
              <label className="font-medium text-gray-700 uppercase tracking-wide block mb-1">
                Preferred Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
                placeholder="e.g. Sector 37 Block C / Park Facing"
                className="w-full h-10 px-3 rounded-sm border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="font-medium text-gray-700 uppercase tracking-wide block mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-10 px-3 rounded-sm border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="font-medium text-gray-700 uppercase tracking-wide block mb-1">
                Message / Notes
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Optional notes or questions..."
                className="w-full p-2.5 rounded-sm border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-[#C8A45D]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 mt-2 rounded-sm bg-[#071426] hover:bg-[#111827] text-white font-semibold text-xs uppercase tracking-widest cursor-pointer transition-colors"
            >
              Confirm Site Visit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
