import { MdLink, MdLogout, MdOutlineManageAccounts } from 'react-icons/md';
import { TbBrandGithub, TbWallet, TbWalletOff } from 'react-icons/tb';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useMemo, useRef, useState } from 'react';

import Button from '../button';
import Card from '../card';
import Chip from '../chip';
import Image from '../image';
import Link from 'next/link';
import Text from '../text';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { bountiesToLevel } from 'utils';
import { useBountiesByAssignee } from 'hooks/use-bounties-by-assignee';

const OverflowMenu = () => {
    const buttonRef = useRef();
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    const { bounties, isLoading, isError } = useBountiesByAssignee(
        session?.login as string,
    );

    const closedBountiesCount = useMemo(() => {
        if (!session) return null;

        const closedBounties = bounties?.filter(
            ({ state }) => state === 'closed',
        );

        if (isLoading || isError) return '-';

        return closedBounties.length;
    }, [bounties, isError, isLoading, session]);

    const levelValue = `Lv. ${bountiesToLevel(closedBountiesCount)}`;

    // test variables for wallet will be removed later
    const walletAddress = 'FNfUy8Qp6C9NCD6cz9xHLYSL7n3eFX8LfY1zDx6RcE8G';
    const wallet = true;

    const onProfileClick = async () => {
        if (session) {
            await signOut();
        } else {
            await signIn('github');
        }
    };

    return (
        <>
            <div className="dropdown-end dropdown">
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
                    className="bg-opacity-85 dropdown-content mt-3 block w-[calc(100vw-3rem)] !bg-[#222227] sm:w-80" // TODO: Background is temporarily solid color due to blur issue.
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
                                        Informative text about enhanced
                                        experience, public profile and claiming
                                        bounties.
                                    </Text>
                                ) : (
                                    <div className="flex flex-row items-center gap-1">
                                        <Chip
                                            highlightValue={closedBountiesCount}
                                            value="Bounties"
                                        />
                                        <Chip value={levelValue} />
                                    </div>
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
                            text={'Sign ' + (session ? 'out' : 'in')}
                            icon={session ? MdLogout : TbBrandGithub}
                            variant={session ? 'danger' : 'orange'}
                            className="!w-full"
                            onClick={onProfileClick}
                        />
                    </div>
                    <div className="h-px w-full bg-line" />
                    <div className="flex flex-col gap-3 p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex w-full flex-col gap-1">
                                <Text
                                    variant="label"
                                    className="text-secondary"
                                >
                                    Wallet
                                </Text>
                                <Text variant="nav-heading">
                                    {wallet
                                        ? 'Phantom'
                                        : 'Connect your crypto wallet'}
                                </Text>
                                {!wallet ? (
                                    <>
                                        <Text
                                            variant="label"
                                            className="!normal-case text-secondary"
                                        >
                                            Informative text about enhanced
                                            experience, public profile and
                                            claiming bounties.
                                        </Text>
                                    </>
                                ) : (
                                    <div className="flex flex-row items-center gap-1">
                                        <Chip
                                            highlightValue={walletAddress}
                                            icon={MdLink}
                                            className="w-60 !normal-case sm:w-28"
                                            href={`https://explorer.solana.com/address/${walletAddress}`}
                                        />
                                        <Chip copyValue={walletAddress} />
                                    </div>
                                )}
                            </div>
                            {/* Wallet logo instead of `MdAccountBalanceWallet`. */}
                            {wallet && <TbWallet size={25} />}
                        </div>

                        <Button
                            text={(wallet ? 'Dis' : 'C') + 'onnect'}
                            icon={wallet ? TbWalletOff : TbWallet}
                            variant="transparent"
                            className="!w-full"
                        />
                        <WalletMultiButton className="btn mr-4 text-gray-300" />
                    </div>
                </Card>
            </div>

            <input type="checkbox" id="wallet-modal" className="modal-toggle" />
        </>
    );
};

export default OverflowMenu;
