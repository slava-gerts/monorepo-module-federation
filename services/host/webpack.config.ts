import path from 'path'
import webpack from 'webpack'

import {buildWebpack, BuildOptions, BuildPlatform} from '@packages/build-config'

import packageJson from './package.json'

type EnvParams = {
  mode?: webpack.Configuration['mode']
  port?: number
  analyzer?: boolean
  platform?: BuildPlatform
  SHOP_REMOTE_URL?: string
  ADMIN_REMOTE_URL?: string
}

export default (env: EnvParams) => {
  const options: BuildOptions = {
    mode: env.mode ?? 'development',
    port: env.port ?? 3001,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop',
    SHOP_REMOTE_URL: env.SHOP_REMOTE_URL ?? 'http://localhost:3002',
    ADMIN_REMOTE_URL: env.ADMIN_REMOTE_URL ?? 'http://localhost:3003',
    paths: {
      entry: path.resolve(__dirname, 'src', 'index.tsx'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      output: path.resolve(__dirname, 'build'),
      src: path.resolve(__dirname, 'src'),
      public: path.resolve(__dirname, 'public'),
    }
  }

  const config: webpack.Configuration = buildWebpack(options)

  config.plugins.push(new webpack.container.ModuleFederationPlugin({
    name: 'host',
    filename: 'remoteEntry.js',

    remotes: {
      shop: `shop@${options.SHOP_REMOTE_URL}/remoteEntry.js`,
      admin: `admin@${options.ADMIN_REMOTE_URL}/remoteEntry.js`,
    },

    shared: {
      ...packageJson.dependencies,
      react: {
        eager: true,
        requiredVersion: packageJson.dependencies['react']
      },
      'react-router-dom': {
        eager: true,
        requiredVersion: packageJson.dependencies['react-router-dom']
      },
      'react-dom': {
        eager: true,
        requiredVersion: packageJson.dependencies['react-dom']
      }
    }
  }))

  return config
}