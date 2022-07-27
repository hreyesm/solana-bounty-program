import { MdAccountCircle, MdLogout, MdManageAccounts } from 'react-icons/md';
import { useRef, useState } from 'react';

import { BiWalletAlt } from 'react-icons/bi';
import Card from '../card';
import Link from 'next/link';
import Text from '../text';
import { User } from '@supabase/supabase-js';
import { VscGithubAlt } from 'react-icons/vsc';
import { cn } from 'utils';

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
                        <button
                            className={cn(
                                'flex aspect-square h-fit max-h-full w-fit items-center justify-center gap-3 whitespace-nowrap rounded-full border border-transparent bg-primary p-3 text-black transition-all hover:-translate-y-[0.2rem] hover:bg-white hover:!text-black active:translate-y-[0.05rem] active:scale-95',
                            )}
                            onClick={() => setMenuOpen(!menuOpen)}
                            ref={buttonRef}
                        >
                            <MdManageAccounts className="aspect-square h-4" />
                        </button>
                    </div>
                </label>
                <Card
                    tabIndex={0}
                    className="dropdown-content menu mt-3 -mr-3 block w-52 rounded-3xl pt-2  pb-2  shadow  "
                >
                    <li onClick={user ? null : signIn}>
                        <div className="flex justify-between">
                            <div>
                                <Text variant="label" className="opacity-50">
                                    Profile
                                </Text>
                                <br />
                                {user ? (
                                    <p className="text-primary">
                                        {user.user_metadata.user_name}
                                    </p>
                                ) : (
                                    <p>Login with GitHub</p>
                                )}
                            </div>
                            {!user && <VscGithubAlt size={25} />}
                        </div>
                    </li>
                    <hr className="w-full opacity-50" />
                    <li>
                        <div className="flex justify-between">
                            <div>
                                <Text variant="label" className="opacity-50">
                                    Wallet
                                </Text>
                                <br />
                                {/* Here will be the wallet connection button */}
                                {walletConnected ? (
                                    <p className="w-24 overflow-hidden	text-ellipsis">
                                        {walletAddress}
                                    </p>
                                ) : (
                                    <p>Connect</p>
                                )}
                            </div>
                            {walletConnected ? (
                                // Here will be the icon of the connected wallet
                                <MdAccountCircle size={25} />
                            ) : (
                                <BiWalletAlt size={25} />
                            )}
                        </div>
                    </li>
                    {user && (
                        <>
                            <hr className="w-full opacity-50" />
                            <li onClick={signOut}>
                                <div className="flex ">
                                    <MdLogout
                                        className="text-red-500"
                                        size={25}
                                    />
                                    <p className="text-red-500">Sign out</p>
                                </div>
                            </li>
                        </>
                    )}
                </Card>
            </div>
        </>
    );
};

export default OverflowMenu;
