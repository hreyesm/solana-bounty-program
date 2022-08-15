import '../styles/globals.css';

import { AppProps } from 'next/app';
import Layout from 'components/common/layout';
import { SessionProvider } from 'next-auth/react';
import { ContextProvider } from 'providers/ContextProvider';
import CommandPalette from 'components/common/command-palette';
import { NextSeo } from 'next-seo';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
    <>
        <NextSeo
            title={undefined}
            titleTemplate="%s | Solana Bounty"
            defaultTitle="Solana Bounty"
            description="A tool for project maintainers to streamline the process of finding open source contributors. And conversely for open source contributors to find projects to contribute and get reward"
        />
        <ContextProvider>
            <CommandPalette>
                <SessionProvider session={session}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SessionProvider>
            </CommandPalette>
        </ContextProvider>
    </>
);

export default App;
