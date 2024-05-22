module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'none',
  singleQuote: true,
  semi: false,
  importOrder: [
    '^[./]'
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ["typescript", "decorators-legacy"]
}