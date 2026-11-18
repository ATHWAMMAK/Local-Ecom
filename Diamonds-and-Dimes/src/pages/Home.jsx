import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <header>
        <Link to="/">Diamonds and Dimes</Link>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a>{' '}
          <a href="#shop">Shop</a>{' '}
          <a href="#product-details">Product Details</a>{' '}
          <a href="#cart">Cart</a>{' '}
          <a href="#checkout">Checkout</a>{' '}
          <a href="#wishlist">Wishlist</a>{' '}
          <a href="#account">Account</a>{' '}
          <a href="#Order-Details">Order Details</a>{' '}
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="home">
          <h1>Everyday technology, made easy</h1>
          <p>
            Find electronics for work, entertainment, and everything in between.
            Shop useful tech at prices that make sense.
          </p>
          <Link to="/shop">Browse the shop</Link>
        </section>

        <section id="shop">
          <h2>Shop Our Collection</h2>
          <p>Explore electronics for work, entertainment, and everyday use.</p>
          <h3>Explore electronics</h3>
          <ul>
            <li>Headphones and audio</li>
            <li>Computers and accessories</li>
            <li>Phones and chargers</li>
            <li>Home technology</li>
          </ul>
        </section>

        <section id="product-details">
          <h2>Product Details</h2>
          <article>
            <img
              src="https://placehold.co/600x600?text=Wireless+Headphones"
              alt="Wireless headphones"
              width="200"
            />
            <h3>Wireless Headphones</h3>
            <p>
              Enjoy clear sound, comfortable ear cushions, and long battery life.
            </p>
            <p>Price: KSh 3,500</p>
            <Link to="/products/1">View product</Link>
          </article>
        </section>

        <section id="cart">
          <h2>Shopping Cart</h2>
          <p>Review the products you plan to purchase.</p>
          <Link to="/cart">Open your cart</Link>
        </section>

        <section id="checkout">
          <h2>Checkout</h2>
          <p>Continue to checkout when you are ready to place your order.</p>
          <Link to="/checkout">Go to checkout</Link>
        </section>

        <section id="wishlist">
          <h2>My Wishlist</h2>
          <p>Keep track of products you would like to buy.</p>
          <Link to="/wishlist">Open your wishlist</Link>
        </section>

        <section id="account">
          <h2>My Account</h2>
          <p>Visit your account page.</p>
          <Link to="/account">Open your account</Link>
        </section>

        <section id="order-tracking">
          <h2>Order Tracking</h2>
          <p>View the details of an order from its order page.</p>
        </section>

        <section id="contact">
          <h2>Contact Us</h2>
          <p>Have a question? Visit our contact page for support.</p>
          <Link to="/contact">Open contact page</Link>
        </section>
      </main>

      <footer>
        <p>Diamonds and Dimes: electronics for everyday life.</p>
        <nav aria-label="Footer navigation">
          <Link to="/shop">Shop</Link>{' '}
          <Link to="/account">My account</Link>{' '}
          <Link to="/contact">Contact us</Link>
        </nav>
        <p>Copyright © Diamonds and Dimes</p>
      </footer>
    </>
  )
}
