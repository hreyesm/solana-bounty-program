import StatItem from 'components/home-page/stats-section/stat-item';

const statItems = [
    {
        bountyName: 'Bounties1',
        bountyNumber: '135',
        borderBottom: 'true',
        borderRight: 'true',
        removeBorderRightMedium: 'false',
    },
    {
        bountyName: 'Bounties2',
        bountyNumber: '135',
        borderBottom: 'true',
        borderRight: 'true',
        removeBorderRightMedium: 'true',
    },
    {
        bountyName: 'Bounties3',
        bountyNumber: '1000',
        borderBottom: 'true',
        borderRight: 'true',
        removeBorderRightMedium: 'false',
    },
    {
        bountyName: 'Bounties4',
        bountyNumber: '135',
        borderBottom: 'false',
        borderRight: 'false',
        removeBorderRightMedium: 'false',
    },
];

const StatsSection = () => (
    <section
        title="faq"
        className="grid text-black sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    >
        {statItems.map(
            ({
                bountyName,
                bountyNumber,
                borderBottom,
                borderRight,
                removeBorderRightMedium,
            }) => (
                <StatItem
                    key={bountyName}
                    bountyName={bountyName}
                    bountyNumber={bountyNumber}
                    borderBottom={borderBottom}
                    borderRight={borderRight}
                    removeBorderRightMedium={removeBorderRightMedium}
                />
            ),
        )}
    </section>
);

export default StatsSection;
