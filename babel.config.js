module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    [
      'import',
      // { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }, // 官网文档不适用于vue/cli4
      { libraryName: 'Antd', libraryDirectory: 'es', style: 'css' },
    ],
  ],
};
