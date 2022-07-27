import React from 'react';
import { cn } from 'utils';

/**
 * Properties for a card component.
 */
type CardProps = {
    className?: string;
    children?: React.ReactNode;
    tabIndex?: number;
    blur?: boolean;
    border?: boolean;
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

const Card = ({
    className,
    children,
    tabIndex,
    border,
    blur = true,
}: CardProps) => (
    <div
        className={cn(
            className,
            blur &&
                border &&
                'border border-white bg-base/75 text-white backdrop-blur-lg backdrop-filter',
            'rounded-3xl', // w-fit max-w-full
            blur && ' bg-base/75 text-white backdrop-blur-lg backdrop-filter',
            'rounded-3xl',
        )}
        tabIndex={tabIndex}
    >
        {children}
    </div>
);

export default Card;
