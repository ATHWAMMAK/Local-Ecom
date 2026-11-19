import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../services/api";
import { useShop } from "../context/ShopContext";

const kes = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  currencyDisplay: "code",
  maximumFractionDigits: 2,
});

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useShop();

  // Each result remembers which id it belongs to.
  const [result, setResult] = useState({ id: null, status: "loading", product: null });
  const [qty, setQty] = useState("1"); // string so the field can be edited freely
  const [addedId, setAddedId] = useState(null); // id of the product just added

  useEffect(() => {
    let active = true;

    getProduct(id)
      .then((data) => {
        if (!active) return;

        if (!data || Object.keys(data).length === 0) {
          setResult({ id, status: "notfound", product: null });
          return;
        }

        setResult({ id, status: "ready", product: data });
        setQty("1");
      })
      .catch((error) => {
        if (!active) return;
        setResult({
          id,
          status: error.status === 404 ? "notfound" : "error",
          product: null,
        });
      });

    return () => {
      active = false;
    };
  }, [id]);

  // Clears the "Added" message after a moment (setState runs in a timer callback).
  useEffect(() => {
    if (addedId === null) return;
    const timer = setTimeout(() => setAddedId(null), 2000);
    return () => clearTimeout(timer);
  }, [addedId]);

  // Derived values: if the stored result is for a different id, we are loading.
  const isCurrent = result.id === id;
  const status = isCurrent ? result.status : "loading";
  const product = isCurrent ? result.product : null;

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
    return (
      <main className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold">We couldn’t load this product</h1>
        <p className="mt-3 text-brand-charcoal/70">
          Check your connection and try again.
        </p>
        <Link className="mt-6 inline-block underline" to="/shop">
          Back to shop
        </Link>
      </main>
    );
  }

  const outOfStock = product.stock <= 0;
  const added = addedId === product.id;
  const saved = wishlist.some((item) => String(item.id) === String(product.id));

  // Turns whatever is in the field into a valid quantity.
  const clampQty = (value) =>
    Math.min(Math.max(Math.floor(Number(value)) || 1, 1), product.stock);

  const handleQuantityChange = (e) => setQty(e.target.value);

  const handleQuantityBlur = () => setQty(String(clampQty(qty)));

  const handleAddToCart = () => {
    const quantity = clampQty(qty);
    setQty(String(quantity));
    addToCart(product, quantity);
    setAddedId(product.id);
  };

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-2 md:gap-12 md:py-16">
      <div className="overflow-hidden rounded-3xl border border-brand-gold/30 bg-brand-aqua/20 p-3">
        <img
          className="aspect-square h-full w-full object-cover"
          src={product.image}
          alt={product.name}
          width="600"
          height="600"
        />
      </div>

      <section className="flex flex-col items-start">
        <Link className="mb-8 text-sm font-medium text-brand-aqua-deep underline underline-offset-4" to="/shop">
          Back to shop
        </Link>

        <p className="text-sm uppercase tracking-[0.18em] text-brand-charcoal/60">
          {product.category}
        </p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
          {product.name}
        </h1>
        <p className="mt-4 text-2xl font-medium text-brand-charcoal">
          {kes.format(Number(product.price))}
        </p>

        {product.rating != null && (
          <p className="mt-3 text-sm" aria-label={`Rated ${product.rating} out of 5`}>
            <span aria-hidden="true">★</span> {Number(product.rating).toFixed(1)} / 5
          </p>
        )}

        <p className="mt-6 leading-7 text-brand-charcoal/80">
          {product.description}
        </p>

        <p className={`mt-5 text-sm ${outOfStock ? "text-red-700" : "text-green-800"}`}>
          {outOfStock ? "Out of stock" : `${product.stock} available`}
        </p>

        {!outOfStock && (
          <label className="mt-6 flex items-center gap-4 text-sm font-medium">
            Quantity
            <input
              className="w-20 rounded-md border border-brand-charcoal/30 px-3 py-2"
              type="number"
              min="1"
              max={product.stock}
              value={qty}
              onChange={handleQuantityChange}
              onBlur={handleQuantityBlur}
            />
          </label>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            className="rounded-full border border-brand-gold bg-brand-black px-6 py-3 font-semibold text-brand-gold transition hover:bg-brand-charcoal disabled:cursor-not-allowed disabled:opacity-50"
            disabled={outOfStock}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <button
            className="rounded-full border border-brand-aqua-deep bg-brand-aqua/30 px-6 py-3 font-semibold text-brand-charcoal transition hover:bg-brand-aqua/60"
            onClick={() => toggleWishlist(product)}
          >
            {saved ? "Remove from wishlist" : "Save to wishlist"}
          </button>
        </div>

        <p className="mt-4 min-h-6 text-sm" role="status" aria-live="polite">
          {added ? "Added to cart" : ""}
        </p>
      </section>
    </main>
  );
}
