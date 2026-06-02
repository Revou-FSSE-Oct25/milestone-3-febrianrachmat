import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/authcontext";
import Layout from "../components/layout";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const success = await login(email, password);

    setLoading(false);

    if (success) {
      const redirect =
        typeof router.query.redirect === "string" ? router.query.redirect : "/";
      const safeRedirect =
        redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : "/";

      router.push(safeRedirect);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-md">
        <div className="luxury-surface app-panel p-8 md:p-10">
          <p className="page-eyebrow">Member Access</p>
          <h1 className="page-title mt-2">Sign In</h1>
          <p className="app-text-muted mt-3 text-sm">
            Enter your credentials to access checkout and order history.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <label className="form-label">
              Email
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </label>

            <label className="form-label">
              Password
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </label>

            {error && (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn-luxury mt-2 w-full">
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>

        <div className="app-chip mt-6 rounded-2xl border border-[var(--line)] p-5 text-sm">
          <p className="app-text-muted mb-2 text-xs font-semibold tracking-[0.14em] uppercase">
            Demo credentials
          </p>
          <p>
            User: <span className="font-mono">john@mail.com</span> /{" "}
            <span className="font-mono">changeme</span>
          </p>
          <p className="mt-1">
            Admin: <span className="font-mono">admin@mail.com</span> /{" "}
            <span className="font-mono">admin123</span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
