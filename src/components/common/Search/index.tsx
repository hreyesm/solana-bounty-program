import SearchBar from '../../common/search-bar';
import { cn } from 'utils';
import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    useMatches,
    KBarResults,
} from 'kbar';

function RenderResults() {
    const { results } = useMatches();

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === 'string' ? (
                    <div
                        className={cn(
                            'block w-96  bg-base py-3 pl-10 pr-6 tracking-wide text-white  placeholder:overflow-visible placeholder:text-base-content placeholder:opacity-50 focus:outline-none ',
                            active ? 'bg-[#999999]' : ' ',
                            item === results[results.length - 1]
                                ? 'rounded-b-2xl'
                                : '',
                        )}
                    >
                        {item}
                    </div>
                ) : (
                    <div
                        className={cn(
                            'block w-96  bg-base py-3 pl-10 pr-6 tracking-wide text-white  placeholder:overflow-visible placeholder:text-base-content placeholder:opacity-50 focus:outline-none ',
                            active ? 'bg-[#999999]' : ' ',
                            item === results[results.length - 1]
                                ? 'rounded-b-2xl'
                                : '',
                        )}
                    >
                        {item.name}
                    </div>
                )
            }
        />
    );
}
const actions = [
    {
        id: 'blog',
        name: 'Blog',
        shortcut: ['b'],
        keywords: 'writing words',
        perform: () => (window.location.pathname = 'blog'),
    },
    {
        id: 'contact',
        name: 'Contact',
        shortcut: ['c'],
        keywords: 'email',
        perform: () => (window.location.pathname = 'contact'),
    },
    {
        id: 'mlh',
        name: 'MLH Fellowship',
        shortcut: ['c'],
        keywords: 'intern',
        perform: () => (window.location.pathname = 'mlh'),
    },
    {
        id: 'zeyad',
        name: 'Zeyad Tarek',
        shortcut: ['c'],
        keywords: 'student',
        perform: () => (window.location.pathname = 'zeyadtarekk'),
    },
];
const Search = props => (
    <KBarProvider actions={actions}>
        <KBarPortal>
            <KBarPositioner>
                <KBarAnimator>
                    <SearchBar />
                    <RenderResults />
                </KBarAnimator>
            </KBarPositioner>
        </KBarPortal>
        {props.children}
    </KBarProvider>
);
export default Search;
