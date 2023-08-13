const resolve = require('./resolve');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
    commonjs: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  settings: {
    // 'import/resolver':
    // {
    //   extensions: ['.ts', '.tsx', '.js', '.jsx', '.less'],
    //   alias: {
    //     map: [
    //       ['components', './src/components'],
    //       ['pages', './src/pages'],
    //       ['styles', './src/styles']
    //     ]
    //   }
    // }
    'import/resolver': {
      webpack: {
        config: {
          resolve
        }
      }
    }
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'never'
  }
};
