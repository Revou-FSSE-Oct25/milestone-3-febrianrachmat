import Layout from "../../components/layout";
import { useContext } from "react";
import { CartContext } from "../../context/cartcontext";


export default function ProductDetail({ product }) {
const { addToCart } = useContext(CartContext);


return (
<Layout>
  <div className="product-detail">
    <div className="product-image">
      <img src={product.image} alt={product.title} />
    </div>

    <div className="product-info">
      <h1>{product.title}</h1>
      <p className="product-desc">{product.description}</p>
      <div className="product-price">${product.price}</div>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  </div>
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