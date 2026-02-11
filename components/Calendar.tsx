
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ShiftType, RentalItem } from '../types';

interface CalendarProps {
  selectedDates: string[];
  activeShift: ShiftType;
  rentalItems: RentalItem[];
  defaultPrices: { weekday: number; weekend: number; holiday: number };
  onToggleDate: (dateStr: string) => void;
  onShiftChange: (shift: ShiftType) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDates, activeShift, rentalItems, defaultPrices, onToggleDate, onShiftChange }) => {
  const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];
  
  // Generating Feb 2026 data
  const days = Array.from({ length: 28 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-02-${dayNum.toString().padStart(2, '0')}`;
    const dayOfWeekIdx = (i + 0) % 7; // Feb 1st 2026 is a Sunday (0)
    
    // Check if there is an existing rental item for this date and shift
    const existingItem = rentalItems.find(item => item.date === dateStr && item.shift === activeShift);
    
    const isRed = [1, 8, 15, 22, 17, 19].includes(dayNum);
    
    // Determine the price to show
    let price: number;
    if (existingItem) {
      price = existingItem.fee;
    } else {
      // Logic for default prices synchronization
      if (isRed) {
        price = defaultPrices.holiday;
      } else if (dayOfWeekIdx === 0 || dayOfWeekIdx === 6) {
        price = defaultPrices.weekend;
      } else {
        price = defaultPrices.weekday;
      }
    }

    return {
      d: dayNum,
      current: true,
      price: price,
      isRed: isRed,
      badge: [17, 18, 19].includes(dayNum) ? '網' : null,
      dateStr
    };
  });

  const paddingDays = Array.from({ length: 14 }, (_, i) => ({
    d: i + 1,
    current: false,
    dateStr: `2026-03-${(i + 1).toString().padStart(2, '0')}`
  }));

  const allDays = [...days, ...paddingDays];

  return (
    <div className="bg-white rounded-lg border border-[#f1f5f9] overflow-hidden shadow-sm">
      <div className="bg-[#22c55e] text-white flex items-center justify-between px-3 py-2.5">
        <button className="flex items-center text-[10px] font-bold"><ChevronLeft size={14} className="mr-0.5"/> 1月</button>
        <h2 className="text-[12px] font-bold tracking-widest">2026年2月</h2>
        <button className="flex items-center text-[10px] font-bold">3月 <ChevronRight size={14} className="ml-0.5"/></button>
      </div>

      <div className="p-3.5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 border border-[#cbd5e1] rounded bg-white"></div>
            <span className="text-[10px] text-[#64748b] font-bold">全選</span>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-bold text-[#94a3b8]">
            <button 
              onClick={() => onShiftChange(ShiftType.MORNING)}
              className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded-full transition-colors ${activeShift === ShiftType.MORNING ? 'bg-orange-50 ring-1 ring-orange-200' : 'hover:bg-gray-50'}`}
            >
              <span className={`w-2.5 h-2.5 rounded-full bg-[#fdba74] ${activeShift === ShiftType.MORNING ? 'ring-2 ring-white ring-inset' : ''}`}></span> 
              <span className={activeShift === ShiftType.MORNING ? 'text-orange-600' : ''}>早更</span>
            </button>
            <button 
              onClick={() => onShiftChange(ShiftType.NIGHT)}
              className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded-full transition-colors ${activeShift === ShiftType.NIGHT ? 'bg-blue-50 ring-1 ring-blue-200' : 'hover:bg-gray-50'}`}
            >
              <span className={`w-2.5 h-2.5 rounded-full bg-[#93c5fd] ${activeShift === ShiftType.NIGHT ? 'ring-2 ring-white ring-inset' : ''}`}></span> 
              <span className={activeShift === ShiftType.NIGHT ? 'text-blue-600' : ''}>晚更</span>
            </button>
            <button 
              onClick={() => onShiftChange(ShiftType.SPECIAL)}
              className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded-full transition-colors ${activeShift === ShiftType.SPECIAL ? 'bg-emerald-50 ring-1 ring-emerald-200' : 'hover:bg-gray-50'}`}
            >
              <span className={`w-2.5 h-2.5 rounded-full bg-[#6ee7b7] ${activeShift === ShiftType.SPECIAL ? 'ring-2 ring-white ring-inset' : ''}`}></span> 
              <span className={activeShift === ShiftType.SPECIAL ? 'text-emerald-600' : ''}>特更</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 text-center mb-1 text-[10px] font-bold text-[#94a3b8]">
          {daysOfWeek.map((d, i) => (
            <div key={d} className={`py-1.5 ${i === 0 || i === 6 ? 'text-[#f87171]' : ''}`}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {allDays.map((day, idx) => {
            const isSelectedWithActiveShift = rentalItems.some(item => item.date === day.dateStr && item.shift === activeShift);
            
            return (
              <div 
                key={idx}
                onClick={() => day.current && onToggleDate(day.dateStr)}
                className={`
                  relative h-11 flex flex-col items-center justify-center rounded border transition-all cursor-pointer
                  ${day.current ? 'bg-white border-[#f1f5f9]' : 'bg-[#f8fafc] text-[#cbd5e1] border-transparent'}
                  ${isSelectedWithActiveShift ? 'bg-[#2563eb] text-white border-[#2563eb] z-10' : 'hover:border-blue-200'}
                `}
              >
                <span className={`text-[10px] font-bold ${(day as any).isRed && !isSelectedWithActiveShift ? 'text-[#f87171]' : ''}`}>{day.d}</span>
                {day.current && <span className={`text-[8px] font-medium mt-0.5 ${isSelectedWithActiveShift ? 'text-blue-100' : 'text-[#94a3b8]'}`}>${(day as any).price}</span>}
                
                {isSelectedWithActiveShift && (
                  <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 border border-[#bfdbfe]">
                      <div className="w-2.5 h-2.5 bg-[#2563eb] rounded-full flex items-center justify-center">
                          <span className="text-white text-[6px]">✓</span>
                      </div>
                  </div>
                )}
                {(day as any).badge && (
                  <div className="absolute top-0.5 right-0.5">
                    <span className="bg-[#ef4444] text-white text-[7px] px-0.5 rounded-sm font-bold leading-none py-0.5">網</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
