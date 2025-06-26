import React from 'react'

type AuthErrorProps = {
  error: string
}

function AuthError({ error }: AuthErrorProps) {
  return (
    <span className="text-xs text-red-500 text-center">{error}</span>
  )
}

export default AuthError
