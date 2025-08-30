module.exports = {
  // 每行最大字符数
  printWidth: 100,
  // 缩进空格数
  tabWidth: 2,
  // 使用空格缩进
  useTabs: false,
  // 语句末尾添加分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象属性引号使用策略
  quoteProps: 'as-needed',
  // JSX 中使用单引号
  jsxSingleQuote: true,
  // 多行时尾随逗号
  trailingComma: 'es5',
  // 对象字面量的括号间添加空格
  bracketSpacing: true,
  // JSX 标签的反尖括号需要换行
  bracketSameLine: false,
  // 箭头函数参数括号
  arrowParens: 'avoid',
  // 格式化范围
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // HTML 空白敏感性
  htmlWhitespaceSensitivity: 'css',
  // Vue 文件中的 script 和 style 标签缩进
  vueIndentScriptAndStyle: false,
  // 控制在 Vue 单文件组件中 <script> 和 <style> 标签内的代码缩进方式
  singleAttributePerLine: false
}