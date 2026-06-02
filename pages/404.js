import Link from "next/link";
import Layout from "../components/layout";

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="luxury-surface app-panel mx-auto max-w-2xl px-8 py-16 text-center md:px-14 md:py-20">
        <p className="page-eyebrow">404 — Not Found</p>
        <h1 className="page-title mt-4">This page has left the edit.</h1>
        <p className="app-text-muted mx-auto mt-5 max-w-md text-sm leading-relaxed">
          The page you are looking for does not exist or may have been moved. Return to the
          collection to continue your journey.
        </p>
        <Link href="/" className="btn-luxury mt-10 inline-flex no-underline hover:no-underline">
          Back to Home
        </Link>
      </div>
    </Layout>
  );
}
