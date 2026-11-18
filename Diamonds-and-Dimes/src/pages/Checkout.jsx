import { useState } from 'react'



export default function Checkout() {
  const [form, setForm] = useState({
  name: '',
  email: '',
  phone: '',
  address: '',
})
function handleChange(event) {
 const { name, value } = event.target

 setForm((currentForm) => ({
  ...currentForm,
  [name]: value,
 }))
}
 return (
  <section className="mx-auto w-full max-w-3xl px-4 py-12">
    <h1 className="text-3xl font-semibold text-brand-black">Checkout</h1>

    <form className="mt-6 space-y-4">
      <div>
        <label htmlFor="checkout-name" className="mb-1 block">
          Name
        </label>
        <input
          id="checkout-name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="min-h-11 w-full rounded-md border border-brand-charcoal/25 bg-white px-3"
        />
      </div>
      <div>
  <label htmlFor="checkout-email" className="mb-1 block">
    Email
  </label>
  <input
    id="checkout-email"
    name="email"
    type="email"
    value={form.email}
    onChange={handleChange}
    required
    className="min-h-11 w-full rounded-md border border-brand-charcoal/25 bg-white px-3"
  />
</div>
  <div>
  <label htmlFor="checkout-phone" className="mb-1 block">
    Phone
  </label>
  <input
    id="checkout-phone"
    name="phone"
    type="tel"
    autoComplete="tel"
    value={form.phone}
    onChange={handleChange}
    required
    className="min-h-11 w-full rounded-md border border-brand-charcoal/25 bg-white px-3"
  />
</div>
    </form>
  </section>
)
}
