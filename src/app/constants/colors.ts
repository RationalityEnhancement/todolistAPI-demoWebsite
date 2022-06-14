import { InjectionToken } from "@angular/core";

export type ColorConfig = string[];

export const COLORS = [
    '#a35e44',
    '#4fb127',
    '#82749c',
    '#d6b08c',
    '#3b1267',
    '#150c6a',
    '#2f0036',
    '#562e15',
    '#f561fa',
    '#3e2a23'
  ];

export const COLOR_CONFIG = new InjectionToken<ColorConfig>('app.colors');
