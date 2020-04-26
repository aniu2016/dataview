export function getDefaultChartSize(isInlineBlock: boolean) {
  if (isInlineBlock) {
    return {
      width: 376,
      height: 228,
    }
  }
  return {
    height: 148,
    autoFit: true,
  }
}
