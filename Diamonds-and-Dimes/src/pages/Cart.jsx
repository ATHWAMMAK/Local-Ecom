
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useShop()

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border-b py-4"
              >
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>KSh {item.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>

                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold">
              Total: KSh {cartTotal.toLocaleString()}
            </h2>

            <Link
              to="/checkout"
              className="inline-block mt-4 rounded-lg bg-black px-6 py-3 text-white"
            >
              Go to Checkout
            </Link>
          </div>
        </>
      )}
    </section>
  )
}
