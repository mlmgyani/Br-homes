export type PropertyCategory = 'plot' | 'house' | 'apartment' | 'builder-floor';

export interface Property {
  id: string;
  title: string;
  category: PropertyCategory;
  categoryLabel: string;
  location: string;
  subLocation: string;
  price: number; // in INR
  priceDisplay: string;
  sizeValue: number;
  sizeUnit: string; // e.g. "Sq. Yards (Gaj)"
  sqftEquivalent: number;
  dimensions?: string;
  facing?: string;
  roadWidth?: string;
  bedrooms?: number;
  bathrooms?: number;
  floors?: string;
  images: string[];
  highlights: string[];
  amenities: string[];
  description: string;
  possession: string;
  ownershipType: string;
  isDemo: true;
  featured?: boolean;
}

export interface SearchFilterState {
  keyword: string;
  category: string;
  location: string;
  budgetRange: string;
  sizeRange: string;
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'size-desc';
}

export interface ContactFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  propertyInterest: string;
  preferredTime: string;
  message: string;
}
