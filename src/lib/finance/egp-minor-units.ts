const MAX_EGP = BigInt('1000000');
const MINOR_UNITS_PER_EGP = BigInt('100');
const ONE_MINOR_UNIT = BigInt('1');

export function parseEgpToMinorUnits(input: unknown): number {
  if (typeof input !== 'string') {
    throw new TypeError('Amount must be a decimal string.');
  }

  const value = input.trim();
  if (/^-\d/.test(value)) {
    throw new RangeError('Amount cannot be negative.');
  }

  const match = /^(\d[\d,]*)(?:\.(\d+))?$/.exec(value);
  if (!match) {
    throw new TypeError('Amount must be a valid decimal string.');
  }

  const [integerText, fractionalDigits = ''] = match.slice(1);
  if (
    integerText.includes(',')
      ? !/^\d{1,3}(?:,\d{3})+$/.test(integerText)
      : !/^\d+$/.test(integerText)
  ) {
    throw new TypeError('Amount has invalid thousands separators.');
  }

  const wholeEgp = BigInt(integerText.replaceAll(',', ''));
  if (wholeEgp > MAX_EGP || (wholeEgp === MAX_EGP && /[1-9]/.test(fractionalDigits))) {
    throw new RangeError('Amount exceeds the maximum of 1,000,000 EGP.');
  }

  const fractionalMinor = BigInt(fractionalDigits.slice(0, 2).padEnd(2, '0'));
  let minorUnits = wholeEgp * MINOR_UNITS_PER_EGP + fractionalMinor;
  if (fractionalDigits[2] !== undefined && fractionalDigits[2] >= '5') {
    minorUnits += ONE_MINOR_UNIT;
  }

  return Number(minorUnits);
}
