import { useState } from 'react'

function useAuthForm<T extends Record<string, string>>(
  initialState: T,
) {
  const [form, setForm] = useState<T>(initialState)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const isFormValid = Object.values(form).every(
    (v) => v.trim() !== '',
  )

  return { form, handleInput, isFormValid, setForm }
}

export default useAuthForm
