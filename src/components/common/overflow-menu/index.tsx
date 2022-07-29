import { MdAccountCircle, MdCheck, MdClose, MdContentCopy, MdLogout, MdManageAccounts, MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { VscGithubAlt } from 'react-icons/vsc';
import { useRef, useState } from 'react';

import Card from '../card';
import Link from 'next/link';
import Text from '../text';
import { User } from '@supabase/supabase-js';
import { cn } from 'utils';
import Chip from '../chip';
import Button from '../button';

type OverflowMenuProps = {
    user: User;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
};

const OverflowMenu = ({ user, signIn, signOut }: OverflowMenuProps) => {
    const buttonRef = useRef();
    const [menuOpen, setMenuOpen] = useState(false);
    // test variables for wallet will be removed later
    const walletAddress = 'FNfUy8Qp6C9NCD6cz9xHLYSL7n3eFX8LfY1zDx6RcE8G';
    const walletConnected = true;

    return (
        <>
            <div className="dropdown-open dropdown-end dropdown backdrop-filter backdrop-blur">
                <label tabIndex={0}>
                    <div className="flex flex-row items-center gap-3">
                        {user && (
                            <Text variant="label">
                                <Link
                                    href={`${user.user_metadata.user_name}`}
                                    passHref
                                >
                                    {user.user_metadata.user_name}
                                </Link>
                            </Text>
                        )}
                        <Button
                            variant="orange"
                            icon={MdManageAccounts}
                            onClick={() => setMenuOpen(!menuOpen)}
                            ref={buttonRef}
                        />
                    </div>
                </label>
                <Card
                    tabIndex={0}
                    className="dropdown-content block mt-3 w-64"
                >
                    <div className="flex flex-col gap-3 p-3" onClick={user ? null : signIn}>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-1 w-full">
                                <Text variant="label" className="text-secondary"> Profile </Text>
                                <Text 
                                    variant="nav"
                                    className={`${user && "text-primary"}`}
                                >
                                    {user ? user.user_metadata.user_name : "Login with GitHub"}
                                </Text>
                            </div>  
                            {!user && <VscGithubAlt size={25} />}
                        </div>
                        <Button text="Sign out" icon={MdLogout} variant="danger" className="!w-full" />
                    </div>
                    <div className="h-px w-full bg-line"/>
                    <div className="flex flex-col gap-3 p-3">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-1 w-full">
                                <Text variant="label" className="text-secondary"> Wallet </Text>

                                {/* <Text variant="nav" className="w-32 overflow-hidden text-ellipsis">
                                    {walletConnected ? walletAddress : "Connect"}
                                </Text> */}

                                <div className="tooltip tooltip-open tooltip-success w-fit" data-tip="Copied!">
                                    <Chip 
                                        highlightValue={walletAddress} 
                                        // icon={MdContentCopy} 
                                        className="w-32 !normal-case"
                                        interactive={true}
                                        onClick={() => {
                                            navigator.clipboard.writeText(walletAddress)
                                        }}    
                                    >
                                        <label className="swap swap-rotate">

                                            <MdContentCopy size={13} className="swap-off" />
                                            <MdCheck size={13}  className="swap-on" />
                                        </label>
                                    </Chip>
                                </div>
                            </div>
                            {walletConnected ? (
                            // Here will be the icon of the connected wallet
                                <MdOutlineAccountBalanceWallet size={25} />
                            ) : (
                                <MdOutlineAccountBalanceWallet size={25} />
                            )}
                        </div>

                        <Button text="Disconnect" icon={MdClose} variant="transparent" className="!w-full" />
                    </div>
                </Card>
            </div>

            <input type="checkbox" id="wallet-modal" className="modal-toggle" />
        </>
    );
};

export default OverflowMenu;
