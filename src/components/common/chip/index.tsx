import Text from '../text';
import { cn } from 'utils';
import { IconType } from 'react-icons';
import React from 'react';

/**
 * Properties for a card component.
 */
type ChipProps = {
    className?: string;
    highlightValue?: string;
    value?: string;
    icon?: IconType;
    children?: React.ReactNode;
    reversed?: boolean;
    interactive?: boolean;
    onClick?: () => void;
};

/**
 * Definition of a card component,the main purpose of
 * which is to neatly display information. Can be both
 * interactive and static.
 *
 * @param className Custom classes to be applied to the element.
 * @param children Child elements to be rendered within the component.
 * @param blur Whether or not to apply a blur-effect.
 */
const Chip = ({ className, highlightValue, value, icon, children, reversed, interactive, onClick}: ChipProps) => (
    <div 
        className={cn(
            interactive && "cursor-pointer hover:bg-black/30 transition-colors",
            "flex flex-row items-center gap-1.5 w-fit rounded-full bg-black/50 px-2 py-1" 
        )}
        onClick={onClick}
    >
        <Text
            variant="label"
            className={cn(
                className,
                'flex flex-row items-center gap-1',
                reversed && 'flex-row-reverse',
            )}
        >
            {highlightValue && (
                <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-medium text-primary">
                    {' '}
                    {highlightValue}{' '}
                </span>
            )}
            {value && (
                <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-secondary">
                    {' '}
                    {value}{' '}
                </span>
            )}  
        </Text>
        { icon && React.createElement(icon, { size: 13 }) }
        { children }
    </div>
);

export default Chip;
