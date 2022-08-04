import '../styles/globals.css';

import { AppProps } from 'next/app';
import Layout from 'components/common/layout';
import { SessionProvider } from 'next-auth/react';
import SearchBar from 'components/common/search-bar';
import {
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    useMatches,
    KBarResults,
    NO_GROUP,
} from 'kbar';

function RenderResults() {
    const { results } = useMatches();

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === 'string' ? (
                    <div>{item}</div>
                ) : (
                    <div
                        style={{
                            background: active ? '#eee' : 'transparent',
                        }}
                    >
                        {item.name}
                    </div>
                )
            }
        />
    );
}

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
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
            id: 'ahmed',
            name: 'ahmed mohamed',
            shortcut: ['c'],
            keywords: 'email',
            perform: () => (window.location.pathname = 'contact'),
        },
        {
            id: 'zeyad',
            name: 'Zeyad Tarek',
            shortcut: ['c'],
            keywords: 'email',
            perform: () => (window.location.pathname = 'contact'),
        },
    ];
    return (
        <KBarProvider actions={actions}>
            <KBarPortal>
                <KBarPositioner>
                    <KBarAnimator>
                        <SearchBar />
                        <RenderResults />
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
            <SessionProvider session={session}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </KBarProvider>
    );
};

export default App;
