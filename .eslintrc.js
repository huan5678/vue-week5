module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: ['error', 'always'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'comma-dangle': ['error', 'only-multiline'],
    'space-before-function-paren': ['error', 'never']
  },
  plugins: ['vue']
};
