'use client'

import {
  useFormState,
  useFormStatus,
} from 'react-dom'
import {
  useSearchParams,
  redirect,
} from 'next/navigation'
import { login } from '@/app/actions'
import { LoginMethods } from 'roll-node'

const LoginForm = () => {
  const searchParams = useSearchParams()
  const [state, action] = useFormState(login, undefined)
  const { pending } = useFormStatus()

  if (state?.success) {
    if (state?.data?.availableMethods.includes(LoginMethods.OTP_CODE)) {
      redirect(`/verify-otp-code/${state?.values?.phoneNumber}?${searchParams}`)
    }

    redirect(`/request/${state?.values?.phoneNumber}?${searchParams}`)
  }

  return (
    <form action={action}>
      <p><label htmlFor="phoneNumber">Phone Number:</label></p>
      <div><input id="phoneNumber" name="phoneNumber" required /></div>
      {state?.errors?.phoneNumber &&
        <ul>
          {state?.errors?.phoneNumber.map((error, i) => (<li key={i}>{error}</li>))}
        </ul>}
      <p><button type="submit" disabled={pending}>Request</button></p>
    </form>
  )
}

export default LoginForm
