import { useEffect, useState } from "react";
import Layout from "../components/layout";
import ProductCard from "../components/productcard";


export default function Home() {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
fetch("https://fakestoreapi.com/products")
.then((res) => res.json())
.then((data) => {
setProducts(data);
setLoading(false);
})
.catch(() => {
setError("Failed to load products");
setLoading(false);
});
}, []);


return (
<Layout>
<h1>RevoShop Products</h1>


{loading && <p>Loading...</p>}
{error && <p>{error}</p>}


<div className="grid">
{products.map((product) => (
<ProductCard key={product.id} product={product} />
))}
</div>
</Layout>
);
}