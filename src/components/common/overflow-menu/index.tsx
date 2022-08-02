import { MdCheck, MdContentCopy, MdLogout, MdOutlineManageAccounts } from 'react-icons/md';
import { DiGithubAlt } from 'react-icons/di';
import { TbBrandGithub, TbWallet, TbWalletOff } from 'react-icons/tb';
import { useRef, useState } from 'react';

import Card from '../card';
import Link from 'next/link';
import Text from '../text';
import { User } from '@supabase/supabase-js';
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
    const wallet = true;

    return (
        <>
            <div className="dropdown-end dropdown">
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
                            icon={MdOutlineManageAccounts}
                            onClick={() => setMenuOpen(!menuOpen)}
                            ref={buttonRef}
                        />
                    </div>
                </label>
                <Card
                    tabIndex={0}
                    className="dropdown-content block mt-3 w-[calc(100vw-3rem)] sm:w-80 !bg-[#222227] bg-opacity-85" // TODO: Background is temporarily solid color due to blur issue.
                >
                    <div className="flex flex-col gap-3 p-5">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-1 w-full">
                                <Text variant="label" className="text-secondary"> Profile </Text>
                                <Text 
                                    variant="nav"
                                    className={user && "text-primary"}
                                >
                                    {user ? user.user_metadata.user_name : "Sign in with GitHub"}
                                </Text>
                                {!user ? (
                                    <Text variant="label" className="text-secondary !normal-case">
                                        Informative text about enhanced experience, public profile and claiming bounties.
                                    </Text>
                                ) : (
                                    <Chip value="Lv. 1" />
                                )}
                            </div>  
                            {/* User's profile image instead of `DiGithubAlt`. */}
                            {user && <DiGithubAlt size={25} />}
                        </div>
                        <Button 
                            text={"Sign " + (user ? "out" : "in")} 
                            icon={user ? MdLogout : TbBrandGithub} 
                            variant={user ? "danger" : "orange"} 
                            className="!w-full"
                            onClick={user ? signOut : signIn}
                        />
                    </div>
                    <div className="h-px w-full bg-line"/>
                    <div className="flex flex-col gap-3 p-5">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-1 w-full">
                                <Text variant="label" className="text-secondary"> Wallet </Text>
                                <Text variant="nav">
                                    {wallet ? "Phantom" : "Connect your crypto wallet"}
                                </Text>
                                {!wallet ? (<>
                                    <Text variant="label" className="text-secondary !normal-case">
                                        Informative text about enhanced experience, public profile and claiming bounties.
                                    </Text>
                                </>) : (
                                    <div className=" w-fit max-w-ful" data-tip="Copied!">
                                        <Chip 
                                            highlightValue={walletAddress} 
                                            // icon={MdContentCopy} 
                                            className="!normal-case w-72 sm:w-44"
                                            interactive={true}
                                            copyable={true} 
                                        />
                                    </div>
                                )}
                            </div>
                            { /* Wallet logo instead of `MdAccountBalanceWallet`. */ }
                            { wallet && <TbWallet size={25} /> }
                        </div>

                        <Button text={(wallet ? "Dis" : "C") + "onnect" } icon={wallet ? TbWalletOff : TbWallet } variant="transparent" className="!w-full" />
                    </div>
                </Card>
            </div>

            <input type="checkbox" id="wallet-modal" className="modal-toggle" />
        </>
    );
};

export default OverflowMenu;
