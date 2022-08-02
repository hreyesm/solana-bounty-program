import { MdCheck, MdContentCopy, MdLogout, MdOutlineManageAccounts } from 'react-icons/md';
import { DiGithubAlt } from 'react-icons/di';
import { TbBrandGithub, TbWallet, TbWalletOff } from 'react-icons/tb';
import { useRef, useState } from 'react';

import Card from '../card';
import Link from 'next/link';
import Text from '../text';
import Chip from '../chip';
import Button from '../button';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from '../image';


const OverflowMenu = () => {
    const buttonRef = useRef();
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    // test variables for wallet will be removed later
    const walletAddress = 'FNfUy8Qp6C9NCD6cz9xHLYSL7n3eFX8LfY1zDx6RcE8G';
    const wallet = true;

    const onProfileClick =  async () => {
        if (session) {
            await signOut();
        }
        else {
            await signIn('github');
        }
    }   

    return (
        <>
            <div className="dropdown-end dropdown">
                <label tabIndex={0}>
                    <div className="flex flex-row items-center gap-3">
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
                                    className={session && "text-primary"}
                                >
                                    {session ? (
                                        <Link
                                            href={`/${session.login}`}
                                            passHref
                                        >
                                            {session.login}
                                        </Link>
                                    ) : (
                                        "Sign in with GitHub"
                                    )}
                                </Text>
                                {!session ? (
                                    <Text variant="label" className="text-secondary !normal-case">
                                        Informative text about enhanced experience, public profile and claiming bounties.
                                    </Text>
                                ) : (
                                    <Chip value="Lv. 1" />
                                )}
                            </div>
                            {session && (
                                // eslint-disable-next-line jsx-a11y/alt-text
                                <Image
                                    src={session.user.image}
                                    // alt={session.login}
                                    height={40}
                                    className="aspect-square"
                                    style={{ borderRadius: '50%' }}
                                />
                            )}
                        </div>
                        <Button 
                            text={"Sign " + (session ? "out" : "in")} 
                            icon={session ? MdLogout : TbBrandGithub} 
                            variant={session ? "danger" : "orange"} 
                            className="!w-full"
                            onClick={onProfileClick
                            }
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
