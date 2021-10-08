import {
  GqlTemplate_template_templateVersion_magicTemplate,
  GqlTemplate_template_templateVersion_magicTemplate_clips,
  GqlVideo_video_magicTemplate_scripts,
} from '@lib/gqlTypes/emz'

export const removeNulls = (obj: any): unknown => {
  const isArray = obj instanceof Array
  for (const k in obj) {
    if (obj[k] === null) isArray ? obj.splice(Number(k), 1) : delete obj[k]
    else if (typeof obj[k] == `object`) removeNulls(obj[k])
    if (isArray && obj.length == Number(k)) removeNulls(obj)
  }
  return obj
}

export const recursiveObjectValueProcessor = (
  obj: any,
  valueProcessor: <T>(value: T) => T,
): unknown => {
  if (typeof obj !== `object`) {
    return valueProcessor(obj)
  }

  for (const k in obj) {
    obj[k] = recursiveObjectValueProcessor(obj[k], valueProcessor)
  }
  return obj
}

export const processObjectKeysRecursively =
  (f: (key: string) => string) =>
  (o: unknown): unknown =>
    Array.isArray(o)
      ? o.map(processObjectKeysRecursively(f))
      : Object(o) === o
      ? Object.fromEntries(
          Object.entries(o).map(([k, v]) => [
            f(k),
            processObjectKeysRecursively(f)(v),
          ]),
        )
      : o

export const replaceObjectKeysRecursively = (
  oldKey: string,
  newKey: string,
): ((o: unknown) => unknown) =>
  processObjectKeysRecursively((k: string) => (k == oldKey ? newKey : k))

export const removeTypename = (value: any): unknown => {
  if (value === null || value === undefined) {
    return value
  } else if (Array.isArray(value)) {
    return value.map((v) => removeTypename(v))
  } else if (typeof value === `object`) {
    const newObj = {}
    Object.entries(value).forEach(([key, v]) => {
      if (key !== `__typename`) {
        newObj[key] = removeTypename(v)
      }
    })
    return newObj
  }
  return value
}

export const removeTemplateGarbage = <
  T =
    | GqlTemplate_template_templateVersion_magicTemplate
    | GqlTemplate_template_templateVersion_magicTemplate_clips
    | GqlVideo_video_magicTemplate_scripts,
>(
  value: T,
  // eslint-disable-next-line quotes
): Omit<T, '_id' | 'createdAt' | 'updatedAt'> => {
  const newObj = {}

  for (const key in value) {
    if (key === `clips`) {
      newObj[key as string] = value[key as string].map((data) =>
        removeTemplateGarbage(data),
      )
    } else if (key === `scripts`) {
      newObj[key as string] = value[key as string].map((data) =>
        removeTemplateGarbage(data),
      )
    } else if (
      value[`__typename`] === `MagicTemplateScript` &&
      key !== `object`
    ) {
      newObj[key as string] = value[key]
    } else if (
      value[`__typename`] !== `MagicTemplateScript` &&
      key !== `_id` &&
      key !== `createdAt` &&
      key !== `updatedAt`
    ) {
      newObj[key as string] = value[key]
    }
  }
  // eslint-disable-next-line quotes
  return removeTypename(newObj) as Omit<T, '_id' | 'createdAt' | 'updatedAt'>
}
