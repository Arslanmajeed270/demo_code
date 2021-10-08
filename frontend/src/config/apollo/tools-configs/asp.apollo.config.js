const SERVICE_NAME = `asp`
const SERVICE_URL = `http://localhost:8082/graphql`

const ROOT_DIR = `../../../..`
const ENTITIES_PATH = `${ROOT_DIR}/libs/entities/${SERVICE_NAME}/**/*`

module.exports = {
  client: {
    includes: [ENTITIES_PATH],
    excludes: [`${ROOT_DIR}/**/*.test.ts`, `${ROOT_DIR}/**/tests/*`],
    service: {
      name: SERVICE_NAME,
      url: SERVICE_URL,
    },
  },
}
