import '../styles/globals.css';

import { AppProps } from 'next/app';
import Layout from 'components/common/layout';
import { SessionProvider } from 'next-auth/react';
import { ContextProvider } from 'components/common/context/ContextProvider';
import CommandPalette from 'components/common/command-palette';
// import NewCommand from 'components/common/test-comp';
import { BrowserRouter as Router } from 'react-router-dom';

import TestCommand from 'components/common/test-command';
const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
    <ContextProvider>
        {/* <Router> */}
        <TestCommand>
            <SessionProvider session={session}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </TestCommand>
        {/* </Router> */}
    </ContextProvider>
);
export default App;
