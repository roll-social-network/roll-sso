import {
  Authenticated,
  InitLogin,
} from 'roll-node'

export type FormState<Fields, Data, ErrorsFields> = {
  success?: boolean;
  values?: Fields,
  data?: Data;
  errors?: ErrorsFields;
} | void | undefined

export type LoginFormState = FormState<{ phoneNumber?: string }, InitLogin, { phoneNumber?: string[] }>

export type VerifyFormState = FormState<{ phoneNumber?: string, code?: string }, Authenticated, { nonFieldErrors?: string[], phoneNumber?: string[], code?: string[] }>
