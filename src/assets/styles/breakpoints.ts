export const BREAKPOINTS = {
  xs: 580,
  sm: 768,
  md: 955,
  ml: 1024,
  lg: 1200,
  xl: 1400,
  xxl: 1600,
} as const;

export const media = (width: number) => `@media (max-width: ${width}px)` as const;
