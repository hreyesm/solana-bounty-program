import type { CSSProperties, MouseEvent, ReactElement } from 'react';
import React from 'react';

export type ButtonProps = {
    className?: string;
    disabled?: boolean;
    endIcon?: ReactElement;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    startIcon?: ReactElement;
    style?: CSSProperties;
    tabIndex?: number;
    children;
};

export const Button = (props: ButtonProps) => (
        <button
            className={`wallet-adapter-button ${props.className || ''}`}
            disabled={props.disabled}
            onClick={props.onClick}
            tabIndex={props.tabIndex || 0}
        >
            {props.startIcon && (
                <i className="wallet-adapter-button-start-icon">
                    {props.startIcon}
                </i>
            )}
            {props.children}
            {props.endIcon && (
                <i className="wallet-adapter-button-end-icon">
                    {props.endIcon}
                </i>
            )}
        </button>
    );
