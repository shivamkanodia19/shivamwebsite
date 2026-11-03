import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";

export function NotFoundPage() {
  return (
    <>
      <Navbar />
      <main className="not-found-page">
        <div className="site-container">
          <p className="eyebrow">404</p>
          <h1>Page not found.</h1>
          <p>No page exists at this address.</p>
          <Link to="/" className="button button-primary">Back to portfolio</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
