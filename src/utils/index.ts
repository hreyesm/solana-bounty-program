import { format } from 'date-fns';

// Concatenates classes into a single className string
const cn = (...args: string[]) => args.join(' ');

const formatDate = (date: string) => format(new Date(date), 'dd MMM');

const bountiesToLevel = (bounties: number) =>
    clamp(Math.round(1.57345 * Math.pow(bounties, 100 / 143)), 1, 100);

const levelToBounties = (level: number) => 0.523 * Math.pow(level, 1.43);

/**
 * Formats number as currency string.
 *
 * @param number Number to format.
 */
const numberToCurrencyString = (number: number) =>
    number.toLocaleString('en-US');

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
const clamp = (current, min, max) => Math.min(Math.max(current, min), max);

export {
    cn,
    formatDate,
    numberToCurrencyString,
    bountiesToLevel,
    levelToBounties,
    clamp,
};
