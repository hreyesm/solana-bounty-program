/* eslint-disable indent */
import { MdLink, MdLogout, MdOutlineManageAccounts } from 'react-icons/md';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useMemo, useRef, useState } from 'react';

import Button from '../button';
import Card from '../card';
import Chip from '../chip';
import Image from '../image';
import Link from 'next/link';
import { TbBrandGithub } from 'react-icons/tb';
import Text from '../text';
import { WalletMultiButton } from '../wallet-adapter';
import { getWalletImage } from 'utils/wallet';
import { useUser } from 'hooks/use-user';
import { useWallet } from '@solana/wallet-adapter-react';

const OverflowMenu = () => {
    const buttonRef = useRef();
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const { user } = useUser(session?.login as string);
    const { publicKey, wallet } = useWallet();

    const walletAddress = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const walletName = wallet?.adapter.name;
    const walletImage = getWalletImage(walletName?.toLowerCase());

    const closedBountiesCount = user?.closedBountiesCount.toString() ?? '-';
    const level = `${user?.level ?? '-'}`;

    const onProfileClick = async () => {
        if (session) {
            await signOut();
        } else {
            await signIn('github');
        }
    };

    return (
        <>
            <div className="dropdown dropdown-end">
                <label tabIndex={0}>
                    <div className="flex flex-row items-center gap-3">
                        <Button
                            variant="orange"
                            icon={MdOutlineManageAccounts}
                            onClick={() => setMenuOpen(!menuOpen)}
                            buttonRef={buttonRef}
                        />
                    </div>
                </label>
                <Card
                    tabIndex={0}
                    className="bg-opacity-85 dropdown-content mt-3 block w-[calc(100vw-3rem)] !bg-[#232225] sm:w-80" // TODO: Background is temporarily solid color due to blur issue.
                >
                    <div className="flex flex-col gap-3 p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex w-full flex-col gap-1">
                                <Text
                                    variant="label"
                                    className="text-secondary"
                                >
                                    Profile
                                </Text>
                                <Text
                                    variant="nav-heading"
                                    className={session && 'text-primary'}
                                >
                                    {session ? (
                                        <Link
                                            href={`/${session.login}`}
                                            onClick={() => setMenuOpen(false)}
                                            passHref
                                        >
                                            {session.login}
                                        </Link>
                                    ) : (
                                        'Sign in with GitHub'
                                    )}
                                </Text>
                                {!session ? (
                                    <Text
                                        variant="label"
                                        className="!normal-case text-secondary"
                                    >
                                        Connect your GitHub account for an enhanced user experience, including the ability to create new and claim completed bounties.
                                    </Text>
                                ) : (
                                    <div className="flex flex-row items-center gap-1">
                                        <Chip
                                            highlightValue={closedBountiesCount}
                                            value="Bounties"
                                        />
                                        <Chip
                                            value="Lv."
                                            highlightValue={level}
                                            reversed={true}
                                        />
                                    </div>
                                )}
                            </div>
                            {session && (
                                <Image
                                    alt="Avatar"
                                    src={session.user.image}
                                    height={40}
                                    className="aspect-square"
                                    style={{ borderRadius: '50%' }}
                                />
                            )}
                        </div>
                        <Button
                            text={'Sign ' + (session ? 'out' : 'in')}
                            icon={session ? MdLogout : TbBrandGithub}
                            variant={session ? 'danger' : 'orange'}
                            className="!w-full"
                            onClick={onProfileClick}
                        />
                    </div>
                    <div className="h-px w-full bg-line" />
                    <div className="flex w-full min-w-0 flex-col gap-3 p-5">
                        <div className="flex w-full min-w-0 flex-1 items-center justify-between">
                            <div className="flex w-full flex-col gap-1">
                                <Text
                                    variant="label"
                                    className="text-secondary"
                                >
                                    Wallet
                                </Text>
                                <Text variant="nav-heading">
                                    {wallet
                                        ? walletName
                                        : 'Connect your crypto wallet'}
                                </Text>
                                {!wallet ? (
                                    <>
                                        <Text
                                            variant="label"
                                            className="!normal-case text-secondary"
                                        >
                                            By connecting your wallet, you gain the ability to transfer funds directly to a bounty, as well as to claim completed bounties.
                                        </Text>
                                    </>
                                ) : (
                                    <div className="w-max-full flex flex-row items-center gap-1 overflow-x-auto">
                                        <Chip
                                            highlightValue={walletAddress}
                                            icon={MdLink}
                                            className="w-24 !normal-case"
                                            href={`https://explorer.solana.com/address/${walletAddress}`}
                                        />
                                        <Chip copyValue={walletAddress} />
                                    </div>
                                )}
                            </div>
                            {wallet && (
                                <Image
                                    alt="Wallet logo"
                                    src={walletImage}
                                    height={40}
                                    className="flex-shrink-0 basis-10"
                                />
                            )}
                        </div>

                        <WalletMultiButton />
                    </div>
                </Card>
            </div>

            <input type="checkbox" id="wallet-modal" className="modal-toggle" />
        </>
    );
};

export default OverflowMenu;
