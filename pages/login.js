import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/authcontext";
import Layout from "../components/layout";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const success = await login(username, password);

    setLoading(false);

    if (success) {
      router.push("/checkout");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
