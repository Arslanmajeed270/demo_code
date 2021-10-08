import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { parseUrlQueryParam } from '@utils/browser'
export const OidcRedirect: React.FC = () => {
  const { t } = useTranslation(`common`)
  const router = useRouter()
  const queryKeyIuid = `code`
  const oidcInteractionUid = parseUrlQueryParam(router, queryKeyIuid)
  if (process.browser && !oidcInteractionUid) router.push(`/404`)
  return <div>{t(`please-wait`)} ...</div>
}
