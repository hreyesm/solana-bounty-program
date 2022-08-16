import { GetServerSideProps, NextPage } from 'next';
import React, { useMemo } from 'react';

import { Bounty } from 'types/bounty';
import BountyList from 'components/common/bounty-list';
import Button from 'components/common/button';
import Hero from 'components/profile-page/hero';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import NavElement from 'components/common/layout/header/nav-element';
import Text from 'components/common/text';
import { User } from 'types/user';
import { authOptions } from './api/auth/[...nextauth]';
import { getBountiesByAssignee } from 'lib/bounties';
import { getUser } from 'lib/user';
import { unstable_getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

type ProfilePageProps = {
    bounties: Bounty[];
    user: User & { isCurrentUser: boolean };
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
        <>
            <NextSeo
                title={username}
                description="Build your profile to contribute in style."
            ></NextSeo>
            <div>
                <div className="flex flex-col gap-16 ">
                    <Hero {...user} />
                    <div className="flex flex-col gap-7 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                        <div className="flex flex-row flex-wrap items-center justify-between gap-2">
                            <Text variant="big-heading"> Bounties </Text>
                            {/* TODO: Verify if user has perms to create issues in this repo, otherwise disable button and show tooltip. */}
                            {user.isCurrentUser && (
                                <Link href="/explorer/new" passHref>
                                    <a>
                                        <Button
                                            variant="orange"
                                            text="Create new"
                                            icon={MdAdd}
                                            reversed
                                        />
                                    </a>
                                </Link>
                            )}
                        </div>

                        <div className="sticky top-20 z-30 -mt-px flex h-16 flex-row gap-8 border-b-1.5 border-b-line bg-neutral bg-opacity-40 pt-4 backdrop-blur-xl">
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

                        {currentTab.content}
                    </div>
                </div>
            </div>
        </>
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

    return {
        props: {
            bounties,
            user: { ...user, isCurrentUser: username === session?.login },
        },
    };
};
