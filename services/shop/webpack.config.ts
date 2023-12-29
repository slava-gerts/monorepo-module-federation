import path from 'path'
import webpack from 'webpack'

import {buildWebpack, BuildOptions, BuildPlatform} from '@packages/build-config'

import packageJson from './package.json'

type EnvParams = {
  mode?: webpack.Configuration['mode']
  port?: number
  analyzer?: boolean
  platform?: BuildPlatform
}

export default (env: EnvParams) => {
  const options: BuildOptions = {
    mode: env.mode ?? 'development',
    port: env.port ?? 3002,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop',
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
    name: 'shop',
    filename: 'remoteEntry.js',
    exposes: {
      './Router': './src/router/Router.tsx',
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