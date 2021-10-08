export enum EmzAppRoutes {
  homePage = `/`,
  errorPage = `/404`,
  dashboard = `/dashboard`,
  templates = `/dashboard/templates`,
  magic = `/magic`,
  iframeMagic = `/iframe/magic`,
  video = `/v`,
}
export const EmzRoutesThatIgnoreOrgIdQueryParam = []

export const EmzAuthRoutes = [
  EmzAppRoutes.dashboard,
  EmzAppRoutes.magic,
  EmzAppRoutes.templates,
]
// Routes than authorized users cant visit
export const EmzUneffectedRoutes = [
  EmzAppRoutes.video,
  EmzAppRoutes.errorPage,
  EmzAppRoutes.iframeMagic,
]
