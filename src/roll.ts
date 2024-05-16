import { cache } from 'react'
import { headers } from 'next/headers'
import Roll, { APIURLNotResolvedError } from 'roll-node'
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'

const resolveRollDomainFromHost = (host: string) => {
  if (!host.startsWith('sso.')) {
    return undefined
  }
  return host.replace(/^sso./, '')
}

export const getRoll = (host?: string, protocol?: string) => {
  const rollDomain = host ? resolveRollDomainFromHost(host) : undefined

  try {
    return new Roll({ baseUrl: process.env.NEXT_PUBLIC_ROLL_BASE_URL, rollDomain })
  } catch (e) {
    if (!(e instanceof APIURLNotResolvedError)) {
      throw e
    }
  }

  return new Roll({
    baseUrl: host && protocol ? `${protocol}://${rollDomain}` : undefined,
    rollDomain,
  })
}

export const getRollArgs = (headers: ReadonlyHeaders): [string | undefined, string | undefined] => {
  const host = headers.get('x-forwarded-host') || headers.get('host') || undefined
  const protocol = headers.get('x-forwarded-proto') || undefined
  return [host, protocol]
}

export const getCurrentSite = cache(async () => {
  const hdrs = headers()
  const roll = getRoll(...getRollArgs(hdrs))
  return await roll.getCurrentSite()
})
