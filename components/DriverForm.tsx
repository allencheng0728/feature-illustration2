
import React from 'react';
import { DriverData } from '../types';

interface DriverFormProps {
  driver: DriverData;
}

const DriverForm: React.FC<DriverFormProps> = ({ driver }) => {
  const inputClass = "w-full bg-[#f8fafc] border border-gray-200 rounded px-3 py-2 text-sm text-[#64748b] focus:outline-none cursor-default";
  const labelClass = "block text-[11px] text-[#94a3b8] font-medium mb-1";

  const renderField = (label: string, value: string) => (
    <div className="space-y-1">
      <label className={labelClass}>{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className={inputClass}
      />
    </div>
  );

  const renderCurrencyField = (label: string, value: string) => (
    <div className="space-y-1">
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          readOnly
          className={`${inputClass} pr-8`}
        />
        <span className="absolute right-3 top-2.5 text-[#cbd5e1] text-xs">$</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Row 1: Names */}
      <div className="grid grid-cols-2 gap-4">
        {renderField('司機姓名(中文)', driver.nameZh)}
        {renderField('司機姓名(英文)', driver.nameEn)}
      </div>

      {/* Row 2: DOB & Gender */}
      <div className="grid grid-cols-2 gap-4">
        {renderField('出生日期', driver.dob)}
        {renderField('性別', driver.gender)}
      </div>

      {/* Row 3: Risk & Penalty */}
      <div className="grid grid-cols-2 gap-4">
        {renderField('風險評分', driver.riskRating)}
        {renderField('累積違規點數', driver.penaltyPoints)}
      </div>

      {/* Row 4: Expiry Dates */}
      <div className="grid grid-cols-2 gap-4">
        {renderField('司機證到期日', driver.idExpiry)}
        {renderField('駕駛執照到期日', driver.licenseExpiry)}
      </div>

      {/* Row 5: Rental & Insurance Fees */}
      <div className="grid grid-cols-2 gap-4">
        {renderCurrencyField('租金未清總額(通知)', driver.rentalFee)}
        {renderCurrencyField('保險租金未清總額(通知)', driver.insuranceFee)}
      </div>

      {/* Row 6: Other Fee */}
      <div className="grid grid-cols-2 gap-4">
        {renderCurrencyField('意外租金未清總額(通知)', driver.otherFee)}
        <div />
      </div>
    </div>
  );
};

export default DriverForm;
