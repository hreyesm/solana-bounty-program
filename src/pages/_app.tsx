import '../styles/globals.css';

import { AppProps } from 'next/app';
import Layout from 'components/common/layout';
import { SessionProvider } from 'next-auth/react';
import { ContextProvider } from 'providers/ContextProvider';
import CommandPalette from 'components/common/command-palette';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
    <ContextProvider>
        <CommandPalette>
            <SessionProvider session={session}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </CommandPalette>
    </ContextProvider>
);
export default App;
