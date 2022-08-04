import { MdOutlineSearch } from 'react-icons/md';
import * as React from 'react';
import { VisualState, useKBar } from 'kbar';
const KBAR_LISTBOX = 'kbar-listbox';
const getListboxItemId = (id: number) => `kbar-listbox-item-${id}`;

function SearchBar(
    props: React.InputHTMLAttributes<HTMLInputElement> & {
        defaultPlaceholder?: string;
    },
) {
    const {
        query,
        search,
        actions,
        currentRootActionId,
        activeIndex,
        showing,
        options,
    } = useKBar(state => ({
        search: state.searchQuery,
        currentRootActionId: state.currentRootActionId,
        actions: state.actions,
        activeIndex: state.activeIndex,
        showing: state.visualState === VisualState.showing,
    }));

    const ownRef = React.useRef<HTMLInputElement>(null);

    const { defaultPlaceholder, ...rest } = props;

    React.useEffect(() => {
        query.setSearch('');
        ownRef.current!.focus();
        return () => query.setSearch('');
    }, [currentRootActionId, query]);

    return (
        <div className="m-6 flex flex-row justify-between gap-">
            <input
                {...rest}
                ref={ownRef}
                autoFocus
                autoComplete="off"
                role="combobox"
                spellCheck="false"
                type="text"
                aria-expanded={showing}
                aria-controls={KBAR_LISTBOX}
                aria-activedescendant={getListboxItemId(activeIndex)}
                value={search}
                placeholder="Search for anything.."
                className="w-full block bg-transparent text-white placeholder:overflow-visible placeholder:text-base-content placeholder:opacity-50 focus:outline-none"
                onChange={event => {
                    props.onChange?.(event);
                    query.setSearch(event.target.value);
                    options?.callbacks?.onQueryChange?.(event.target.value);
                }}
                onKeyDown={event => {
                    props.onKeyDown?.(event);
                    if (
                        currentRootActionId &&
                        !search &&
                        event.key === 'Backspace'
                    ) {
                        const parent = actions[currentRootActionId].parent;
                        query.setCurrentRootAction(parent);
                    }
                }}
            />
            <MdOutlineSearch size={22} className="w-fit" />
        </div>
    );
}

export default SearchBar;
