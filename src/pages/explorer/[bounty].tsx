import Button from 'components/common/button';
import NavElement from 'components/common/layout/header/nav-element';
import Text from 'components/common/text';
import AboutSection from 'components/detail-page/about-section';
import BountyCard from 'components/explorer-page/bounty-card';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MdChevronLeft, MdLink } from 'react-icons/md';

const BountyDetail: NextPage = () => {
    const tabs = [
        {id: 'about', section: <AboutSection createdAt={""}name={""}reward={100}tags={[{value:"TypeScript"},{value:"React"},{value:"Next.js"},{value:"Node.js"},{value:"Express"},{value:"MongoDB"},{value:"GraphQL"},{value:"Apollo"},{value:"Apollo Client"},]}/>, label: 'About'},
        {id: 'details', section: <div></div>, label: 'Details'},
        {id: 'fund', section: <div></div>, label: 'Fund'},
    ];

    const router = useRouter();
    const { bounty } = router.query;
    const currentTab = router.query.tab as string || tabs[0].id;

    return (
        <div className="mt-8 flex flex-col gap-8 p-5 text-white sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
            <div className="flex flex-row justify-between items-center">
                <Button text="Back" variant="label" reversed={true}>
                    <MdChevronLeft className="aspect-square h-4" />
                </Button>

                <div className="flex flex-row gap-3">
                    <Button text="Claim" variant="orange" />
                    <Button text="View on GitHub" variant="transparent">
                        <MdLink className="aspect-square h-4" />
                    </Button>
                </div>
            </div>

            <Text variant="big-heading">{bounty}</Text>

            <Text variant="nav-heading"> Basics </Text>

            <BountyCard showDetails={true} maxTags={7} createdAt={"Jun 6"}name={''}reward={100}tags={[{value:"TypeScript"},{value:"React"},{value:"Next.js"},{value:"Node.js"},{value:"Express"},{value:"MongoDB"},{value:"GraphQL"},{value:"Apollo"},{value:"Apollo Client"},]}/>

            <div className="flex h-12 flex-row gap-8 border-b-1.5 border-b-line">
                {tabs.map((tab, index) => (
                    <NavElement
                        key={tab.id}
                        label={tab.label}
                        href={`/explorer/${bounty}?tab=${tab.id}`}
                        as={index === 0 && `/explorer/${bounty}`}
                    />
                ))}
            </div>

            {tabs.find(tab => tab.id === currentTab).section}
        </div>
    );
};

export default BountyDetail;
