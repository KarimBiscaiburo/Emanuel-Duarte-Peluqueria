import Head from 'next/head';
import Layout from 'src/components/Layout';

import 'src/styles/globals.css';

export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <title>Emanuel Duarte</title>
    </Head>
    
    <Layout>
      <Component {...pageProps} / >
    </Layout>
  </>
}
