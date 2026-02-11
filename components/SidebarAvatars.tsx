
import React from 'react';

const SidebarAvatars: React.FC = () => {
  const cards = [
    { label: '的士司機證' },
    { label: '駕駛執照' }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-white border border-[#f1f5f9] rounded-lg p-4 flex flex-col items-center justify-center space-y-2 min-h-[170px]">
          <div className="relative w-[70px] h-[70px] bg-[#eff6ff] rounded-full flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-[50px] h-[50px] text-[#60a5fa] opacity-80">
              <circle cx="50" cy="35" r="18" fill="currentColor" />
              <path d="M25 85 C25 65, 75 65, 75 85" fill="currentColor" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-[#cbd5e1] font-medium">暫無數據</p>
            <p className="text-[11px] text-[#475569] font-bold">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarAvatars;
