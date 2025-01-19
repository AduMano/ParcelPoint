// Status Options
export type TStatusOptions = "Claimed" | "Delivered";

// Ranged Date
type TRangedDateType = Date | undefined;

export interface IRangedDate {
  startDate: TRangedDateType;
  endDate: TRangedDateType;
}