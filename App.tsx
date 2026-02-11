
import React, { useState, useCallback, useMemo } from 'react';
import { X, Search, ChevronRight } from 'lucide-react';
import { DriverData, RentalItem, ShiftType } from './types';
import DriverForm from './components/DriverForm';
import Calendar from './components/Calendar';
import SidebarAvatars from './components/SidebarAvatars';
import RentalSection from './components/RentalSection';
import RentalSettings from './components/RentalSettings';

const App: React.FC = () => {
  const [driver] = useState<DriverData>({
    nameZh: '相的正',
    nameEn: 'ZU DI ZHENG',
    dob: '',
    gender: '',
    riskRating: '',
    penaltyPoints: '1',
    idExpiry: '2028-01-01',
    licenseExpiry: '2028-01-01',
    rentalFee: '0.00',
    insuranceFee: '0.00',
    otherFee: '0.00',
  });

  const [activeShift, setActiveShift] = useState<ShiftType>(ShiftType.MORNING);
  const [defaultPrices, setDefaultPrices] = useState({
    weekday: 450,
    weekend: 500,
    holiday: 650
  });

  // Red days logic (consistent across app)
  const isRedDay = (dateStr: string) => {
    const d = new Date(dateStr).getDate();
    return [1, 8, 15, 22, 17, 19].includes(d);
  };

  // Manage rental items based on selected dates and shifts
  const [rentalItems, setRentalItems] = useState<RentalItem[]>([
    { id: '2026-02-04-早更', date: '2026-02-04', shift: ShiftType.MORNING, fee: 450 }
  ]);

  const handleToggleDate = useCallback((dateStr: string) => {
    setRentalItems(prev => {
      const id = `${dateStr}-${activeShift}`;
      const exists = prev.find(item => item.id === id);
      
      if (exists) {
        return prev.filter(item => item.id !== id);
      } else {
        const day = new Date(dateStr);
        const dayOfWeek = day.getDay();
        const isRed = isRedDay(dateStr);
        
        let fee = defaultPrices.weekday;
        if (isRed) fee = defaultPrices.holiday;
        else if (dayOfWeek === 6 || dayOfWeek === 0) fee = defaultPrices.weekend;

        return [...prev, { id, date: dateStr, shift: activeShift, fee }];
      }
    });
  }, [activeShift, defaultPrices]);

  const handleUpdateGroupPrice = useCallback((shift: ShiftType, isRed: boolean, newPrice: number) => {
    setRentalItems(prev => prev.map(item => {
      if (item.shift === shift && isRedDay(item.date) === isRed) {
        return { ...item, fee: newPrice };
      }
      return item;
    }));
  }, []);

  const handleDefaultPriceChange = (type: 'weekday' | 'weekend' | 'holiday', val: number) => {
    setDefaultPrices(prev => ({ ...prev, [type]: val }));
    // Also update existing items that use the default prices and haven't been manually overridden? 
    // Usually better to only apply to new selections or if user explicitly asks.
    // For this demo, we'll just update the defaults for future selections.
  };

  const totalFee = rentalItems.reduce((acc, item) => acc + (Number(item.fee) || 0), 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9] p-4 font-sans text-[#334155]">
      <div className="bg-white w-full max-w-[960px] rounded-lg shadow-xl overflow-hidden relative border border-[#e2e8f0]">
        
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3.5 border-b border-[#f1f5f9]">
          <h1 className="text-base font-bold text-[#1e293b]">ABC111 新增更新</h1>
          <button className="text-[#94a3b8] hover:text-[#64748b] transition-colors">
            <X size={18} strokeWidth={2.5} />
          </button>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Search Section */}
              <div className="space-y-1.5">
                <p className="text-[10px] text-[#94a3b8] font-medium">切換搜尋司機/代理人/店舖</p>
                <div className="flex gap-2">
                  <div className="relative w-[110px]">
                    <select className="w-full appearance-none bg-white border border-[#e2e8f0] rounded px-3 py-1.5 text-xs text-[#334155] focus:outline-none focus:border-[#3b82f6]">
                      <option>司機</option>
                    </select>
                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-[#94a3b8]">
                      <ChevronRight size={12} className="rotate-90" />
                    </div>
                  </div>
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      defaultValue="相的正 (55991212)"
                      className="w-full border border-[#e2e8f0] rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#3b82f6] text-[#64748b]"
                    />
                    <Search size={14} className="absolute right-3 top-2 text-[#cbd5e1]" />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] whitespace-nowrap">
                  <span className="text-red-500 font-bold">*</span>
                  <span className="text-[#94a3b8]">找不到司機/代理人資料？請點擊</span>
                  <button className="text-[#0ea5e9] hover:underline font-medium">新增司機</button>
                  <span className="text-[#cbd5e1]">/</span>
                  <button className="text-[#0ea5e9] hover:underline font-medium">新增代理公司/代理人</button>
                </div>
              </div>

              {/* Form Section */}
              <DriverForm driver={driver} />

              {/* Rental Settings Section */}
              <RentalSettings prices={defaultPrices} onPriceChange={handleDefaultPriceChange} />

              {/* Rental Items Section */}
              <RentalSection items={rentalItems} onUpdateGroupPrice={handleUpdateGroupPrice} />

            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 space-y-5">
              <SidebarAvatars />
              <Calendar 
                selectedDates={rentalItems.map(item => item.date)} 
                activeShift={activeShift}
                rentalItems={rentalItems}
                defaultPrices={defaultPrices}
                onToggleDate={handleToggleDate} 
                onShiftChange={setActiveShift}
              />
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#f1f5f9] px-6 py-5 bg-white">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="space-y-3.5 flex-1">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-[#cbd5e1] text-[#3b82f6] focus:ring-[#3b82f6]" />
                <span className="text-[11px] text-[#64748b]">已閱讀 ( <span className="text-[#ef4444] font-medium">請確認已閱讀租車編更須知</span> )</span>
              </div>
              <div className="space-y-0.5 text-[10px] text-[#94a3b8] leading-normal font-medium">
                <p>一旦租金設定為 0，系統將自動：</p>
                <div className="pl-1">
                  <p>• 認定您採用線下租金協商</p>
                  <p>• 將訂單狀態設為「已支付」</p>
                  <p>• 立即開通司機對應更數的電子車鑰匙遠端開鎖權限</p>
                </div>
                <p className="mt-1 text-[#94a3b8]">請務必在確認已完成線下租金協商後，再使用此設定。</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 w-full md:w-auto">
              <div className="text-right">
                <span className="text-[10px] text-[#0ea5e9] font-bold mr-2 tracking-tighter uppercase">合共租金</span>
                <span className="text-[34px] font-bold text-[#ef4444] leading-none">${totalFee}</span>
              </div>
              <div className="flex gap-2 w-full">
                <button className="flex-1 md:flex-none px-6 py-2 border border-[#e2e8f0] rounded-full text-[11px] text-[#94a3b8] hover:bg-gray-50 transition-colors font-medium">取消</button>
                <button className="flex-1 md:flex-none px-6 py-2 bg-[#2563eb] text-white rounded-full text-[11px] font-bold hover:bg-[#1d4ed8] transition-shadow shadow-sm">更新更新並創建訂單</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
