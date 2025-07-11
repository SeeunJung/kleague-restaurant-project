'use client'
import { useState } from 'react'

function useForm<T extends Record<string, string | number>>(
  initialState: T,
) {
  const [form, setForm] = useState<T>(initialState)

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: typeof prev[name] === 'number' ? Number(value) : value,
    }))
  }

  const setField = <K extends keyof T>(name: K, value: T[K]) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const isFormValid = Object.values(form).every(
    (v) => v !== '' && v !== null && v !== undefined,
  )

  const resetForm = () => setForm(initialState)

  return {
    form,
    handleInput,
    isFormValid,
    setForm,
    setField,
    resetForm,
  }
}

export default useForm
