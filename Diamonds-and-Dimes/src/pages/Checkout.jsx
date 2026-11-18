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
  return <h1>Checkout</h1>
}

