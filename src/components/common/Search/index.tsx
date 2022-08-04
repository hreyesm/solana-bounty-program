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
import Card from '../card';
import SearchElement from './search-element';
import Text from '../text';

function RenderResults() {
    const { results } = useMatches();

    if (results.length === 0) return (
        <div className="w-full p-2 pl-5 pb-3">
            <Text variant="label" className="text-secondary !normal-case"> No results found </Text>
        </div>
    );

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === 'string' ? (
                    <div className="w-full p-2 pl-5 pb-3">
                        <Text variant="label" className="text-secondary"> {item} </Text> 
                    </div>
                ) : (
                    <SearchElement item={item.name} isActive={active} isOnlyItem={results.length === 1} />
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
            <KBarPositioner className="z-[200] bg-base bg-opacity-50 backdrop-blur-sm">
                {/* <Card className="h-fit w-fit overflow-hidden transition-all duration-300 ease-out"> */}
                <KBarAnimator className="w-[600px] overflow-hidden bg-base bg-opacity-70 backdrop-blur-lg firefox:bg-opacity-90 rounded-3xl text-white border border-white"> {/* TODO: Don't copy styling from `Card`-component - reuse it!  bg-base bg-opacity-70 backdrop-blur-lg firefox:bg-opacity-90 rounded-3xl text-white border border-white*/} 
                    <SearchBar />
                    <div className="h-px w-full bg-line" />
                    <RenderResults />
                </KBarAnimator>
                {/* </Card> */}
            </KBarPositioner>
        </KBarPortal>
        {props.children}
    </KBarProvider>
);
export default Search;
