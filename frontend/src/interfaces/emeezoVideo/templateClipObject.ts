import { IFormSchema } from '@lib/gqlTypes/asp/formSchema'

export type ITCCOTypes = `object` | `video` | `image`
export interface ITCCOSchema extends IFormSchema {
  parent: ITCCOTypes
}
