import { Color } from 'three';

/**
 * Media query breakpoints
 */
export const media: Record<string, number> = {
  desktop: 1600,
  laptop: 1280,
  tablet: 1024,
  mobile: 696,
  mobileS: 320,
};

/**
 * Convert a px string to a number
 */
export const pxToNum = (px: string): number => Number(px.replace('px', ''));

/**
 * Convert a number to a px string
 */
export const numToPx = (num: number): string => `${num}px`;

/**
 * Convert pixel values to rem for a11y
 */
export const pxToRem = (px: number): string => `${px / 16}rem`;

/**
 * Convert ms token values to a raw number for ReactTransitionGroup
 * Transition delay props
 */
export const msToNum = (msString: string): number => Number(msString.replace('ms', ''));

/**
 * Convert a number to an ms string
 */
export const numToMs = (num: number): string => `${num}ms`;

/**
 * Convert an RGB theme property (e.g., '0 0 0') to a ThreeJS Color class
 */
export const rgbToThreeColor = (rgb: string): Color => {
  return new Color(...rgb.split(' ').map((value) => Number(value) / 255));
};