import { formatUnits } from '@ethersproject/units';
import { BigNumberish } from '@ethersproject/bignumber';

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length,
  )}`;
}

/**
 * @name parseBalance
 *
 * @param {import("@ethersproject/bignumber").BigNumberish} balance
 * @param {number} decimals
 * @param {number} decimalsToDisplay
 *
 * @returns {string}
 */
export const parseBalance = (
  balance: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3,
): string => Number(formatUnits(balance, decimals)).toFixed(decimalsToDisplay);
