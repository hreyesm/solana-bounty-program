import Text from 'components/common/text';
import { cn } from 'utils';
import { ActionImpl } from 'kbar';

/**
 * Properties for an interactable navigation element.
 */
type SearchElementProps = {
    item: string | ActionImpl;
    isActive: boolean;
    isOnlyItem: boolean;
};

const SearchElement = ({ item, isActive, isOnlyItem }: SearchElementProps) => (
    <div className={cn(
        "flex h-14 flex-row items-center gap-5 transition-colors duration-300 ease-out",
        isActive && 'bg-primary-focus bg-opacity-5',
        isOnlyItem && "pb-2"
    )}>
        <div
            className={cn(
                'h-1/2 w-1 bg-transparent transition-all duration-300 ease-out',
                isActive && '!h-full !bg-primary'
            )}
        />
        <Text variant="paragraph">
            {item}
        </Text>
    </div>
);

export default SearchElement;
