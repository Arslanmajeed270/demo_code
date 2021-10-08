export enum AspAppRoutes {
  homePage = `/`,
  login = `/login`,
  register = `/register`,
  resetPassword = `login/reset-password`,
  errorPage = `/404`,
  dashboard = `/dashboard`,
  fileStorage = `/dashboard/fileStorage`,
  scripts = `/dashboard/scripts`,
}

export const RoutesThatIgnoreOrgIdQueryParam = [AspAppRoutes.fileStorage]

export const AuthRoutes = [AspAppRoutes.dashboard]
