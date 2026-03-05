import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { Toaster } from "react-hot-toast"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
