import type { MouseEvent } from 'react';
import React, { useCallback } from 'react';
import  Button from '../button';
import { useWalletModal } from './useWalletModal';
import { TbWallet } from 'react-icons/tb';

export const WalletModalButton= () => {
    const { visible, setVisible } = useWalletModal();

    const handleClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            if (!event.defaultPrevented) setVisible(!visible);
        },
        [visible]
    );

    return (
        <Button
            icon={TbWallet}
            onClick={handleClick}
            variant="transparent"
            className="!w-full"
            text="Connect"
        ></Button>
    );
};
