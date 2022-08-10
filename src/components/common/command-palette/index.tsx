import { cn } from 'utils';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
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
    Action,
    useRegisterActions,
} from 'kbar';
import Card from '../card';
import Text from '../text';
import { MdOutlineSearch } from 'react-icons/md';
import React from 'react';

// import data from '../Docs/data';
const data = {
    introduction: {
        name: 'Introduction',
        slug: '/docs',
        children: {
            overview: {
                name: 'Overview',
                slug: '/docs/overview',
                component: <div>APIReference</div>,
                section: 'Overview',
            },
            gettingStarted: {
                name: 'Getting started',
                slug: '/docs/getting-started',
                component: <div>APIReference</div>,
                section: 'Overview',
            },
        },
    },
    concepts: {
        name: 'Concepts',
        slug: '/concepts',
        children: {
            overview: {
                name: 'Actions',
                slug: '/docs/concepts/actions',
                component: <div>APIReference</div>,
                section: 'Concepts',
            },
            shortcuts: {
                name: 'Shortcuts',
                slug: '/docs/concepts/shortcuts',
                component: <div>APIReference</div>,
                section: 'Concepts',
            },
            accessingState: {
                name: 'State',
                slug: '/docs/concepts/state',
                component: <div>APIReference</div>,
                section: 'Concepts',
            },
            history: {
                name: 'Undo/Redo',
                slug: '/docs/concepts/history',
                component: <div>APIReference</div>,
                section: 'Concepts',
            },
            priority: {
                name: 'Priority',
                slug: '/docs/concepts/priority',
                component: <div>APIReference</div>,
                section: 'Concepts',
            },
        },
    },
    apiReference: {
        name: 'API Reference',
        slug: '/api',
        children: {
            useStore: {
                name: 'useStore',
                slug: '/docs/api/#useStore',
                component: <div>APIReference</div>,
                section: 'API Reference',
            },
            kbarProvider: {
                name: 'KBarProvider',
                slug: '/docs/api/#KBarProvider',
                component: <div>APIReference</div>,
                section: 'API Reference',
            },
            kbarPortal: {
                name: 'KBarPortal',
                slug: '/docs/api/#KBarPortal',
                component: <div>APIReference</div>,
                section: 'API Reference',
            },
            kbarAnimator: {
                name: 'KBarAnimator',
                slug: '/docs/api/#KBarAnimator',
                component: <div>APIReference</div>,
                section: 'API Reference',
            },
            kbarSearch: {
                name: 'KBarSearch',
                slug: '/docs/api/#KBarSearch',
                component: <div>APIReference</div>,
                section: 'API Reference',
            },
            kbarResults: {
                name: 'KBarResults',
                slug: '/docs/api/#KBarResults',
                component: <div>APIReference</div>,
                section: 'API Reference',
            },
            useKBar: {
                name: 'useKBar',
                slug: '/docs/api/#useKBar',
                component: <div>APIReference</div>,
                section: 'API Reference',
            },
            historyImpl: {
                name: 'HistoryImpl',
                slug: '/docs/api/#HistoryImpl',
                component: <div>APIReference</div>,
                section: 'API Reference',
            },
        },
    },
    tutorials: {
        name: 'Tutorials',
        slug: '/tutorials',
        children: {
            basic: {
                name: 'Basic tutorial',
                slug: '/docs/tutorials/basic',
                component: null,
                section: 'Tutorials',
            },
            custom: {
                name: 'Custom styles',
                slug: '/docs/tutorials/custom-styles',
                component: null,
                section: 'Tutorials',
            },
        },
    },
};

const searchId = randomId();

function useDocsActions() {
    const history = useRouter();

    const searchActions = React.useMemo(() => {
        let actions: Action[] = [];
        const collectDocs = tree => {
            Object.keys(tree).forEach(key => {
                const curr = tree[key];
                if (curr.children) {
                    collectDocs(curr.children);
                }

                if (curr.component) {
                    actions.push({
                        id: randomId(),
                        parent: searchId,
                        name: curr.name,
                        shortcut: [],
                        keywords: 'api reference docs',
                        section: curr.section,
                        perform: () => history.push(curr.slug),
                    });
                }
            });
            return actions;
        };
        return collectDocs(data);
    }, [history]);

    const rootSearchAction = React.useMemo(
        () =>
            searchActions.length
                ? {
                      id: searchId,
                      name: 'Search docs…',
                      shortcut: ['?'],
                      keywords: 'find',
                      section: 'Documentation',
                  }
                : null,
        [searchActions],
    );
    useRegisterActions(
        [rootSearchAction, ...searchActions].filter(Boolean) as Action[],
    );
}

function randomId() {
    return Math.random().toString(36).substring(2, 9);
}

