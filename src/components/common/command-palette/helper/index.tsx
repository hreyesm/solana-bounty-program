import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Action, useRegisterActions } from '../../../src';

const data = [
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
              perform: () => (window.location.pathname = `/${session.login}`),
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

const searchId = randomId();

export default function useDocsActions() {
    const history = useHistory();

    const searchActions = React.useMemo(() => {
        const actions: Action[] = [];
        const collectDocs = tree => {
            tree.forEach(key => {
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
