import "@/styles/globals.css";
import RootLayout from "../layouts/RootLayout";

export default function App({ Component, pageProps }) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
