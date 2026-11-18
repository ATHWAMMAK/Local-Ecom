import { useState,} from 'react'
import { link } from 'react-router-dom';
import { getUserByEmail, updateUser } from '../services/api';

export default function Account() {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)
  
 async function findAccount(event) {
  event.preventDefault()
  setLoading(true)
  setNotice('')
  setUser(null)

  try {
    const found = await getUserByEmail(email.trim ())

    if (!found) {
      setNotice('No demo account was found for that email.')
      return
    }

    setUser(found)
    setName(found.name || '')
    setPhone(found.phone || '')
  } catch {
    setNotice('Could not load the account. Check that the demo API is running and try again.')
  } finally {
    setLoading(false)
  }
 }