
export interface DriverData {
  nameZh: string;
  nameEn: string;
  dob: string;
  gender: string;
  riskRating: string;
  penaltyPoints: string;
  idExpiry: string;
  licenseExpiry: string;
  rentalFee: string;
  insuranceFee: string;
  otherFee: string;
}

export enum ShiftType {
  MORNING = '早更',
  NIGHT = '晚更',
  SPECIAL = '特更'
}

export interface DayData {
  date: number;
  month: number;
  year: number;
  price?: number;
  shift?: ShiftType;
  isCurrentMonth: boolean;
  isSelected?: boolean;
  hasNotice?: boolean;
}

export interface RentalItem {
  id: string; // Combined key: date + shift
  date: string;
  shift: ShiftType;
  fee: number;
}
