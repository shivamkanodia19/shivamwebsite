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
          <p>This address does not match any page on this site.</p>
          <Link to="/" className="button button-primary">Back to portfolio</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
