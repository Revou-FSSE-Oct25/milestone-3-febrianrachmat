import Layout from "../../components/layout";
import { useContext } from "react";
import { CartContext } from "../../context/cartcontext";


export default function ProductDetail({ product }) {
const { addToCart } = useContext(CartContext);


return (
<Layout>
<h1>{product.title}</h1>
<img src={product.image} width="200" />
<p>{product.description}</p>
<h3>${product.price}</h3>


<button onClick={() => addToCart(product)}>Add to Cart</button>
</Layout>
);
}


export async function getServerSideProps(context) {
const { id } = context.params;


const res = await fetch(`https://fakestoreapi.com/products/${id}`);


if (!res.ok) {
return { notFound: true };
}


const product = await res.json();


return {
props: { product },
};
}