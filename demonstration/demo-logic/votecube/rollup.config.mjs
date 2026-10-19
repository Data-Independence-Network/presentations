import { getAppBuildConfig } from '@airport/taxiway/rollup/app-build.mjs'

export default getAppBuildConfig(
    '@votecube/votecube',
    '../../apps/votecube/public',
    'votecube',
    true
)
