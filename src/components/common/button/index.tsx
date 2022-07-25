import React from 'react';
import Text from '../text';
import { cn } from 'utils';

/**
 * Properties for an interactable button component.
 */
type ButtonProps = {
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: string;
    text?: string;
    reversed?: boolean;
    children?: React.ReactNode;
};

/**
 * Pre-defined styling, according to agreed-upon design-system.
 */
const variants = {
    black: 'border-transparent bg-black text-white',
    orange: 'border-transparent bg-primary text-black', // TODO: Change name of variant to `highlight`.
    transparent: 'text-white',
};

/**
 * Definition of an interactable button component.
 *
 * @param type `type` Attribute of the `<button>` element.
 * @param variant Variations relating to pre-defined styling of the element
 * @param text Text to display in the button.
 */
const Button = ({
    onClick,
    type = 'button',
    variant = 'transparent',
    reversed = false,
    text: value,
    className,
    children,
}: ButtonProps) => (
    <button
        className={cn(
            variants[variant],
            'flex h-fit max-h-full w-fit items-center justify-center gap-3 whitespace-nowrap rounded-full border transition-all hover:-translate-y-[0.2rem] hover:bg-white hover:!text-black active:translate-y-[0.05rem] active:scale-95',
            value || React.Children.count(children) > 1
                ? 'px-5 py-3'
                : 'aspect-square p-3',
            reversed && 'flex-row-reverse',
            className,
        )}
        onClick={onClick}
        type={type}
    >
        {value && <Text variant="input">{value}</Text>}
        {children}
    </button>
);

export default Button;
