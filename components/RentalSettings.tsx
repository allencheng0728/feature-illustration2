
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface RentalSettingsProps {
  prices: { weekday: number; weekend: number; holiday: number };
  onPriceChange: (type: 'weekday' | 'weekend' | 'holiday', val: number) => void;
}

const RentalSettings: React.FC<RentalSettingsProps> = ({ prices, onPriceChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const labelClass = "block text-[10px] text-[#94a3b8] font-bold mb-1 uppercase tracking-wider";
  const inputClass = "w-full bg-[#f8fafc] border border-[#e2e8f0] rounded px-2 py-1.5 text-[11px] text-center text-[#1e293b] focus:outline-none focus:border-[#3b82f6] font-bold transition-all";

  return (
    <div className="bg-white border border-[#f1f5f9] rounded-lg overflow-hidden transition-all duration-200 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <h2 className="text-[11px] text-[#475569] font-bold">司機過往租金</h2>
        <div className="text-[#94a3b8]">
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="border-t border-[#f1f5f9] pt-3 grid grid-cols-3 gap-3">
            <div>
              <label className={labelClass}>平日</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={prices.weekday} 
                  onChange={(e) => onPriceChange('weekday', Number(e.target.value))}
                  className={inputClass}
                />
                <span className="absolute right-2 top-1.5 text-[#cbd5e1] text-[9px]">$</span>
              </div>
            </div>
            <div>
              <label className={labelClass}>週末</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={prices.weekend} 
                  onChange={(e) => onPriceChange('weekend', Number(e.target.value))}
                  className={inputClass}
                />
                <span className="absolute right-2 top-1.5 text-[#cbd5e1] text-[9px]">$</span>
              </div>
            </div>
            <div>
              <label className={labelClass}>紅日</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={prices.holiday} 
                  onChange={(e) => onPriceChange('holiday', Number(e.target.value))}
                  className={inputClass}
                />
                <span className="absolute right-2 top-1.5 text-[#cbd5e1] text-[9px]">$</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalSettings;
