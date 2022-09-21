import { getDefaultHosts } from './lib/util'
import Mkcert, { MkcertOptions } from './mkcert'

export { BaseSource, type SourceInfo } from './mkcert/source'

export type ViteCertificateOptions = MkcertOptions & {
  /**
   * The hosts that needs to generate the certificate.
   */
  hosts?: string[]
}

const webpackPlugin = async function (
  options: MkcertOptions & { hosts: any[] }
) {
  const logger = console
  const mkcert = Mkcert.create({
    logger,
    ...options
  })

  await mkcert.init()

  const allHosts = [...getDefaultHosts(), ...options.hosts]

  const uniqueHosts = Array.from(new Set(allHosts)).filter(item => !!item)

  const certificate = await mkcert.install(uniqueHosts)

  return {
    ...certificate
  }
}

export default webpackPlugin
