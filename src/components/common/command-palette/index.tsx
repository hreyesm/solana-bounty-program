import { cn } from 'utils';
import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    useMatches,
    KBarResults,
    KBarSearch,
    ActionId,
    ActionImpl,
    useKBar,
    createAction,
    NO_GROUP,
} from 'kbar';
import { useState, useEffect } from 'react';
import Card from '../card';
import Text from '../text';
import { MdOutlineSearch } from 'react-icons/md';
import React from 'react';
import { useSession } from 'next-auth/react';

const searchId = randomId();

// function useDocsActions() {
//     console.log('======================================');
//     console.log('testing docs actions');
//     console.log('======================================');
//     const searchActions = React.useMemo(() => {
//         const collectDocs = tree => {
//             Object.keys(tree).forEach(key => {
//                 const curr = tree[key];
//                 if (curr.children) {
//                     collectDocs(curr.children);
//                 }

//                 if (curr.component) {
//                     actions.push({
//                         id: randomId(),
//                         parent: searchId,
//                         name: curr.name,
//                         shortcut: [],
//                         keywords: 'api reference docs',
//                         section: curr.section,
//                         // perform: () => console.log(curr.slug),
//                     });
//                 }
//             });
//             return actions;
//         };
//         return collectDocs(actions);
//     }, []);
// }

function randomId() {
    return Math.random().toString(36).substring(2, 9);
}

// eslint-disable-next-line react/display-name
const ResultItem = React.forwardRef(
    (
        {
            action,
            active,
            currentRootActionId,
        }: {
            action: ActionImpl;
            active: boolean;
            currentRootActionId: ActionId;
        },
        ref: React.Ref<HTMLDivElement>,
    ) => {
        const ancestors = React.useMemo(() => {
            if (!currentRootActionId) return action.ancestors;
            const index = action.ancestors.findIndex(
                ancestor => ancestor.id === currentRootActionId,
            );
            // +1 removes the currentRootAction; e.g.
            // if we are on the "Set theme" parent action,
            // the UI should not display "Set theme… > Dark"
            // but rather just "Dark"
            return action.ancestors.slice(index + 1);
        }, [action.ancestors, currentRootActionId]);

        return (
            <div
                ref={ref}
                className={cn(
                    'flex h-16 cursor-pointer flex-row items-center justify-between pr-5 transition-colors duration-300 ease-out',
                    active && 'bg-primary-focus bg-opacity-5',
                )}
            >
                <div className="flex h-full flex-row items-center gap-5">
                    <div
                        className={cn(
                            'h-1/2 w-1 bg-transparent transition-all duration-300 ease-out',
                            active && '!h-full !bg-primary',
                        )}
                    />

                    <div className="flex flex-col">
                        <Text variant="paragraph">{action.name}</Text>
                        <Text
                            variant="label"
                            className="!normal-case text-secondary"
                        >
                            {action.subtitle}
                        </Text>
                    </div>
                </div>
                {action.shortcut?.length && (
                    <div
                        aria-hidden
                        className="flex flex-row items-center gap-1.5"
                    >
                        {action.shortcut.map(sc => (
                            <kbd key={sc} className="kbd kbd-sm bg-black/50">
                                {sc}
                            </kbd>
                        ))}
                    </div>
                )}
            </div>
        );
    },
);

