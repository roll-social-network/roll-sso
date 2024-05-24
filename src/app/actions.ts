'use server'

import {
  initLogin,
  verify,
} from '@/app/roll'
import { FormValidationError } from 'roll-node'
import type {
  LoginFormState,
  VerifyFormState,
} from '@/app/formStates'
import { authenticate } from '@/app/auth'

export const login = async (state: LoginFormState, formData: FormData): Promise<LoginFormState> => {
  const phoneNumber = formData.get('phoneNumber')?.toString()
  const values = { phoneNumber }
  if (phoneNumber) {
    try {
      const data = await initLogin(phoneNumber)
      return {
        success: true,
        values,
        data
      }
    } catch (e) {
      if (e instanceof FormValidationError) {
        return {
          success: false,
          values,
          errors: e.fields
        }
      }
      throw e
    }
  }
}

export const verifyCode = async (state: VerifyFormState, formData: FormData): Promise<VerifyFormState> => {
  const phoneNumber = state?.values?.phoneNumber
  const code = formData.get('code')?.toString()
  const values = { phoneNumber, code }
  if (phoneNumber && code) {
    try {
      const data = await verify(phoneNumber, code)
      authenticate(data.token)
      return {
        success: true,
        values,
        data
      }
    } catch (e) {
      if (e instanceof FormValidationError) {
        return {
          success: false,
          values,
          errors: e.fields
        }
      }
      throw e
    }
  }
}
