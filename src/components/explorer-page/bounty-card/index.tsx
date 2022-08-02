import { cn, numberToCurrencyString } from 'utils';

import { Bounty } from 'types/bounty';
import Card from 'components/common/card';
import Chip from 'components/common/chip';
import Text from 'components/common/text';

/**
 * Properties for a "Featured Bounty" card component.
 */
type BountyCardProps = Omit<Bounty, 'tags'> & {
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

// TODO: Add owner and hunter props.
const BountyCard = ({
    createdAt,
    name,
    reward,
    tags,
    responsive = true,
    maxTags = 5,
    showDetails = false,
}: BountyCardProps) => (
    <Card
        className={cn(
            'flex h-fit w-98 flex-shrink-0 flex-col items-start justify-between gap-5 p-6',
            responsive && '!w-full 2lg:flex-row 2lg:items-center',
        )}
    >
        <div 
            className={cn(
                "flex w-full max-w-full flex-row gap-5",
                !showDetails && "items-center"
            )}
        >
            <div className="aspect-square h-[4.625rem] rounded-lg bg-white" />
            <div className="flex flex-col gap-1 h-full overflow-hidden">
                {!showDetails && (
                    <>
                        <Chip
                            value="placed"
                            highlightValue={createdAt}
                            reversed={true} />
                        <Text
                            variant="heading"
                            className={cn(
                                'inline w-full overflow-hidden text-ellipsis whitespace-nowrap',
                                responsive && '2lg:hidden'
                            )}
                        >
                            {name}
                        </Text>
                    </>
                )}
                {showDetails && (
                    <div className="flex flex-row gap-7 h-full">
                        <div className="flex flex-col gap-3">
                            <Text variant="label" className="text-secondary"> Owner </Text>
                            <div className="flex flex-row items-center gap-3">
                                <div className="aspect-square h-10 rounded-full bg-white" />
                                <Text variant="user" className="hidden sm:inline"> JohnDoe </Text>
                                <Text variant="label" className="text-primary"> Lv. 1 </Text>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Text variant="label" className="text-secondary"> Hunter </Text>
                            <div className="flex flex-row items-center gap-3">
                                <div className="aspect-square h-10 rounded-full bg-white" />
                                <Text variant="user" className="hidden sm:inline"> JohnDoe </Text>
                                <Text variant="label" className="text-primary"> Lv. 1 </Text>
                            </div>
                        </div>
                    </div>
                )}
                <Text
                    variant="sub-heading"
                    className={cn(
                        'hidden w-full overflow-hidden text-ellipsis whitespace-nowrap',
                        responsive && '2lg:inline',
                    )}
                >
                    {name}
                </Text>
            </div>
        </div>
        <div 
            className={cn(
                "flex w-full flex-row items-start gap-5",
                !showDetails && "2lg:items-center"
            )}
        >
            <div className="flex h-full w-40 flex-col gap-1 overflow-hidden">
                <Text
                    variant="label"
                    className={cn(
                        'inline text-secondary',
                        (responsive && !showDetails) && '2lg:hidden',
                    )}
                >
                    Reward{!showDetails && "· SOL"}
                </Text>
                <Text
                    variant="heading"
                    className="flex flex-row items-center gap-2 max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-primary"
                >
                    {numberToCurrencyString(reward)} {showDetails && <Text variant="paragraph" className="font-extralight uppercase text-white"> SOL </Text>}
                </Text>
            </div>
            <div className="flex w-full flex-col items-end gap-1">
                <Text
                    variant="label"
                    className={cn(
                        'inline w-fit text-secondary',
                        (responsive && !showDetails) && '2lg:hidden',
                    )}
                >
                    Tags
                </Text>
                <div className="flex w-full flex-row flex-wrap items-end justify-end gap-1.5">
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
        </div>
    </Card>
);

export default BountyCard;
