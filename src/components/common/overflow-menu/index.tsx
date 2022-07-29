import { MdAccountCircle, MdContentCopy, MdLogout, MdManageAccounts } from 'react-icons/md';
import { useRef, useState } from 'react';

import { BiWalletAlt } from 'react-icons/bi';
import Card from '../card';
import Link from 'next/link';
import Text from '../text';
import { User } from '@supabase/supabase-js';
import { VscGithubAlt } from 'react-icons/vsc';
import { cn } from 'utils';
import Chip from '../chip';

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
                    className="dropdown-content menu block mt-3 w-64"
                >
                    <li onClick={user ? null : signIn}>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <Text variant="label" className="text-secondary"> Profile </Text>
        
                                <Text 
                                    variant="paragraph"
                                    className={`${user && "text-primary"}`}
                                >
                                    {user ? user.user_metadata.user_name : "Login with GitHub"}
                                </Text>
                            </div>
                            {!user && <VscGithubAlt size={25} />}
                        </div>
                    </li>
                    <div className="h-px w-full bg-line"/>
                    <li>
                        <div className="flex justify-between">
                            <div className="flex flex-col w-full">
                                <Text variant="label" className="text-secondary"> Wallet </Text>

                                {/* <Text variant="paragraph" className="w-full overflow-hidden text-ellipsis">
                                    {walletConnected ? walletAddress : "Connect"}
                                </Text> */}

                                <Chip highlightValue={walletAddress} icon={MdContentCopy} className="first:w-32 !normal-case" />
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
                                <div className="flex">
                                    <MdLogout size={25} />
                                    <Text variant="paragraph"> Sign out </Text>
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
