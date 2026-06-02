import Link from "next/link";
import Layout from "../components/layout";

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="py-20 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
          404
        </p>
        <h1 className="mb-4 text-4xl font-bold">Page not found</h1>
        <p className="mb-8 text-lg text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white no-underline hover:opacity-90 hover:no-underline"
        >
          Back to Home
        </Link>
      </div>
    </Layout>
  );
}
