import { GetServerSideProps, NextPage } from 'next';
import { MdChevronLeft, MdLink } from 'react-icons/md';

import BountyCard from 'components/explorer-page/bounty-card';
import { BountyWithDrillInfo } from 'types/bounty';
import Button from 'components/common/button';
import FundTab from 'components/detail-page/fund-tab';
import Link from 'next/link';
import Markdown from 'components/common/markdown';
import NavElement from 'components/common/layout/header/nav-element';
import Text from 'components/common/text';
import { getBountyWithDrillInfo } from 'lib/github';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

type BountyDetailsPageProps = {
    bounty: BountyWithDrillInfo;
};

const BountyDetailsPage: NextPage<BountyDetailsPageProps> = ({ bounty }) => {
    const { githubUrl, id, mdDrillInfo, mdDescription, name, state } = bounty;

    const tabs = useMemo(
        () => [
            {
                content: <Markdown>{mdDescription}</Markdown>,
                id: 'about',
                label: 'About',
            },
            {
                content: <FundTab />,
                id: 'fund',
                label: 'Fund',
            },
            {
                content: <Markdown>{mdDrillInfo}</Markdown>,
                id: 'details',
                label: 'Details',
            },
        ],
        [mdDescription, mdDrillInfo],
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
                    <Button
                        disabled={state === 'closed'}
                        text="Claim"
                        variant="orange"
                    />
                    <a href={githubUrl}>
                        <Button text="View on GitHub" variant="transparent">
                            <MdLink className="aspect-square h-4" />
                        </Button>
                    </a>
                </div>
            </div>

            <Text variant="big-heading">{name}</Text>

            <Text variant="nav-heading">Basics</Text>

            <BountyCard {...bounty} maxTags={7} name="" showDetails />

            <div className="sticky top-20 z-30 -mt-px flex h-16 flex-row gap-8 border-b-1.5 border-b-line bg-black bg-opacity-40 pt-4 backdrop-blur-xl">
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
    const bounty = await getBountyWithDrillInfo(context);

    if (!bounty) {
        return { notFound: true };
    }

    return { props: { bounty } };
};
