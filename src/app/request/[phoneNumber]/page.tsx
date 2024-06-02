import { redirect } from 'next/navigation'
import { FormValidationError } from 'roll-node'
import { requestVerificationCode } from '@/app/roll'
import type { ReadonlyURLSearchParams } from 'next/navigation'

const RequestVerificationCode = async ({ params, searchParams }: { params: { phoneNumber: string }, searchParams: ReadonlyURLSearchParams }) => {
  const phoneNumber = decodeURIComponent(params.phoneNumber)

  try {
    const requested = await requestVerificationCode(phoneNumber)

    if (requested) {
      redirect(`/verify/${phoneNumber}?${new URLSearchParams(searchParams)}`)
    }

    return (
      <p>Failed! :(</p>
    )
  } catch (e) {
    if (e instanceof FormValidationError) {
      return (
        <section>
          <ul>
            {e.fields.phoneNumber?.map((error, i) => (<li key={i}>{error}</li>))}
          </ul>
        </section>
      )
    }
    throw e
  }
}

export default RequestVerificationCode
