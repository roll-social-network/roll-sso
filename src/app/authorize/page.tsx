import { redirect } from 'next/navigation'
import { ApprovalPrompt } from 'roll-node'
import {
  authorize,
  allowAuthorize,
} from '@/app/roll'
import type { AuthorizeParams } from 'roll-node'

const AuthorizePage = async ({ searchParams }: { searchParams: AuthorizeParams }) => {
  const allow = async () => {
    'use server'
    const { uri } = await allowAuthorize(searchParams)
    redirect(uri)
  }

  const {
    application,
    approvalPrompt,
    scopes,
  } = await authorize(searchParams)

  if (application.skipAuthorization || approvalPrompt === ApprovalPrompt.AUTO) {
    const { uri } = await allowAuthorize(searchParams)
    redirect(uri)
  }

  return (
    <div>
      <h2>Authorize {application.name}?</h2>
      <p>Application requires the following permissions:</p>
      <ul>
        {Object.values(scopes).map((description, i) => (<li key={i}>{description}</li>))}
      </ul>
      <form action={allow}>
        <p><button type="submit">Authorize</button></p>
      </form>
    </div>
  )
}

export default AuthorizePage
