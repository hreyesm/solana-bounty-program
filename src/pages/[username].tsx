import { GetServerSideProps, NextPage } from 'next';
import React, { useMemo } from 'react';

import { Bounty } from 'types/bounty';
import BountyList from 'components/common/bounty-list';
import FilterBar from 'components/common/bounty-list/filter-bar';
import Hero from 'components/profile-page/hero';
import NavElement from 'components/common/layout/header/nav-element';
import Text from 'components/common/text';
import { User } from 'types/user';
import { authOptions } from './api/auth/[...nextauth]';
import { getBountiesByAssignee } from 'lib/bounties';
import { getUser } from 'lib/user';
import { unstable_getServerSession } from 'next-auth';
import { useRouter } from 'next/router';

type ProfilePageProps = {
    bounties: Bounty[];
    user: User;
};

const ProfilePage: NextPage<ProfilePageProps> = ({ bounties, user }) => {
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

    const { username } = user;

    const router = useRouter();
    const currentTabId = (router.query.tab as string) || tabs[0].id;

    const currentTab = useMemo(
        () => tabs.find(tab => tab.id === currentTabId),
        [currentTabId, tabs],
    );

    return (
        <div>
            <div className="flex flex-col gap-16 ">
                <Hero {...user} />
                <div className="flex flex-col gap-7 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                    <Text variant="big-heading">Bounties</Text>

                    <div className="sticky top-20 z-30 -mt-px flex h-16 flex-row justify-between border-b-1.5 border-b-line bg-black bg-opacity-40 backdrop-blur-xl pt-4">
                        <div className="flex h-full flex-row gap-8">
                            {tabs.map((tab, index) => (
                                <NavElement
                                    as={index === 0 && `/${username}`}
                                    href={`/${username}?tab=${tab.id}`}
                                    key={tab.id}
                                    label={tab.label}
                                    chipLabel={tab.amount.toString()} // Amount of bounties in each category.
                                    scroll={false} // TODO: Scroll to navbar position.
                                />
                            ))}
                        </div>

                        <FilterBar />
                    </div>

                    {currentTab.content}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async context => {
    const username = context.query.username as string;

    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    const accessToken = session?.accessToken as string;

    const bounties = await getBountiesByAssignee(username, accessToken);

    if (!bounties) {
        return { notFound: true };
    }

    const user = await getUser(username, accessToken);

    return { props: { bounties, user } };
};
