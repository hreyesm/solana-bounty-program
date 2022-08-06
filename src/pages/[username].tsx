import { GetServerSideProps, NextPage } from 'next';
import { getBountiesByAsignee, getUser } from 'lib/github';

import { Bounty } from 'types/bounty';
import BountyList from 'components/common/bounty-list';
import Hero from 'components/profile-page/hero';
import Text from 'components/common/text';
import { User } from 'types/user';
import NavElement from 'components/common/layout/header/nav-element';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { MdOutlineSearch } from 'react-icons/md';
import FilterBar from 'components/common/bounty-list/filter-bar';

type ProfilePageProps = {
    bounties: Bounty[];
    user: User;
};

const ProfilePage: NextPage<ProfilePageProps> = ({ bounties, user }) => {
    const tabs = useMemo(
        () => [
            {
                content: <BountyList bounties={bounties} />,
                id: 'open',
                label: 'Open',
                amount: '15'
            },
            {
                content: null,
                id: 'closed',
                label: 'Closed',
                amount: '30'
            },
        ],
        [bounties],
    );

    const { fullName, isCurrentUser, username } = user;
    const firstName = fullName ? fullName.split(' ')[0] : username;
    const bountyListTitlePronoun = isCurrentUser ? 'My' : `${firstName}'s`;

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
                    <Text variant="big-heading"> Bounties </Text>
                    
                    <div className="sticky top-20 -mt-px h-16 flex flex-row justify-between border-b-1.5 border-b-line bg-black pt-4 z-50">
                        <div className="h-full flex flex-row gap-8">
                            {tabs.map((tab, index) => (
                                <NavElement
                                    as={index === 0 && `/${username}`}
                                    href={`/${username}?tab=${tab.id}`}
                                    key={tab.id}
                                    label={tab.label}
                                    chipLabel={tab.amount}// Amount of bounties in each category.
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
    const user = await getUser(context);
    const bounties = await getBountiesByAsignee(context);

    if (!user) {
        return { notFound: true };
    }

    return {
        props: { bounties, user },
    };
};
