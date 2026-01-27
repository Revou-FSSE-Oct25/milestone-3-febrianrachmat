import Link from "next/link";


export default function Layout({ children }) {
return (
<div>
<nav style={{ padding: 20, borderBottom: "1px solid #ccc" }}>
<Link href="/">Home</Link> | <Link href="/promo">Promo</Link> | <Link href="/faq">FAQ</Link>
</nav>
<main style={{ padding: 20 }}>{children}</main>
</div>
);
}