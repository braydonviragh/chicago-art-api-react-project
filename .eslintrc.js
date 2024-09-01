module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'semi': ['error', 'never'],
    'no-extra-semi': 'error',
  }
}