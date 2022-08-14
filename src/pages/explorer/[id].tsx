import { GetServerSideProps, NextPage } from 'next';
import { MdChevronLeft, MdLink } from 'react-icons/md';

import { Bounty } from 'types/bounty';
import BountyCard from 'components/explorer-page/bounty-card';
import Button from 'components/common/button';
import FundTab from 'components/detail-page/fund-tab';
import Link from 'next/link';
import Markdown from 'components/common/markdown';
import NavElement from 'components/common/layout/header/nav-element';
import Text from 'components/common/text';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getBounty } from 'lib/bounties';
import { unstable_getServerSession } from 'next-auth';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useWallet } from '@solana/wallet-adapter-react';
import Chip from 'components/common/chip';

type BountyDetailsPageProps = {
    bounty: Bounty;
};

const BountyDetailsPage: NextPage<BountyDetailsPageProps> = ({ bounty }) => {
    const { githubUrl, description, id, name, state, createdAt } = bounty;

    const { data: session } = useSession();
    const { wallet } = useWallet();

    const tabs = useMemo(
        () => [
            {
                content: <Markdown>{description}</Markdown>,
                id: 'about',
                label: 'About',
            },
            state === 'open' && {
                content: <FundTab {...bounty} />,
                id: 'fund',
                label: 'Fund',
            },
        ],
        [bounty, description, state],
    );

    const router = useRouter();
    const currentTabId = (router.query.tab as string) || tabs[0].id;

    const currentTab = useMemo(
        () => tabs.find(tab => tab.id === currentTabId),
        [currentTabId, tabs],
    );

    return (
        <div className="flex flex-col gap-8 p-5 !pb-0 text-white sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
            <div className="flex flex-row items-center justify-between">
                <Link href="/explorer" passHref>
                    <a>
                        <Button reversed text="Back" variant="label">
                            <MdChevronLeft className="aspect-square h-4" />
                        </Button>
                    </a>
                </Link>

                <div className="flex flex-row gap-3">
                    {(session && bounty.owner === session.login) && (
                        <Button variant="danger" text="Close" />
                    )}
                    {(session && bounty.hunter === session.login) && (
                        <div
                            className={`${(state !== 'closed' || !wallet) && "tooltip"} tooltip-bottom`}
                            data-tip={
                                state !== 'closed' ? "Complete this bounty to claim it" : (
                                !wallet && "Connect a wallet to claim this bounty" 
                            )}
                        >
                        <Button
                            disabled={state !== 'closed' || !wallet}
                            text="Claim"
                            variant="orange"
                        />  
                        </div>
                    )}
                    <a href={githubUrl}>
                        <Button text="View on GitHub" variant="transparent">
                            <MdLink className="aspect-square h-4" />
                        </Button>
                    </a>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                    <Chip value="placed" highlightValue={createdAt} reversed={true} />
                    <Chip value={state} className={state === 'closed' ? "text-danger" : "text-green-500"} />
                </div>
                <Text variant="big-heading">{name}</Text>
            </div>

            <Text variant="nav-heading">Basics</Text>

            <BountyCard {...bounty} maxTags={7} name="" showDetails />

            <div className="sticky top-20 z-30 -mt-px flex h-16 flex-row gap-8 border-b-1.5 border-b-line bg-neutral bg-opacity-40 pt-4 backdrop-blur-xl">
                {tabs.map((tab, index) => (
                    <NavElement
                        as={index === 0 && `/explorer/${id}`}
                        href={`/explorer/${id}?tab=${tab.id}`}
                        key={tab.id}
                        label={tab.label}
                        scroll={false} // TODO: Scroll to navbar position.
                    />
                ))}
            </div>

            <section className="flex flex-col gap-5">
                {currentTab.content}
            </section>
        </div>
    );
};

export default BountyDetailsPage;

export const getServerSideProps: GetServerSideProps = async context => {
    const id = parseInt(context.query.id as string);

    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    const accessToken = session?.accessToken as string;

    const bounty = await getBounty(id, accessToken);

    if (!bounty) {
        return { notFound: true };
    }

    return { props: { bounty } };
};
