import {
  headers,
  cookies,
} from 'next/headers'
import Roll, { APIURLNotResolvedError } from 'roll-node'

export const resolveRollDomainFromHost = (host: string) => {
  if (!host.startsWith('sso.')) {
    return undefined
  }
  return host.replace(/^sso./, '')
}

export const getRoll = () => {
  const hdrs = headers()
  const host = hdrs.get('x-forwarded-host') || hdrs.get('host') || undefined
  const rollDomain = host ? resolveRollDomainFromHost(host) : undefined
  const userToken = cookies().get('token')?.value

  try {
    return new Roll({
      baseUrl: process.env.NEXT_PUBLIC_ROLL_BASE_URL,
      rollDomain,
      userToken,
    })
  } catch (e) {
    if (!(e instanceof APIURLNotResolvedError)) {
      throw e
    }
  }

  const protocol = hdrs.get('x-forwarded-proto') || undefined

  return new Roll({
    baseUrl: host && protocol ? `${protocol}://${rollDomain}` : undefined,
    rollDomain,
    userToken,
  })
}
