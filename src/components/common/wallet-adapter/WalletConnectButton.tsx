import { useWallet } from '@solana/wallet-adapter-react';
import type { FC, MouseEventHandler } from 'react';
import React, { useCallback, useMemo } from 'react';
import type { ButtonProps } from './Button';
import  Button from '../button';
import { TbWallet, TbWalletOff } from 'react-icons/tb';

export const WalletConnectButton: FC<ButtonProps> = ({ children, disabled, onClick, ...props }) => {
    const { wallet, connect, connecting, connected } = useWallet();

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        (event) => {
            if (onClick) onClick(event);
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            if (!event.defaultPrevented) connect().catch(() => {});
        },
        [onClick, connect]
    );

    const content = useMemo(() => {
        if (children) return children;
        if (connecting) return 'Connecting ...';
        if (connected) return 'Connected';
        if (wallet) return 'Connect';
        return 'Connect Wallet';
    }, [children, connecting, connected, wallet]);

    return (
        <Button
            disabled={disabled || !wallet || connecting || connected}
            icon={wallet ? TbWalletOff : TbWallet}
            onClick={handleClick}
            variant="transparent"
            className="!w-full"
            text="Connect Wallet"
            {...props}
        >
            {content}
        </Button>
    );
};
