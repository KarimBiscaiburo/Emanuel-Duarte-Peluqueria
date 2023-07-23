import Head from 'next/head';
import Layout from '@/components/Layout';

import '@/styles/globals.css';

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
