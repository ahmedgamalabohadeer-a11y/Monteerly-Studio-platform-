import assert from 'node:assert/strict';
import test from 'node:test';
import { parseEgpToMinorUnits } from '../egp-minor-units.ts';

test('converts whole and fractional EGP amounts to piastres', () => {
  assert.equal(parseEgpToMinorUnits('100.00'), 10000);
  assert.equal(parseEgpToMinorUnits('99.99'), 9999);
  assert.equal(parseEgpToMinorUnits('0.00'), 0);
});

test('accepts correctly grouped thousands', () => {
  assert.equal(parseEgpToMinorUnits('1,000.00'), 100000);
});

test('rounds half-up to the nearest piastre', () => {
  assert.equal(parseEgpToMinorUnits('0.005'), 1);
  assert.equal(parseEgpToMinorUnits('0.0049'), 0);
});

test('rejects negative amounts', () => {
  assert.throws(() => parseEgpToMinorUnits('-0.01'), RangeError);
});

test('rejects non-decimal values and malformed grouping', () => {
  assert.throws(() => parseEgpToMinorUnits('not a number'), TypeError);
  assert.throws(() => parseEgpToMinorUnits('1,00.00'), TypeError);
  assert.throws(() => parseEgpToMinorUnits(100), TypeError);
});

test('enforces the one-million-EGP limit before rounding', () => {
  assert.equal(parseEgpToMinorUnits('1,000,000.00'), 100000000);
  assert.throws(() => parseEgpToMinorUnits('1,000,000.001'), RangeError);
});
