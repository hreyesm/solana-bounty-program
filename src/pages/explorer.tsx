import { GetServerSideProps, NextPage } from 'next';

import { Bounty } from 'types/bounty';
import BountyList from 'components/common/bounty-list';
import Button from 'components/common/button';
import FeaturedSection from 'components/explorer-page/featured-section';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import NavElement from 'components/common/layout/header/nav-element';
import Text from 'components/common/text';
import { authOptions } from './api/auth/[...nextauth]';
import { getBounties } from 'lib/bounties';
import { unstable_getServerSession } from 'next-auth';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';

type ExplorerPageProps = { bounties: Bounty[] };

const ExplorerPage: NextPage<ExplorerPageProps> = ({ bounties }) => {
    const closedBounties = useMemo(
        () => bounties.filter(({ state }) => state === 'closed'),
        [bounties],
    );

    const openBounties = useMemo(
        () => bounties.filter(({ state }) => state === 'open'),
        [bounties],
    );

    const tabs = useMemo(
        () => [
            {
                content: (
                    <BountyList bounties={openBounties} key="open-bounties" />
                ),
                id: 'open',
                label: 'Open',
                amount: openBounties.length,
            },
            {
                content: (
                    <BountyList
                        bounties={closedBounties}
                        key="closed-bounties"
                    />
                ),
                id: 'closed',
                label: 'Closed',
                amount: closedBounties.length,
            },
        ],
        [closedBounties, openBounties],
    );

    const router = useRouter();
    const currentTabId = (router.query.tab as string) || tabs[0].id;

    const currentTab = useMemo(
        () => tabs.find(tab => tab.id === currentTabId),
        [currentTabId, tabs],
    );

    const { data: session } = useSession();

    return (
        <>
            <NextSeo title="Explorer"></NextSeo>
            <div className="flex flex-col gap-12">
                <FeaturedSection />
                <div className="flex flex-col gap-0">
                    <div className="flex w-full flex-col gap-7 px-5 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                        <Text variant="label"> Browse </Text>
                        <div className="flex flex-row flex-wrap items-center justify-between gap-2">
                            <Text variant="big-heading"> Bounties </Text>
                            <div
                                className={!session && 'tooltip'}
                                data-tip="Log in to create bounties"
                            >
                                <Link href="/explorer/new" passHref>
                                    <a>
                                        <Button
                                            variant="orange"
                                            text="Create new"
                                            icon={MdAdd}
                                            reversed={true}
                                            disabled={!session}
                                        />
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="sticky top-20 z-30 -mt-px flex h-16 flex-row justify-between border-b-1.5 border-b-line bg-black bg-opacity-40 pt-4 backdrop-blur-xl">
                            <div className="flex h-full flex-row gap-8">
                                {tabs.map((tab, index) => (
                                    <NavElement
                                        as={index === 0 && `/explorer`}
                                        href={`/explorer?tab=${tab.id}`}
                                        key={tab.id}
                                        label={tab.label}
                                        chipLabel={tab.amount.toString()}
                                        scroll={false}
                                    />
                                ))}
                            </div>
                        </div>

                        {currentTab.content}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExplorerPage;

export const getServerSideProps: GetServerSideProps = async context => {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    const accessToken = session?.accessToken as string;

    const bounties = await getBounties(accessToken);

    return { props: { bounties } };
};
