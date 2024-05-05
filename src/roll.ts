import Roll, { APIURLNotResolvedError } from 'roll-node'

let roll: Roll | null = null

try {
  roll = new Roll({ baseUrl: process.env.NEXT_PUBLIC_ROLL_BASE_URL })
} catch (e) {
  if (!(e instanceof APIURLNotResolvedError)) {
   throw e
  }
}

export default roll
