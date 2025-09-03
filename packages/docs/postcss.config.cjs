module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-rpx-to-viewport': {
      viewportWidth: 750, // 设计稿宽度
      viewportHeight: 1334, // 设计稿高度，可选
      unitPrecision: 3, // 转换后的精度
      viewportUnit: 'vw', // 希望使用的视口单位
      selectorBlackList: ['.ignore'], // 需要忽略的CSS选择器
      minPixelValue: 1, // 最小的转换数值
      mediaQuery: false, // 是否在媒体查询的css代码中也进行转换
    },
  },
}