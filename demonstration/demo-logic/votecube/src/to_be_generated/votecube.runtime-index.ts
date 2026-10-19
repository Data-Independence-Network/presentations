import { loadIframe } from '@airport/web-tower'
import { votecube } from './votecube.runtime-injection'

export * from '../api/api'
export * from '../dao/dao'
export * from '../ddl/ddl'
export * from '../generated/baseDaos'
export * from '../generated/baseDvos'
export * from '../generated/qApplication'
export * from '../generated/qInterfaces'
export * from '../generated/vInterfaces'
export * from './ApplicationLoader'
export * from './votecube.runtime-injection'

loadIframe(votecube.getFullName())
