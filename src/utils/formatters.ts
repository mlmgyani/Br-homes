/**
 * Format Indian Rupee currency amount cleanly
 */
export function formatIndianCurrency(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, '')} Cr`;
  }
  if (amount >= 100000) {
    const lk = amount / 100000;
    return `₹${lk.toFixed(2).replace(/\.00$/, '')} Lakh`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate Monthly EMI
 * P = Principal loan amount
 * annualRate = Annual interest rate (e.g. 8.5 for 8.5%)
 * tenureYears = Loan period in years
 */
export function calculateEmi(principal: number, annualRate: number, tenureYears: number) {
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;
  
  if (principal <= 0 || annualRate <= 0 || tenureYears <= 0) {
    return {
      monthlyEmi: 0,
      totalInterest: 0,
      totalPayment: 0,
      principalPercent: 0,
      interestPercent: 0,
    };
  }

  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;

  return {
    monthlyEmi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    principalPercent: Math.round((principal / totalPayment) * 100),
    interestPercent: Math.round((totalInterest / totalPayment) * 100),
  };
}

/**
 * Haryana land measurement conversions
 * Base unit: Square Yards (Gaj)
 */
export function convertLandArea(value: number, fromUnit: 'sqyd' | 'sqft' | 'sqm' | 'marla' | 'kanal' | 'acre') {
  if (isNaN(value) || value <= 0) {
    return {
      sqyd: 0,
      sqft: 0,
      sqm: 0,
      marla: 0,
      kanal: 0,
      acre: 0,
    };
  }

  // Convert input to base: Square Yards (Gaj)
  let baseSqYd = 0;
  switch (fromUnit) {
    case 'sqyd':
      baseSqYd = value;
      break;
    case 'sqft':
      baseSqYd = value / 9;
      break;
    case 'sqm':
      baseSqYd = value / 0.836127;
      break;
    case 'marla':
      baseSqYd = value * 25; // In Haryana, 1 Marla is standard 25 Sq. Yds / 225 Sq. Ft
      break;
    case 'kanal':
      baseSqYd = value * 500; // 1 Kanal = 20 Marlas = 500 Sq. Yds
      break;
    case 'acre':
      baseSqYd = value * 4840; // 1 Acre = 4840 Sq. Yds
      break;
  }

  return {
    sqyd: Number(baseSqYd.toFixed(2)),
    sqft: Number((baseSqYd * 9).toFixed(2)),
    sqm: Number((baseSqYd * 0.836127).toFixed(2)),
    marla: Number((baseSqYd / 25).toFixed(2)),
    kanal: Number((baseSqYd / 500).toFixed(3)),
    acre: Number((baseSqYd / 4840).toFixed(4)),
  };
}
