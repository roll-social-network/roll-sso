import { cache } from 'react'
import {
  Authenticated,
  CurrentSite,
  CurrentUser,
  InitLogin,
} from 'roll-node'
import { getRoll } from '@/roll'
import type {
  Authorize,
  AuthorizeParams,
  Authorized,
} from 'roll-node'

export const getCurrentSite = cache(async (): Promise<CurrentSite> => {
  const roll = getRoll()
  return await roll.getCurrentSite()
})

export const getCurrentUser = cache(async (): Promise<CurrentUser> => {
  const roll = getRoll()
  return await roll.getCurrentUser()
})

export const initLogin = async (phoneNumber: string): Promise<InitLogin> => {
  const roll = getRoll()
  return await roll.initLogin(phoneNumber)
}

export const requestVerificationCode = async (phoneNumber: string): Promise<boolean> => {
  const roll = getRoll()
  return await roll.requestVerificationCode(phoneNumber)
}

export const verify = async (phoneNumber: string, code: string): Promise<Authenticated> => {
  const roll = getRoll()
  return await roll.verifyVerificationCode(phoneNumber, code)
}

export const authorize = async (params: AuthorizeParams): Promise<Authorize> => {
  const roll = getRoll()
  return await roll.authorize(params)
}

export const allowAuthorize = async (params: AuthorizeParams): Promise<Authorized> => {
  const roll = getRoll()
  return await roll.authorize(params, true)
}