const CommandPalette = props => {
    const { data: session } = useSession();
    // console.log('session');
    // console.log(session);
    // console.log('session');

    const [sessionReady, setSessionReady] = useState(false);
    useEffect(() => {
        if (session) setSessionReady(true);
    }, [session]);

    const actions = [
        {
            key: 'home',
            id: 'home',
            name: 'Home',
            subtitle: 'Subtitles can help add more context.',
            keywords: 'home homepage landing',
            shortcut: ['h'],
            section: 'Navigation',
            perform: () => (window.location.pathname = '/'),
        },
        {
            key: 'explorer',
            id: 'explorer',
            name: 'Explorer',
            keywords: 'explorer bounties',
            shortcut: ['e'],
            section: 'Navigation',
            perform: () => (window.location.pathname = '/explorer'),
        },
        sessionReady
            ? {
                  key: 'profile',
                  id: 'profile',
                  name: 'Your profile',
                  keywords: 'profile me account',
                  shortcut: ['p'],
                  section: 'Navigation',
                  perform: () =>
                      (window.location.pathname = `/${session.login}`),
              }
            : '',
        {
            key: 'search-bounty',
            id: 'search-bounty',
            name: 'Search bounties...',
            keywords: 'search bounty bounties',
            shortcut: ['s', 'b'],
            section: 'Actions',
            perform: () => (window.location.pathname = 'blog'),
        },
        {
            key: 'search-profile',
            id: 'search-profile',
            name: 'Search profiles...',
            keywords: 'search profile user profiles users',
            shortcut: ['s', 'p'],
            section: 'Actions',
        },
        {
            key: searchId,
            id: searchId,
            name: 'Search docs…',
            shortcut: ['?'],
            keywords: 'find',
            section: 'Documentation',
        },
        {
            key: 'create-bounty',
            id: 'create-bounty',
            name: 'Create bounty',
            keywords: 'bounty create new plus add',
            shortcut: ['c', 'b'],
            section: 'Actions',
            perform: () => (window.location.pathname = 'blog'),
        },
        {
            key: 'integrate-github',
            id: 'integrate-github',
            name: 'Sign in...',
            keywords: 'sign in sign out login logout',
            shortcut: ['g'],
            section: 'Integrations',
            perform: () => (window.location.pathname = 'contact'),
        },
        {
            key: 'integrate-wallet',
            id: 'integrate-wallet',
            name: 'Connect wallet...',
            keywords:
                'connect wallet solana solana-wallet phantom solflare torus sollet ',
            shortcut: ['w'],
            section: 'Integrations',
            perform: () => (window.location.pathname = 'contact'),
        },
    ];

    console.log(actions);

    return (
        <KBarProvider
            options={{
                enableHistory: true,
            }}
            actions={actions}
        >
            <CommandBar />
            {props.children}
        </KBarProvider>
    );
};
function CommandBar() {
    // const { queryValue } = useKBar(state => ({
    //     queryValue: state.searchQuery,
    // }));
    // const [user, setUser] = useState('');
    // useEffect(() => {
    //     setUser(queryValue);
    //     console.log(user);
    // }, [queryValue]);
    // // useDocsActions();
    return (
        <KBarPortal>
            <KBarPositioner className="z-[200] bg-base bg-opacity-50 backdrop-blur-md">
                <KBarAnimator className="w-[600px] overflow-hidden rounded-3xl border border-white bg-base bg-opacity-90 text-white backdrop-blur-lg firefox:bg-opacity-90">
                    {' '}
                    {/* TODO: Don't copy styling from `Card`-component - reuse it!  bg-base bg-opacity-70 backdrop-blur-lg firefox:bg-opacity-90 rounded-3xl text-white border border-white*/}
                    <div className="flex flex-row justify-between gap-3 p-5">
                        <KBarSearch
                            defaultPlaceholder="Search bounties, profiles, pages, and more..."
                            className="block w-full bg-transparent text-white placeholder:overflow-visible placeholder:text-base-content placeholder:opacity-50 focus:outline-none"
                        />
                        <MdOutlineSearch size={22} className="w-fit" />
                    </div>
                    <div className="h-px w-full bg-line" />
                    <RenderResults />
                </KBarAnimator>
            </KBarPositioner>
        </KBarPortal>
    );
}

function RenderResults() {
    const { results, rootActionId } = useMatches();

    // if (results.length === 0) return (
    //     <div className="w-full p-2 pl-5 pb-3">
    //         <Text variant="label" className="text-secondary !normal-case"> No results found </Text>
    //     </div>
    // );

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === 'string' ? (
                    <div className="w-full p-2 pl-6 pb-3">
                        <Text variant="label" className="text-primary">
                            {' '}
                            {item}{' '}
                        </Text>
                    </div>
                ) : (
                    <ResultItem
                        action={item}
                        active={active}
                        currentRootActionId={rootActionId}
                    />
                )
            }
        />
    );
}

export default CommandPalette;
