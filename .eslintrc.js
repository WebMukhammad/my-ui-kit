module.exports = {
  plugins: ['prettier'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error'
  },

  extends: ['plugin:vue/essential', 'plugin:vue/essential', '@vue/standard', 'eslint-config-prettier']
}
