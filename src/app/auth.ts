import { cookies } from 'next/headers'

const COOKIE_KEY = 'token'

export const authenticate = (userToken: string) => {
  cookies().set(COOKIE_KEY, userToken)
}

export const hasAuthCookie = (): boolean => {
  return cookies().has(COOKIE_KEY)
}
