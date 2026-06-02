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
      <div className="mx-auto my-20 max-w-md">
        <h1 className="mb-8 text-[32px] font-bold">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-3"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-3"
            required
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer rounded-md bg-black px-3 py-3 text-white disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