const actions = [
    {
        id: 'home',
        name: 'Home',
        subtitle: 'Subtitles can help add more context.',
        keywords: 'home homepage landing',
        shortcut: ['h'],
        section: 'Navigation',
        perform: () => (window.location.pathname = '/'),
    },
    {
        id: 'explorer',
        name: 'Explorer',
        keywords: 'explorer bounties',
        shortcut: ['e'],
        section: 'Navigation',
        perform: () => (window.location.pathname = '/explorer'),
    },
    {
        id: 'profile',
        name: 'Your profile',
        keywords: 'profile me account',
        shortcut: ['p'],
        section: 'Navigation',
        perform: () => (window.location.pathname = '/HaresMahmood'),
    },
    {
        id: 'search-bounty',
        name: 'Search bounties...',
        keywords: 'search bounty bounties',
        shortcut: ['s', 'b'],
        section: 'Actions',
        perform: () => (window.location.pathname = 'blog'),
    },
    {
        id: 'search-profile',
        name: 'Search profiles...',
        keywords: 'search profile user profiles users',
        shortcut: ['s', 'p'],
        section: 'Actions',
        perform: () => (window.location.pathname = 'blog'),
    },
    {
        id: 'create-bounty',
        name: 'Create bounty',
        keywords: 'bounty create new plus add',
        shortcut: ['c', 'b'],
        section: 'Actions',
        perform: () => (window.location.pathname = 'blog'),
    },
    {
        id: 'integrate-github',
        name: 'Sign in...',
        keywords: 'sign in sign out login logout',
        shortcut: ['g'],
        section: 'Integrations',
        perform: () => (window.location.pathname = 'contact'),
    },
    {
        id: 'integrate-wallet',
        name: 'Connect wallet...',
        keywords:
            'connect wallet solana solana-wallet phantom solflare torus sollet ',
        shortcut: ['w'],
        section: 'Integrations',
        perform: () => (window.location.pathname = 'contact'),
    },
];

const CommandPalette = props => {
    // useAnalytics();
    const history = useRouter();
    const initialActions = [
        {
            id: 'homeAction',
            name: 'Home',
            shortcut: ['h'],
            keywords: 'back',
            section: 'Navigation',
            perform: () => history.push('/'),
            // icon: <HomeIcon />,
            subtitle: 'Subtitles can help add more context.',
        },
        {
            id: 'docsAction',
            name: 'Docs',
            shortcut: ['g', 'd'],
            keywords: 'help',
            section: 'Navigation',
            perform: () => history.push('/docs'),
        },
        {
            id: 'contactAction',
            name: 'Contact',
            shortcut: ['c'],
            keywords: 'email hello',
            section: 'Navigation',
            perform: () => window.open('mailto:timchang@hey.com', '_blank'),
        },
        {
            id: 'twitterAction',
            name: 'Twitter',
            shortcut: ['g', 't'],
            keywords: 'social contact dm',
            section: 'Navigation',
            perform: () =>
                window.open('https://twitter.com/timcchang', '_blank'),
        },
        // createAction({
        //     name: 'Github',
        //     shortcut: ['g', 'h'],
        //     keywords: 'sourcecode',
        //     section: 'Navigation',
        //     perform: () =>
        //         window.open('https://github.com/timc1/kbar', '_blank'),
        // }),
    ];

    return (
        <KBarProvider
            options={{
                enableHistory: true,
            }}
            actions={initialActions}
        >
            <CommandBar />
            {/* <Layout> */}
            <Switch>
                <Route path="/docs" exact>
                    <Redirect to="/docs/overview" />
                </Route>
                <Route path="/docs/:slug">{/* <Docs /> */}</Route>
                <Route path="/blog">{/* <Blog /> */}</Route>
                <Route path="*">{/* <Home /> */}</Route>
            </Switch>
            {/* </Layout> */}
            <Toaster
                toastOptions={{
                    position: 'bottom-right',
                }}
            />
            {props.children}
        </KBarProvider>
    );
};

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
                style={{
                    padding: '12px 16px',
                    background: active ? 'var(--a1)' : 'transparent',
                    borderLeft: `2px solid ${
                        active ? 'var(--foreground)' : 'transparent'
                    }`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        fontSize: 14,
                    }}
                >
                    {action.icon && action.icon}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            {ancestors.length > 0 &&
                                ancestors.map(ancestor => (
                                    <React.Fragment key={ancestor.id}>
                                        <span
                                            style={{
                                                opacity: 0.5,
                                                marginRight: 8,
                                            }}
                                        >
                                            {ancestor.name}
                                        </span>
                                        <span
                                            style={{
                                                marginRight: 8,
                                            }}
                                        >
                                            &rsaquo;
                                        </span>
                                    </React.Fragment>
                                ))}
                            <span>{action.name}</span>
                        </div>
                        {action.subtitle && (
                            <span style={{ fontSize: 12 }}>
                                {action.subtitle}
                            </span>
                        )}
                    </div>
                </div>
                {action.shortcut?.length ? (
                    <div
                        aria-hidden
                        style={{
                            display: 'grid',
                            gridAutoFlow: 'column',
                            gap: '4px',
                        }}
                    >
                        {action.shortcut.map(sc => (
                            <kbd
                                key={sc}
                                style={{
                                    padding: '4px 6px',
                                    background: 'rgba(0 0 0 / .1)',
                                    borderRadius: '4px',
                                    fontSize: 14,
                                }}
                            >
                                {sc}
                            </kbd>
                        ))}
                    </div>
                ) : null}
            </div>
        );
    },
);

function CommandBar() {
    useDocsActions();
    // useThemeActions();
    return (
        <KBarPortal>
            <KBarPositioner>
                <KBarAnimator>
                    <KBarSearch />
                    <RenderResults />
                </KBarAnimator>
            </KBarPositioner>
        </KBarPortal>
    );
}

function RenderResults() {
    const { results, rootActionId } = useMatches();

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === 'string' ? (
                    <div>{item}</div>
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
