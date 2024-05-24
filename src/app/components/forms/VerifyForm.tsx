'use client'

import {
  useFormState,
  useFormStatus,
} from 'react-dom'
import {
  useParams,
  useSearchParams,
  redirect,
} from 'next/navigation'
import { VerifyFormState } from '@/app/formStates'
import { verifyCode } from '@/app/actions'

const VerifyForm = () => {
  const params = useParams<{ phoneNumber: string }>()
  const searchParams = useSearchParams()
  const phoneNumber = decodeURIComponent(params.phoneNumber)
  const [state, action] = useFormState<VerifyFormState, FormData>(
    verifyCode,
    { values: { phoneNumber } }
  )
  const { pending } = useFormStatus()

  if (state?.success && state?.data?.token) {
    const next = searchParams.get('next')
    redirect(next || '/')
  }

  return (
    <form action={action}>
      {state?.errors?.nonFieldErrors &&
        <ul>
          {state?.errors?.nonFieldErrors.map((error, i) => (<li key={i}>{error}</li>))}
        </ul>}
      <p><label htmlFor="code">Code:</label></p>
      <div><input id="code" name="code" required /></div>
      {state?.errors?.code &&
        <ul>
          {state?.errors?.code.map((error, i) => (<li key={i}>{error}</li>))}
        </ul>}
      <p><button type="submit" disabled={pending}>Request</button></p>
    </form>
  )
}

export default VerifyForm
