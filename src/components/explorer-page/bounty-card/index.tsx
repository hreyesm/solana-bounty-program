import { cn, numberToCurrencyString } from 'utils';

import { Bounty } from 'types/bounty';
import Card from 'components/common/card';
import Chip from 'components/common/chip';
import Link from 'next/link';
import Text from 'components/common/text';

/**
 * Properties for a "Featured Bounty" card component.
 */
type BountyCardProps = Omit<Bounty, 'githubUrl' | 'tags'> & {
    responsive?: boolean;
    maxTags?: number;
    showDetails?: boolean;
    showTableTags?: boolean;
    tags: Array<{
        highlightValue?: string;
        value?: string;
        reversed?: boolean;
    }>;
};

const ParticipantSection = ({ owner, hunter }) => (
    <div className="flex h-16 w-full flex-row gap-3">
        <div className="flex h-full w-full flex-col justify-between gap-3 overflow-hidden">
            <Text variant="label" className="text-secondary">
                Owner
            </Text>
            <Text
                variant="paragraph"
                className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
            >
                {owner}
            </Text>
        </div>
        <div className="flex h-full w-full flex-col justify-between gap-3 ">
            <Text variant="label" className="text-secondary">
                Hunter
            </Text>
            <div className="flex w-full flex-row items-center gap-3 overflow-hidden">
                {hunter ? (
                    <Text
                        variant="paragraph"
                        className="w-full overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                        {hunter}
                    </Text>
                ) : (
                    <Text variant="paragraph" className="hidden sm:inline">
                        None
                    </Text>
                )}
            </div>
        </div>
    </div>
);

const TagsSection = ({ tags, maxTags }) => (
    <div className="flex h-16 w-full flex-col gap-3">
        <Text variant="label" className="w-fit text-secondary">
            Tags
        </Text>
        <div className="flex w-full flex-row flex-wrap gap-1.5">
            {tags
                .slice(0, maxTags)
                .map(({ value, highlightValue, reversed }) => (
                    <Chip
                        key={value}
                        highlightValue={highlightValue}
                        value={value}
                        reversed={reversed}
                        className="max-w-[4.25rem]"
                    />
                ))}
            {tags.length > maxTags && (
                <Chip highlightValue={`+${tags.length - maxTags}`} />
            )}
        </div>
    </div>
);

const RewardSection = ({ reward, showDetails, responsive }) => (
    <div className="flex h-16 w-28 flex-col items-end justify-between overflow-hidden">
        <Text variant="label" className="inline text-secondary">
            {(!responsive || showDetails) && 'Reward ·'} SOL
        </Text>
        <Text
            variant="heading"
            className="flex max-w-full flex-row items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-primary"
        >
            {numberToCurrencyString(reward)}
        </Text>
    </div>
);

const BasicsSection = ({ name, createdAt }) => (
    <div className="flex h-16 flex-col justify-between">
        <Chip highlightValue={createdAt} />
        <Text
            variant="heading"
            className={cn(
                'inline w-full overflow-hidden text-ellipsis whitespace-nowrap',
                // responsive && '2lg:hidden',
            )}
        >
            {name}
        </Text>
    </div>
);

const BountyCard = ({
    createdAt,
    owner,
    hunter,
    id,
    name,
    reward,
    tags,
    state,
    responsive = true,
    maxTags = 5,
    showDetails = false,
}: BountyCardProps) => (
    <Link href={`/explorer/${id}`} passHref>
        <a>
            <Card
                className={cn(
                    'flex h-fit w-98 flex-shrink-0 snap-start flex-col items-start justify-between gap-5 p-6',
                    responsive && '!w-full 2lg:flex-row 2lg:items-center',
                    !showDetails &&
                        'transition-all duration-300 hover:bg-opacity-[97%]',
                )}
            >
                <div className="w-full overflow-hidden">
                    {showDetails ? (
                        <ParticipantSection owner={owner} hunter={hunter} />
                    ) : (
                        <BasicsSection name={name} createdAt={createdAt} />
                    )}
                </div>

                <div className="flex w-full flex-row justify-between">
                    {showDetails ? (
                        <TagsSection tags={tags} maxTags={maxTags} />
                    ) : (
                        <ParticipantSection owner={owner} hunter={hunter} />
                    )}

                    <RewardSection
                        reward={reward}
                        showDetails={showDetails}
                        responsive={responsive}
                    />
                </div>
            </Card>
        </a>
    </Link>
);

export default BountyCard;
