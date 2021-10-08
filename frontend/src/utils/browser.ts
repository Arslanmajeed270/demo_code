import { NextRouter } from 'next/router'

export const parseUrlQueryParam = (
  router: NextRouter,
  queryKeyName: string,
): string | null => {
  const queries = router.asPath.match(
    new RegExp(`[&?]${queryKeyName}=(.*)(&|$)`),
  )

  const query =
    router.query[queryKeyName] || (queries && queries.length >= 2 && queries[1])
  const queryString = query ? query.toString() : null
  return queryString
}
