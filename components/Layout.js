import Head from "next/head";
import Footer from "./Footer";
import NavBar from "./NavBar";

function Layout({ children }) {
  return (
    <div className="max-w-6xl mx-auto">
      <Head>
        <title>Miles-RealEstates</title>
      </Head>
      <header className="sticky top-0 z-50">
        <NavBar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
