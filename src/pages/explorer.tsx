import { GetServerSideProps, NextPage } from 'next';

import { Bounty } from 'types/bounty';
import BountyList from 'components/common/bounty-list';
import FeaturedSection from 'components/explorer-page/featured-section';
import { getBounties } from 'lib/github';

type ExplorerPageProps = { bounties: Bounty[] };

const ExplorerPage: NextPage<ExplorerPageProps> = ({ bounties }) => (
    <div className="flex flex-col gap-12">
        <FeaturedSection />
        <div className="flex flex-col gap-0">
            <div className="flex w-full flex-col gap-7 px-5 sm:px-8 md:px-16 lg:px-32 xl:px-48">
                <p className="text-sm font-light uppercase text-white">
                    Browse
                </p>
                <h2 className="text-4xl font-medium text-white md:text-6xl">
                    Open Bounties
                </h2>
                <BountyList bounties={bounties} />
            </div>
        </div>
    </div>
);

export default ExplorerPage;

export const getServerSideProps: GetServerSideProps = async context => {
    const bounties = await getBounties(context);

    return { props: { bounties } };
};
