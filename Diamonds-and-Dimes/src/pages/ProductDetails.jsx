
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../services/api";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    let active = true;

    getProduct(id)
      .then((data) => {
        if (!active) return;

        if (!data) {
          setStatus("notfound");
          return;
        }

        setProduct(data);
        setQty(1);
        setStatus("ready");
      })
      .catch((error) => {
        if (!active) return;

        if (error.status === 404) {
          setStatus("notfound");
        } else {
          setStatus("error");
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (status === "loading") {
    return <p>Loading product...</p>;
  }

  if (status === "notfound") {
    return (
      <p>
        Product not found. <Link to="/shop">Back to shop</Link>
      </p>
    );
  }

  if (status === "error") {
    return <p>Something went wrong. Please try again.</p>;
  }

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);

    if (value >= 1 && value <= product.stock) {
      setQty(value);
    }
  };

  return (
    <>
      <h1>Product Details</h1>

      <main className="product-details">
        <img src={product.image} alt={product.name} />

        <div>
          <h1>{product.name}</h1>

          <p className="price">
            ${Number(product.price).toFixed(2)}
          </p>

          <p>{product.description}</p>

          <p>
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Out of stock"}
          </p>

          <label>
            Quantity

            <input
              type="number"
              min="1"
              max={product.stock}
              value={qty}
              onChange={handleQuantityChange}
              disabled={product.stock === 0}
            />
          </label>

          <button disabled={product.stock === 0}>
            Add to cart
          </button>

          <button>
            Save to wishlist
          </button>
        </div>
      </main>
    </>
  );
}
