import { format } from 'date-fns';

// Concatenates classes into a single className string
const cn = (...args: string[]) => args.join(' ');

const formatDate = (date: string) => format(new Date(date), 'dd MMM');

const bountiesToLevel = (bounties: number) => {
    const power = 100 / 143;
    const level = 1.57345 * Math.pow(bounties, power);
    return Math.round(level);
};

const levelToBounties = (level: number) => 0.523 * Math.pow(level, 1.43);

/**
 * Formats number as currency string.
 *
 * @param number Number to format.
 */
const numberToCurrencyString = (number: number) =>
    number.toLocaleString('en-US');

export { cn, formatDate, numberToCurrencyString, bountiesToLevel, levelToBounties };
