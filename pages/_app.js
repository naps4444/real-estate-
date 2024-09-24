// /pages/_app.js
import { PagesTopLoader } from 'nextjs-toploader/pages';
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext"; // Import AuthProvider
import "@/styles/globals.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AuthProvider> {/* Wrap your components with AuthProvider */}
        <PagesTopLoader />
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  );
}
