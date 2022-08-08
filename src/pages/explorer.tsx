import { GetServerSideProps, NextPage } from 'next';

import { Bounty } from 'types/bounty';
import BountyList from 'components/common/bounty-list';
import FeaturedSection from 'components/explorer-page/featured-section';
import { getBounties } from 'lib/github';
import Text from 'components/common/text';
import FilterBar from 'components/common/bounty-list/filter-bar';
import NavElement from 'components/common/layout/header/nav-element';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

type ExplorerPageProps = { bounties: Bounty[] };

const ExplorerPage: NextPage<ExplorerPageProps> = ({ bounties }) => {
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

    const router = useRouter();
    const currentTabId = (router.query.tab as string) || tabs[0].id;

    const currentTab = useMemo(
        () => tabs.find(tab => tab.id === currentTabId),
        [currentTabId, tabs],
    );

    return (
        <div className="flex flex-col gap-12">
            <FeaturedSection />
            <div className="flex flex-col gap-0">
                <div className="flex w-full flex-col gap-7 px-5 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                    <Text variant="label"> Browse </Text>
                    <Text variant="big-heading"> Open Bounties </Text>

                    <div className="sticky top-20 -mt-px h-16 flex flex-row justify-between border-b-1.5 border-b-line bg-black pt-4 z-30">
                        <div className="h-full flex flex-row gap-8">
                            {tabs.map((tab, index) => (
                                <NavElement
                                    as={index === 0 && `/explorer`}
                                    href={`/explorer?tab=${tab.id}`}
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

export default ExplorerPage;

export const getServerSideProps: GetServerSideProps = async context => {
    const bounties = await getBounties(context);

    return { props: { bounties } };
};
