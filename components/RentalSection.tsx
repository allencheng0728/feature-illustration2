
import React from 'react';
import { RentalItem, ShiftType } from '../types';

interface RentalSectionProps {
  items: RentalItem[];
  onUpdateGroupPrice: (shift: ShiftType, isRed: boolean, price: number) => void;
}

const RentalSection: React.FC<RentalSectionProps> = ({ items, onUpdateGroupPrice }) => {
  // Helper to determine day category
  const getDayCategory = (dateStr: string) => {
    const d = new Date(dateStr).getDate();
    return [1, 8, 15, 22, 17, 19].includes(d); // Red/Sunday logic
  };

  // Grouping logic
  const grouped = items.reduce((acc, item) => {
    const isRed = getDayCategory(item.date);
    const key = `${item.shift}-${isRed}`;
    if (!acc[key]) {
      acc[key] = {
        shift: item.shift,
        isRed,
        count: 0,
        fee: item.fee,
      };
    }
    acc[key].count += 1;
    // We assume the fee is the same for the group or we take the first one
    return acc;
  }, {} as Record<string, { shift: ShiftType, isRed: boolean, count: number, fee: number }>);

  // Added explicit type casting to fix TypeScript errors where group properties were inaccessible on 'unknown'
  const groupList = Object.values(grouped) as { shift: ShiftType, isRed: boolean, count: number, fee: number }[];

  const inputClass = "w-full bg-[#f8fafc] border border-[#e2e8f0] rounded px-3 py-1.5 text-xs text-[#64748b] focus:outline-none transition-all";

  return (
    <div className="pt-4 space-y-4">
      <div className="flex justify-between items-end mb-1">
        <div className="space-y-1">
          <h2 className="text-[13px] text-[#475569] font-medium">已選租用更數</h2>
          <p className="text-[32px] font-medium text-[#475569] leading-tight">{items.length}更</p>
        </div>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-12 gap-4 text-[11px] font-medium text-[#94a3b8] px-0.5 mb-1">
        <div className="col-span-4">更新類型</div>
        <div className="col-span-3">數量</div>
        <div className="col-span-3">每更租金</div>
        <div className="col-span-2 text-right text-[#3b82f6]">租金小計</div>
      </div>

      {/* Rows */}
      <div className="space-y-3 min-h-[140px]">
        {groupList.length === 0 ? (
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4">
              <div className={`${inputClass} text-center`}>-</div>
            </div>
            <div className="col-span-3">
              <div className={`${inputClass} text-center`}>-</div>
            </div>
            <div className="col-span-3">
              <div className={`${inputClass} text-center`}>-</div>
            </div>
            <div className="col-span-2 text-right">
              <span className="text-sm font-medium text-[#475569]">$0</span>
            </div>
          </div>
        ) : (
          groupList.map((group, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4">
                <input
                  type="text"
                  readOnly
                  value={`${group.shift}/${group.isRed ? '週日' : '平日'}`}
                  className={`${inputClass} font-medium`}
                />
              </div>
              <div className="col-span-3">
                <input
                  type="text"
                  readOnly
                  value={group.count}
                  className={`${inputClass} text-center font-medium`}
                />
              </div>
              <div className="col-span-3">
                <input 
                  type="number" 
                  value={group.fee} 
                  onChange={(e) => onUpdateGroupPrice(group.shift, group.isRed, Number(e.target.value))}
                  className={`${inputClass} text-center text-[#1e293b] focus:border-[#3b82f6] font-medium`}
                />
              </div>
              <div className="col-span-2 text-right">
                <span className="text-sm font-medium text-[#475569]">${group.fee * group.count}</span>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="border-b border-[#f1f5f9] mt-2"></div>
    </div>
  );
};

export default RentalSection;
