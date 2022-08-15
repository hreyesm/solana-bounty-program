import '../styles/globals.css';

import { AppProps } from 'next/app';
import Layout from 'components/common/layout';
import { SessionProvider } from 'next-auth/react';
import { ContextProvider } from 'providers/ContextProvider';
import CommandPalette from 'components/common/command-palette';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
    <ContextProvider>
        <SessionProvider session={session}>
            <CommandPalette>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </CommandPalette>
        </SessionProvider>
    </ContextProvider>
);
export default App;
