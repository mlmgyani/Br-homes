import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, 
  Ruler, 
  HelpCircle
} from 'lucide-react';
import { calculateEmi, convertLandArea, formatIndianCurrency } from '../utils/formatters';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../utils/animations';

export const CalculatorsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const toolsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 35, opacity: 0 },
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

      if (toolsGridRef.current) {
        gsap.fromTo(
          toolsGridRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.16,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: toolsGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(15000000); // 1.5 Cr
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);

  const emiResult = calculateEmi(loanAmount, interestRate, loanTenure);

  // Unit Converter State
  const [areaInput, setAreaInput] = useState<number>(250); // 250 Gaj default
  const [fromUnit, setFromUnit] = useState<'sqyd' | 'sqft' | 'sqm' | 'marla' | 'kanal' | 'acre'>('sqyd');

  const convertedAreas = convertLandArea(areaInput, fromUnit);

  return (
    <section ref={sectionRef} id="tools" className="py-20 sm:py-28 bg-[#F7F7F5] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-semibold block mb-2">
            Advisory Utilities
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#071426] tracking-tight">
            Financial & Land Planning Tools
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Plan your property investment with accurate loan EMI projections and authentic Haryana land measurement conversions (Gaj, Sq. Yards, and Marla).
          </p>
        </div>

        <div ref={toolsGridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-start">
          {/* Tool 1: Property Loan EMI Calculator */}
          <div className="bg-white rounded-sm p-7 sm:p-9 shadow-md border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 pb-5 border-b border-gray-100 mb-6">
                <div className="w-10 h-10 rounded-sm bg-[#071426] text-[#C8A45D] flex items-center justify-center shrink-0">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#071426]">
                    Property Loan EMI Calculator
                  </h3>
                  <p className="text-xs text-gray-500 font-light">Estimate monthly financial outflow</p>
                </div>
              </div>

              {/* Loan Amount Slider */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                  <span className="font-medium text-gray-700">Loan Amount</span>
                  <span className="font-serif font-bold text-base text-[#071426] bg-[#F7F7F5] px-3 py-1 rounded-sm border border-gray-200">
                    {formatIndianCurrency(loanAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="50000000"
                  step="500000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#071426] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-400 font-light">
                  <span>₹10 Lakh</span>
                  <span>₹2.5 Cr</span>
                  <span>₹5.0 Cr</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                  <span className="font-medium text-gray-700">Annual Interest Rate</span>
                  <span className="font-bold text-sm text-[#071426] bg-[#F7F7F5] px-3 py-1 rounded-sm border border-gray-200">
                    {interestRate}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min="6.5"
                  max="14.0"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#071426] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-400 font-light">
                  <span>6.5%</span>
                  <span>8.5% (Typical Bank Rate)</span>
                  <span>14.0%</span>
                </div>
              </div>

              {/* Loan Tenure Slider */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider">
                  <span className="font-medium text-gray-700">Tenure</span>
                  <span className="font-bold text-sm text-[#071426] bg-[#F7F7F5] px-3 py-1 rounded-sm border border-gray-200">
                    {loanTenure} Years ({loanTenure * 12} Mos)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full accent-[#071426] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-gray-400 font-light">
                  <span>1 Year</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            {/* EMI Result Summary Card */}
            <div className="bg-[#071426] text-white p-6 rounded-sm space-y-4 border border-[#C8A45D]/20">
              <div className="text-center pb-4 border-b border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-[#C8A45D] font-semibold block">
                  Estimated Monthly EMI
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                  {formatIndianCurrency(emiResult.monthlyEmi)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                <div>
                  <span className="text-gray-400 block">Principal</span>
                  <span className="font-bold text-white text-sm block mt-0.5">
                    {formatIndianCurrency(loanAmount)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block">Interest Payable</span>
                  <span className="font-bold text-[#C8A45D] text-sm block mt-0.5">
                    {formatIndianCurrency(emiResult.totalInterest)}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-[11px] text-gray-300 flex justify-between mb-1.5 font-light">
                  <span>Principal: {emiResult.principalPercent}%</span>
                  <span>Interest: {emiResult.interestPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 overflow-hidden flex rounded-full">
                  <div
                    style={{ width: `${emiResult.principalPercent}%` }}
                    className="bg-[#C8A45D] h-full"
                  />
                  <div
                    style={{ width: `${emiResult.interestPercent}%` }}
                    className="bg-gray-600 h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tool 2: Haryana Land & Plot Area Converter */}
          <div className="bg-white rounded-sm p-7 sm:p-9 shadow-md border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 pb-5 border-b border-gray-100 mb-6">
                <div className="w-10 h-10 rounded-sm bg-[#C8A45D] text-[#071426] flex items-center justify-center shrink-0">
                  <Ruler className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#071426]">
                    Haryana Land Unit Converter
                  </h3>
                  <p className="text-xs text-gray-500 font-light">Convert Gaj, Sq. Yards, Marla & Sq. Feet</p>
                </div>
              </div>

              {/* Input section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-700 block">
                    Area Value
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={areaInput || ''}
                    onChange={(e) => setAreaInput(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-sm border border-gray-200 text-gray-900 font-bold text-lg focus:outline-none focus:border-[#C8A45D]"
                    placeholder="e.g. 250"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium uppercase tracking-wider text-gray-700 block">
                    From Unit
                  </label>
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value as any)}
                    className="w-full h-11 px-3.5 rounded-sm border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#C8A45D] bg-white"
                  >
                    <option value="sqyd">Gaj / Sq. Yards (Sq. Yds)</option>
                    <option value="sqft">Square Feet (Sq. Ft.)</option>
                    <option value="sqm">Square Metres (Sq. Mtr)</option>
                    <option value="marla">Marla (Haryana: 25 Gaj)</option>
                    <option value="kanal">Kanal (500 Gaj)</option>
                    <option value="acre">Acre (4,840 Gaj)</option>
                  </select>
                </div>
              </div>

              {/* Conversion Output Grid */}
              <div className="space-y-2.5 mb-6">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                  Equivalent Measurements
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-[#F7F7F5] p-3.5 rounded-sm border border-gray-200">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Gaj / Sq. Yds</span>
                    <div className="font-bold text-[#071426] text-base mt-1">
                      {convertedAreas.sqyd} <span className="text-xs text-gray-500 font-normal">Gaj</span>
                    </div>
                  </div>

                  <div className="bg-[#F7F7F5] p-3.5 rounded-sm border border-gray-200">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Square Feet</span>
                    <div className="font-bold text-[#071426] text-base mt-1">
                      {convertedAreas.sqft} <span className="text-xs text-gray-500 font-normal">Sq. Ft.</span>
                    </div>
                  </div>

                  <div className="bg-[#F7F7F5] p-3.5 rounded-sm border border-gray-200">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Square Metres</span>
                    <div className="font-bold text-[#071426] text-base mt-1">
                      {convertedAreas.sqm} <span className="text-xs text-gray-500 font-normal">Sq. M.</span>
                    </div>
                  </div>

                  <div className="bg-[#F7F7F5] p-3.5 rounded-sm border border-gray-200">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Marla (Haryana)</span>
                    <div className="font-bold text-[#071426] text-base mt-1">
                      {convertedAreas.marla} <span className="text-xs text-gray-500 font-normal">Marla</span>
                    </div>
                  </div>

                  <div className="bg-[#F7F7F5] p-3.5 rounded-sm border border-gray-200">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Kanal</span>
                    <div className="font-bold text-[#071426] text-base mt-1">
                      {convertedAreas.kanal} <span className="text-xs text-gray-500 font-normal">Kanal</span>
                    </div>
                  </div>

                  <div className="bg-[#F7F7F5] p-3.5 rounded-sm border border-gray-200">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Acre</span>
                    <div className="font-bold text-[#071426] text-base mt-1">
                      {convertedAreas.acre} <span className="text-xs text-gray-500 font-normal">Acres</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Haryana Standards Note */}
            <div className="bg-gray-50 border-l-2 border-[#C8A45D] p-4 text-xs text-gray-700 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-gray-900">
                <HelpCircle className="w-3.5 h-3.5 text-[#C8A45D]" />
                <span>Sector 37 & Faridabad Land Conventions:</span>
              </span>
              <p className="leading-relaxed font-light">
                In Sector 37 and HSVP / HUDA sectors, residential plots are customarily transacted in <strong>Gaj (Square Yards)</strong>. 1 Gaj is exactly 9 Square Feet. In Haryana revenue records, 1 Marla equals 25 Gaj (225 Sq. Ft.).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
