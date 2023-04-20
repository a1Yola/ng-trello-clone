import { EPriorityBgColors, EPriorityViewValues } from '../enums/priority.enum';

export interface IPriority {
  value: number;
  viewValue: EPriorityViewValues;
  bgColor: EPriorityBgColors;
}

export const priorities: IPriority[] = [
  {
    value: 1,
    viewValue: EPriorityViewValues.Critical,
    bgColor: EPriorityBgColors.Red,
  },
  {
    value: 2,
    viewValue: EPriorityViewValues.VeryHigh,
    bgColor: EPriorityBgColors.Orange,
  },
  {
    value: 3,
    viewValue: EPriorityViewValues.High,
    bgColor: EPriorityBgColors.Yellow,
  },
  {
    value: 4,
    viewValue: EPriorityViewValues.RelativelyHigh,
    bgColor: EPriorityBgColors.Lemon,
  },
  {
    value: 5,
    viewValue: EPriorityViewValues.AboveMedium,
    bgColor: EPriorityBgColors.DarkBlue,
  },
  {
    value: 6,
    viewValue: EPriorityViewValues.Medium,
    bgColor: EPriorityBgColors.Blue,
  },
  {
    value: 7,
    viewValue: EPriorityViewValues.BelowMedium,
    bgColor: EPriorityBgColors.Teal,
  },
  {
    value: 8,
    viewValue: EPriorityViewValues.RelativelyLow,
    bgColor: EPriorityBgColors.DarkGreen,
  },
  {
    value: 9,
    viewValue: EPriorityViewValues.Low,
    bgColor: EPriorityBgColors.Green,
  },
  {
    value: 10,
    viewValue: EPriorityViewValues.VeryLow,
    bgColor: EPriorityBgColors.BrightGreen,
  },
];
