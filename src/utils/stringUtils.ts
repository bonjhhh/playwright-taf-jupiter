export function removeTrailingZeros(value: string): string {
    return value.replace(/\.?0+$/, '');
  }